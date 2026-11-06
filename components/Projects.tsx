"use client";
import { useState } from "react";
import { projects, type ProjectStatus } from "@/data/projects";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";

type Filter = ProjectStatus | "all";
export default function Projects() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const enabled = projects.length >= 4;
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.all },
    { id: "live", label: t.projects.live },
    { id: "in-development", label: t.projects.development },
    { id: "coming-soon", label: t.projects.soon },
  ];
  const visible = projects.filter(p => !enabled || filter === "all" || p.status === filter).sort((a, b) => Number(b.featured) - Number(a.featured));
  return <section className="ed-work" id="projects" aria-labelledby="projects-heading">
    <div className="container-site">
      <ScrollReveal>
        <div className="ed-section-line"><span>{t.projects.eyebrow}</span><span>PUTERA MY / 001–003</span></div>
        <h2 className="ed-section-heading" id="projects-heading">{t.projects.title}</h2>
        <p className="ed-work-sub">{t.projects.intro}</p>
      </ScrollReveal>
      {enabled && <div role="group" aria-label={language === "bm" ? "Penapis projek" : "Project status filters"} className="ed-filter">
        {filters.map(option => <button type="button" key={option.id} aria-pressed={filter === option.id} onClick={() => setFilter(option.id)}>{option.label}</button>)}
      </div>}
      <div className="ed-projects" aria-live="polite">
        {visible.map((project, i) => <ScrollReveal key={project.id} delay={i < 2 ? i * .07 : 0} className="h-full"><ProjectCard project={project} index={i}/></ScrollReveal>)}
        {!visible.length && <p style={{ color: "white" }}>{t.projects.none}</p>}
      </div>
    </div>
  </section>;
}
