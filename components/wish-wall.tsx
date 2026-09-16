"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Send, Loader2, MessageCircle, Sparkles } from "lucide-react"

type Wish = { id: string; name: string; message: string; batch: string; createdAt: string }

const MAX_MESSAGE = 180
const MAX_NAME = 40

/* Deterministic pseudo-random from a string — same bubble keeps the same lane
   across re-renders, so nothing jumps around when the list updates. */
function hashFloat(seed: string, salt: number) {
  let h = 2166136261 ^ salt
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1000) / 1000
}

const PALETTES = [
  "border-[#E10600]/40 bg-[#E10600]/[0.10] text-white/90",
  "border-white/20 bg-white/[0.06] text-white/90",
  "border-[#0038A8]/45 bg-[#0038A8]/[0.14] text-[#C9D8FF]",
]

function Bubble({ wish, index, still }: { wish: Wish; index: number; still: boolean }) {
  const lane = hashFloat(wish.id, 1)
  const delay = hashFloat(wish.id, 2) * 14
  const duration = 22 + hashFloat(wish.id, 3) * 16
  const drift = (hashFloat(wish.id, 4) * 2 - 1) * 40
  const palette = PALETTES[index % PALETTES.length]

  return (
    <div
      className={still ? "" : "absolute will-change-transform"}
      style={
        still
          ? undefined
          : {
              left: `${6 + lane * 74}%`,
              animation: `wish-rise ${duration}s linear ${delay}s infinite`,
              // custom prop consumed by the keyframes for horizontal sway
              ["--drift" as string]: `${drift}px`,
            }
      }
    >
      <div
        className={`max-w-[240px] sm:max-w-[300px] border backdrop-blur-sm px-4 py-3 ${palette}`}
        style={{ borderRadius: "18px 18px 18px 4px" }}
      >
        <p className="text-[13px] sm:text-sm leading-snug break-words">{wish.message}</p>
        <p className="mt-2 text-[10px] tracking-[0.15em] uppercase opacity-60">
          {wish.name}
          {wish.batch ? ` • ${wish.batch}` : ""}
        </p>
      </div>
    </div>
  )
}

export default function WishWall() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [batch, setBatch] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const honeypot = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes", { cache: "no-store" })
      const data = await res.json()
      if (data.ok) setWishes(data.wishes ?? [])
    } catch {
      /* wall stays empty; not worth interrupting the page for */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (name.trim().length < 2) return setError("Please enter your name.")
    if (message.trim().length < 3) return setError("Please write a message.")

    setSending(true)
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          batch: batch.trim(),
          message: message.trim(),
          website: honeypot.current?.value ?? "",
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.message || "Could not send your message.")
        return
      }
      setSent(true)
      setMessage("")
      if (data.wish) setWishes((prev) => [data.wish, ...prev])
      setTimeout(() => setSent(false), 4000)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSending(false)
    }
  }

  // Cap what floats so the section never turns into soup on a phone.
  const floating = useMemo(() => wishes.slice(0, 14), [wishes])

  // Respect the OS "reduce motion" setting: show a readable stack instead.
  const [still, setStill] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setStill(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setStill(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return (
    <section className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0a04] to-black" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#E10600]/[0.05] rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-[#E10600]" />
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Wish Wall</span>
            <MessageCircle className="w-5 h-5 text-[#E10600]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-white mb-4">
            LEAVE YOUR <span className="text-[#E10600]">MESSAGE</span>
          </h2>
          <div className="racing-stripe h-1 w-28 mx-auto mb-5" />
          <p className="text-white/45 text-sm sm:text-base max-w-xl mx-auto">
            Every member and senior is welcome to write something — a birthday wish,
            a memory, or just hello. Your words float up on the wall below.
          </p>
        </div>

        {/* ── Floating bubbles ── */}
        <div
          className={
            still
              ? "mb-12 border border-white/5 bg-black/30 p-5 space-y-3 max-h-[440px] overflow-y-auto"
              : "relative h-[380px] sm:h-[440px] mb-12 border border-white/5 bg-black/30 overflow-hidden"
          }
        >
          {/* fade top/bottom so bubbles dissolve rather than clip */}
          {!still && (
            <>
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
            </>
          )}

          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
            </div>
          ) : floating.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Sparkles className="w-7 h-7 text-white/40 mb-3" />
              <p className="text-white/40 text-sm">
                No messages yet. Be the first to write one.
              </p>
            </div>
          ) : (
            floating.map((w, i) => <Bubble key={w.id} wish={w} index={i} still={still} />)
          )}
        </div>

        {/* ── Form ── */}
        <form onSubmit={submit} className="reveal max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_NAME}
              placeholder="Your name"
              aria-label="Your name"
              className="bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#E10600]/50 focus:outline-none transition-colors"
            />
            <input
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              maxLength={20}
              placeholder="Batch / division (optional)"
              aria-label="Batch or division"
              className="bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#E10600]/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative mb-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={MAX_MESSAGE}
              rows={3}
              placeholder="Write your message for Crown…"
              aria-label="Your message"
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#E10600]/50 focus:outline-none transition-colors resize-none"
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-white/25 tabular-nums">
              {message.length}/{MAX_MESSAGE}
            </span>
          </div>

          {/* Honeypot — hidden from humans, irresistible to bots. */}
          <input
            ref={honeypot}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />

          {error && <p className="text-red-400/80 text-xs mb-3">{error}</p>}
          {sent && <p className="text-[#8FB0FF] text-xs mb-3">Thank you — your message is on the wall.</p>}

          <button
            type="submit"
            disabled={sending}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E10600] via-[#C10500] to-[#0038A8] text-white font-semibold text-sm tracking-wide px-8 py-3.5 shadow-lg shadow-[#E10600]/30 hover:shadow-xl hover:shadow-[#0038A8]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                SENDING…
              </>
            ) : (
              <>
                SEND MESSAGE
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          <p className="text-white/20 text-[11px] mt-3">
            Keep it kind — messages with offensive words are blocked automatically.
          </p>
        </form>
      </div>
    </section>
  )
}
