"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"

const philosophy = [
  {
    title: "BUILT BY MANY HANDS",
    desc: "Crown Allstar's international journey has been powered by a village — ICU sponsorships, government support through KONI, and the collective sacrifice of our athletes and families. Every trip to the world stage is proof that cheerleading in Indonesia is worth investing in.",
  },
  {
    title: "TEAM OVER EVERYTHING",
    desc: "Individual glory means nothing in cheerleading. Every stunt, every pyramid, every routine depends on total trust in your teammates. We were chosen to represent Indonesia — not as individuals, but as one team.",
  },
  {
    title: "FAIL FORWARD",
    desc: "Every fall teaches you something. From our early days in Bandung to the ICU World stage in Florida — we turned setbacks into comebacks. 16 national titles didn't come easy.",
  },
  {
    title: "REPRESENT WITH PRIDE",
    desc: "When we step on the mat, we carry the flag. Selected as Indonesia's National Team in 2012 and 2014, and continuing to represent at ICU Asian and World Championships — we prove Indonesian cheerleading belongs on the global stage.",
  },
]

export default function AboutPage() {
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
              MORE THAN<br />
              A <span className="text-[hsl(45,93%,58%)]">TEAM</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
              Crown Allstar is ICA&apos;s prototype team — born in Bandung on September 23, 2007.
              What started as a small group of passionate athletes has become one of Indonesia&apos;s
              most decorated cheerleading programs, with 16 consecutive national titles and 
              international medals on three continents.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-[hsl(0,0%,6%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 reveal">
              <div className="gold-line mb-6" />
              <h2 className="font-display text-5xl md:text-6xl text-white">
                THE<br />
                <span className="text-[hsl(45,93%,58%)]">STORY</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 reveal reveal-delay-1">
              <p className="text-white/60 text-lg leading-relaxed">
                Crown Allstar was born in Bandung, Jawa Barat — as the prototype team of the 
                Indonesian Cheer Association (ICA). From day one, the mission was clear: build 
                the most competitive cheerleading program in the country, and take it global.
              </p>
              <p className="text-white/40 leading-relaxed">
                The journey required support from every direction. ICU sponsored flights 
                and accommodation for the World Cup in 2012 and 2014. KONI stepped in to 
                help fund the Asian Championship trip to Singapore. Athletes and families 
                contributed what they could. It took a collective effort — and Crown Allstar 
                made every opportunity count.
              </p>
              <p className="text-white/40 leading-relaxed">
                We kept winning nationally — 6 consecutive titles became 10, then 14, then 16. 
                We earned bronze at the ICU Asian Championship in 2023, silver at BICO, gold 
                at APCC 2024, and were selected again for the ICU World Championship. Every 
                medal was earned through relentless training and the combined support of 
                everyone who believed in Indonesian cheerleading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="bg-[hsl(0,0%,4%)] diagonal-stripe">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              HOW WE<br />
              <span className="text-[hsl(45,93%,58%)]">THINK</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {philosophy.map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} group border border-white/5 p-10 hover:bg-white/[0.02] transition-all duration-500`}
              >
                <span className="text-[hsl(45,93%,58%)]/40 font-display text-5xl block mb-4 group-hover:text-[hsl(45,93%,58%)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-white tracking-wider mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section className="bg-[hsl(0,0%,6%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              AT A<br />
              <span className="text-[hsl(45,93%,58%)]">GLANCE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal reveal-delay-1">
            {[
              { label: "Founded", value: "September 23, 2007 — Bandung" },
              { label: "Status", value: "ICA Prototype Team — Jawa Barat" },
              { label: "National Titles", value: "16× ICANC Champion (2009–2025)" },
              { label: "National Team", value: "Selected in 2012 & 2014 (USA)" },
              { label: "ICU Asian 2023", value: "🥉 Bronze Medal" },
              { label: "BICO 2023", value: "🥈 Silver Medal" },
              { label: "ICU APCC 2024", value: "🥇 Gold Medal" },
              { label: "World Championship", value: "ICU World Cup — Florida, USA" },
              { label: "Asian Invitational", value: "3rd Place — Singapore 2015" },
              { label: "Bali Open 2015", value: "Competed" },
              { label: "Disciplines", value: "Stunts, Tumbling, Dance, Pyramids, Group Stunts" },
              { label: "Motto", value: "#CA4L — Crown Allstar for Life" },
            ].map((fact, i) => (
              <div key={i} className="flex border-b border-white/5 pb-4">
                <span className="text-white/30 text-sm w-44 shrink-0 tracking-[0.1em] uppercase">
                  {fact.label}
                </span>
                <span className="text-white/70 text-sm">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
