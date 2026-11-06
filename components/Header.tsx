"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import LanguageToggle, { useLanguage } from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const sections = ["projects", "skills", "about", "contact"] as const;
export default function Header() {
  const { t } = useLanguage();
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 0);
        let current = "";
        for (const id of sections) {
          if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 170) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const nav = [
    { id: "projects", title: t.nav.projects },
    { id: "skills", title: t.nav.skills },
    { id: "about", title: t.nav.about },
    { id: "contact", title: t.nav.contact },
  ];
  return <header className="ed-header">
    <div className="container-site ed-header-content">
      <a href="#top" onClick={() => setMenuOpen(false)} className="ed-wordmark" aria-label="PUTERA MY — home">
        <span className="ed-mark"><Image src="/images/putera-logo-f.svg" alt="" aria-hidden width={33} height={33} priority /></span>
        <span>PUTERA <span style={{ color: "var(--steel-strong)" }}>MY</span><span style={{ color: "var(--copper)" }}>.</span></span>
      </a>
      <nav className="ed-nav" aria-label="Primary navigation">
        {nav.map(item => <a key={item.id} href={"#" + item.id} aria-current={active === item.id ? "location" : undefined}>{item.title}</a>)}
      </nav>
      <div className="ed-nav-actions">
        <LanguageToggle />
        <ThemeToggle />
        <a href="#contact" className="ed-contact-mini">{t.nav.contact} <ArrowUpRight size={16} aria-hidden /></a>
        <button type="button" className="icon-button md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-controls="mobile-nav" aria-expanded={menuOpen} aria-label={menuOpen ? t.misc.close : t.misc.menu}>
          {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>
    </div>
    {menuOpen && <nav className="ed-mobile-menu md:hidden" id="mobile-nav" aria-label="Mobile navigation">
      {nav.map(item => <a key={item.id} href={"#" + item.id} onClick={() => setMenuOpen(false)}>{item.title}</a>)}
    </nav>}
    <div className="ed-progress" aria-hidden style={{ width: progress + "%" }} />
  </header>;
}
