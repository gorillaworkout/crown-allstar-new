// Recruitment rules for Crown Allstar Angkatan 18.
// Pure functions only — no I/O, so both client and server share one source of truth.

export const BATCH = 18;

// Window is fixed to WIB (UTC+7) so registrants in WITA/WIT aren't cut off early.
// 13 Aug 2026 00:00 WIB → 21 Aug 2026 23:59:59.999 WIB
// Opened early at Bayu's request so the live form can be tested before 13 Aug.
// To restore the announced window, set this back to 2026-08-13T00:00:00+07:00.
export const OPEN_AT = new Date('2026-08-01T00:00:00+07:00');
export const CLOSE_AT = new Date('2026-08-21T23:59:59.999+07:00');

export type Division = 'all-girl' | 'c4' | 'premier';
export type Gender = 'perempuan' | 'laki-laki';
export type WindowState = 'before' | 'open' | 'closed';

export const DIVISIONS: {
  id: Division;
  name: string;
  minAge: number;
  genders: Gender[];
  blurb: string;
}[] = [
  {
    id: 'all-girl',
    name: 'ALL GIRL',
    minAge: 13,
    genders: ['perempuan'],
    blurb: 'All-female team. Strength and precision, no compromise.',
  },
  {
    id: 'c4',
    name: 'C4',
    minAge: 13,
    genders: ['perempuan', 'laki-laki'],
    blurb: 'Co-ed team. The most open entry point for beginners.',
  },
  {
    id: 'premier',
    name: 'PREMIER',
    minAge: 15,
    genders: ['perempuan', 'laki-laki'],
    blurb: 'Advanced co-ed team. The national competition stage.',
  },
];

export const POSITIONS = [
  'Base',
  'Flyer',
  'Backspot',
  'Frontspot',
  'Tumbler',
  'Dancer',
  'Not sure yet',
] as const;

export const EXPERIENCE = [
  'None / complete beginner',
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  'More than 5 years',
] as const;

export const HEARD_FROM = ['Instagram', 'A friend', 'School / campus', 'An event', 'Other'] as const;

/** Age in whole years at `on` (defaults to now). Returns -1 for an unparseable date. */
export function ageAt(birthDate: string, on: Date = new Date()): number {
  const b = new Date(`${birthDate}T00:00:00+07:00`);
  if (Number.isNaN(b.valueOf())) return -1;
  let age = on.getFullYear() - b.getFullYear();
  const monthDiff = on.getMonth() - b.getMonth();
  // Birthday hasn't happened yet this year → subtract one.
  if (monthDiff < 0 || (monthDiff === 0 && on.getDate() < b.getDate())) age--;
  return age;
}

/** Why a division is unavailable, or null when the applicant qualifies. */
export function divisionBlocker(
  division: Division,
  gender: Gender | '',
  age: number
): string | null {
  const d = DIVISIONS.find((x) => x.id === division);
  if (!d) return 'Unknown division.';
  if (gender && !d.genders.includes(gender)) {
    return `${d.name} is open to female athletes only.`;
  }
  if (age >= 0 && age < d.minAge) {
    return `${d.name} requires a minimum age of ${d.minAge}.`;
  }
  return null;
}

export function isEligible(division: Division, gender: Gender | '', age: number): boolean {
  return divisionBlocker(division, gender, age) === null;
}

export function windowState(now: Date = new Date()): WindowState {
  if (now < OPEN_AT) return 'before';
  if (now > CLOSE_AT) return 'closed';
  return 'open';
}

/** CA18-0001 style registration number. */
export function regNumber(sequence: number): string {
  return `CA${BATCH}-${String(sequence).padStart(4, '0')}`;
}

/** Normalise Indonesian mobile numbers to 62xxxxxxxxx; null when invalid. */
export function normalizeWhatsapp(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, '').replace(/^\+/, '');
  let n = digits;
  if (n.startsWith('0')) n = `62${n.slice(1)}`;
  else if (n.startsWith('8')) n = `62${n}`;
  if (!n.startsWith('62')) return null;
  const local = n.slice(2);
  // Indonesian mobile numbers start with 8 and run 9-13 digits after the country code.
  if (!/^8\d{8,12}$/.test(local)) return null;
  return n;
}
