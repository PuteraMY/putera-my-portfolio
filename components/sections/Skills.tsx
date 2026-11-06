"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBar } from "@/components/ui/SkillBar";
import { skills } from "@/data/portfolio";

const groups = ["Web languages", "Frameworks", "Tools & platforms"];

export function Skills() {
  return (
    <section id="skills" className="section-block skills-section" aria-labelledby="skills-heading">
      <div className="page-container">
        <SectionHeading centered eyebrow="MY SKILLS" id="skills-heading">Technologies I Use</SectionHeading>
        <p className="skills-note">Bars show how often a tool appears in the featured projects, not a self-rated proficiency percentage.</p>
        <div className="skills-grid">
          {groups.map((group) => (
            <div className="skill-column" key={group}>
              <h3 className="skill-group-heading">{group}</h3>
              <ul>{skills.filter((skill) => skill.category === group).map((skill) => <SkillBar key={skill.label} skill={skill} />)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
