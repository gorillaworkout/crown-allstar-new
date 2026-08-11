'use client';

import { useEffect, useState } from 'react';

/**
 * The Red Moon. Deliberately restrained: one flat disc, a few craters, two haze
 * bands, sparse embers. No gradient mesh, no glassmorphism.
 */
export default function RedMoon() {
  const [embers, setEmbers] = useState<{ l: number; d: number; delay: number; s: number }[]>([]);

  // Generated after mount so server and client markup can't disagree.
  useEffect(() => {
    setEmbers(
      Array.from({ length: 14 }, () => ({
        l: Math.random() * 100,
        d: 9 + Math.random() * 11,
        delay: Math.random() * 12,
        s: 1 + Math.random() * 1.6,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Cold ground light so the black doesn't read as flat #000 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, hsl(0 60% 12% / 0.55) 0%, transparent 55%)',
        }}
      />

      {/* The disc — fully visible, upper-right, never cropped by the viewport edge. */}
      <div className="moon-drift absolute -top-[7%] right-[4%] sm:top-[2%] sm:right-[7%]">
        <div className="relative h-[clamp(140px,22vw,290px)] w-[clamp(140px,22vw,290px)] rounded-full moon-disc">
          <span className="moon-crater left-[24%] top-[30%] h-[13%] w-[13%]" />
          <span className="moon-crater left-[58%] top-[19%] h-[8%] w-[8%]" />
          <span className="moon-crater left-[66%] top-[54%] h-[17%] w-[17%]" />
          <span className="moon-crater left-[38%] top-[68%] h-[7%] w-[7%]" />
          <span className="moon-crater left-[46%] top-[44%] h-[5%] w-[5%]" />

          {/* Haze bands crossing the face */}
          <span
            className="moon-haze absolute left-[-12%] top-[36%] h-[7%] w-[124%] rounded-full"
            style={{ background: 'hsl(0 0% 4% / 0.5)', filter: 'blur(6px)' }}
          />
          <span
            className="moon-haze absolute left-[-12%] top-[62%] h-[4%] w-[124%] rounded-full"
            style={{ background: 'hsl(0 0% 4% / 0.38)', filter: 'blur(7px)', animationDelay: '4s' }}
          />
        </div>
      </div>

      {/* Scrim: protects headline contrast against the moon's halo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, hsl(0 0% 4%) 0%, hsl(0 0% 4% / 0.88) 26%, transparent 48%)',
        }}
      />

      {/* Horizon wash grounding the composition */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to top, hsl(0 0% 4%) 20%, transparent)' }}
      />

      {/* Embers */}
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember absolute bottom-0 rounded-full"
          style={{
            left: `${e.l}%`,
            width: e.s,
            height: e.s,
            background: 'hsl(0 85% 62%)',
            animationDuration: `${e.d}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
