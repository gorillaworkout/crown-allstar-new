'use client';

import { useEffect, useState } from 'react';
import { CLOSE_AT, OPEN_AT, windowState, type WindowState } from '@/lib/recruitment';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Counts down to whichever boundary matters: the opening date before 13 Aug,
 * the closing date while open. Client-side display only — the server re-checks
 * the window on submit.
 */
export default function Countdown({ initialState }: { initialState: WindowState }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Render the server-known state until the clock is live, to avoid a hydration flash.
  const state = now ? windowState(now) : initialState;
  if (state === 'closed') return null;

  const target = state === 'before' ? OPEN_AT : CLOSE_AT;
  const ms = now ? Math.max(0, target.getTime() - now.getTime()) : 0;
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  const units: [number, string][] = [
    [d, 'DAYS'],
    [h, 'HOURS'],
    [m, 'MINS'],
    [s, 'SECS'],
  ];

  return (
    <div>
      <p className="mb-4 text-[10px] font-medium tracking-[0.3em] text-white/40">
        {state === 'before' ? 'PENDAFTARAN DIBUKA DALAM' : 'PENDAFTARAN DITUTUP DALAM'}
      </p>
      <div className="flex items-start gap-5 sm:gap-8">
        {units.map(([value, label]) => (
          <div key={label}>
            <div
              className="count-digit text-[clamp(2.25rem,6vw,4rem)] tabular-nums"
              suppressHydrationWarning
            >
              {now ? pad(value) : '--'}
            </div>
            <div className="mt-1 text-[9px] tracking-[0.25em] text-white/35">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
