import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gabung Crown Allstar — Daftar Cheerleading Bandung Indonesia",
  description:
    "Bergabunglah dengan Crown Allstar, tim cheerleading 16× juara nasional dari Bandung. Buka untuk semua usia dan level. Program: Coed Partner Stunt, Group Stunt Elite/Premier, All Girl, Cheer Pom Freestyle. Hubungi WhatsApp +62 813-2442-0183. Join Crown Allstar — Indonesia's 16× national champion cheerleading team.",
  openGraph: {
    title: "Join Crown Allstar — Daftar Cheerleading Bandung",
    description: "Gabung tim cheerleading 16× juara nasional. WhatsApp: +62 813-2442-0183. All ages welcome.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
