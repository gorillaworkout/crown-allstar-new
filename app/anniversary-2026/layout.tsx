import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RAC1N9 for More — Crown Allstar 19th Anniversary",
  description:
    "Crown All-Stars 19th Anniversary — RAC1N9 for More. Saturday, 26 September 2026 in Bandung. Dress code red and blue. Batch 18 special performance, cake cutting, gift exchange, and a prayer together.",
  keywords: [
    "Crown Allstar 19th anniversary",
    "RAC1N9 for More",
    "Crown19thAnniversary",
    "rac1n9",
    "cheerleading Bandung",
    "Crown Allstar Batch 18",
  ],
  openGraph: {
    title: "RAC1N9 for More — Crown Allstar 19th Anniversary",
    description:
      "Saturday, 26 September 2026, Bandung. Dress code: red and blue. Leave your wish for Crown on the wall.",
    url: "https://www.crownallstar.com/anniversary-2026",
    siteName: "Crown Allstar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-anniversary-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Crown Allstar 19th Anniversary — RAC1N9 for More, 26 September 2026, Bandung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAC1N9 for More — Crown Allstar 19th Anniversary",
    description: "Saturday, 26 September 2026, Bandung. Dress code: red and blue.",
    images: ["/og-anniversary-2026.jpg"],
  },
  alternates: {
    canonical: "https://www.crownallstar.com/anniversary-2026",
  },
}

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
