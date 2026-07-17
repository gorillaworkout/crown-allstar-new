"use client"

import { useRef, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Star,
  ChevronDown,
  Users,
  Music,
  Camera,
  TreePine,
  Tent,
  Gamepad2,
  Mountain,
  Eye,
  Flame,
  Wand2,
} from "lucide-react"

/* ══════════════════════════════════════════════
   SPARKLE FIELD (reusable floating particles)
   ══════════════════════════════════════════════ */
function SparkleField({ count = 50, color = "white" }: { count?: number; color?: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        size: ((i * 7) % 3) + 1,
        left: (i * 13) % 100,
        top: (i * 17) % 100,
        delay: ((i * 0.7) % 5).toFixed(1),
        duration: ((i % 4) + 2).toFixed(1),
        opacity: (((i * 11) % 50 + 10) / 100).toFixed(2),
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
   CASTLE SILHOUETTE (SVG)
   ══════════════════════════════════════════════ */
function CastleSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main tower left */}
      <rect x="140" y="80" width="30" height="220" fill="currentColor" opacity="0.08" />
      <polygon points="155,30 140,80 170,80" fill="currentColor" opacity="0.1" />
      {/* Main tower right */}
      <rect x="630" y="80" width="30" height="220" fill="currentColor" opacity="0.08" />
      <polygon points="645,30 630,80 660,80" fill="currentColor" opacity="0.1" />
      {/* Center tower */}
      <rect x="370" y="50" width="60" height="250" fill="currentColor" opacity="0.08" />
      <polygon points="400,0 370,50 430,50" fill="currentColor" opacity="0.12" />
      {/* Star on top */}
      <circle cx="400" cy="-5" r="6" fill="currentColor" opacity="0.15" />
      {/* Left wing */}
      <rect x="170" y="140" width="200" height="160" fill="currentColor" opacity="0.06" />
      {/* Right wing */}
      <rect x="430" y="140" width="200" height="160" fill="currentColor" opacity="0.06" />
      {/* Left small turret */}
      <rect x="180" y="100" width="20" height="40" fill="currentColor" opacity="0.07" />
      <polygon points="190,85 180,100 200,100" fill="currentColor" opacity="0.09" />
      {/* Right small turret */}
      <rect x="600" y="100" width="20" height="40" fill="currentColor" opacity="0.07" />
      <polygon points="610,85 600,100 620,100" fill="currentColor" opacity="0.09" />
      {/* Gate arch */}
      <path d="M380,300 Q400,260 420,300" fill="currentColor" opacity="0.1" />
      {/* Ground */}
      <rect x="0" y="280" width="800" height="20" fill="currentColor" opacity="0.05" />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   MAGIC WAND TRAIL
   ══════════════════════════════════════════════ */
function MagicTrail() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Diagonal magic trail */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[2px] bg-gradient-to-r from-transparent via-[#9370DB]/20 to-transparent rotate-[25deg] magic-float" />
      <div className="absolute top-[25%] right-[10%] w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/15 to-transparent rotate-[-15deg] magic-float-delay" />
      <div className="absolute bottom-[30%] left-[20%] w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#9370DB]/10 to-transparent rotate-[10deg] magic-float-delay-2" />
    </div>
  )
}

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const castleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep magical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#150030] to-[#0a0020]" />

      {/* Radial glow center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9370DB]/[0.06] rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FFD700]/[0.04] rounded-full blur-[100px]" />

      {/* Castle silhouette */}
      <motion.div style={{ y: castleY }} className="absolute bottom-0 left-0 right-0">
        <CastleSilhouette className="w-full h-auto text-[#9370DB]" />
      </motion.div>

      {/* Sparkles */}
      <SparkleField count={50} color="white" />
      <SparkleField count={20} color="#FFD700" />
      <SparkleField count={15} color="#9370DB" />

      <MagicTrail />

      {/* Noise */}
      <div className="absolute inset-0 noise opacity-20" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Presents badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 border border-white/10 px-6 py-2.5 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Crown Allstar Presents</span>
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-wider text-white mb-2">
            <span className="disney-glow">MAKRAB</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#9370DB]" />
            <span className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-wider text-[#FFD700] gold-glow">
              2026
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#9370DB]" />
          </div>
        </motion.div>

        {/* Theme badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-6">
          <div className="inline-flex items-center gap-3 border border-[#9370DB]/30 px-8 py-3 bg-[#9370DB]/5">
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            <span className="font-display text-2xl md:text-3xl tracking-[0.15em] text-[#FFD700]">DISNEY</span>
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
          </div>
        </motion.div>

        {/* Dates */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mb-8">
          <div className="inline-flex items-center gap-4 border border-white/10 px-8 py-3 bg-black/30 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">When</p>
              <p className="font-display text-lg tracking-wider text-white">7 — 9 AUGUST 2026</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Where</p>
              <p className="font-display text-lg tracking-wider text-white">LEMBANG, BANDUNG</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/50 text-lg tracking-wide max-w-2xl mx-auto mb-12 font-light italic"
        >
          &ldquo;Where dreams come true.&rdquo; — Three magical days in the mountains of Lembang.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator">
            <ChevronDown className="w-6 h-6 text-[#9370DB]/40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient — royal purple */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0020] via-[#150030]/80 to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════
   EVENT DETAILS (3 days)
   ══════════════════════════════════════════════ */
function DetailsSection() {
  const details = [
    { icon: Calendar, label: "DATE", value: "7 — 9 Aug", sub: "2026", accent: "purple" },
    { icon: MapPin, label: "LOCATION", value: "Lembang", sub: "Bandung, Jawa Barat", accent: "purple" },
    { icon: Clock, label: "START", value: "1:00 PM", sub: "August 7, 2026", accent: "gold" },
    { icon: Users, label: "THEME", value: "Disney", sub: "Dress as your favorite character!", accent: "gold" },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#0d0025] to-[#0a0020]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#9370DB]" />
            <span className="text-[#9370DB] text-xs tracking-[0.3em] uppercase">Event Details</span>
            <Sparkles className="w-5 h-5 text-[#9370DB]" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
            THREE <span className="text-[#9370DB]">MAGICAL</span> DAYS
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, i) => {
            const accentColor = item.accent === "gold" ? "#FFD700" : "#9370DB"
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} group relative border border-white/5 bg-white/[0.02] p-8 hover:border-[${accentColor}]/30 transition-all duration-500`}
                style={{ ["--hover-color" as string]: accentColor }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `linear-gradient(to bottom, ${accentColor}08, transparent)` }}
                />
                <div className="relative z-10">
                  <item.icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform duration-300" style={{ color: accentColor }} />
                  <p className="text-white/30 text-xs tracking-[0.2em] mb-2">{item.label}</p>
                  <p className="font-display text-2xl tracking-wider text-white mb-1">{item.value}</p>
                  <p className="text-white/40 text-sm">{item.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   ITINERARY
   ══════════════════════════════════════════════ */
function ItinerarySection() {
  const days = [
    {
      day: "DAY 1",
      date: "August 7",
      title: "ARRIVAL & ENCHANTMENT",
      time: "1:00 PM onwards",
      items: ["Check-in & settle in", "Opening ceremony", "Disney character costume contest", "Team bonding games", "Dinner under the stars"],
    },
    {
      day: "DAY 2",
      date: "August 8",
      title: "ADVENTURE & MAGIC",
      time: "Full Day",
      items: ["Morning activities in Lembang", "Disney-themed challenges & scavenger hunt", "Creative workshops", "Gala night & talent show", "Campfire & storytelling"],
    },
    {
      day: "DAY 3",
      date: "August 9",
      title: "FAREWELL & MEMORIES",
      time: "Morning",
      items: ["Breakfast together", "Closing ceremony & awards", "Group photos", "Farewell & checkout"],
    },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 diagonal-stripe" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[#FFD700] text-xs tracking-[0.3em] uppercase">Schedule</span>
            <Music className="w-5 h-5 text-[#FFD700]" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
            YOUR <span className="text-[#FFD700]">ADVENTURE</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {days.map((day, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} group relative border border-white/5 bg-white/[0.02] p-8 hover:border-[#9370DB]/20 transition-all duration-500`}>              
              <div className="absolute inset-0 bg-gradient-to-b from-[#9370DB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-xs tracking-[0.3em] text-[#9370DB]">{day.day}</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/30 text-xs tracking-wider">{day.date}</span>
                </div>
                <h3 className="font-display text-xl tracking-wider text-white mb-2">{day.title}</h3>
                <p className="text-[#FFD700]/60 text-xs tracking-wider mb-6">{day.time}</p>
                <ul className="space-y-3">
                  {day.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Star className="w-3 h-3 text-[#FFD700]/30 fill-[#FFD700]/30 mt-1 shrink-0" />
                      <span className="text-white/40 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   HIGHLIGHTS
   ══════════════════════════════════════════════ */
function ThemeSection() {
  const highlights = [
    { icon: Camera, title: "DISNEY COSPLAY", desc: "Come as your favorite Disney character. Princess, superhero, villain — the stage is yours." },
    { icon: Tent, title: "MOUNTAIN RETREAT", desc: "Three days in the cool mountains of Lembang. Nature, fresh air, and magical moments." },
    { icon: Gamepad2, title: "GAMES & CHALLENGES", desc: "Disney-themed scavenger hunts, team challenges, and creative activities for everyone." },
    { icon: TreePine, title: "TEAM BONDING", desc: "Campfire nights, storytelling, and the Crown Allstar family growing closer together." },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#100028] to-[#0a0020]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[#9370DB]" />
            <span className="text-[#9370DB] text-xs tracking-[0.3em] uppercase">What to Expect</span>
            <Sparkles className="w-5 h-5 text-[#9370DB]" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
            A MAGICAL <span className="text-[#9370DB]">EXPERIENCE</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} group relative border border-white/5 p-10 hover:border-[#9370DB]/20 transition-all duration-500`}>              
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-14 h-14 border border-[#9370DB]/20 flex items-center justify-center bg-[#9370DB]/5 group-hover:bg-[#9370DB]/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-[#9370DB]" />
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-white mb-3">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
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
  const words = ["DISNEY", "MAGICAL", "MAKRAB 2026", "LEMBANG", "7—9 AUGUST", "CROWN ALLSTAR"]
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 bg-white/[0.01]">
      <div className="marquee-track whitespace-nowrap flex items-center gap-8">
        {Array.from({ length: 3 }).map((_, setIdx) =>
          words.map((w, wi) => (
            <span key={`${setIdx}-${wi}`} className="inline-flex items-center gap-8">
              <span className="font-display text-sm tracking-[0.3em] text-white/10">{w}</span>
              <Star className={`w-3 h-3 ${wi % 2 === 0 ? "text-[#9370DB]/20 fill-[#9370DB]/20" : "text-[#FFD700]/20 fill-[#FFD700]/20"}`} />
            </span>
          ))
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   FLOATING ORBS (between sections)
   ══════════════════════════════════════════════ */
function FloatingOrbs() {
  return (
    <div className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] to-[#0d0025]" />
      {[
        { size: 120, x: "15%", y: "20%", color: "#9370DB", delay: 0, dur: 6 },
        { size: 80, x: "70%", y: "50%", color: "#FFD700", delay: 2, dur: 8 },
        { size: 60, x: "40%", y: "70%", color: "#9370DB", delay: 1, dur: 7 },
        { size: 40, x: "85%", y: "30%", color: "#FFD700", delay: 3, dur: 5 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full orb-float"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: orb.x,
            top: orb.y,
            backgroundColor: orb.color,
            filter: `blur(${orb.size / 2}px)`,
            opacity: 0.08,
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   SECRET EVENT SECTION
   ══════════════════════════════════════════════ */
function SecretEventSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Dark mystical bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0025] via-[#1a0035] to-[#0d0025]" />
      
      {/* Pulsing mystery glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/[0.03] rounded-full blur-[120px] mystery-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9370DB]/[0.05] rounded-full blur-[80px] mystery-pulse-delay" />
      
      {/* Orbiting stars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] orbit-container">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] orbit-container-reverse">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Star className="w-2 h-2 text-[#9370DB] fill-[#9370DB]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 border border-[#FFD700]/30 px-8 py-3 bg-[#FFD700]/5 mystery-border">
            <Eye className="w-5 h-5 text-[#FFD700] eye-glow" />
            <span className="text-[#FFD700] text-sm tracking-[0.3em] uppercase font-display">Top Secret</span>
            <Eye className="w-5 h-5 text-[#FFD700] eye-glow" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl tracking-wider text-white mb-6"
        >
          <span className="mystery-text">A SECRET</span>
          <br />
          <span className="text-[#FFD700]">AWAITS</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Wand2 className="w-5 h-5 text-[#9370DB] wand-spin" />
          <span className="text-white/30 text-sm tracking-[0.2em]">AUGUST 8 • NIGHTFALL</span>
          <Wand2 className="w-5 h-5 text-[#9370DB] wand-spin-reverse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/40 text-lg max-w-xl mx-auto mb-8 italic"
        >
          On the second night, something extraordinary will unfold under the stars.
          <br />Only those present will witness it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/[0.02]">
            <Flame className="w-4 h-4 text-[#FFD700] flame-flicker" />
            <span className="text-white/50 text-xs tracking-[0.2em] uppercase">Shh… It&apos;s a surprise</span>
            <Flame className="w-4 h-4 text-[#FFD700] flame-flicker" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CTA
   ══════════════════════════════════════════════ */
function ComingSoonSection() {
  return (
    <section className="relative py-40 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0020] via-[#150030] to-[#0a0020]" />

      {/* Extra castle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#9370DB]/[0.04] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 border border-[#FFD700]/20 px-8 py-3 mb-8 bg-[#FFD700]/5">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-[#FFD700] text-xs tracking-[0.3em] uppercase">Registration Opening Soon</span>
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl tracking-wider text-white mb-6"
        >
          YOUR <span className="text-[#9370DB]">MAGICAL</span> JOURNEY
          <br />AWAITS
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-white/40 text-lg max-w-2xl mx-auto mb-6">
          Prepare for three unforgettable days of Disney magic in Lembang.
        </motion.p>

        {/* Registration link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <a
            href="https://forms.gle/8qethafK29jM26Vp7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9370DB]/20 border border-[#9370DB]/30 text-[#FFD700] font-display text-lg tracking-wider transition-all duration-300 hover:bg-[#9370DB]/30 hover:text-white rounded-lg"
          >
            REGISTER NOW →
          </a>
        </motion.div>

        {/* Secret event badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 border border-[#FFD700]/20 px-6 py-2 bg-[#FFD700]/5">
            <Star className="w-3 h-3 text-[#FFD700]" />
            <span className="text-xs text-[#FFD700] tracking-[0.2em] uppercase">SECRET EVENT</span>
            <Star className="w-3 h-3 text-[#FFD700]" />
          </div>
          <p className="text-white/40 text-sm mt-2">August 8 • Evening • Surprise awaits...</p>
        </motion.div>

        {/* Decorative sparkle line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#9370DB]/30" />
          <Star className="w-5 h-5 text-[#FFD700]/40 fill-[#FFD700]/40" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#9370DB]/30" />
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function Makrab2026Page() {
  useReveal()

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DetailsSection />
        <MarqueeBanner />
        <ThemeSection />
        <ItinerarySection />
        <FloatingOrbs />
        <SecretEventSection />
        <ComingSoonSection />
      </main>
      <Footer />
    </>
  )
}
