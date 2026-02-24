"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"

const stats = [
  { number: "2007", label: "Established" },
  { number: "17+", label: "Years Competing" },
  { number: "16×", label: "National Champion" },
  { number: "3.9K", label: "Followers" },
]

const achievements = [
  {
    emoji: "🏆",
    title: "ICANC NATIONAL CHAMPION",
    detail: "16× consecutive — 2009 to 2025",
  },
  {
    emoji: "🥇",
    title: "ICU APCC 2024",
    detail: "Gold Medal — Asia Pacific Cheerleading Championship",
  },
  {
    emoji: "🥉",
    title: "ICU ASIAN CHEER CHAMPIONSHIP",
    detail: "Bronze Medal — 2023, representing Indonesia",
  },
  {
    emoji: "🥈",
    title: "BICO 2023",
    detail: "Silver Medal — Bandung International Cheerleading Open",
  },
  {
    emoji: "🌏",
    title: "ICU WORLD CHAMPIONSHIP",
    detail: "Represented Indonesia in Florida, USA",
  },
  {
    emoji: "🇮🇩",
    title: "ICA JAWA BARAT",
    detail: "Official member of Indonesian Cheerleading Association",
  },
]

const values = [
  {
    num: "01",
    title: "DISCIPLINE",
    desc: "Every great routine starts with showing up. We train hard, we train smart, and we never cut corners. 17 years of consistency — that's not luck, that's discipline.",
  },
  {
    num: "02",
    title: "TRUST",
    desc: "When you're in the air, you trust your bases with your life. That trust is built in every single practice. From group stunts to pyramids — we move as one.",
  },
  {
    num: "03",
    title: "GRIT",
    desc: "Falls happen. Bruises happen. Champions get back up. We went from a small Bandung team to representing Indonesia on the world stage. We don't quit — we reload.",
  },
]

const marqueeText = "STUNTS • TUMBLING • DANCE • PYRAMIDS • TOSSES • BASKETS • MOTIONS • GROUP STUNTS • "

