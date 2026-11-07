"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`project-card project-${project.accent}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.38, delay: reduce ? 0 : index * 0.06 }}
    >
      <Link href={`/projects/${project.slug}`} className="project-cover-link" aria-label={`Read ${project.title} case study`}>
        <div className="project-image-wrap">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 30vw" className="project-image" />
          <span className="project-number font-mono">0{index + 1}</span>
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
    if (viewport && child) viewport.scrollTo({ left: child.offsetLeft - viewport.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
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
        <div className="projects-carousel" ref={scrollRef} onScroll={onScroll} aria-label="Featured projects carousel">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
        <div className="project-pagination" role="group" aria-label="Choose a featured project">
          {projects.map((project, index) => <button key={project.slug} type="button" className={`pagination-dot ${index === active ? "is-active" : ""}`} aria-label={`Go to project ${index + 1}: ${project.title}`} aria-pressed={index === active} onClick={() => goTo(index)} />)}
        </div>
      </div>
    </section>
  );
}
