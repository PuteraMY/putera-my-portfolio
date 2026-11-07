"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({ project, index, selected, total }: { project: Project; index: number; selected: boolean; total: number }) {
  const reduce = useReducedMotion();
  const tiltFrame = useRef<number | null>(null);

  const onCardMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (tiltFrame.current !== null) return;
    const node = event.currentTarget;
    const { clientX, clientY } = event;
    tiltFrame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      node.style.setProperty("--tilt-y", ((x - 0.5) * 5).toFixed(2) + "deg");
      node.style.setProperty("--tilt-x", ((0.5 - y) * 5).toFixed(2) + "deg");
      node.style.setProperty("--glow-x", (x * 100).toFixed(1) + "%");
      node.style.setProperty("--glow-y", (y * 100).toFixed(1) + "%");
      tiltFrame.current = null;
    });
  };

  const onCardLeave = (event: PointerEvent<HTMLElement>) => {
    if (tiltFrame.current !== null) cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = null;
    const node = event.currentTarget;
    node.style.removeProperty("--tilt-y");
    node.style.removeProperty("--tilt-x");
    node.style.removeProperty("--glow-x");
    node.style.removeProperty("--glow-y");
  };

  return (
    <motion.article
      className={`project-card project-${project.accent} ${selected ? "is-current" : ""}`}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      onPointerMove={onCardMove}
      onPointerLeave={onCardLeave}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.38, delay: reduce ? 0 : index * 0.06 }}
    >
      <Link href={`/projects/${project.slug}`} className="project-cover-link" aria-label={`Read ${project.title} case study`}>
        <div className="project-image-wrap">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 30vw" className="project-image" />
          <span className="project-number font-mono">0{index + 1}</span>
          <span className="project-cover-cue" aria-hidden="true">Explore project <ArrowUpRight size={16} /></span>
        </div>
      </Link>
      <div className="project-content">
        <div className="project-heading-row"><h3>{project.title}</h3><span className="project-status">{project.status === "live" ? "Live" : "In progress"}</span></div>
        <p className="project-category">{project.category}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">{project.stack.slice(0, 3).map((tag) => <Badge subtle key={tag}>{tag}</Badge>)}</div>
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`} className="project-text-link">Case study <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-text-link muted-link" aria-label={`Open ${project.title} live site in a new tab`}>Live site <ExternalLink size={15} aria-hidden="true" /></a>}
          {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-text-link muted-link" aria-label={`Open ${project.title} source code on GitHub in a new tab`}>Source code <ExternalLink size={15} aria-hidden="true" /></a>}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const goTo = (index: number) => {
    setActive(index);
    const viewport = scrollRef.current;
    const child = viewport?.children[index] as HTMLElement | undefined;
    if (viewport && child) {
      const left = child.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
      viewport.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  };
  const onScroll = () => {
    const viewport = scrollRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.children) as HTMLElement[];
    const index = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - viewport.offsetLeft - viewport.scrollLeft) < Math.abs(cards[best].offsetLeft - viewport.offsetLeft - viewport.scrollLeft) ? i : best, 0);
    setActive(index);
  };

  return (
    <section id="projects" className="section-block projects-section" aria-labelledby="projects-heading">
      <div className="page-container">
        <SectionHeading centered eyebrow="FEATURED PROJECTS" id="projects-heading">Some of My Recent Work</SectionHeading>
        <p className="project-mobile-prompt"><ArrowLeftRight size={16} aria-hidden="true" /> SWIPE THE CARDS TO EXPLORE</p>
        <div className="projects-carousel" ref={scrollRef} onScroll={onScroll} role="region" aria-roledescription="carousel" aria-label="Featured projects carousel" aria-describedby="project-swipe-hint" tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.min(active + 1, projects.length - 1)); }
            if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.max(active - 1, 0)); }
          }}>
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} selected={active === index} total={projects.length} />)}
        </div>
        <p className="project-swipe-hint" id="project-swipe-hint"><span className="project-swipe-count" aria-live="polite">Project 0{active + 1} of 0{projects.length}</span></p>
        <div className="project-controls">
          <button type="button" className="project-nav-button" aria-label="Previous project" disabled={active === 0} onClick={() => goTo(Math.max(0, active - 1))}><ArrowLeft size={19} aria-hidden="true" /></button>
          <div className="project-pagination" role="group" aria-label="Choose a featured project">
            {projects.map((project, index) => <button key={project.slug} type="button" className={`pagination-dot ${index === active ? "is-active" : ""}`} aria-label={`Go to project ${index + 1}: ${project.title}`} aria-pressed={index === active} onClick={() => goTo(index)} />)}
          </div>
          <button type="button" className="project-nav-button" aria-label="Next project" disabled={active === projects.length - 1} onClick={() => goTo(Math.min(active + 1, projects.length - 1))}><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
