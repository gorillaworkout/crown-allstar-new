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
  Crown,
  Cake,
  Gift,
  HandHeart,
  Sparkles,
  Star,
  ChevronDown,
  Users,
  Medal,
} from "lucide-react"

/* ══════════════════════════════════════════════
   EVENT CONSTANTS — edit here only
   ══════════════════════════════════════════════ */
const EVENT = {
  dateISO: "2026-09-26T18:00:00+07:00",
  dateLabel: "26 September 2026",
  dayLabel: "Saturday",
  timeLabel: "6:00 PM",
  city: "Bandung",
  venue: "To be announced",
  dresscode: "Smart casual — a touch of black & gold",
  giftNote: "Bring one gift to exchange",
}

/* ══════════════════════════════════════════════
   SPARKLE FIELD
   ══════════════════════════════════════════════ */
function SparkleField({ count = 40, color = "#FFD700" }: { count?: number; color?: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        size: ((i * 7) % 3) + 1,
        left: (i * 13) % 100,
        top: (i * 17) % 100,
        delay: ((i * 0.7) % 5).toFixed(1),
        duration: ((i % 4) + 2).toFixed(1),
        opacity: (((i * 11) % 45 + 15) / 100).toFixed(2),
      })),
    [count]
  )

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full star-twinkle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: Number(p.opacity),
            backgroundColor: color,
          }}
        />
      ))}
    </>
  )
}

/* ══════════════════════════════════════════════
   COUNTDOWN — client-only to avoid hydration mismatch
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
    { label: "DAYS", value: left?.d },
    { label: "HOURS", value: left?.h },
    { label: "MINUTES", value: left?.m },
    { label: "SECONDS", value: left?.s },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {units.map((u) => (
        <div
          key={u.label}
          className="min-w-[62px] sm:min-w-[84px] border border-[#FFD700]/20 bg-black/40 backdrop-blur-sm px-2 py-3 sm:px-4 sm:py-4"
        >
          <p className="font-display text-3xl sm:text-5xl tracking-wider text-[#FFD700] tabular-nums">
            {u.value === undefined ? "—" : String(u.value).padStart(2, "0")}
          </p>
          <p className="text-white/35 text-[10px] sm:text-xs tracking-[0.25em] mt-1">{u.label}</p>
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
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      <div className="absolute inset-0 noise opacity-20" />

      <SparkleField count={44} color="#FFD700" />
      <SparkleField count={16} color="white" />

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-[#FFD700]/[0.06] rounded-full blur-[110px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 border border-[#FFD700]/25 bg-[#FFD700]/5 px-5 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="text-[#FFD700] text-[11px] sm:text-xs tracking-[0.3em] uppercase">
            You&apos;re Invited
          </span>
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider text-white leading-[0.95]"
        >
          CROWN
          <br />
          <span className="text-[#FFD700]">ANNIVERSARY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-center justify-center gap-4 mt-6 mb-8"
        >
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
          <p className="text-white/70 text-sm sm:text-base tracking-[0.2em]">
            {EVENT.dayLabel.toUpperCase()} • {EVENT.dateLabel.toUpperCase()} • {EVENT.city.toUpperCase()}
          </p>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          One night for the whole Crown family — active members, seniors, and alumni.
          We&apos;re also celebrating the arrival of <span className="text-white/80">Batch 18</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mb-4"
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
   DETAILS
   ══════════════════════════════════════════════ */
