"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, CircleDashed, Cloud, Clapperboard, Layers3, Github } from "lucide-react";
import type { Project, ProjectStatus } from "@/data/projects";
import { useLanguage } from "./LanguageToggle";
const statusIcons = { live: CheckCircle2, "in-development": CircleDashed, "coming-soon": Clock3 };
export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t, language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const Icon = statusIcons[project.status];
  const Visual = project.id === "nimbuscloud" ? Cloud : project.id === "cinex" ? Clapperboard : Layers3;
  const status: Record<ProjectStatus, string> = { live: t.projects.live, "in-development": t.projects.development, "coming-soon": t.projects.soon };
  return <article aria-labelledby={"project-" + project.id} className="surface-card interactive-card group flex h-full flex-col overflow-hidden">
    <div className="relative aspect-[16/10] overflow-hidden bg-purple-50 dark:bg-[#2C2236]">
      {project.image && !failed ? <Image src={project.image} alt={project.title + " — " + t.projects.image} fill priority={index === 0} sizes="(min-width:1024px) 48vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none" onError={() => setFailed(true)} /> :
      <div role="img" aria-label={project.title + " — " + t.projects.image} className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#35105B] via-brand to-[#8850BD] text-white">
        <span aria-hidden className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[36px] border-white/10" />
        <div className="relative flex flex-col items-center gap-5"><Visual className="h-14 w-14 text-brand-lime" aria-hidden /><b className="text-3xl tracking-tight">{project.title}</b></div>
      </div>}
      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-2 text-sm font-semibold text-[#20152E] shadow-sm"><Icon size={16} className="text-brand" aria-hidden />{status[project.status]}</span>
    </div>
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      {project.featured && <p className="eyebrow text-brand dark:text-[#CCA5FA]">{t.projects.featured}</p>}
      <h3 id={"project-" + project.id} className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{project.title}</h3>
      <p className="mt-4 text-base leading-8 text-[#595265] dark:text-[#CDC4D6]">{project.summary[language]}</p>
      {project.tech.length > 0 && <div className="mt-6"><p className="text-sm font-bold uppercase tracking-wide text-[#5F566B] dark:text-[#D4C7E0]">{t.projects.technologies}</p><div className="mt-3 flex flex-wrap gap-2">{project.tech.map(tech => <span key={tech} className="tag">{tech}</span>)}</div></div>}
      <details className="mt-6 border-t border-neutral-200 pt-5 dark:border-white/10"><summary className="cursor-pointer text-base font-semibold text-brand dark:text-[#CCA5FA]">{t.projects.details}</summary><p className="mt-3 rounded-xl bg-[#F6F2FA] p-4 text-base leading-8 text-[#51495C] dark:bg-white/5 dark:text-[#D6CBE1]">{project.problem[language]}</p></details>
      {(project.liveUrl || project.repoUrl) && <div className="mt-auto flex flex-wrap gap-3 pt-7">
        {project.liveUrl && <a className="button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">{t.projects.view}<ArrowUpRight size={17} aria-hidden /></a>}
        {project.repoUrl && <a className="button-secondary" href={project.repoUrl} target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden />{t.projects.source}</a>}
      </div>}
    </div>
  </article>;
}
