import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

// Server-only. Writes land in the same Firestore project beratnyaCrown reads from
// (`gorillatix`), so no sync step exists to drift.
//
// Credentials use the same three env vars as beratnyaCrown so both apps share one
// convention: NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.
// FIREBASE_SERVICE_ACCOUNT_KEY (single JSON blob) is still accepted as a fallback.
export function getDb(): Firestore {
  if (!getApps().length) {
    initializeApp({ credential: cert(readCredentials()) });
  }
  return getFirestore(getApp());
}

function readCredentials() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel stores the PEM with literal \n sequences; turn them back into newlines.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }

  // Fallback: a single service-account JSON (raw or base64).
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    const json = raw.trim().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');
    const p = JSON.parse(json) as {
      project_id?: string;
      projectId?: string;
      client_email?: string;
      clientEmail?: string;
      private_key?: string;
      privateKey?: string;
    };
    const key = p.private_key ?? p.privateKey;
    return {
      projectId: p.project_id ?? p.projectId,
      clientEmail: p.client_email ?? p.clientEmail,
      privateKey: key?.replace(/\\n/g, '\n'),
    };
  }

  throw new Error(
    'Missing Firebase Admin credentials. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, ' +
      'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY (or FIREBASE_SERVICE_ACCOUNT_KEY).'
  );
}
