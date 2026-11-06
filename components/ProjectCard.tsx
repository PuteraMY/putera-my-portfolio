"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project, ProjectStatus } from "@/data/projects";
import { useLanguage } from "./LanguageToggle";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t, language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const status: Record<ProjectStatus, string> = {
    live: t.projects.live,
    "in-development": t.projects.development,
    "coming-soon": t.projects.soon
  };
  const label = language === "bm" ? "PROJEK PILIHAN" : "SELECTED PROJECT";
  return <article className="ed-project-card" aria-labelledby={"project-" + project.id}>
    <div className="ed-project-media" data-visual={project.id}>
      {project.image && !failed && <Image
        src={project.image}
        fill
        alt={project.title + " — " + t.projects.image}
        sizes="(min-width: 1024px) 48vw, (min-width: 768px) 48vw, 100vw"
        className="object-cover"
        priority={index === 0}
        onError={() => setFailed(true)}
      />}
      {(!project.image || failed) && <>
        <span className="ed-media-figure" aria-hidden />
        <span className="ed-media-label">{label} / 0{index + 1}</span>
        <strong className="ed-media-brand">{project.title === "CINEX" ? <>CINE<em>X.</em></> : project.title}</strong>
      </>}
    </div>
    <div className="ed-project-body">
      <div className="ed-project-pretitle"><span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: "50%", background: project.status === "live" ? "#287C78" : "#B78354" }}/>{status[project.status]}{project.featured ? " / " + t.projects.featured : ""}</div>
      <h3 id={"project-" + project.id}>{project.title}</h3>
      <p className="ed-project-summary">{project.summary[language]}</p>
      {!!project.tech.length && <div className="ed-project-tags">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>}
      <details className="ed-project-details">
        <summary>{t.projects.details}</summary>
        <p>{project.problem[language]}</p>
      </details>
      {(project.liveUrl || project.repoUrl) && <div className="ed-project-actions">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{t.projects.view}<ArrowUpRight size={18} aria-hidden /></a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">{t.projects.source}<GitBranch size={18} aria-hidden /></a>}
      </div>}
    </div>
  </article>;
}
