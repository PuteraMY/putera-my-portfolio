"use client";
import { useState } from "react";
import { projects, type ProjectStatus } from "@/data/projects";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
type Filter = ProjectStatus | "all";
export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const filterEnabled = projects.length >= 4;
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.all }, { id: "live", label: t.projects.live },
    { id: "in-development", label: t.projects.development }, { id: "coming-soon", label: t.projects.soon }
  ];
  const visible = projects.filter(p => !filterEnabled || filter === "all" || p.status === filter).sort((a,b) => Number(b.featured) - Number(a.featured));
  return <section id="projects" aria-labelledby="projects-heading" className="section-space border-t border-neutral-200 dark:border-white/10">
    <div className="container-site">
      <ScrollReveal><p className="eyebrow">{t.projects.eyebrow}</p><h2 id="projects-heading" className="section-heading mt-5">{t.projects.title}</h2><p className="section-copy mt-6 max-w-[650px]">{t.projects.intro}</p></ScrollReveal>
      {filterEnabled && <div role="group" aria-label={t.projects.all} className="mt-10 flex flex-wrap gap-2">{filters.map(item =>
        <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className={"min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors " + (filter === item.id ? "border-brand bg-brand text-white" : "border-neutral-200 bg-white text-[#43394F] hover:border-brand dark:border-white/20 dark:bg-white/5 dark:text-white")}>{item.label}</button>
      )}</div>}
      <div className="mt-12 grid gap-7 md:grid-cols-2">{visible.length ? visible.map((project, index) => <ScrollReveal key={project.id} className="h-full" delay={index < 2 ? index * .08 : 0}><ProjectCard project={project} index={index}/></ScrollReveal>) : <p className="section-copy md:col-span-2">{t.projects.none}</p>}</div>
    </div>
  </section>;
}
