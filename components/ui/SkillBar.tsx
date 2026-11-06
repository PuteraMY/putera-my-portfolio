"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Skill } from "@/data/portfolio";
import { projects, skillUsage } from "@/data/portfolio";

export function SkillBar({ skill }: { skill: Skill }) {
  const container = useRef<HTMLLIElement>(null);
  const visible = useInView(container, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const count = skillUsage(skill);
  const coverage = Math.round((count / projects.length) * 100);

  return (
    <li className="skill-item" ref={container}>
      <span className="skill-emblem" style={{ color: skill.swatch }} aria-hidden="true">{skill.symbol}</span>
      <div className="skill-main">
        <div className="skill-meta">
          <strong>{skill.label}</strong>
          <span className="font-mono">{count}/{projects.length} projects</span>
        </div>
        <div className="skill-track" role="img" aria-label={`${skill.label} is used in ${count} of ${projects.length} featured projects; this is not a proficiency rating`}>
          <motion.div
            className="skill-fill"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: visible || reduced ? coverage / 100 : 0 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </li>
  );
}
