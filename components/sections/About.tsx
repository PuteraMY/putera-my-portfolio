"use client";

import { ArrowUpRight, BriefcaseBusiness, FolderKanban, Layers3, RadioTower } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { projectCounts, site } from "@/data/portfolio";

const facts = [
  { value: projectCounts.featured, label: "Featured projects", Icon: FolderKanban, detail: "Documented below" },
  { value: projectCounts.live, label: "Live projects", Icon: RadioTower, detail: "Demo links available" },
  { value: projectCounts.active, label: "Active build", Icon: BriefcaseBusiness, detail: "CINEX in development" },
  { value: projectCounts.areas, label: "Focus areas", Icon: Layers3, detail: "Web, cloud and IT" },
];

export function About() {
  return (
    <section id="about" className="section-block about-section" aria-labelledby="about-heading">
      <div className="page-container about-grid">
        <div className="about-copy">
          <SectionHeading eyebrow="ABOUT ME" id="about-heading">I build practical<br />digital solutions.</SectionHeading>
          <p className="about-description">{site.about}</p>
          <a href="#projects" className="btn btn-secondary about-link">More About My Work <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="facts-grid" aria-label="Project facts derived from published portfolio data">
          {facts.map(({ value, label, Icon, detail }, index) => (
            <Reveal key={label} delay={index * 0.06}>
              <article className="fact-card">
                <span className="fact-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.85} /></span>
                <div className="fact-content"><strong><CountUp value={value} /></strong><span>{label}</span><small>{detail}</small></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
