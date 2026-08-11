import { NextResponse } from 'next/server';

// Temporary diagnostic: reports WHICH credential env vars are visible to this
// deployment. Booleans and lengths only — never the values themselves.
// Delete this route once the Firestore write is confirmed working.
export const dynamic = 'force-dynamic';

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const blob = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  let writeError: string | null = null;
  let compositeQueryError: string | null = null;
  let transactionError: string | null = null;
  try {
    const { getDb } = await import('@/lib/firebase-admin');
    const db = getDb();
    const col = db.collection('crown-recruits');
    // Cheapest possible authenticated round-trip.
    await col.limit(1).get();

    // The rate-limit query: ip == X AND createdAt >= Y needs a composite index.
    try {
      await col
        .where('ip', '==', '1.2.3.4')
        .where('createdAt', '>=', new Date(Date.now() - 3600_000))
        .limit(3)
        .get();
    } catch (err) {
      compositeQueryError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    }

    // Transaction on the counter doc, rolled back so nothing is persisted.
    try {
      const counterRef = db.collection('crown-counters').doc('recruits-a18');
      await db.runTransaction(async (tx) => {
        await tx.get(counterRef);
        throw new Error('__rollback__');
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      transactionError = msg === '__rollback__' ? null : msg;
    }
  } catch (err) {
    writeError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  }

  return NextResponse.json({
    hasProjectId: Boolean(projectId),
    projectIdValue: projectId ?? null, // not a secret
    hasClientEmail: Boolean(clientEmail),
    clientEmailDomain: clientEmail ? clientEmail.split('@')[1] ?? null : null,
    hasPrivateKey: Boolean(privateKey),
    privateKeyLength: privateKey?.length ?? 0,
    privateKeyStartsCorrectly: privateKey?.includes('BEGIN') ?? false,
    privateKeyHasEscapedNewlines: privateKey?.includes('\\n') ?? false,
    privateKeyHasRealNewlines: privateKey?.includes('\n') ?? false,
    hasServiceAccountBlob: Boolean(blob),
    firestoreReachable: writeError === null,
    firestoreError: writeError,
    compositeQueryError,
    transactionError,
  });
}
