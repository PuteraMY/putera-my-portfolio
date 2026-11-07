"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/data/portfolio";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scroll, setScroll] = useState(0);
  const drawerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const href = (id: string) => path === "/" ? `#${id}` : `/#${id}`;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        if (path !== "/") return;
        let current = "home";
        for (const item of navItems) {
          const section = document.getElementById(item.id);
          if (section && section.getBoundingClientRect().top <= 125) current = item.id;
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
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const prior = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus());
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const resize = () => { if (window.innerWidth >= 1024) close(); };
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
      prior?.focus();
    };
  }, [open, close]);

  function trap(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;
    const focusables = drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (!focusables?.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return (
    <header className={`site-header ${scroll > 0.02 ? "header-scrolled" : ""}`}>
      <div className="page-container header-inner">
        <Link href="/" className="brand-lockup" aria-label="Putera MY — Homepage" onClick={close}>
          <Code2 size={29} strokeWidth={2.8} aria-hidden="true" className="brand-symbol" />
          <span>Putera MY</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.id} href={href(item.id)} className={`nav-link ${active === item.id && path === "/" ? "nav-active" : ""}`} aria-current={active === item.id && path === "/" ? "location" : undefined}>
              {item.label}
              {active === item.id && path === "/" && <motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }} aria-hidden="true" />}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link href={href("contact")} className="btn btn-primary header-hire">Let&apos;s Connect <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <button ref={menuButtonRef} type="button" className="menu-toggle" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((x) => !x)}>
            {open ? <X size={22} /> : <Menu size={22} />}<span>Menu</span>
          </button>
        </div>
      </div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scroll})` }} aria-hidden="true" />
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="mobile-scrim" aria-hidden="true" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} />
            <motion.nav
              ref={drawerRef}
              id="mobile-navigation"
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
              className="mobile-drawer"
              onKeyDown={trap}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : 24 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer-top"><p className="drawer-label font-mono">NAVIGATION / PUTERA MY</p><button type="button" className="drawer-close" aria-label="Close navigation menu" onClick={close}><X size={21} aria-hidden="true" /></button></div>
              {navItems.map((item, i) => <Link key={item.id} href={href(item.id)} className="drawer-link" onClick={close}><span className="font-mono drawer-index">0{i + 1}</span>{item.label}<ArrowUpRight size={20} className="ml-auto" aria-hidden="true" /></Link>)}
              <div className="drawer-theme"><p className="drawer-label font-mono">APPEARANCE / DARK &amp; LIGHT</p><ThemeToggle inMenu /></div><p className="drawer-note">{site.availability}</p>
              <Link href={href("contact")} className="btn btn-primary mt-5 justify-center" onClick={close}>Get in touch <ArrowUpRight size={18} /></Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
