import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeToggle";
import { LanguageProvider } from "@/components/LanguageToggle";
import { site } from "@/data/site";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const baseUrl = site.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000");
const description = "PUTERA MY — Front-End Developer with Cloud Computing & IT Support skills. Explore NimbusCloud and CINEX, projects built by Putera.";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Putera MY | Front-End Developer, Cloud & IT Support",
  description,
  applicationName: "PUTERA MY Portfolio",
  keywords: ["Putera MY", "Front-End Developer", "Cloud Computing", "IT Support", "NimbusCloud", "CINEX", "Next.js", "React", "TypeScript"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Putera MY | Front-End Developer", description, siteName: "PUTERA MY", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PUTERA MY portfolio" }] },
  twitter: { card: "summary_large_image", title: "Putera MY | Front-End Developer", description, images: ["/opengraph-image"] },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme:light)", color: "#F7F7F4" }, { media: "(prefers-color-scheme:dark)", color: "#101C26" }] };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={inter.variable + " font-sans"}><ThemeProvider><LanguageProvider>
    <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-brand px-5 py-3 text-base font-semibold text-white focus:not-sr-only">Skip to content / Langkau ke kandungan</a>
    {children}
  </LanguageProvider></ThemeProvider></body></html>;
}
