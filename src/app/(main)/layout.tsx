import React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"

import { Suspense } from "react"
import "../globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Mohit Saini - Data Analyst | Power BI, SQL, Python",
  description:
    "Portfolio of Mohit Saini — a Data Analyst skilled in Power BI, SQL, Python, and data visualization. Explore my analytics projects, dashboards, and insights-driven work.",
  icons: {
    icon: "/5Fox.jpg",
    shortcut: "/5Fox.jpg",
    apple: "/5Fox.jpg",
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          width: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
