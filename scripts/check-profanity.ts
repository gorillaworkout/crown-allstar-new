// Self-check for lib/profanity.ts — run: npx tsx scripts/check-profanity.ts
// No test framework on purpose; asserts are enough to catch regressions.
import assert from 'node:assert/strict';
import { findProfanity, isClean } from '../lib/profanity';

// ── must BLOCK ──
const dirty = [
  'anjing lu semua',
  'ANJING',
  'k0nt0l',
  'f u c k this',
  'fuck off',
  'b1tch',
  'a n j i n g',
  'dasar t0l0l',
  'slot gacor menang terus',
  'judi online terpercaya',
  'kys loser',
  'b-a-b-i',
];
for (const s of dirty) {
  assert.equal(isClean(s), false, `should block: ${s} (got clean)`);
}

// ── must ALLOW (Scunthorpe guards + normal wishes) ──
const clean = [
  'Happy anniversary Crown! Proud of you all',
  'Selamat ulang tahun Crown Allstar',
  'assist the team',          // contains "ass"
  'kontestan terbaik',       // contains "kont"
  'Analisis gerakan bagus',  // contains "anal"
  'Semoga makin sukses ya',
  'Titik balik yang indah',  // contains "tai" inside "titik"? guard word boundary
  'Class of 2026, love you guys',
  'Bangga jadi bagian Crown',
  'Congrats, keep shining!',
  'Miss you all so much',
  'Cocktail party was fun',  // contains "cock"
];
for (const s of clean) {
  const hit = findProfanity(s);
  assert.equal(hit, null, `should allow: ${s} (blocked by "${hit}")`);
}

console.log(`profanity self-check OK — ${dirty.length} blocked, ${clean.length} allowed`);
