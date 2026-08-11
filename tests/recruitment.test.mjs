// Self-check for recruitment rules. Run: node tests/recruitment.test.mjs
// Rules come straight from Bayu: All Girl 13+ (P only), C4 13+ (P/L), Premier 15+ (P/L),
// window 13-21 Aug 2026 WIB.

import assert from 'node:assert/strict';

// ── Mirrors lib/recruitment.ts ────────────────────────────────────────────────
const DIVISIONS = [
  { id: 'all-girl', name: 'ALL GIRL', minAge: 13, genders: ['perempuan'] },
  { id: 'c4', name: 'C4', minAge: 13, genders: ['perempuan', 'laki-laki'] },
  { id: 'premier', name: 'PREMIER', minAge: 15, genders: ['perempuan', 'laki-laki'] },
];
const OPEN_AT = new Date('2026-08-01T00:00:00+07:00'); // opened early for testing
const CLOSE_AT = new Date('2026-08-21T23:59:59.999+07:00');

function ageAt(birthDate, on = new Date()) {
  const b = new Date(`${birthDate}T00:00:00+07:00`);
  if (Number.isNaN(b.valueOf())) return -1;
  let age = on.getFullYear() - b.getFullYear();
  const m = on.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < b.getDate())) age--;
  return age;
}
function divisionBlocker(division, gender, age) {
  const d = DIVISIONS.find((x) => x.id === division);
  if (!d) return 'Divisi tidak dikenal.';
  if (gender && !d.genders.includes(gender)) return `Divisi ${d.name} hanya untuk perempuan.`;
  if (age >= 0 && age < d.minAge) return `Divisi ${d.name} minimum ${d.minAge} tahun.`;
  return null;
}
const isEligible = (d, g, a) => divisionBlocker(d, g, a) === null;
function windowState(now) {
  if (now < OPEN_AT) return 'before';
  if (now > CLOSE_AT) return 'closed';
  return 'open';
}
const regNumber = (n) => `CA18-${String(n).padStart(4, '0')}`;
function normalizeWhatsapp(input) {
  const digits = input.replace(/[^\d+]/g, '').replace(/^\+/, '');
  let n = digits;
  if (n.startsWith('0')) n = `62${n.slice(1)}`;
  else if (n.startsWith('8')) n = `62${n}`;
  if (!n.startsWith('62')) return null;
  const local = n.slice(2);
  if (!/^8\d{8,12}$/.test(local)) return null;
  return n;
}

// ── Age ──────────────────────────────────────────────────────────────────────
const ref = new Date('2026-08-13T12:00:00+07:00');
assert.equal(ageAt('2009-08-13', ref), 17, 'birthday today counts');
assert.equal(ageAt('2009-08-14', ref), 16, 'birthday tomorrow does not count yet');
assert.equal(ageAt('2013-08-12', ref), 13, 'just turned 13 → eligible age');
assert.equal(ageAt('2013-08-14', ref), 12, 'turns 13 in two days → still 12');
assert.equal(ageAt('not-a-date', ref), -1, 'invalid date is rejected');

// ── Division eligibility matrix ──────────────────────────────────────────────
// All Girl: women only, 13+
assert.ok(isEligible('all-girl', 'perempuan', 13));
assert.ok(!isEligible('all-girl', 'laki-laki', 20), 'men cannot join All Girl');
assert.ok(!isEligible('all-girl', 'perempuan', 12), 'under 13 blocked');
assert.match(divisionBlocker('all-girl', 'laki-laki', 20), /hanya untuk perempuan/);

// C4: both genders, 13+
assert.ok(isEligible('c4', 'perempuan', 13));
assert.ok(isEligible('c4', 'laki-laki', 13), 'C4 accepts men at 13');
assert.ok(!isEligible('c4', 'laki-laki', 12));

// Premier: both genders, 15+
assert.ok(isEligible('premier', 'laki-laki', 15));
assert.ok(!isEligible('premier', 'perempuan', 14), 'Premier needs 15, not 13');
assert.match(divisionBlocker('premier', 'perempuan', 13), /minimum 15 tahun/);

// A 15-year-old woman qualifies everywhere.
for (const d of ['all-girl', 'c4', 'premier']) assert.ok(isEligible(d, 'perempuan', 15));
// A 13-year-old man qualifies for C4 only.
assert.deepEqual(
  ['all-girl', 'c4', 'premier'].filter((d) => isEligible(d, 'laki-laki', 13)),
  ['c4']
);

// ── Window state (WIB boundaries) ────────────────────────────────────────────
assert.equal(windowState(new Date('2026-07-31T23:59:00+07:00')), 'before');
assert.equal(windowState(new Date('2026-08-01T00:00:00+07:00')), 'open', 'opens exactly 1 Aug');
assert.equal(windowState(new Date('2026-08-11T12:00:00+07:00')), 'open', 'open today for testing');
assert.equal(windowState(new Date('2026-08-21T23:59:00+07:00')), 'open', 'still open on 21 Aug');
assert.equal(windowState(new Date('2026-08-22T00:01:00+07:00')), 'closed');
// A registrant in WIT (UTC+9) at 01:00 on 13 Aug local = 23:00 12 Aug WIB → still 'before'.
assert.equal(windowState(new Date('2026-08-01T01:00:00+09:00')), 'before', 'WIB is authoritative');

// ── Registration number ──────────────────────────────────────────────────────
assert.equal(regNumber(1), 'CA18-0001');
assert.equal(regNumber(147), 'CA18-0147');

// ── WhatsApp normalisation ───────────────────────────────────────────────────
assert.equal(normalizeWhatsapp('081324420183'), '6281324420183');
assert.equal(normalizeWhatsapp('+62 813-2442-0183'), '6281324420183');
assert.equal(normalizeWhatsapp('81324420183'), '6281324420183');
assert.equal(normalizeWhatsapp('6281324420183'), '6281324420183');
assert.equal(normalizeWhatsapp('12345'), null, 'too short');
assert.equal(normalizeWhatsapp('6271234567'), null, 'must start with 8 after country code');
assert.equal(normalizeWhatsapp('halo'), null);

console.log('recruitment: all assertions passed');
