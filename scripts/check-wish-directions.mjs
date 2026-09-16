// Check the direction hash spreads evenly across all 6 directions.
function hashFloat(seed, salt) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

// Firestore-style 20-char ids.
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const counts = new Array(6).fill(0);
const N = 3000;
for (let i = 0; i < N; i++) {
  let id = '';
  for (let j = 0; j < 20; j++) id += chars[Math.floor(Math.random() * chars.length)];
  const d = Math.floor(hashFloat(id, 5) * 6) % 6;
  counts[d]++;
}
const names = ['up', 'down', 'left→right', 'right→left', 'diag ↗', 'diag ↙'];
const expected = N / 6;
let worst = 0;
counts.forEach((c, i) => {
  const dev = Math.abs(c - expected) / expected;
  worst = Math.max(worst, dev);
  console.log(`${names[i].padEnd(12)} ${c}  (${(dev * 100).toFixed(1)}% off even)`);
});
console.log('worst deviation:', (worst * 100).toFixed(1) + '%');
if (worst > 0.15) {
  console.error('FAIL: direction hash is lopsided');
  process.exit(1);
}
console.log('OK: directions spread evenly');

// Real ids from production should not all land on one direction either.
const real = ['7tOpyfJcTvKtjy5APmOe', 'UDiTJAVeO2lOxvipZIut', 'XtRQiPmkfVP07GVd4SZp'];
console.log('live wishes →', real.map((id) => names[Math.floor(hashFloat(id, 5) * 6) % 6]).join(', '));
