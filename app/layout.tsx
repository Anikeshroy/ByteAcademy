import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import PWANotification from "@/components/pwa-notification"
import { Analytics } from '@vercel/analytics/next';
import GoogleAnalytics from "@/components/GoogleAnalytics"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
}

export const metadata: Metadata = {
  title: "ByteAcademy - CSE Resources",
  description: "A platform for CSE students to access study materials, previous year question papers, notes, and video solutions.",
  metadataBase: new URL('https://byte-academy-peach.vercel.app/'),
  openGraph: {
    title: "ByteAcademy - CSE Resources",
    description: "A platform for CSE students to access study materials, previous year question papers, notes, and video solutions.",
    url: "https://byte-academy-peach.vercel.app/",
    siteName: "ByteAcademy",
    images: [
      {
        url: "/export.png",
        width: 1200,
        height: 630,
        alt: "ByteAcademy - CSE Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteAcademy - CSE Resources",
    description: "A platform for CSE students to access study materials, previous year question papers, notes, and video solutions.",
    images: ["/export.png"],
    creator: "@yourtwitterhandle",
  },
  alternates: {
    canonical: "https://byte-academy-peach.vercel.app/",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ByteAcademy",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="ByteAcademy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ByteAcademy" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1498677281930673"
          crossOrigin="anonymous"
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "r1wau81u49");`
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <PWANotification />
          </div>
        </ThemeProvider>
        <Script src="/pwa.js" strategy="lazyOnload" />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}

