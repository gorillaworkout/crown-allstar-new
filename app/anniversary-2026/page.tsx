"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WishWall from "@/components/wish-wall"
import { useReveal } from "@/hooks/use-reveal"
import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Clock,
  Shirt,
  Cake,
  Gift,
  HandHeart,
  Flag,
  Trophy,
  Timer,
  ChevronDown,
  Users,
  Crown,
} from "lucide-react"

/* ══════════════════════════════════════════════
   EVENT CONSTANTS — edit here only
   ══════════════════════════════════════════════ */
const EVENT = {
  edition: "19th",
  theme: "RAC1N9 for More",
  tagline: "Terus berpacu untuk lebih baik",
  dateISO: "2026-09-26T18:00:00+07:00",
  dateLabel: "26 September 2026",
  dayLabel: "Saturday",
  timeLabel: "6:00 PM",
  city: "Bandung",
  venue: "To be announced",
  dresscode: "Any Crown tee — colour is up to you",
  giftNote: "Bring one gift to exchange",
}

/* Racing palette: F1 red, white, racing blue. */
const RED = "#E10600"
const BLUE = "#0038A8"

/* ══════════════════════════════════════════════
   SPEED LINES — replaces the old sparkle field
   ══════════════════════════════════════════════ */
function SpeedLines({ count = 18 }: { count?: number }) {
  const lines = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        top: (i * 5.5) % 100,
        width: 60 + ((i * 37) % 180),
        delay: ((i * 0.43) % 6).toFixed(2),
        duration: (1.6 + ((i * 13) % 22) / 10).toFixed(2),
        color: i % 3 === 0 ? RED : i % 3 === 1 ? "#ffffff" : BLUE,
        opacity: i % 3 === 1 ? 0.28 : 0.5,
      })),
    [count]
  )

  return (
    <>
      {lines.map((l, i) => (
        <span
          key={i}
          className="speed-line"
          style={{
            top: `${l.top}%`,
            left: "-20%",
            width: `${l.width}px`,
            background: `linear-gradient(90deg, transparent, ${l.color})`,
            opacity: l.opacity,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
          }}
        />
      ))}
    </>
  )
}

/* ══════════════════════════════════════════════
   COUNTDOWN — pit-board style, client-only
   ══════════════════════════════════════════════ */
