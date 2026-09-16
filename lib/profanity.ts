// Profanity gate for public wishes. Server-side only — client checks are advisory.
//
// Strategy: normalize leetspeak/spacing first, then match word-boundary patterns.
// A plain `includes()` fails both ways: it misses "b 4 b i" and it flags innocent
// substrings (the classic "Scunthorpe problem" — "assist", "kontestan").
const BLOCKED = [
  // Indonesian
  'anjing', 'anjg', 'anjir', 'anjay', 'babi', 'bangsat', 'bajingan', 'kampret',
  'kontol', 'memek', 'peler', 'pepek', 'ngentot', 'entot', 'jancok', 'jancuk',
  'jembut', 'pantek', 'pukimak', 'puki', 'tolol', 'goblok', 'goblog', 'bodoh',
  'idiot', 'sinting', 'gila lu', 'setan', 'iblis', 'keparat', 'brengsek',
  'bangke', 'bacot', 'sundal', 'lonte', 'pelakor', 'pecun', 'jablay',
  'kunyuk', 'monyet lu', 'asu', 'bejat', 'biadab', 'najis', 'sialan',
  'tai', 'taik', 'kotoran', 'kencing', 'perek',
  // English
  'fuck', 'fucking', 'fucked', 'shit', 'bitch', 'bastard', 'asshole',
  'dick', 'cock', 'pussy', 'cunt', 'slut', 'whore', 'retard', 'faggot',
  'nigger', 'nigga', 'rape', 'kill yourself', 'kys',
  // Spam / promo
  'judi online', 'slot gacor', 'situs slot', 'togel', 'pinjol', 'viagra',
  'promo judi', 'link alternatif',
];

// Leet → letter. Applied before matching so "k0nt0l" and "b1tch" are caught.
const LEET: Record<string, string> = {
  '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '6': 'g', '7': 't',
  '8': 'b', '9': 'g', '@': 'a', '$': 's', '!': 'i', '*': '', '+': 't',
};

export function normalize(text: string): string {
  const lowered = text.toLowerCase();
  let out = '';
  for (const ch of lowered) {
    out += ch in LEET ? LEET[ch] : ch;
  }
  return (
    out
      // strip accents so "ãnjing" normalizes too
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // treat filter-dodging separators as spaces: "f-u-c-k", "a.n.j.i.n.g"
      .replace(/[\s._\-]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
  );
}

// Collapse runs of isolated single characters: "a n j i n g" → "anjing",
// "f u c k this" → "fuck this" (a real word next to the run stays separate).
export function collapseSpacedLetters(text: string): string {
  const out: string[] = [];
  let run: string[] = [];

  const flush = () => {
    if (run.length >= 2) out.push(run.join(''));
    else out.push(...run);
    run = [];
  };

  for (const token of text.split(' ')) {
    if (token.length === 1 && /[a-z0-9]/.test(token)) run.push(token);
    else {
      flush();
      out.push(token);
    }
  }
  flush();
  return out.join(' ');
}

/** Returns the first blocked term found, or null when the text is clean. */
export function findProfanity(text: string): string | null {
  const variants = [normalize(text), collapseSpacedLetters(normalize(text))];
  for (const term of BLOCKED) {
    // Word-boundary match avoids false positives inside longer innocent words.
    const pattern = new RegExp(`(^|[^a-z0-9])${term.replace(/\s+/g, '\\s*')}([^a-z0-9]|$)`, 'i');
    if (variants.some((v) => pattern.test(v))) return term;
  }
  return null;
}

export function isClean(text: string): boolean {
  return findProfanity(text) === null;
}
