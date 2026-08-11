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
  try {
    const { getDb } = await import('@/lib/firebase-admin');
    // Cheapest possible authenticated round-trip.
    await getDb().collection('crown-recruits').limit(1).get();
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
  });
}
