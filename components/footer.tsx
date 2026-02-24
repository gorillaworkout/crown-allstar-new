import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[hsl(0,0%,4%)] border-t border-white/5">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/logo-crown-sm.png"
                alt="Crown Allstar"
                width={50}
                height={50}
                className="opacity-90"
              />
              <div>
                <span className="font-display text-3xl tracking-wider text-white">
                  CROWN
                </span>
                <span className="font-display text-3xl tracking-wider text-[hsl(45,93%,58%)] ml-1">
                  ALLSTAR
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Est. September 23, 2007 — Bandung, Jawa Barat. 16× ICANC National Champion.
              ICA member. Representing Indonesia on the world stage. #CA4L
            </p>
            <div className="flex gap-5 mt-8">
              <a
                href="https://www.instagram.com/crownallstar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[hsl(45,93%,58%)] transition-colors text-sm tracking-[0.15em]"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.tiktok.com/@crownallstar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[hsl(45,93%,58%)] transition-colors text-sm tracking-[0.15em]"
              >
                TIKTOK
              </a>
              <a
                href="https://youtube.com/@crownallstar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[hsl(45,93%,58%)] transition-colors text-sm tracking-[0.15em]"
              >
                YOUTUBE
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[13px] font-semibold tracking-[0.2em] text-white/50 mb-6">
              NAVIGATE
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Journey", href: "/history" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[13px] font-semibold tracking-[0.2em] text-white/50 mb-6">
              CONTACT
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/40">
              <p>Jakarta, Indonesia</p>
              <a href="https://wa.me/6281324420183" className="hover:text-white transition-colors">
                +62 813-2442-0183
              </a>
              <a href="mailto:crownallstar@gmail.com" className="hover:text-white transition-colors">
                crownallstar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-wider">
            © {new Date().getFullYear()} CROWN ALLSTAR. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/10 text-xs">
            BUILT WITH 🔥 IN JAKARTA
          </p>
        </div>
      </div>
    </footer>
  )
}
