import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

const siteUrl = "https://crown-allstar-new.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crown Allstar Cheerleading | 16× National Champion Indonesia",
    template: "%s | Crown Allstar Cheerleading",
  },
  description:
    "Crown Allstar — tim cheerleading elite Indonesia dari Bandung. 16× ICANC National Champion (2009-2025), medali emas ICU APCC 2024, perunggu ICU Asian Championship 2023. Bergabunglah dengan kami! Crown Allstar is Indonesia's premier cheerleading team based in Bandung, Jawa Barat. Join our programs: Coed Elite, All Girl Premier, Group Stunt, Partner Stunt, Cheer Pom.",
  keywords: [
    "Crown Allstar",
    "Crown Allstar Cheerleading",
    "cheerleading Indonesia",
    "tim cheerleading Bandung",
    "ICANC",
    "ICANC National Champion",
    "cheerleading Bandung",
    "cheerleading Jawa Barat",
    "ICA",
    "Indonesian Cheerleading Association",
    "ICA Jawa Barat",
    "ICU Asian Cheerleading Championship",
    "ICU APCC",
    "ICU World Cheerleading Championship",
    "cheerleading competition Indonesia",
    "all star cheerleading",
    "group stunt",
    "partner stunt",
    "coed cheerleading",
    "all girl cheerleading",
    "cheer pom freestyle",
    "tumbling",
    "stunts",
    "pyramids",
    "cheerleading training Bandung",
    "les cheerleading",
    "kursus cheerleading",
    "sekolah cheerleading",
    "cheerleading team Indonesia",
    "kompetisi cheerleading",
    "juara cheerleading nasional",
    "BICO cheerleading",
    "Bali Open cheerleading",
    "cheerleading elite",
    "cheerleading premier",
    "cheerleading advanced",
    "CA4L",
    "Crown Allstar for Life",
  ],
  authors: [{ name: "Crown Allstar" }],
  creator: "Crown Allstar",
  publisher: "Crown Allstar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Crown Allstar | 16× National Champion Cheerleading Indonesia",
    description:
      "Tim cheerleading elite dari Bandung. 16× ICANC National Champion, medali emas ICU APCC 2024, perunggu ICU Asian Championship 2023. Indonesia's premier cheerleading team.",
    url: siteUrl,
    siteName: "Crown Allstar Cheerleading",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crown Allstar — 16× National Champion Cheerleading Indonesia",
      },
    ],
    locale: "id_ID",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crown Allstar | 16× National Champion Cheerleading Indonesia",
    description:
      "Tim cheerleading elite dari Bandung. 16× ICANC National Champion. Indonesia's premier cheerleading team.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  category: "sports",
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsTeam",
      "@id": `${siteUrl}/#team`,
      name: "Crown Allstar",
      alternateName: ["Crown Allstar Cheerleading", "Crown All Star", "Crown Allstar Bandung"],
      sport: "Cheerleading",
      url: siteUrl,
      logo: `${siteUrl}/logo-crown.png`,
      image: `${siteUrl}/og-image.jpg`,
      description:
        "Crown Allstar is Indonesia's premier cheerleading team based in Bandung, Jawa Barat. Founded in 2007, the team is 16-time consecutive ICANC National Champion (2009-2025), ICU APCC 2024 Gold Medalist, ICU Asian Cheerleading Championship 2023 Bronze Medalist, and has represented Indonesia at the ICU World Cheerleading Championship in Florida, USA.",
      foundingDate: "2007-09-23",
      foundingLocation: {
        "@type": "Place",
        name: "Bandung",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bandung",
          addressRegion: "Jawa Barat",
          addressCountry: "ID",
        },
      },
      location: {
        "@type": "Place",
        name: "Bandung, Jawa Barat",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bandung",
          addressRegion: "Jawa Barat",
          addressCountry: "ID",
        },
      },
      memberOf: [
        {
          "@type": "SportsOrganization",
          name: "Indonesian Cheerleading Association",
          alternateName: "ICA",
        },
        {
          "@type": "SportsOrganization",
          name: "ICA Jawa Barat",
        },
      ],
      award: [
        "16× ICANC National Champion (2009-2025)",
        "ICU APCC 2024 Gold Medal",
        "ICU Asian Cheerleading Championship 2023 Bronze Medal",
        "BICO 2023 Silver Medal",
        "Asian Cheerleading Invitational Championship 2015 3rd Place - Singapore",
        "Indonesia National Team 2012 - ICU World Cup USA",
        "Indonesia National Team 2014 - ICU World Cup Florida USA",
        "ICU World Cheerleading Championship Representative",
      ],
      sameAs: [
        "https://www.instagram.com/crownallstar/",
        "https://crownallstarcheerleaders.blogspot.com/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-813-2442-0183",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
      },
      knowsAbout: [
        "Cheerleading",
        "Stunts",
        "Tumbling",
        "Pyramids",
        "Group Stunt",
        "Partner Stunt",
        "Cheer Pom",
        "All Girl Cheerleading",
        "Coed Cheerleading",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Crown Allstar Cheerleading",
      description: "Official website of Crown Allstar — Indonesia's 16× National Champion cheerleading team from Bandung.",
      publisher: { "@id": `${siteUrl}/#team` },
      inLanguage: ["id", "en"],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Crown Allstar | 16× National Champion Cheerleading Indonesia",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#team` },
      description:
        "Crown Allstar — tim cheerleading elite Indonesia dari Bandung. 16× ICANC National Champion (2009-2025). Join our programs: Coed Elite, All Girl Premier, Group Stunt, Partner Stunt, Cheer Pom.",
      inLanguage: ["id", "en"],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apa itu Crown Allstar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crown Allstar adalah tim cheerleading allstar dari Bandung, Jawa Barat yang didirikan pada 23 September 2007. Tim ini merupakan prototype team dari ICA (Indonesian Cheerleading Association) dan telah menjadi 16 kali juara nasional ICANC berturut-turut dari 2009 hingga 2025.",
          },
        },
        {
          "@type": "Question",
          name: "Bagaimana cara bergabung dengan Crown Allstar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Untuk bergabung dengan Crown Allstar, hubungi kami via WhatsApp di +62 813-2442-0183 atau kunjungi Instagram @crownallstar. Kami menerima atlet dari semua usia dan level, dari pemula hingga kompetitif.",
          },
        },
        {
          "@type": "Question",
          name: "Di mana lokasi latihan Crown Allstar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crown Allstar berlatih di Bandung, Jawa Barat, Indonesia. Hubungi kami untuk informasi jadwal dan lokasi latihan terbaru.",
          },
        },
        {
          "@type": "Question",
          name: "Apa prestasi Crown Allstar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crown Allstar meraih 16× ICANC National Champion (2009-2025), medali emas ICU APCC 2024, perunggu ICU Asian Cheerleading Championship 2023, perak BICO 2023, dan telah mewakili Indonesia di ICU World Cheerleading Championship di Florida, USA.",
          },
        },
        {
          "@type": "Question",
          name: "What divisions does Crown Allstar compete in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crown Allstar competes in: Coed Partner Stunt, Group Stunt Coed Elite, Group Stunt Coed Premier, Group Stunt All Girl Premier, Coed Advanced (Lv4), All Girl Advanced (Lv4), Coed Elite Division, All Girl Elite Division, Coed Premier Division, and Cheer Pom Freestyle.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#D4A726" />
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Bandung" />
        <meta name="geo.position" content="-6.9175;107.6191" />
        <meta name="ICBM" content="-6.9175, 107.6191" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
