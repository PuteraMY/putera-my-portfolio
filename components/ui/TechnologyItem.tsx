import type { Skill } from "@/data/portfolio";
import { TechnologyIcon } from "@/components/ui/TechnologyIcon";

export function TechnologyItem({ skill }: { skill: Skill }) {
  return (
    <li className="skill-evidence-item">
      <span className={"technology-icon technology-" + skill.icon} aria-hidden="true">
        <TechnologyIcon name={skill.icon} size={21} />
      </span>
      <span className="skill-evidence-text">
        <strong>{skill.label}</strong>
        <small>{skill.evidence}</small>
      </span>
    </li>
  );
}
