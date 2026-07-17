"use client"

import { useRef } from "react"
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
  Film,
  Clapperboard,
  Award,
  ChevronDown,
  PartyPopper,
  Users,
  Music,
  Camera,
} from "lucide-react"

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0000] to-black" />

      {/* Spotlights */}
      <div className="absolute top-0 left-[25%] w-1 h-full opacity-[0.07] bg-gradient-to-b from-white via-white to-transparent blur-[2px] spotlight-beam" />
      <div className="absolute top-0 right-[33%] w-1 h-full opacity-[0.05] bg-gradient-to-b from-white via-white to-transparent blur-[2px] spotlight-beam-delay" />
      <div className="absolute top-0 left-[60%] w-[2px] h-full opacity-[0.04] bg-gradient-to-b from-red-600 via-red-600 to-transparent blur-[1px] spotlight-beam-delay-2" />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            width: `${(i * 7 % 3) + 1}px`,
            height: `${(i * 7 % 3) + 1}px`,
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
            animationDelay: `${(i * 0.7) % 4}s`,
            animationDuration: `${(i % 3) + 2}s`,
            opacity: ((i * 11) % 60 + 10) / 100,
          }}
        />
      ))}

      <div className="absolute inset-0 noise opacity-30" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Presents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 border border-white/10 px-6 py-2.5 bg-white/5 backdrop-blur-sm">
            <Clapperboard className="w-4 h-4 text-red-500" />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Crown Allstar Presents</span>
            <Clapperboard className="w-4 h-4 text-red-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-wider text-white mb-2">
            <span className="hollywood-glow">MAKRAB</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-600" />
            <span className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-wider text-red-600 red-carpet-glow">
              2026
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-600" />
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-10">
          <div className="inline-flex items-center gap-2 border border-[hsl(45,93%,58%)]/30 px-8 py-3 bg-[hsl(45,93%,58%)]/5">
            <Star className="w-4 h-4 text-[hsl(45,93%,58%)] fill-[hsl(45,93%,58%)]" />
            <span className="font-display text-2xl tracking-[0.2em] text-[hsl(45,93%,58%)]">RED CARPET MOVIE STAR</span>
            <Star className="w-4 h-4 text-[hsl(45,93%,58%)] fill-[hsl(45,93%,58%)]" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/50 text-lg tracking-wide max-w-2xl mx-auto mb-12 font-light"
        >
          Walk the red carpet. Shine like a star. One unforgettable night under the stars of Lembang.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator">
            <ChevronDown className="w-6 h-6 text-white/30" />
          </div>
        </motion.div>
      </motion.div>

      {/* Red carpet floor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8B0000] via-[#5c0000]/80 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-gradient-to-t from-[#a00000] to-[#800000]/60 blur-sm" />
    </section>
  )
}

/* ══════════════════════════════════════════════
   EVENT DETAILS
   ══════════════════════════════════════════════ */
function DetailsSection() {
  const details = [
    { icon: Calendar, label: "DATE", value: "Coming Soon", sub: "2026" },
    { icon: MapPin, label: "LOCATION", value: "Lembang", sub: "Bandung, Jawa Barat" },
    { icon: Clock, label: "TIME", value: "TBA", sub: "Details coming soon" },
    { icon: Users, label: "DRESS CODE", value: "Red Carpet Glam", sub: "Dress to impress — Movie Star edition" },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-5 h-5 text-red-500" />
            <span className="text-red-500 text-xs tracking-[0.3em] uppercase">Event Details</span>
            <Film className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
            THE <span className="text-red-500">BIG NIGHT</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group relative border border-white/5 bg-white/[0.02] p-8 hover:border-red-500/30 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <item.icon className="w-8 h-8 text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-white/30 text-xs tracking-[0.2em] mb-2">{item.label}</p>
                <p className="font-display text-2xl tracking-wider text-white mb-1">{item.value}</p>
                <p className="text-white/40 text-sm">{item.sub}</p>
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
    { icon: Camera, title: "RED CARPET ARRIVAL", desc: "Strut down the red carpet with paparazzi-style photo ops. Feel like a true movie star on premiere night." },
    { icon: Award, title: "AWARDS CEREMONY", desc: "An Oscar-inspired awards night celebrating our athletes' achievements this season." },
    { icon: Music, title: "LIVE ENTERTAINMENT", desc: "Live performances, DJ sets, and dance floor — because every movie star needs an after-party." },
    { icon: PartyPopper, title: "THEME NIGHT", desc: "Come dressed as your favorite movie character or walk the carpet in your finest red carpet look." },
  ]

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 diagonal-stripe" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-[hsl(45,93%,58%)]" />
            <span className="text-[hsl(45,93%,58%)] text-xs tracking-[0.3em] uppercase">What to Expect</span>
            <Sparkles className="w-5 h-5 text-[hsl(45,93%,58%)]" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-white mb-4">
            A NIGHT OF <span className="text-[hsl(45,93%,58%)]">GLAMOUR</span>
          </h2>
          <div className="gold-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} group relative border border-white/5 p-10 hover:border-[hsl(45,93%,58%)]/20 transition-all duration-500`}>
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-14 h-14 border border-[hsl(45,93%,58%)]/20 flex items-center justify-center bg-[hsl(45,93%,58%)]/5 group-hover:bg-[hsl(45,93%,58%)]/10 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-[hsl(45,93%,58%)]" />
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
  const words = ["RED CARPET", "MOVIE STAR", "MAKRAB 2026", "LEMBANG"]
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 bg-white/[0.01]">
      <div className="marquee-track whitespace-nowrap flex items-center gap-8">
        {Array.from({ length: 3 }).map((_, setIdx) =>
          words.map((w, wi) => (
            <span key={`${setIdx}-${wi}`} className="inline-flex items-center gap-8">
              <span className="font-display text-sm tracking-[0.3em] text-white/10">{w}</span>
              <Star className={`w-3 h-3 ${wi % 2 === 0 ? "text-red-500/20 fill-red-500/20" : "text-[hsl(45,93%,58%)]/20 fill-[hsl(45,93%,58%)]/20"}`} />
            </span>
          ))
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   COMING SOON CTA
   ══════════════════════════════════════════════ */
function ComingSoonSection() {
  return (
    <section className="relative py-40 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0000] to-black" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 border border-[hsl(45,93%,58%)]/20 px-8 py-3 mb-8 bg-[hsl(45,93%,58%)]/5">
            <Sparkles className="w-4 h-4 text-[hsl(45,93%,58%)]" />
            <span className="text-[hsl(45,93%,58%)] text-xs tracking-[0.3em] uppercase">Stay Tuned</span>
            <Sparkles className="w-4 h-4 text-[hsl(45,93%,58%)]" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl md:text-8xl tracking-wider text-white mb-6"
        >
          THE SHOW IS <span className="text-red-600">ABOUT TO BEGIN</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="text-white/40 text-lg max-w-2xl mx-auto mb-12">
          Stay tuned for full event details, registration, and your invitation to the most glamorous night of 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-red-600/30" />
          <Film className="w-6 h-6 text-red-600/40" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-red-600/30" />
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
        <ComingSoonSection />
      </main>
      <Footer />
    </>
  )
}