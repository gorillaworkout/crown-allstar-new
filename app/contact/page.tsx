"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"

export default function ContactPage() {
  useReveal()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    experience: "none",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const text = `*Crown Allstar — New Inquiry*
Name: ${formData.name}
Phone: ${formData.phone}
Age: ${formData.age || "Not specified"}
Experience: ${formData.experience}

Message:
${formData.message}`

    const waUrl = `https://wa.me/6281324420183?text=${encodeURIComponent(text)}`
    window.open(waUrl, "_blank")
  }

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-overlay opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="max-w-3xl reveal">
            <div className="gold-line mb-6" />
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white mb-6">
              LET&apos;S<br />
              <span className="text-[hsl(45,93%,58%)]">TALK</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
              Interested in joining Crown Allstar? Have questions about our programs?
              Drop us a message — we&apos;ll get back to you fast.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-[hsl(0,0%,4%)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left — Contact Info */}
            <div className="lg:col-span-4 reveal">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[13px] tracking-[0.2em] text-white/50 mb-3">
                    WHATSAPP
                  </h3>
                  <a
                    href="https://wa.me/6281324420183"
                    className="text-white text-lg hover:text-[hsl(45,93%,58%)] transition-colors"
                  >
                    +62 813-2442-0183
                  </a>
                </div>

                <div>
                  <h3 className="text-[13px] tracking-[0.2em] text-white/50 mb-3">
                    EMAIL
                  </h3>
                  <a
                    href="mailto:crownallstar@gmail.com"
                    className="text-white text-lg hover:text-[hsl(45,93%,58%)] transition-colors"
                  >
                    crownallstar@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[13px] tracking-[0.2em] text-white/50 mb-3">
                    LOCATION
                  </h3>
                  <p className="text-white/60">
                    Jakarta, Indonesia
                  </p>
                </div>

                <div>
                  <h3 className="text-[13px] tracking-[0.2em] text-white/50 mb-3">
                    SOCIAL
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://www.instagram.com/crownallstar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[hsl(45,93%,58%)] transition-colors text-sm"
                    >
                      @crownallstar — Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@crownallstar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[hsl(45,93%,58%)] transition-colors text-sm"
                    >
                      @crownallstar — TikTok
                    </a>
                  </div>
                </div>

                {/* Training Schedule */}
                <div className="border border-white/10 p-8 mt-8">
                  <h3 className="font-display text-xl text-white tracking-wider mb-4">
                    TRAINING SCHEDULE
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Monday</span>
                      <span className="text-white/70">18:00 — 21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Wednesday</span>
                      <span className="text-white/70">18:00 — 21:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Saturday</span>
                      <span className="text-white/70">10:00 — 14:00</span>
                    </div>
                    <div className="border-t border-white/5 pt-3 mt-3">
                      <p className="text-white/30 text-xs">
                        Schedule may vary during competition season
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-8 reveal reveal-delay-1">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[13px] tracking-[0.15em] text-white/50 block mb-3"
                    >
                      NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-lg focus:border-[hsl(45,93%,58%)] focus:outline-none transition-colors placeholder:text-white/15"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-[13px] tracking-[0.15em] text-white/50 block mb-3"
                    >
                      WHATSAPP NUMBER *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-lg focus:border-[hsl(45,93%,58%)] focus:outline-none transition-colors placeholder:text-white/15"
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="age"
                      className="text-[13px] tracking-[0.15em] text-white/50 block mb-3"
                    >
                      AGE
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="text"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-lg focus:border-[hsl(45,93%,58%)] focus:outline-none transition-colors placeholder:text-white/15"
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="experience"
                      className="text-[13px] tracking-[0.15em] text-white/50 block mb-3"
                    >
                      EXPERIENCE LEVEL
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-lg focus:border-[hsl(45,93%,58%)] focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="none" className="bg-[hsl(0,0%,8%)]">
                        No experience
                      </option>
                      <option value="beginner" className="bg-[hsl(0,0%,8%)]">
                        Beginner (less than 1 year)
                      </option>
                      <option value="intermediate" className="bg-[hsl(0,0%,8%)]">
                        Intermediate (1-3 years)
                      </option>
                      <option value="advanced" className="bg-[hsl(0,0%,8%)]">
                        Advanced (3+ years)
                      </option>
                      <option value="competitive" className="bg-[hsl(0,0%,8%)]">
                        Competitive athlete
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-[13px] tracking-[0.15em] text-white/50 block mb-3"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-lg focus:border-[hsl(45,93%,58%)] focus:outline-none transition-colors resize-none placeholder:text-white/15"
                    placeholder="Tell us about yourself or what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-16 py-4 bg-[hsl(45,93%,58%)] text-black text-[13px] font-semibold tracking-[0.15em] hover:bg-[hsl(45,93%,68%)] transition-all duration-300 mt-4"
                >
                  SEND VIA WHATSAPP
                </button>

                <p className="text-white/20 text-xs mt-4">
                  This form opens WhatsApp with your message pre-filled.
                  We typically respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
