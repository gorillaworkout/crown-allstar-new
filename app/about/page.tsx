"use client"

import Image from "next/image"
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

const gallery = [
  {
    src: "/crown-allgirl-2025.jpg",
    alt: "Crown All Girl Advanced 2025",
    title: "ALL GIRL ADVANCED",
    subtitle: "Season 2025",
    span: "tall" as const,
  },
  {
    src: "/crown-coed-2025.jpg",
    alt: "Crown Coed Premier 2025",
    title: "COED PREMIER",
    subtitle: "Season 2025",
    span: "tall" as const,
  },
  {
    src: "/crown-gold-bangkok-2025.jpg",
    alt: "Crown Gold Medal Bangkok 2025",
    title: "🥇 GOLD MEDAL",
    subtitle: "International Cheer Challenge 2025 — Bangkok, Thailand",
    span: "normal" as const,
  },
  {
    src: "/crown-icu-asian-2025.jpg",
    alt: "ICU Asian Championship 2025",
    title: "🇮🇩 INDONESIA JUARA",
    subtitle: "ICU Asian Championship & Int'l Cheer Challenge 2025",
    span: "normal" as const,
  },
  {
    src: "/crown-bico-2023-stunt.jpg",
    alt: "BICO 2023 Group Stunt",
    title: "🥈 SILVER MEDAL",
    subtitle: "BICO 2023 — Group Stunt Senior Coed Premier",
    span: "normal" as const,
  },
  {
    src: "/crown-bico-2023-team.jpg",
    alt: "Crown Allstar BICO 2023",
    title: "ASIAN CHEERLEADING CHAMPIONSHIP",
    subtitle: "Bali International Cheer Open 2023",
    span: "wide" as const,
  },
]

const videos = [
  {
    id: "dRrf_S37isU",
    title: "ACIC 2018 — Group Stunt Open Coed Premier",
    tag: "🏆 International",
  },
  {
    id: "V2w9tCodHQg",
    title: "ACIC 2015 — Cheer Open Coed Premier",
    tag: "🏆 International",
  },
  {
    id: "kHSsCC41kV4",
    title: "Pada Ngobrol — \"Cheerleader itu awalnya buat cowok!\"",
    tag: "📺 Media Feature",
  },
  {
    id: "utxEGzsMZOM",
    title: "Family 100 — Crown Allstar Bawa Pulang 15 Juta!",
    tag: "📺 TV Appearance",
  },
  {
    id: "HXqQVQGFS3U",
    title: "Family 100 — Crown Allstar",
    tag: "📺 TV Appearance",
  },
  {
    id: "1O9iV4ByH3s",
    title: "BROWNIS — Crown Allstar Super Kompak!",
    tag: "📺 TV Appearance",
  },
  {
    id: "-PO2nPyZKOc",
    title: "EXSPORT × CROWN Cheerleaders",
    tag: "🤝 Sponsorship",
  },
  {
    id: "8Daw-IJfalI",
    title: "Exsport Bags × Crown Allstar",
    tag: "🤝 Sponsorship",
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
              Crown Allstar is ICA&apos;s prototype team — born in Bandung on September 23, 2008.
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
                at APCC 2024, gold at International Cheer Challenge 2025 in Bangkok, and were 
                selected again for the ICU World Championship. Every medal was earned through 
                relentless training and the combined support of everyone who believed in 
                Indonesian cheerleading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              OUR<br />
              <span className="text-[hsl(45,93%,58%)]">ATHLETES</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg">
              Competition highlights and team rosters — the faces behind Indonesia&apos;s cheerleading dynasty.
            </p>
          </div>

          {/* Team photos — large duo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 reveal reveal-delay-1">
            {gallery.filter(g => g.span === "tall").map((item, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement photos — triple grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 reveal reveal-delay-2">
            {gallery.filter(g => g.span === "normal").map((item, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="font-display text-lg text-[hsl(45,93%,58%)] tracking-wider">
                    {item.title}
                  </span>
                  <p className="text-white/50 text-xs mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wide team photo */}
          {gallery.filter(g => g.span === "wide").map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer reveal reveal-delay-3">
              <Image
                src={item.src}
                alt={item.alt}
                width={1400}
                height={700}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h3 className="font-display text-2xl md:text-4xl text-white tracking-wider">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="bg-[hsl(0,0%,4%)] diagonal-stripe">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              WATCH<br />
              <span className="text-[hsl(45,93%,58%)]">US</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg">
              Competitions, TV appearances, and brand collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <div
                key={video.id}
                className={`reveal reveal-delay-${(i % 4) + 1} group rounded-2xl overflow-hidden border border-white/5 hover:border-[hsl(45,93%,58%)]/20 transition-colors duration-500 bg-white/[0.02]`}
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg text-white tracking-wider leading-tight">
                    {video.title}
                  </h4>
                  <span className="text-white/30 text-xs tracking-[0.15em] uppercase mt-2 block">
                    {video.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="bg-[hsl(0,0%,4%)]">
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
              { label: "Founded", value: "September 23, 2008 — Bandung" },
              { label: "Status", value: "ICA Prototype Team — Jawa Barat" },
              { label: "National Titles", value: "16× ICANC Champion (2009–2025)" },
              { label: "National Team", value: "Selected in 2012 & 2014 (USA)" },
              { label: "ICC Bangkok 2025", value: "🥇 Gold Medal — Group Stunt AG Advanced" },
              { label: "ICU APCC 2024", value: "🥇 Gold Medal" },
              { label: "ICU Asian 2023", value: "🥉 Bronze Medal" },
              { label: "BICO 2023", value: "🥈 Silver Medal" },
              { label: "World Championship", value: "ICU World Cup — Florida, USA" },
              { label: "Asian Invitational", value: "3rd Place — Singapore 2015" },
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
