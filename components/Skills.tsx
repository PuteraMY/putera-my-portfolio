"use client";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";

const web = ["HTML / CSS", "JavaScript", "TypeScript", "React", "Next.js", "REST APIs"];
const cloud = ["Firebase", "Vercel", "GitHub", "hardware", "network"];

export default function Skills() {
  const { t, language } = useLanguage();
  const groups = [
    { number: "01", title: t.skills.web, skills: web },
    { number: "02", title: t.skills.cloud, skills: cloud }
  ];
  return <section className="ed-skills" id="skills" aria-labelledby="skills-heading">
    <div className="container-site">
      <ScrollReveal>
        <div className="ed-section-line" style={{ borderColor: "var(--hairline)", color: "var(--secondary)" }}>
          <span>{t.skills.eyebrow}</span><span>WEB / CLOUD / IT</span>
        </div>
        <div className="ed-skills-head">
          <h2 className="ed-section-heading" id="skills-heading">{t.skills.title}</h2>
          <p>{t.skills.intro}</p>
        </div>
      </ScrollReveal>
      <div className="ed-skills-grid">
        {groups.map((group, i) => <ScrollReveal key={group.number} delay={i * .08}>
          <article className="ed-skill-panel">
            <p className="ed-skill-panel-label">{group.number} / {language === "bm" ? "KEMAHIRAN UTAMA" : "CORE PRACTICE"}</p>
            <h3>{group.title}</h3>
            <ul className="ed-skill-grid">{group.skills.map(skill => <li key={skill}>{skill === "hardware" ? t.skills.hardware : skill === "network" ? t.skills.network : skill}</li>)}</ul>
          </article>
        </ScrollReveal>)}
      </div>
    </div>
  </section>;
}
