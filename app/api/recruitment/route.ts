import { NextResponse } from 'next/server';
import {
  DIVISIONS,
  EXPERIENCE,
  HEARD_FROM,
  POSITIONS,
  BATCH,
  ageAt,
  divisionBlocker,
  normalizeWhatsapp,
  regNumber,
  windowState,
  type Division,
  type Gender,
} from '@/lib/recruitment';
import { getDb } from '@/lib/firebase-admin';

const COLLECTION = 'crown-recruits';
const MAX_PER_IP_PER_HOUR = 3;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const bad = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  // 1. Window check — server is authoritative. Hiding the form client-side is not enough.
  const state = windowState();
  if (state === 'before') {
    return bad('Batch 18 registration is not open yet. It opens 13 August 2026.', 403);
  }
  if (state === 'closed') {
    return bad('Batch 18 registration closed on 21 August 2026.', 403);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid request format.');
  }

  // 2. Honeypot — a real user never fills a hidden field.
  if (str(body.website, 50)) return NextResponse.json({ ok: true, regNumber: 'CA18-0000' });

  // 3. Field validation.
  const fullName = str(body.fullName, 80);
  if (fullName.length < 3) return bad('Full name must be at least 3 characters.');

  const birthDate = str(body.birthDate, 10);
  const age = ageAt(birthDate);
  if (age < 0) return bad('Date of birth is not valid.');
  if (age < 13) return bad('The minimum age to register is 13.');
  if (age > 60) return bad('Date of birth is not valid.');

  const gender = str(body.gender, 20) as Gender;
  if (gender !== 'perempuan' && gender !== 'laki-laki') return bad('Please select your gender.');

  const division = str(body.division, 20) as Division;
  if (!DIVISIONS.some((d) => d.id === division)) return bad('Please select a division.');

  // 4. Cross-validate division against gender + age (the rule that matters most).
  const blocker = divisionBlocker(division, gender, age);
  if (blocker) return bad(blocker);

  const whatsapp = normalizeWhatsapp(str(body.whatsapp, 25));
  if (!whatsapp) return bad('WhatsApp number is not valid. Example: 081234567890');

  const domicileCity = str(body.domicileCity, 60);
  if (!domicileCity) return bad('Please select where you live.');

  const previousTeam = str(body.previousTeam, 80);
  const isBeginner = body.isBeginner === true;
  if (!isBeginner && !previousTeam) {
    return bad('Enter your previous cheer team, or tick "no experience".');
  }

  const rawPositions = Array.isArray(body.position) ? body.position : [];
  const position = rawPositions
    .filter((p): p is string => typeof p === 'string')
    .filter((p) => (POSITIONS as readonly string[]).includes(p))
    .slice(0, POSITIONS.length);
  if (position.length === 0) return bad('Please choose at least one position.');

  const emergencyName = str(body.emergencyName, 80);
  const emergencyPhone = normalizeWhatsapp(str(body.emergencyPhone, 25));
  if (!emergencyName) return bad('Emergency contact name is required.');
  if (!emergencyPhone) return bad('Emergency contact number is not valid.');

  // Both are hard requirements from Bayu — not optional checkboxes.
  if (body.parentApproval !== true) return bad('Parental approval must be confirmed.');
  if (body.commitmentAgree !== true) return bad('You must confirm your commitment.');

  const experienceYears = str(body.experienceYears, 40);
  const howDidYouHear = str(body.howDidYouHear, 40);

  const doc = {
    batch: BATCH,
    fullName,
    birthDate,
    age,
    gender,
    division,
    whatsapp,
    instagram: str(body.instagram, 60).replace(/^@/, ''),
    domicileCity,
    domicileDetail: str(body.domicileDetail, 120),
    schoolOrCampus: str(body.schoolOrCampus, 100),
    previousTeam: isBeginner ? '-' : previousTeam,
    isBeginner,
    position,
    experienceYears: (EXPERIENCE as readonly string[]).includes(experienceYears)
      ? experienceYears
      : EXPERIENCE[0],
    heightCm: Number(body.heightCm) > 0 ? Math.round(Number(body.heightCm)) : null,
    weightKg: Number(body.weightKg) > 0 ? Math.round(Number(body.weightKg)) : null,
    motivation: str(body.motivation, 500),
    emergencyName,
    emergencyPhone,
    parentApproval: true,
    commitmentAgree: true,
    howDidYouHear: (HEARD_FROM as readonly string[]).includes(howDidYouHear) ? howDidYouHear : '',
    status: 'baru' as const,
    notes: '',
  };

  try {
    const db = getDb();
    const col = db.collection(COLLECTION);

    // 5. Duplicate guard — WhatsApp is the identity key.
    const dupe = await col.where('whatsapp', '==', whatsapp).limit(1).get();
    if (!dupe.empty) {
      return bad('This WhatsApp number is already registered for Batch 18.', 409);
    }

    // 6. Rate limit. Must be shared state, not process memory — Vercel serverless
    //    spreads requests across instances, so an in-memory counter would never trip.
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (ip !== 'unknown') {
      const hourAgo = new Date(Date.now() - 3600_000);
      const recent = await col
        .where('ip', '==', ip)
        .where('createdAt', '>=', hourAgo)
        .limit(MAX_PER_IP_PER_HOUR)
        .get();
      if (recent.size >= MAX_PER_IP_PER_HOUR) {
        return bad('Too many registrations from this network. Please try again later.', 429);
      }
    }

    // 7. Sequence + write, atomically so two submits can't take the same number.
    const counterRef = db.collection('crown-counters').doc(`recruits-a${BATCH}`);
    const created = await db.runTransaction(async (tx) => {
      const snap = await tx.get(counterRef);
      const next = ((snap.exists ? (snap.data()?.count as number) : 0) || 0) + 1;
      tx.set(counterRef, { count: next }, { merge: true });
      const ref = col.doc();
      tx.set(ref, {
        ...doc,
        regNumber: regNumber(next),
        sequence: next,
        ip,
        createdAt: new Date(),
      });
      return regNumber(next);
    });

    return NextResponse.json({ ok: true, regNumber: created }, { status: 201 });
  } catch (err) {
    console.error('[recruitment] write failed:', err);
    return bad('We could not save your registration. Please try again or contact us on WhatsApp.', 500);
  }
}
