"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"

const timeline = [
  {
    year: "2008",
    title: "The Beginning",
    desc: "Crown Allstar was founded on September 23 in Bandung, Jawa Barat — as the prototype team of the Indonesian Cheer Association (ICA). A small group of passionate cheerleaders with one dream: build something that lasts.",
  },
  {
    year: "2009",
    title: "First National Title",
    desc: "Crown Allstar won its first ICANC National Championship — the spark that ignited a dynasty. What followed would be the longest winning streak in Indonesian cheerleading history.",
  },
  {
    year: "2012",
    title: "First International Stage",
    desc: "Selected as Indonesia's National Team, Crown Allstar traveled to the USA for the ICU World Cup Cheerleading — made possible through ICU sponsorship and the support of everyone who believed in the team.",
  },
  {
    year: "2014",
    title: "Back to the World Stage",
    desc: "Once again chosen to represent Indonesia at the World Cup Cheerleading in Florida, USA. Coach Dian Anggraini led the team with ICU backing. Crown Allstar was proving that Indonesian cheerleading belongs on the global stage. 6 consecutive national titles and counting.",
  },
  {
    year: "2015",
    title: "Asian & Regional Expansion",
    desc: "3rd Place at the Asian Cheerleading Invitational Championship in Singapore — with support from KONI. Crown Allstar also competed at the Bali Open 2015. The team was making its mark beyond Indonesia's borders.",
  },
  {
    year: "2016–2022",
    title: "The Unstoppable Streak",
    desc: "Year after year, the ICANC National Championship title stayed in Bandung. Crown Allstar became the most feared name in Indonesian cheerleading — the benchmark every team measured themselves against.",
  },
  {
    year: "2023",
    title: "International Medal Haul",
    desc: "A breakthrough year on the world stage. Bronze medal (🥉) at the ICU Asian Cheerleading Championship. Silver medal (🥈) at BICO. Crown Allstar proved that Indonesia's best can hang with Asia's elite — and win hardware doing it.",
  },
  {
    year: "2024",
    title: "Gold Medal — ICU APCC",
    desc: "Gold medal (🥇) at ICU APCC 2024 — the Asia Pacific Cheerleading Championship. The 14th consecutive ICANC national title. Road to ICANC 2024 — #CA4L. The crown keeps getting heavier, but we keep wearing it.",
  },
  {
    year: "2025",
    title: "16× and the World Awaits",
    desc: "The 16th consecutive ICANC National Championship — an almost unbelievable record. Crown Allstar selected to represent Indonesia at the ICU World Cheerleading Championship at ESPN Wide World of Sports Complex, Orlando, Florida.",
  },
  {
    year: "NEXT",
    title: "The Crown Era Continues",
    desc: "The world is watching. From a small team in Bandung, backed by ICU, KONI, and the unwavering dedication of athletes and families — to the global stage in Orlando. 17 years of proving that passion, discipline, and community can take you anywhere. This is Crown Allstar.",
  },
]

export default function HistoryPage() {
  useReveal()

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-overlay opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="max-w-3xl reveal">
            <div className="gold-line mb-6" />
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white mb-6">
              OUR<br />
              <span className="text-[hsl(45,93%,58%)]">JOURNEY</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
              From a small team in Bandung to the ICU World Championship in Florida.
              17 years. 16 national titles. Backed by ICU, KONI, and an army of believers.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-[hsl(0,0%,4%)]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-32">
          <div className="relative">
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[hsl(45,93%,58%)]/50 via-white/10 to-transparent" />

            <div className="space-y-0">
              {timeline.map((event, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${(i % 4) + 1} relative pl-10 md:pl-24 pb-20 last:pb-0 group`}
                >
                  <div className="absolute left-0 md:left-8 top-2 w-2.5 h-2.5 -translate-x-[calc(50%-0.5px)] bg-[hsl(0,0%,4%)] border-2 border-[hsl(45,93%,58%)]/50 group-hover:border-[hsl(45,93%,58%)] group-hover:bg-[hsl(45,93%,58%)]/20 transition-all duration-500" />

                  <div className="mb-4">
                    <span className="text-[11px] tracking-[0.3em] text-[hsl(45,93%,58%)] font-medium">
                      {event.year}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white mb-4 tracking-wider">
                    {event.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed max-w-xl">
                    {event.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEGACY QUOTE ── */}
      <section className="bg-[hsl(0,0%,6%)] diagonal-stripe">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-32 text-center">
          <div className="reveal">
            <span className="font-display text-8xl md:text-9xl text-[hsl(45,93%,58%)]/10 block mb-6">
              ★
            </span>
            <blockquote className="font-display text-3xl md:text-5xl text-white leading-tight mb-8">
              &ldquo;THE CROWN ISN&apos;T GIVEN.<br />
              <span className="text-[hsl(45,93%,58%)]">IT&apos;S EARNED.</span>&rdquo;
            </blockquote>
            <p className="text-white/30 text-sm tracking-[0.2em]">
              #CA4L — CROWN ALLSTAR FOR LIFE
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
