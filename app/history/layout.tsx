import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sejarah Crown Allstar — 2007 Sampai Sekarang | Cheerleading Indonesia",
  description:
    "Perjalanan Crown Allstar dari tim kecil di Bandung hingga ke panggung dunia. Didirikan 2007, juara nasional pertama 2009, Tim Nasional Indonesia 2012 & 2014 ke USA, ICU Asian Championship 2023, ICU APCC 2024, dan ICU World Championship. History of Crown Allstar cheerleading from Bandung to the world stage.",
  openGraph: {
    title: "Sejarah Crown Allstar — Dari Bandung ke Dunia",
    description: "17 tahun, 16 gelar juara nasional, medali internasional. Perjalanan Crown Allstar Cheerleading.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/history",
  },
}

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children
}
