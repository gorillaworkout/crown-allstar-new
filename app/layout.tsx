import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CROWN ALLSTAR | Elite Cheerleading",
  description: "Crown Allstar — Indonesia's elite cheerleading team. Building champions through discipline, teamwork, and relentless training.",
  keywords: ["cheerleading", "crown allstar", "indonesia cheerleading", "cheer team", "stunts", "tumbling"],
  openGraph: {
    title: "CROWN ALLSTAR",
    description: "Indonesia's Elite Cheerleading Team",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
