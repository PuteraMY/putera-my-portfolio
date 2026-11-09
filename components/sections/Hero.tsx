"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CircleCheck, Cloud, Code2, GraduationCap, Layers3, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, type PointerEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { projectCounts, site } from "@/data/portfolio";
import { TechnologyIcon } from "@/components/ui/TechnologyIcon";
import type { Skill } from "@/data/portfolio";

const strip: { name: string; icon: Skill["icon"]; color: string }[] = [
  { name: "HTML", icon: "html", color: "#E76E38" },
  { name: "CSS", icon: "css", color: "#39A7DD" },
  { name: "JavaScript", icon: "js", color: "#D1A600" },
  { name: "TypeScript", icon: "ts", color: "#4A97DC" },
  { name: "Vue 3", icon: "vue", color: "#36AD77" },
  { name: "Next.js", icon: "next", color: "var(--ink)" },
  { name: "GitHub", icon: "github", color: "var(--ink)" },
]

function LaptopVisual() {
  return (
    <div className="laptop-composition" role="img" aria-label="Stylized laptop displaying a sample TypeScript code editor and a floating project code card; illustration, not a screenshot">
      <div className="scene-orbit scene-orbit-outer" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-inner" aria-hidden="true" />
      <div className="scene-depth" aria-hidden="true">
        <div className="hero-halo" />
        <div className="scene-platform"><span /><span /></div>
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
        <div className="scene-service-stack">
          <span><Code2 size={16} /> Web Apps</span>
          <span><Cloud size={16} /> Cloud</span>
          <span><Sparkles size={16} /> IT Support</span>
        </div>
        <div className="scene-project-note">
          <div className="scene-project-note-top"><Code2 size={16} /> Portfolio <ArrowUpRight size={15} /></div>
          <div className="scene-project-note-art"><span /><span /><span /></div>
          <div className="scene-project-note-lines"><i /><i /></div>
        </div>
        <div className="scene-stat-card"><Layers3 size={22} /><strong>{projectCounts.featured}</strong><span>Featured projects</span></div>
        <div className="scene-gem scene-gem-one"><i /><i /><i /></div>
        <div className="scene-gem scene-gem-two"><i /><i /><i /></div>
      </div>
    </div>
  );
}

export function Hero({ cvHref }: { cvHref: string | null }) {
  const reduce = useReducedMotion();
  const auroraFrame = useRef<number | null>(null);
  const sceneFrame = useRef<number | null>(null);

  // Pointer-based glow is opt-in for fine pointers and runs at most once per frame.
  useEffect(() => () => {
    if (auroraFrame.current !== null) cancelAnimationFrame(auroraFrame.current);
    if (sceneFrame.current !== null) cancelAnimationFrame(sceneFrame.current);
  }, []);

  const handleAuroraMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (auroraFrame.current !== null) return;
    const section = event.currentTarget;
    const { clientX, clientY } = event;
    auroraFrame.current = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      section.style.setProperty("--aurora-x", x.toFixed(1) + "%");
      section.style.setProperty("--aurora-y", y.toFixed(1) + "%");
      auroraFrame.current = null;
    });
  };

  const handleAuroraLeave = (event: PointerEvent<HTMLElement>) => {
    if (auroraFrame.current !== null) cancelAnimationFrame(auroraFrame.current);
    auroraFrame.current = null;
    event.currentTarget.style.removeProperty("--aurora-x");
    event.currentTarget.style.removeProperty("--aurora-y");
  };

  // Real perspective/parallax is mouse-only; mobile and reduced-motion users get a static scene.
  const handleSceneMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (sceneFrame.current !== null) return;
    const node = event.currentTarget;
    const x = event.clientX, y = event.clientY;
    sceneFrame.current = requestAnimationFrame(() => {
      const bounds = node.getBoundingClientRect();
      const dx = ((x - bounds.left) / bounds.width - 0.5) * 2;
      const dy = ((y - bounds.top) / bounds.height - 0.5) * 2;
      node.style.setProperty("--scene-ry", `${(dx * 7).toFixed(2)}deg`);
      node.style.setProperty("--scene-rx", `${(-dy * 6).toFixed(2)}deg`);
      sceneFrame.current = null;
    });
  };

  const handleSceneLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (sceneFrame.current !== null) cancelAnimationFrame(sceneFrame.current);
    sceneFrame.current = null;
    event.currentTarget.style.removeProperty("--scene-rx");
    event.currentTarget.style.removeProperty("--scene-ry");
  };

  const anim = (delay = 0) => ({
    initial: reduce ? false as const : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.52, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title" onPointerMove={handleAuroraMove} onPointerLeave={handleAuroraLeave}>
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <motion.div {...anim(0.04)} className="hero-intro-line">
            <Badge>I&apos;M A WEB DEVELOPER</Badge>
            <span className="hero-availability"><span className="availability-dot" aria-hidden="true" />{site.availability}</span>
          </motion.div>
          <motion.h1 {...anim(0.12)} id="hero-title" className="hero-title">Hi, I&apos;m <span className="gradient-name">Putera MY.</span><span className="hero-second-line">{site.headline}</span></motion.h1>
          <motion.p {...anim(0.21)} className="hero-lead">{site.bio}</motion.p>
          <motion.div {...anim(0.3)} className="hero-ctas">
            <LinkButton href="#projects">View My Work <ArrowUpRight size={18} aria-hidden="true" /></LinkButton>
            {cvHref ? <LinkButton variant="secondary" href={cvHref} download>Download CV (PDF) <ArrowDownRight size={18} aria-hidden="true" /></LinkButton> : <LinkButton variant="secondary" href="#contact">Contact <ArrowUpRight size={18} aria-hidden="true" /></LinkButton>}
          </motion.div>
          <motion.div {...anim(0.39)} className="hero-tech">
            <p className="eyebrow">TECHNOLOGIES I WORK WITH</p>
            <div className="tech-strip" aria-label="Technologies represented in published projects">
              {strip.map((s) => <span key={s.name} title={s.name} aria-label={s.name} className="tech-tile" style={{ color: s.color }}><TechnologyIcon name={s.icon} size={20} /></span>)}
            </div>
          </motion.div>
        </div>
        <motion.div {...anim(0.24)} className="hero-visual" onPointerMove={handleSceneMove} onPointerLeave={handleSceneLeave}><LaptopVisual /></motion.div>
      </div>
      <div className="page-container">
        <div className="hero-metrics" aria-label="Portfolio overview">
          <div className="hero-metric"><Layers3 size={24} aria-hidden="true" /><p><strong>{projectCounts.featured} projects</strong><span>Featured work</span></p></div>
          <div className="hero-metric"><GraduationCap size={25} aria-hidden="true" /><p><strong>Computer Technology</strong><span>Student</span></p></div>
          <div className="hero-metric"><Cloud size={24} aria-hidden="true" /><p><strong>Cloud Computing</strong><span>Focus area</span></p></div>
          <div className="hero-metric"><Sparkles size={24} aria-hidden="true" /><p><strong>Open to opportunities</strong><span>Internship · Junior roles</span></p></div>
        </div>
      </div>
      <div className="page-container hero-bottom-rule"><span className="font-mono">01 / INTRODUCTION</span><Link href="#about" aria-label="Scroll to About" className="scroll-hint">SCROLL TO EXPLORE <ArrowDownRight size={17} /></Link></div>
    </section>
  );
}