export default function Home() {
  useReveal()

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        {/* Vertical Side Text */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="text-[11px] tracking-[0.3em] text-white/20 [writing-mode:vertical-lr] rotate-180">
            CROWN ALLSTAR CHEERLEADING — EST. 2007 BANDUNG
          </p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
          <div className="mb-8">
            <Image
              src="/logo-crown.png"
              alt="Crown Allstar Logo"
              width={140}
              height={140}
              className="mx-auto"
              priority
            />
          </div>

          <div className="mb-6">
            <span className="inline-block text-[13px] tracking-[0.3em] text-[hsl(45,93%,58%)] font-medium border border-[hsl(45,93%,58%)]/20 px-5 py-2">
              16× NATIONAL CHAMPION • EST. 2007
            </span>
          </div>

          <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-white mb-8">
            WE DON&apos;T<br />
            <span className="text-[hsl(45,93%,58%)]">CHEER</span> FROM<br />
            THE SIDELINES
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
            From Bandung to the world stage. Crown Allstar builds athletes
            who fly higher, hit harder, and represent Indonesia with pride.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-[hsl(45,93%,58%)] text-black text-[13px] font-semibold tracking-[0.15em] hover:bg-[hsl(45,93%,68%)] transition-all duration-300"
            >
              JOIN THE TEAM
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white text-[13px] font-medium tracking-[0.15em] hover:border-white/50 transition-all duration-300"
            >
              OUR STORY
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] text-white/20">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent scroll-indicator" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[hsl(45,93%,58%)] py-4 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl text-black/80 mx-4">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="bg-[hsl(0,0%,4%)] relative noise">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} text-center md:text-left`}>
                <div className="stat-number">{stat.number}</div>
                <p className="text-white/40 text-sm tracking-[0.1em] mt-2 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="bg-[hsl(0,0%,6%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              MEDAL<br />
              <span className="text-[hsl(45,93%,58%)]">CABINET</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-white/10">
            {achievements.map((a, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} group border-b border-r border-white/10 p-8 hover:bg-white/[0.02] transition-colors duration-500`}
              >
                <span className="text-4xl block mb-4">{a.emoji}</span>
                <h3 className="font-display text-lg text-white tracking-wider mb-2">
                  {a.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[hsl(0,0%,4%)] diagonal-stripe">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="mb-20 reveal">
            <div className="gold-line mb-6" />
            <h2 className="font-display text-5xl md:text-7xl text-white">
              WHAT WE<br />
              <span className="text-[hsl(45,93%,58%)]">STAND FOR</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
            {values.map((v, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} group border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500`}
              >
                <span className="text-[hsl(45,93%,58%)]/50 font-display text-6xl block mb-6 group-hover:text-[hsl(45,93%,58%)] transition-colors duration-500">
                  {v.num}
                </span>
                <h3 className="font-display text-2xl text-white mb-4 tracking-wider">
                  {v.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="bg-[hsl(0,0%,6%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32 reveal">
              <div className="gold-line mb-6" />
              <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
                OUR<br />
                <span className="text-[hsl(45,93%,58%)]">PROGRAMS</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-md">
                From first-timers to competition veterans — we have a spot for every
                athlete ready to put in the work. All programs train in Bandung.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "COED PARTNER STUNT",
                  tag: "Partner",
                  desc: "One-on-one stunt pairs — the foundation of elite cheerleading. Precision, timing, and absolute trust between base and flyer.",
                },
                {
                  name: "GROUP STUNT COED ELITE",
                  tag: "Elite",
                  desc: "Elite-level coed group stunts. The highest difficulty, the tightest execution. This is where national champions are forged.",
                },
                {
                  name: "GROUP STUNT COED PREMIER",
                  tag: "Premier",
                  desc: "Premier division coed group stunts — top-tier difficulty with competition-ready choreography and flawless transitions.",
                },
                {
                  name: "GROUP STUNT ALL GIRL PREMIER",
                  tag: "Premier",
                  desc: "All-girl premier group stunts — proving that power and precision know no gender. Some of our most decorated routines.",
                },
                {
                  name: "COED ADVANCED (LV4)",
                  tag: "Level 4",
                  desc: "Advanced coed division for athletes building toward elite. Level 4 skills with structured progression and competition experience.",
                },
                {
                  name: "ALL GIRL ADVANCED (LV4)",
                  tag: "Level 4",
                  desc: "Advanced all-girl division. Level 4 stunts and tumbling with a focus on technical development and team chemistry.",
                },
                {
                  name: "COED ELITE DIVISION",
                  tag: "Elite",
                  desc: "Full team coed elite — the complete package. Stunts, pyramids, tumbling, dance, and jumps at the highest competitive level.",
                },
                {
                  name: "ALL GIRL ELITE DIVISION",
                  tag: "Elite",
                  desc: "Full team all-girl elite. Power, grace, and unmatched team synchronization. Crown Allstar's all-girl squads are built different.",
                },
                {
                  name: "COED PREMIER DIVISION",
                  tag: "Premier",
                  desc: "The flagship coed division — representing Crown Allstar at national and international championships. 16× ICANC champions.",
                },
                {
                  name: "CHEER POM FREESTYLE",
                  tag: "Performance",
                  desc: "Where artistry meets athleticism. Pom freestyle combines dance, expression, and crowd energy into a high-impact performance routine.",
                },
              ].map((program, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1} group border border-white/10 p-8 hover:border-[hsl(45,93%,58%)]/30 transition-all duration-500`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-xl text-white tracking-wider group-hover:text-[hsl(45,93%,58%)] transition-colors">
                      {program.name}
                    </h3>
                    <span className="text-[11px] tracking-[0.2em] text-white/30 border border-white/10 px-3 py-1 shrink-0 ml-4">
                      {program.tag}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {program.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(45,93%,58%)]" />
        <div className="absolute inset-0 diagonal-stripe opacity-30" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-24 text-center">
          <div className="reveal">
            <h2 className="font-display text-5xl md:text-7xl text-black mb-6">
              READY TO FLY?
            </h2>
            <p className="text-black/60 text-lg mb-10 max-w-lg mx-auto">
              We&apos;re always looking for athletes who are hungry to compete.
              No experience needed — just heart and commitment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 bg-black text-[hsl(45,93%,58%)] text-[13px] font-semibold tracking-[0.15em] hover:bg-black/80 transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
