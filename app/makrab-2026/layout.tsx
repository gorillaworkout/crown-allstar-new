import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Makrab 2026 — Disney | Crown Allstar",
  description:
    "Makrab Crown Allstar 2026 — Three magical days in Lembang, Bandung. Disney theme, August 7-9. Registration now open!",
  keywords: [
    "Makrab Crown Allstar 2026",
    "Crown Allstar Disney",
    "makrab cheerleading Bandung",
    "Lembang retreat 2026",
    "Disney themed event Bandung",
    "Crown Allstar makrab",
    "August 2026 event Lembang",
    "cheerleading Indonesia gathering",
  ],
  openGraph: {
    title: "Makrab 2026 — Disney | Crown Allstar",
    description:
      "Three magical days in Lembang, Bandung. Disney theme, August 7-9, 2026. Walk the path where dreams come true.",
    url: "https://www.crownallstar.com/makrab-2026",
    siteName: "Crown Allstar",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-makrab-2026.png",
        width: 1200,
        height: 630,
        alt: "Makrab Crown Allstar 2026 — Disney Theme in Lembang, Bandung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makrab 2026 — Disney | Crown Allstar",
    description:
      "Three magical days in Lembang, Bandung. Disney theme, August 7-9, 2026.",
    images: ["/og-makrab-2026.png"],
  },
  alternates: {
    canonical: "https://www.crownallstar.com/makrab-2026",
  },
}

export default function MakrabLayout({ children }: { children: React.ReactNode }) {
  return children
}
