import { cert, getApp, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

// Server-only. Writes land in the same Firestore project beratnyaCrown reads from
// (`gorillatix`), so no sync step exists to drift.
export function getDb(): Firestore {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');

    // Accept either raw JSON or base64 — Vercel env vars mangle newlines otherwise.
    const json = raw.trim().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');
    const parsed = JSON.parse(json) as ServiceAccount & { private_key?: string };
    if (parsed.private_key) parsed.privateKey = parsed.private_key.replace(/\\n/g, '\n');

    initializeApp({ credential: cert(parsed) });
  }
  return getFirestore(getApp());
}
