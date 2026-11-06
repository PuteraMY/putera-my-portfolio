"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "./LanguageToggle";
export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(scrollY > 640);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return <button type="button" aria-label={t.misc.top} title={t.misc.top} onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-xl transition-transform hover:-translate-y-1 dark:bg-brand-lime dark:text-[#1B1024] motion-reduce:transform-none"><ArrowUp size={21} aria-hidden /></button>;
}
