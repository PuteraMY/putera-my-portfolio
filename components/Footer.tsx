"use client";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageToggle";

export default function Footer() {
  const { t, language } = useLanguage();
  return <footer className="ed-footer">
    <div className="container-site ed-footer-content">
      <span>{t.footer} · © {new Date().getFullYear()}</span>
      <span>{language === "bm" ? "DIBINA DENGAN TUJUAN" : "BUILT WITH INTENTION"}</span>
      <a href="#top" className="inline-flex items-center gap-2">{t.misc.top}<ArrowUpRight size={18} aria-hidden /></a>
    </div>
  </footer>;
}
