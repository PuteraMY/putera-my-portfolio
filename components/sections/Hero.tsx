"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CircleCheck, Code2, Terminal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/data/portfolio";

const strip = [
  { name: "HTML", color: "#F97316", display: "5" },
  { name: "CSS", color: "#38BDF8", display: "3" },
  { name: "JavaScript", color: "#FACC15", display: "JS" },
  { name: "TypeScript", color: "#60A5FA", display: "TS" },
  { name: "Vue", color: "#4ADE80", display: "V" },
  { name: "Next.js", color: "#C4B5FD", display: "N" },
  { name: "GitHub", color: "#FB7185", display: "G" },
];

function LaptopVisual() {
  return (
    <div className="laptop-composition" role="img" aria-label="Stylized laptop displaying a sample TypeScript code editor and a floating project code card; illustration, not a screenshot">
      <div className="hero-halo" aria-hidden="true" />
      <div className="laptop" aria-hidden="true">
        <div className="laptop-top">
          <div className="laptop-bezel">
            <div className="laptop-camera" />
            <div className="laptop-screen">
              <div className="editor-topline"><span className="editor-dots"><i /><i /><i /></span><span>putera / workbench</span><span>●</span></div>
              <div className="editor-tab">⌁ &nbsp;portfolio.ts</div>
              <div className="editor-code"><div><span className="editor-num">01</span><span className="syntax-violet">const</span> projects = [</div>
                <div><span className="editor-num">02</span>&nbsp;&nbsp;<span className="syntax-gold">"CINEX"</span>,</div>
                <div><span className="editor-num">03</span>&nbsp;&nbsp;<span className="syntax-gold">"VANTA FUN"</span>,</div>
                <div><span className="editor-num">04</span>&nbsp;&nbsp;<span className="syntax-gold">"NimbusCloud"</span></div>
                <div><span className="editor-num">05</span>];</div>
                <div><span className="editor-num">06</span></div>
                <div><span className="editor-num">07</span><span className="syntax-violet">export default</span> projects;</div>
              </div>
              <div className="editor-status"><span>TypeScript</span><span>UTF-8 &nbsp;✓</span></div>
            </div>
          </div>
        </div>
        <div className="laptop-bottom"><div className="laptop-keyboard" /></div>
        <div className="laptop-lip" />
      </div>
      <div className="floating-code" aria-hidden="true">
        <div className="floating-code-header"><span><Code2 size={15} /> Code</span><span className="online-light" /></div>
        <div className="floating-code-body font-mono">
          <span className="syntax-violet">const</span> developer = {'{'}<br />
          &nbsp;&nbsp;name: <span className="syntax-gold">"Putera MY"</span>,<br />
          &nbsp;&nbsp;focus: <span className="syntax-gold">"Web + Cloud"</span>,<br />
          &nbsp;&nbsp;projects: <span className="syntax-gold">3</span><br />
          {'}'};
        </div>
      </div>
      <div className="laptop-bottom-label" aria-hidden="true"><Terminal size={16} /> DEV WORKSPACE <CircleCheck size={15} /></div>
    </div>
  );
}

export function Hero({ cvHref }: { cvHref: string | null }) {
  const reduce = useReducedMotion();
  const anim = (delay = 0) => ({
    initial: reduce ? false as const : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.52, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <motion.div {...anim(0.04)}><Badge>I&apos;M A WEB DEVELOPER</Badge></motion.div>
          <motion.h1 {...anim(0.12)} id="hero-title" className="hero-title">Hi, I&apos;m <span className="gradient-name">Putera MY.</span><span className="hero-second-line">{site.headline}</span></motion.h1>
          <motion.p {...anim(0.21)} className="hero-lead">{site.bio}</motion.p>
          <motion.div {...anim(0.3)} className="hero-ctas">
            <LinkButton href="#projects">View My Work <ArrowUpRight size={18} aria-hidden="true" /></LinkButton>
            {cvHref ? <LinkButton variant="secondary" href={cvHref} download>Download CV (PDF) <ArrowDownRight size={18} aria-hidden="true" /></LinkButton> : <LinkButton variant="secondary" href="#contact">Contact <ArrowUpRight size={18} aria-hidden="true" /></LinkButton>}
          </motion.div>
          <motion.div {...anim(0.39)} className="hero-tech">
            <p className="eyebrow">TECHNOLOGIES I WORK WITH</p>
            <div className="tech-strip" aria-label="Technologies represented in published projects">
              {strip.map((s) => <span key={s.name} title={s.name} aria-label={s.name} className="tech-tile" style={{ color: s.color }}>{s.display}</span>)}
            </div>
          </motion.div>
        </div>
        <motion.div {...anim(0.24)} className="hero-visual"><LaptopVisual /></motion.div>
      </div>
      <div className="page-container hero-bottom-rule"><span className="font-mono">01 / INTRODUCTION</span><Link href="#about" aria-label="Scroll to About" className="scroll-hint">SCROLL TO EXPLORE <ArrowDownRight size={17} /></Link></div>
    </section>
  );
}
