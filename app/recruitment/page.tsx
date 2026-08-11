import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import RedMoon from '@/components/recruitment/red-moon';
import Countdown from '@/components/recruitment/countdown';
import RecruitmentForm from '@/components/recruitment/recruitment-form';
import { DIVISIONS, windowState } from '@/lib/recruitment';

export const metadata: Metadata = {
  title: { absolute: 'Open Recruitment Batch 18 | Crown Allstar Cheerleading' },
  description:
    'Crown Allstar Batch 18 open recruitment, 13-21 August 2026. Free to join, no experience required. All Girl, C4 and Premier divisions.',
  openGraph: {
    title: 'Open Recruitment Crown Allstar Batch 18',
    description: '13-21 August 2026. Free. No experience required.',
  },
};

// Rendered per-request so the open/closed state is never cached wrong.
export const dynamic = 'force-dynamic';

const TIMELINE = [
  { date: '13 AUG', label: 'Registration opens', done: false },
  { date: '21 AUG', label: 'Registration closes', done: false },
  { date: 'TBA', label: 'Auditions & selection', done: false },
  { date: 'TBA', label: 'Results announced', done: false },
];

const REQUIREMENTS = [
  {
    n: '01',
    title: 'NO EXPERIENCE REQUIRED',
    body: 'Never done cheerleading before? You can still apply. We train from the ground up.',
  },
  {
    n: '02',
    title: 'PARENTAL APPROVAL',
    body: 'Your parent or guardian must know about and approve your registration.',
  },
  {
    n: '03',
    title: 'READY TO COMMIT',
    body: 'Willing to follow the training schedule and Crown programme consistently.',
  },
];

const FAQ = [
  {
    q: 'Can I apply if I have never done cheerleading?',
    a: 'Yes. No experience is required — that is one of the official Batch 18 terms. Many Crown athletes started from zero.',
  },
  {
    q: 'How much does it cost to register?',
    a: 'Nothing. There is no registration fee for Batch 18.',
  },
  {
    q: 'What is the minimum age?',
    a: 'It depends on the division. All Girl and C4 require a minimum of 13. Premier requires 15.',
  },
  {
    q: 'Where and when is training?',
    a: 'Location and schedule will be announced later (TBA). What matters is that you are ready to commit once it is set.',
  },
  {
    q: 'Can male athletes join?',
    a: 'Yes, in C4 (13+) and Premier (15+). The All Girl division is for female athletes only.',
  },
  {
    q: 'What if I live outside Bandung?',
    a: 'You can still apply. Put your location in the form so we can factor in travel and training readiness.',
  },
];

