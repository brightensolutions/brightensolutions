import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Slab } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Brighten Solutions | Top Software & Web Development Company in Surat",
  description:
    "Leading custom software development, web & app development, digital marketing, and graphic design company in Surat. Specializing in e-visiting cards, social media management, and printing solutions.",
  keywords:
    "web development Surat, app development Surat, custom software development, digital marketing agency Surat, graphic design company, e-visiting cards, social media management, website development company in Surat, best web developers in Surat, mobile app development, UI/UX design, SEO services Surat, printing solutions, branding agency Surat, IT company in Surat, software development services, responsive web design, ecommerce website development, business card design, digital solutions provider",
  authors: [{ name: "Brighten Solutions" }],
  creator: "Brighten Solutions",
  publisher: "Brighten Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brightensolutions.com"),
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Brighten Solutions | Top Software & Web Development Company in Surat",
    description:
      "Leading custom software development, web & app development, digital marketing, and graphic design company in Surat. Specializing in e-visiting cards, social media management, and printing solutions.",
    url: "https://brightensolutions.com",
    siteName: "Brighten Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logos/Brighten-Solution-OG-Image.jpg",
        width: 1200,
        height: 630,
        alt: "Brighten Solutions - Custom Software Development Company in Surat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brighten Solutions | Top Software & Web Development Company in Surat",
    description:
      "Leading custom software development, web & app development, digital marketing, and graphic design company in Surat. Specializing in e-visiting cards, social media management, and printing solutions.",
    images: ["/logos/Brighten-Solution-Twitter-Card.jpg"],
    creator: "@brightensolutions",
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google verification code
  },
  category: "Technology",
  classification: "Business & Technology",
  referrer: "origin-when-cross-origin",
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Surat",
    "geo.position": "21.1702;72.8311",
    ICBM: "21.1702, 72.8311",
    "facebook-domain-verification": "your-facebook-domain-verification", // Replace with your Facebook verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      
      <body className={`${inter.variable} ${robotoSlab.variable}`}>
        {children}
        {/* <RawDataTracker /> */}
        {/* <SetVisitorCookie />
        <StorageGrabber /> */}
      </body>
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
    </html>
  )
}
