import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { findProfanity } from '@/lib/profanity';

const COLLECTION = 'crown-wishes';
const MAX_PER_IP_PER_HOUR = 5;
const MAX_MESSAGE = 180;
const MAX_NAME = 40;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const bad = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

type Wish = { id: string; name: string; message: string; batch: string; createdAt: string };

export async function GET() {
  try {
    // Single-field orderBy only. Adding `.where('approved','==',true)` here would
    // require a composite index that fails closed at runtime if it is missing,
    // so approval is filtered in memory instead — 60 docs is cheap.
    const snap = await getDb()
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(80)
      .get();

    const wishes: Wish[] = snap.docs
      .filter((d) => d.data().approved !== false)
      .slice(0, 60)
      .map((d) => {
        const v = d.data();
        return {
          id: d.id,
          name: v.name ?? 'Anonymous',
          message: v.message ?? '',
          batch: v.batch ?? '',
          createdAt: v.createdAt?.toDate?.()?.toISOString() ?? '',
        };
      });

    return NextResponse.json(
      { ok: true, wishes },
      // Cache briefly at the edge: the wall is social, not real-time.
      { headers: { 'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=60' } }
    );
  } catch (err) {
    console.error('[wishes] read failed:', err);
    return NextResponse.json({ ok: true, wishes: [] });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid request format.');
  }

  // Honeypot — a real visitor never fills a hidden field.
  if (str(body.website, 50)) return NextResponse.json({ ok: true });

  const name = str(body.name, MAX_NAME);
  if (name.length < 2) return bad('Please enter your name (at least 2 characters).');

  const message = str(body.message, MAX_MESSAGE);
  if (message.length < 3) return bad('Please write a message (at least 3 characters).');

  const batch = str(body.batch, 20);

  // Profanity gate — server-side is the only gate that counts.
  for (const field of [name, message, batch]) {
    const hit = findProfanity(field);
    if (hit) return bad('Please keep it kind — that message contains blocked words.', 422);
  }

  // Reject link spam outright; this wall has no reason to carry URLs.
  if (/https?:\/\/|www\.|\.com\b|\.net\b|\.xyz\b|t\.me\//i.test(message)) {
    return bad('Links are not allowed in messages.', 422);
  }

  try {
    const db = getDb();

    // Rate limit on shared state — Vercel spreads requests across instances,
    // so an in-memory counter would never trip. Same pattern as /api/recruitment.
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (ip !== 'unknown') {
      const ipKey = ip.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 128);
      const rlRef = db.collection('crown-ratelimits').doc(`wish-${ipKey}`);
      const rl = await rlRef.get();
      const now = Date.now();
      const windowStart = (rl.exists ? rl.data()?.windowStart?.toMillis?.() : 0) || 0;
      const count = (rl.exists ? (rl.data()?.count as number) : 0) || 0;

      if (now - windowStart < 3600_000) {
        if (count >= MAX_PER_IP_PER_HOUR) {
          return bad('You have sent several messages already. Please try again later.', 429);
        }
        await rlRef.set({ count: count + 1 }, { merge: true });
      } else {
        await rlRef.set({ count: 1, windowStart: new Date() });
      }
    }

    const ref = await db.collection(COLLECTION).add({
      name,
      message,
      batch,
      approved: true, // auto-approved; profanity gate already ran
      ip,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { ok: true, wish: { id: ref.id, name, message, batch, createdAt: new Date().toISOString() } },
      { status: 201 }
    );
  } catch (err) {
    console.error('[wishes] write failed:', err);
    return bad('We could not save your message. Please try again.', 500);
  }
}
