"use client";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageToggle";
export default function Footer() {
  const { t } = useLanguage();
  return <footer className="border-t border-white/15 bg-[#21132F] text-white"><div className="container-site flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
    <div><p className="text-base font-bold">{t.footer}</p><p className="mt-1 text-sm text-[#D7CBE2]">© {new Date().getFullYear()} PUTERA MY</p></div>
    <a href="#top" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-lime hover:underline">{t.misc.top}<ArrowUpRight size={17} aria-hidden /></a>
  </div></footer>;
}
