import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyItem } from "@/components/ui/TechnologyItem";
import { skills } from "@/data/portfolio";

const groups = ["Web foundations", "Frameworks", "Workflow & deployment"] as const;

export function Skills() {
  return (
    <section id="skills" className="section-block skills-section" aria-labelledby="skills-heading">
      <div className="page-container">
        <SectionHeading centered eyebrow="TOOLS IN MY PROJECTS" id="skills-heading">Technologies I Work With</SectionHeading>
        <p className="skills-note">A project-backed toolkit, not self-rated percentages. You can inspect the work in the case studies below.</p>
        <div className="skills-grid">
          {groups.map((group) => (
            <div className="skill-column" key={group}>
              <h3 className="skill-group-heading">{group}</h3>
              <ul className="skill-evidence-list">
                {skills.filter((skill) => skill.category === group).map((skill) => <TechnologyItem skill={skill} key={skill.label} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
