import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/context/theme-provider";
import { site } from "@/data/portfolio";
import "./globals.css";
import "./hero-3d.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-jakarta" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: site.url },
  title: { default: "Putera MY — Web Developer & Cloud Computing", template: "%s | Putera MY" },
  description: site.description,
  openGraph: {
    title: "Putera MY — Web Developer & Cloud Computing",
    description: site.description,
    url: site.url,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Putera MY portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Putera MY", description: site.description, images: ["/opengraph-image"] },
  robots: process.env.VERCEL_ENV === "production" ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B1A" },
    { media: "(prefers-color-scheme: light)", color: "#F8F7FF" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    sameAs: [site.github, site.linkedin].filter(Boolean),
    knowsAbout: ["Web development", "Cloud Computing", "IT support"],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=new URLSearchParams(location.search).get(\"theme\");if(t===\"light\"||t===\"dark\"){var e=document.documentElement;e.classList.remove(\"dark\",\"light\");e.classList.add(t);e.style.colorScheme=t===\"light\"?\"only light\":\"dark\";localStorage.setItem(\"putera-my-portfolio-theme\",t)}}catch(e){}})();" }} /></head>
      <body className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}>
        <div className="light-theme-canvas" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none" focusable="false">
            <rect width="100%" height="100%" fill="#F8F7FF" />
          </svg>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
        <Providers>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