function Countdown() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null)

  useEffect(() => {
    const target = new Date(EVENT.dateISO).getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: "DAYS", value: left?.d, accent: RED },
    { label: "HOURS", value: left?.h, accent: "#ffffff" },
    { label: "MINUTES", value: left?.m, accent: BLUE },
    { label: "SECONDS", value: left?.s, accent: RED },
  ]

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className="min-w-[62px] sm:min-w-[88px] bg-black/70 backdrop-blur-sm border border-white/10 overflow-hidden"
        >
          <div className="h-[3px]" style={{ backgroundColor: u.accent }} />
          <div className="px-2 py-3 sm:px-4 sm:py-4">
            <p className="font-display text-3xl sm:text-5xl tracking-wider text-white tabular-nums">
              {u.value === undefined ? "—" : String(u.value).padStart(2, "0")}
            </p>
            <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.25em] mt-1">{u.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <Image
        src="/crown-team-2026-1.jpg"
        alt="Crown Allstar team 2026 together"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105 blur-[2px]"
      />
      {/* Red → blue wash instead of the old plain black. */}
      <div className="absolute inset-0 bg-black/72" />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${RED}38 0%, transparent 42%, transparent 58%, ${BLUE}44 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className="absolute inset-0 noise opacity-20" />

      <SpeedLines count={20} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 border border-white/20 bg-black/50 backdrop-blur-sm px-5 py-2 mb-8"
        >
          <Flag className="w-4 h-4" style={{ color: RED }} />
          <span className="text-white/85 text-[11px] sm:text-xs tracking-[0.3em] uppercase">
            {EVENT.edition} Anniversary
          </span>
          <Flag className="w-4 h-4" style={{ color: BLUE }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider text-white leading-[0.95]"
        >
          <span style={{ color: RED }}>RAC1N9</span> FOR
          <br />
          <span style={{ color: "#8FB0FF" }}>MORE</span>
        </motion.h1>

        {/* Racing stripe under the title — the theme in one element. */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="racing-stripe h-1.5 w-40 sm:w-56 mx-auto mt-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 text-sm sm:text-base italic mt-5"
        >
          &ldquo;{EVENT.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-6 mb-8"
        >
          <div className="h-[1px] w-8 sm:w-14" style={{ background: `linear-gradient(90deg, transparent, ${RED})` }} />
          <p className="text-white/75 text-sm sm:text-base tracking-[0.2em]">
            {EVENT.dayLabel.toUpperCase()} • {EVENT.dateLabel.toUpperCase()} • {EVENT.city.toUpperCase()}
          </p>
          <div className="h-[1px] w-8 sm:w-14" style={{ background: `linear-gradient(270deg, transparent, ${BLUE})` }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nineteen years on the mat, and we&apos;re still pushing. One night for the whole
          Crown family — members, seniors, and alumni — plus the debut of{" "}
          <span className="text-white/80">Batch 18</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Countdown />
        </motion.div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator">
            <ChevronDown className="w-6 h-6 text-white/30" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DETAILS — pit-lane cards
   ══════════════════════════════════════════════ */
function DetailsSection() {
  const details = [
    { icon: Calendar, label: "RACE DAY", value: "26 Sept", sub: `${EVENT.dayLabel}, 2026`, accent: RED },
    { icon: Clock, label: "LIGHTS OUT", value: EVENT.timeLabel, sub: "Doors open 30 minutes earlier", accent: "#ffffff" },
    { icon: MapPin, label: "CIRCUIT", value: EVENT.city, sub: EVENT.venue, accent: BLUE },
    { icon: Shirt, label: "TEAM KIT", value: "Crown Tee", sub: EVENT.dresscode, accent: RED },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0206] to-[#02060f]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Timer className="w-5 h-5" style={{ color: RED }} />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Race Briefing</span>
            <Timer className="w-5 h-5" style={{ color: BLUE }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            ON YOUR <span style={{ color: RED }}>MARKS</span>
          </h2>
          <div className="racing-stripe h-1 w-28 mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {details.map((item, i) => (
            <div
              key={item.label}
              className={`reveal reveal-delay-${i + 1} group relative border border-white/8 bg-white/[0.02] overflow-hidden hover:border-white/25 transition-all duration-500`}
            >
              <div className="h-[3px]" style={{ backgroundColor: item.accent }} />
              <div className="p-6 sm:p-8">
                <item.icon
                  className="w-7 h-7 sm:w-8 sm:h-8 mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: item.accent }}
                />
                <p className="text-white/30 text-[10px] sm:text-xs tracking-[0.2em] mb-2">{item.label}</p>
                <p className="font-display text-xl sm:text-2xl tracking-wider text-white mb-1">{item.value}</p>
                <p className="text-white/40 text-xs sm:text-sm">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CHECKERED MARQUEE
   ══════════════════════════════════════════════ */
function MarqueeBanner() {
  const words = ["RAC1N9 FOR MORE", "19TH ANNIVERSARY", "26 SEPTEMBER 2026", "BANDUNG", "WEAR YOUR CROWN TEE"]
  return (
    <div className="relative overflow-hidden">
      <div className="checker-strip h-3 opacity-60" />
      <div className="border-y border-white/5 py-4 bg-white/[0.01]">
        <div className="marquee-track whitespace-nowrap flex items-center gap-8">
          {Array.from({ length: 3 }).map((_, setIdx) =>
            words.map((w, wi) => (
              <span key={`${setIdx}-${wi}`} className="inline-flex items-center gap-8">
                <span className="font-display text-sm tracking-[0.3em] text-white/12">{w}</span>
                <Flag className="w-3 h-3" style={{ color: wi % 2 ? `${BLUE}55` : `${RED}55` }} />
              </span>
            ))
          )}
        </div>
      </div>
      <div className="checker-strip h-3 opacity-60" />
    </div>
  )
}

/* ══════════════════════════════════════════════
   RUNDOWN — race stages
   ══════════════════════════════════════════════ */
function RundownSection() {
  const agenda = [
    {
      icon: Trophy,
      lap: "LAP 1",
      title: "SPECIAL PERFORMANCE",
      by: "Batch 18",
      accent: RED,
      desc: "The debut of Crown's newest faces — their first time on stage in front of their own family.",
    },
    {
      icon: Cake,
      lap: "LAP 2",
      title: "CAKE CUTTING",
      by: "Everyone",
      accent: "#ffffff",
      desc: "Nineteen candles, one cake, and a frame with members, seniors, and alumni all together.",
    },
    {
      icon: Gift,
      lap: "LAP 3",
      title: "GIFT EXCHANGE",
      by: "All guests",
      accent: BLUE,
      desc: `${EVENT.giftNote}. No names on them, shuffled on the spot, opened together.`,
    },
    {
      icon: HandHeart,
      lap: "FINISH",
      title: "PRAYER TOGETHER",
      by: "Closing",
      accent: RED,
      desc: "We close the night with a prayer for Crown — for those who moved on, and those just starting.",
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#02060f] via-black to-[#0a0206]" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flag className="w-5 h-5" style={{ color: RED }} />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Race Order</span>
            <Flag className="w-5 h-5" style={{ color: BLUE }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            THE <span style={{ color: "#8FB0FF" }}>GRID</span>
          </h2>
          <div className="racing-stripe h-1 w-28 mx-auto" />
        </div>

        <div className="space-y-4">
          {agenda.map((item, i) => (
            <div
              key={item.lap}
              className={`reveal reveal-delay-${(i % 4) + 1} group relative border border-white/8 bg-black/50 overflow-hidden hover:border-white/25 transition-all duration-500`}
            >
              {/* left accent bar = lap colour */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: item.accent }} />
              <div className="flex items-start gap-5 sm:gap-8 p-6 sm:p-8 pl-7 sm:pl-10">
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 border flex items-center justify-center transition-colors duration-300"
                    style={{ borderColor: `${item.accent}44`, backgroundColor: `${item.accent}0F` }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.accent }} />
                  </div>
                  <p className="font-display text-[10px] sm:text-xs tracking-[0.2em] text-white/25 text-center mt-2">
                    {item.lap}
                  </p>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-display text-lg sm:text-2xl tracking-wider text-white">{item.title}</h3>
                    <span
                      className="text-[10px] sm:text-xs tracking-[0.2em] uppercase border px-2 py-1"
                      style={{ color: `${item.accent}CC`, borderColor: `${item.accent}33` }}
                    >
                      {item.by}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-white/25 text-xs tracking-wider mt-8">
          The running order may shift slightly on the night.
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   GUESTS
   ══════════════════════════════════════════════ */
function GuestsSection() {
  const guests = [
    {
      icon: Users,
      title: "ACTIVE MEMBERS",
      accent: RED,
      desc: "Every division — Premier, All Girl, C4, and Batch 18. Come as a full squad; this is your house.",
    },
    {
      icon: Crown,
      title: "SENIORS & ALUMNI",
      accent: BLUE,
      desc: "Anyone who ever wore the Crown uniform, whatever the batch. The door is always open — come home to Bandung.",
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0206] via-black to-[#02060f]" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            ON THE <span style={{ color: RED }}>GRID</span>
          </h2>
          <div className="racing-stripe h-1 w-28 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guests.map((g, i) => (
            <div
              key={g.title}
              className={`reveal reveal-delay-${i + 1} group relative border border-white/8 overflow-hidden hover:border-white/25 transition-all duration-500`}
            >
              <div className="h-[3px]" style={{ backgroundColor: g.accent }} />
              <div className="p-8 sm:p-10">
                <div
                  className="w-14 h-14 border flex items-center justify-center mb-6"
                  style={{ borderColor: `${g.accent}44`, backgroundColor: `${g.accent}0F` }}
                >
                  <g.icon className="w-6 h-6" style={{ color: g.accent }} />
                </div>
                <h3 className="font-display text-xl sm:text-2xl tracking-wider text-white mb-3">{g.title}</h3>
                <p className="text-white/40 text-sm sm:text-base leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════════ */
function GallerySection() {
  const photos = [
    { src: "/crown-team-2026-1.jpg", alt: "Crown Allstar team 2026", accent: RED },
    { src: "/crown-team-2026-2.jpg", alt: "Crown Allstar 2026 togetherness", accent: "#ffffff" },
    { src: "/crown-team-2026-3.jpg", alt: "Crown Allstar squad 2026", accent: BLUE },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-black" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-white/55 text-xs tracking-[0.3em] uppercase">The Crown Grid</span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white mt-4 mb-4">
            FACES OF <span style={{ color: "#8FB0FF" }}>CROWN 2026</span>
          </h2>
          <div className="racing-stripe h-1 w-28 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`reveal reveal-delay-${i + 1} relative aspect-[4/5] border border-white/8 overflow-hidden`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: p.accent }} />
            </div>
          ))}
        </div>

        <p className="reveal text-center text-white/25 text-xs tracking-[0.2em] mt-6">CROWN FAMILY 2026</p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CLOSING — chequered flag
   ══════════════════════════════════════════════ */
function ClosingSection() {
  return (
    <section className="relative py-28 sm:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 30% 40%, ${RED}22, transparent 55%), radial-gradient(circle at 70% 60%, ${BLUE}26, transparent 55%)` }}
      />
      <SpeedLines count={12} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl tracking-wider text-white mb-6"
        >
          SEE YOU AT THE <span style={{ color: RED }}>GRID</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/45 text-base sm:text-lg"
        >
          {EVENT.dayLabel}, {EVENT.dateLabel} — {EVENT.city}. Bring a gift, bring your voice.
        </motion.p>

        <div className="checker-strip h-4 w-48 mx-auto mt-12 opacity-70" />
        <p className="font-display text-sm tracking-[0.3em] text-white/25 mt-6">
          CROWN ALLSTAR • {EVENT.edition} ANNIVERSARY
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════ */
export default function Anniversary2026Page() {
  useReveal()

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DetailsSection />
        <MarqueeBanner />
        <RundownSection />
        <GuestsSection />
        <WishWall />
        <GallerySection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  )
}
