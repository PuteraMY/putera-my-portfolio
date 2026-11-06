"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageToggle";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
const sections = ["projects", "skills", "about", "contact"] as const;
export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? Math.min(100, 100 * window.scrollY / available) : 0);
        let current = "";
        for (const id of sections) {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= 170) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (innerWidth >= 768) setMenuOpen(false); };
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => { removeEventListener("keydown", onKey); removeEventListener("resize", onResize); };
  }, [menuOpen]);
  const nav = [
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact }
  ];
  return <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#111016]/95">
    <div className="container-site flex h-[76px] items-center justify-between gap-3">
      <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="PUTERA MY — home" onClick={() => setMenuOpen(false)}>
        <Image src="/images/putera-logo-f.svg" alt="" aria-hidden width={48} height={48} className="h-11 w-11 rounded-xl bg-[#F4EAFD] p-1.5 dark:bg-white" priority />
        <span className="text-[16px] font-extrabold tracking-tight">PUTERA <span className="text-brand dark:text-[#CCA5FA]">MY</span><span className="text-brand">.</span></span>
      </a>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
        {nav.map(item => <a key={item.id} href={"#" + item.id} aria-current={active === item.id ? "location" : undefined} className={"text-sm font-semibold transition-colors hover:text-brand dark:hover:text-[#CCA5FA] " + (active === item.id ? "text-brand dark:text-[#CCA5FA]" : "text-[#50495C] dark:text-[#C7BFD0]")}>{item.label}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <LanguageToggle /><ThemeToggle />
        <a href="#contact" className="hidden min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-white hover:bg-brand-deep lg:inline-flex">{t.nav.contact}<ArrowUpRight aria-hidden size={17}/></a>
        <button type="button" aria-controls="mobile-nav" aria-expanded={menuOpen} aria-label={menuOpen ? t.misc.close : t.misc.menu} className="icon-button md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </div>
    {menuOpen && <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-[#191520] md:hidden">
      {nav.map(item => <a key={item.id} href={"#" + item.id} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-base font-semibold hover:bg-purple-50 dark:hover:bg-white/10">{item.label}</a>)}
    </nav>}
    <div aria-hidden className="absolute bottom-0 left-0 h-[3px] bg-brand dark:bg-brand-lime" style={{ width: progress + "%" }} />
  </header>;
}
