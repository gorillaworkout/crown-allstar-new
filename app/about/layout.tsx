import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Crown Allstar — Tim Cheerleading Elite Bandung Indonesia",
  description:
    "Crown Allstar didirikan 23 September 2008 di Bandung sebagai prototype team ICA. 16× ICANC National Champion, medali emas ICU APCC 2024, perunggu ICU Asian Championship 2023, wakil Indonesia di ICU World Championship Florida USA. Founded in 2008, Crown Allstar is ICA's prototype team from Bandung, West Java.",
  openGraph: {
    title: "About Crown Allstar — Tim Cheerleading Elite Bandung",
    description: "16× National Champion. ICA Prototype Team. Founded 2008 in Bandung. ICU World Championship representative.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