function DetailsSection() {
  const details = [
    { icon: Calendar, label: "DATE", value: "26 Sept", sub: `${EVENT.dayLabel}, 2026` },
    { icon: Clock, label: "TIME", value: EVENT.timeLabel, sub: "Doors open 30 minutes earlier" },
    { icon: MapPin, label: "LOCATION", value: EVENT.city, sub: EVENT.venue },
    { icon: Shirt, label: "DRESS CODE", value: "Black & Gold", sub: EVENT.dresscode },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[#FFD700] text-xs tracking-[0.3em] uppercase">Event Details</span>
            <Crown className="w-5 h-5 text-[#FFD700]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            ONE NIGHT, <span className="text-[#FFD700]">ONE FAMILY</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {details.map((item, i) => (
            <div
              key={item.label}
              className={`reveal reveal-delay-${i + 1} group relative border border-white/5 bg-white/[0.02] p-6 sm:p-8 hover:border-[#FFD700]/25 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <item.icon className="w-7 h-7 sm:w-8 sm:h-8 mb-5 text-[#FFD700] group-hover:scale-110 transition-transform duration-300" />
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
   MARQUEE
   ══════════════════════════════════════════════ */
function MarqueeBanner() {
  const words = ["CROWN ANNIVERSARY", "26 SEPTEMBER 2026", "BANDUNG", "BATCH 18", "BLACK & GOLD"]
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 bg-white/[0.01]">
      <div className="marquee-track whitespace-nowrap flex items-center gap-8">
        {Array.from({ length: 3 }).map((_, setIdx) =>
          words.map((w, wi) => (
            <span key={`${setIdx}-${wi}`} className="inline-flex items-center gap-8">
              <span className="font-display text-sm tracking-[0.3em] text-white/10">{w}</span>
              <Star className="w-3 h-3 text-[#FFD700]/20 fill-[#FFD700]/20" />
            </span>
          ))
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   RUNDOWN
   ══════════════════════════════════════════════ */
function RundownSection() {
  const agenda = [
    {
      icon: Medal,
      no: "01",
      title: "SPECIAL PERFORMANCE",
      by: "Batch 18",
      desc: "The debut of Crown's newest faces — their first time on stage in front of their own family.",
    },
    {
      icon: Cake,
      no: "02",
      title: "CAKE CUTTING",
      by: "Everyone",
      desc: "Candles, cake, and one frame with active members, seniors, and alumni all together.",
    },
    {
      icon: Gift,
      no: "03",
      title: "GIFT EXCHANGE",
      by: "All guests",
      desc: `${EVENT.giftNote}. No names on them, shuffled on the spot, opened together.`,
    },
    {
      icon: HandHeart,
      no: "04",
      title: "PRAYER TOGETHER",
      by: "Closing",
      desc: "We close the night with a prayer for Crown — for those who moved on, and those just starting.",
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 diagonal-stripe" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[#FFD700] text-xs tracking-[0.3em] uppercase">Rundown</span>
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            THE <span className="text-[#FFD700]">AGENDA</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="space-y-4">
          {agenda.map((item, i) => (
            <div
              key={item.no}
              className={`reveal reveal-delay-${(i % 4) + 1} group relative border border-white/5 bg-black/40 p-6 sm:p-8 hover:border-[#FFD700]/25 transition-all duration-500`}
            >
              <div className="flex items-start gap-5 sm:gap-8">
                <div className="shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#FFD700]/20 bg-[#FFD700]/5 flex items-center justify-center group-hover:bg-[#FFD700]/10 transition-colors duration-300">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
                  </div>
                  <p className="font-display text-xs tracking-[0.2em] text-white/20 text-center mt-2">{item.no}</p>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-display text-lg sm:text-2xl tracking-wider text-white">{item.title}</h3>
                    <span className="text-[#FFD700]/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase border border-[#FFD700]/20 px-2 py-1">
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
      desc: "Every division — Premier, All Girl, C4, and Batch 18. Come as a full squad; this is your house.",
    },
    {
      icon: Crown,
      title: "SENIORS & ALUMNI",
      desc: "Anyone who ever wore the Crown uniform, whatever the batch. The door is always open — come home to Bandung.",
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            WHO&apos;S <span className="text-[#FFD700]">INVITED</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guests.map((g, i) => (
            <div
              key={g.title}
              className={`reveal reveal-delay-${i + 1} group relative border border-white/5 p-8 sm:p-10 hover:border-[#FFD700]/25 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 border border-[#FFD700]/20 bg-[#FFD700]/5 flex items-center justify-center mb-6">
                  <g.icon className="w-6 h-6 text-[#FFD700]" />
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
    { src: "/crown-team-2026-1.jpg", alt: "Crown Allstar team 2026" },
    { src: "/crown-team-2026-2.jpg", alt: "Crown Allstar 2026 togetherness" },
    { src: "/crown-team-2026-3.jpg", alt: "Crown Allstar squad 2026" },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 bg-black" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-[#FFD700] text-xs tracking-[0.3em] uppercase">The Crown Family</span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white mt-4 mb-4">
            FACES OF <span className="text-[#FFD700]">CROWN 2026</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`reveal reveal-delay-${i + 1} relative aspect-[4/5] border border-white/5 overflow-hidden`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>

        <p className="reveal text-center text-white/25 text-xs tracking-[0.2em] mt-6">CROWN FAMILY 2026</p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CLOSING
   ══════════════════════════════════════════════ */
function ClosingSection() {
  return (
    <section className="relative py-28 sm:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d0b02] to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#FFD700]/[0.04] rounded-full blur-[120px] mystery-pulse" />
      <SparkleField count={24} color="#FFD700" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl tracking-wider text-white mb-6"
        >
          SEE YOU <span className="text-[#FFD700]">THERE</span>
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

        <div className="flex items-center justify-center gap-4 mt-14">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#FFD700]/25" />
          <Crown className="w-5 h-5 text-[#FFD700]/40" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#FFD700]/25" />
        </div>
        <p className="font-display text-sm tracking-[0.3em] text-white/20 mt-6">CROWN ALLSTAR • BANDUNG</p>
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
