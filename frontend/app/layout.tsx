import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lead Tracker CRM",
  description: "Manage your leads efficiently",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-full flex flex-col">{children}</main>
      </body>
    </html>
  )
}
