import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crown Anniversary 2026 — Undangan | Crown Allstar",
  description:
    "Undangan perayaan ulang tahun Crown Allstar, 26 September 2026 di Bandung. Special performance Angkatan 18, potong kue, tukar kado, dan doa bersama.",
  keywords: [
    "Crown Allstar anniversary 2026",
    "ulang tahun Crown Allstar",
    "undangan Crown Allstar Bandung",
    "open recruitment angkatan 18",
    "cheerleading Bandung",
    "Crown Allstar 26 September 2026",
  ],
  openGraph: {
    title: "Crown Anniversary 2026 — Undangan | Crown Allstar",
    description:
      "26 September 2026, Bandung. Satu malam untuk semua anggota dan senior Crown: special performance Angkatan 18, potong kue, tukar kado, doa bersama.",
    url: "https://www.crownallstar.com/anniversary-2026",
    siteName: "Crown Allstar",
    type: "website",
    locale: "id_ID",
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
    title: "Crown Anniversary 2026 — Undangan | Crown Allstar",
    description: "26 September 2026, Bandung. Undangan untuk seluruh anggota dan senior Crown Allstar.",
    images: ["/og-anniversary-2026.jpg"],
  },
  alternates: {
    canonical: "https://www.crownallstar.com/anniversary-2026",
  },
}

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
