import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rodney Naro | Full-Stack Developer Portfolio",
    template: "%s | Rodney Naro"
  },
  description: "Full-Stack Developer specializing in TypeScript, React, React Native, Next.js, and 3D Web Experiences. Building innovative solutions from PNG Unitech.",
  keywords: [
    "Rodney Naro",
    "Full-Stack Developer",
    "TypeScript Developer",
    "React Developer",
    "React Native Developer",
    "Next.js",
    "Three.js",
    "Web Developer",
    "Mobile Developer",
    "Papua New Guinea Developer",
    "PNG Unitech",
    "3D Web Development",
    "Frontend Developer",
    "Backend Developer"
  ],
  authors: [{ name: "Rodney Naro", url: "https://github.com/rodnar123" }],
  creator: "Rodney Naro",
  publisher: "Rodney Naro",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rodneynaro.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Rodney Naro Portfolio",
    title: "Rodney Naro | Full-Stack Developer Portfolio",
    description: "Full-Stack Developer specializing in TypeScript, React, React Native, and 3D Web Experiences",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rodney Naro - Full-Stack Developer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodney Naro | Full-Stack Developer",
    description: "Full-Stack Developer specializing in TypeScript, React, React Native, and 3D Web Experiences",
    images: ["/images/profile.jpg"],
    creator: "@rodneynaro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/profile.jpg",
    shortcut: "/images/profile.jpg",
    apple: "/images/profile.jpg",
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://rodneynaro.vercel.app',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1f2937" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
