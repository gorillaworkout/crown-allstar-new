"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "HISTORY", path: "/history" },
  { name: "CONTACT", path: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-2">
            <Image
              src="/logo-crown-sm.png"
              alt="Crown Allstar"
              width={44}
              height={44}
              className=""
            />
            <div>
              <span className="font-display text-2xl tracking-wider text-white">
                CROWN
              </span>
              <span className="font-display text-2xl tracking-wider text-[hsl(45,93%,58%)] ml-1">
                ALLSTAR
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[13px] font-medium tracking-[0.15em] transition-colors duration-300 ${
                  pathname === item.path
                    ? "text-[hsl(45,93%,58%)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[13px] font-semibold tracking-[0.15em] px-6 py-2.5 border border-[hsl(45,93%,58%)] text-[hsl(45,93%,58%)] hover:bg-[hsl(45,93%,58%)] hover:text-black transition-all duration-300"
            >
              JOIN US
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[1.5px]" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[0px]" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/5 px-6 py-8">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-display text-2xl tracking-wider ${
                  pathname === item.path
                    ? "text-[hsl(45,93%,58%)]"
                    : "text-white/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-display text-2xl tracking-wider text-[hsl(45,93%,58%)] border border-[hsl(45,93%,58%)] px-6 py-3 text-center mt-2"
            >
              JOIN US
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