export default function RecruitmentPage() {
  const ws = windowState();

  return (
    <div className="redmoon bg-[#0a0a0a]">
      <Header />

      {/* ══ HERO — type as image, moon as the only ornament ══ */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16">
        <RedMoon />

        {/* Vertical rail, matching the site's magazine gutter device */}
        <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.3em] text-white/20 [writing-mode:vertical-lr] lg:block">
          CROWN ALLSTAR · EST. 2008 · BANDUNG
        </span>

        <div className="relative mx-auto w-full max-w-6xl">
          <p className="inline-block border border-[hsl(0_85%_58%)]/25 px-5 py-2 text-[11px] font-medium tracking-[0.3em] text-[hsl(0_85%_62%)]">
            OPEN RECRUITMENT
          </p>

          <h1 className="font-display mt-7 text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.82] tracking-tight text-white">
            BATCH
            <br />
            <span className="text-[hsl(0_85%_58%)]">18</span>
          </h1>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_auto] lg:items-start lg:gap-16">
            <div>
              <p className="max-w-lg text-[17px] leading-relaxed text-white/55">
                Sixteen-time ICANC national champions. Several Crown athletes have represented
                Indonesia at the ICU World Championship in Florida. Now we&apos;re looking for our
                next batch.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] tracking-[0.2em]">
                <span className="bg-[hsl(0_72%_45%)] px-3.5 py-2 font-medium text-white">FREE TO JOIN</span>
                <span className="border border-white/15 px-3.5 py-2 text-white/60">
                  NO EXPERIENCE NEEDED
                </span>
                <span className="border border-white/15 px-3.5 py-2 text-white/60">
                  13—21 AUGUST
                </span>
              </div>

              <a
                href="#daftar"
                className="mt-9 inline-block bg-white px-10 py-4 text-[11px] font-medium tracking-[0.2em] text-black transition-colors hover:bg-[hsl(0_85%_58%)] hover:text-white"
              >
                {ws === 'open' ? 'REGISTER NOW' : 'VIEW REQUIREMENTS'}
              </a>
            </div>

            <div className="lg:justify-self-end lg:border-l lg:border-white/10 lg:pl-10">
              <Countdown initialState={ws} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE — the site's existing rhythm break ══ */}
      <div className="overflow-hidden border-y border-[hsl(0_85%_58%)]/20 bg-[hsl(0_72%_45%)] py-3.5">
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="mx-5 text-[12px] font-medium tracking-[0.28em] text-white/90"
                >
                  ALL GIRL · C4 · PREMIER · BATCH 18 · FREE TO JOIN ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ DIVISIONS — asymmetric editorial rows, not equal-weight cards ══ */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-white/35">CHOOSE YOUR PATH</p>
              <h2 className="font-display mt-3 text-[clamp(2.25rem,6vw,4.5rem)] leading-none text-white">
                THREE DIVISIONS
              </h2>
            </div>
            <span className="moon-line" />
          </div>

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {DIVISIONS.map((d, i) => (
              <div
                key={d.id}
                className="grid gap-4 py-9 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-10"
              >
                <span className="text-[11px] tabular-nums tracking-[0.2em] text-white/25">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none text-white">
                    {d.name}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/50">
                    {d.blurb}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-display text-[2rem] leading-none text-[hsl(0_85%_58%)]">
                    {d.minAge}+
                  </p>
                  <p className="mt-1.5 text-[10px] tracking-[0.2em] text-white/40">
                    {d.genders.length === 1 ? 'FEMALE' : 'FEMALE & MALE'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REQUIREMENTS — numbered list, gold-standard hierarchy via scale ══ */}
      <section className="diagonal-stripe border-y border-white/10 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] tracking-[0.3em] text-white/35">WHAT WE LOOK FOR</p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] text-white">
            THREE REQUIREMENTS.
            <br />
            <span className="text-white/30">THERE IS NO FOURTH.</span>
          </h2>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-3">
            {REQUIREMENTS.map((r) => (
              <div key={r.n} className="bg-[#0a0a0a] p-7">
                <span className="font-display text-[2.5rem] leading-none text-[hsl(0_85%_58%)]/35">
                  {r.n}
                </span>
                <h3 className="mt-4 text-[13px] font-medium leading-snug tracking-[0.12em] text-white">
                  {r.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/45">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE — horizontal rail ══ */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] tracking-[0.3em] text-white/35">SELECTION PROCESS</p>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <div key={i} className="bg-[#0a0a0a] px-6 py-8">
                <p
                  className={`font-display text-[1.75rem] leading-none ${
                    t.date === 'TBA' ? 'text-white/25' : 'text-[hsl(0_85%_58%)]'
                  }`}
                >
                  {t.date}
                </p>
                <p className="mt-2.5 text-[13px] text-white/55">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-white/35">
            Training location and schedule will be announced soon.
          </p>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section id="daftar" className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] tracking-[0.3em] text-white/35">REGISTRATION FORM</p>
            <h2 className="font-display mt-3 text-[clamp(2.25rem,6vw,4rem)] leading-none text-white">
              REGISTER NOW
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              Three steps, about two minutes. Your answers are saved automatically if the page
              closes.
            </p>
          </div>
          <RecruitmentForm windowState={ws} />
        </div>
      </section>

      {/* ══ FAQ — native details, no JS needed ══ */}
      <section className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-none text-white">
            FREQUENTLY ASKED
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium text-white/85 transition-colors hover:text-white">
                  {item.q}
                  <span className="shrink-0 text-[hsl(0_85%_58%)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-8 text-[14px] leading-relaxed text-white/50">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/35">STILL UNSURE?</p>
            <p className="font-display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-white">
              ASK US DIRECTLY
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/6281324420183"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              WHATSAPP
            </a>
            <a
              href="https://instagram.com/crownallstar"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              INSTAGRAM
            </a>
            <Link
              href="/about"
              className="border border-white/15 px-7 py-3.5 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:border-[hsl(0_85%_58%)] hover:text-white"
            >
              ABOUT CROWN
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
