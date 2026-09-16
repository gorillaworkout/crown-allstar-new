import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crown Anniversary 2026 — Invitation | Crown Allstar",
  description:
    "You're invited to the Crown Allstar anniversary celebration on 26 September 2026 in Bandung. Special performance by Batch 18, cake cutting, gift exchange, and a prayer together.",
  keywords: [
    "Crown Allstar anniversary 2026",
    "Crown Allstar invitation",
    "cheerleading Bandung",
    "Crown Allstar Batch 18",
    "Crown Allstar 26 September 2026",
  ],
  openGraph: {
    title: "Crown Anniversary 2026 — Invitation | Crown Allstar",
    description:
      "26 September 2026, Bandung. One night for every Crown member and senior: Batch 18 special performance, cake cutting, gift exchange, prayer together.",
    url: "https://www.crownallstar.com/anniversary-2026",
    siteName: "Crown Allstar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-anniversary-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Crown Allstar Anniversary 2026 — 26 September, Bandung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crown Anniversary 2026 — Invitation | Crown Allstar",
    description: "26 September 2026, Bandung. An invitation for every Crown member and senior.",
    images: ["/og-anniversary-2026.jpg"],
  },
  alternates: {
    canonical: "https://www.crownallstar.com/anniversary-2026",
  },
}

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
