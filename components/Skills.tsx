"use client";
import { Code2, CloudCog, Check } from "lucide-react";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
const web = ["HTML / CSS", "JavaScript", "TypeScript", "React", "Next.js", "REST APIs"];
const cloud = ["Firebase", "Vercel", "GitHub", "hardware", "network"];
export default function Skills() {
  const { t } = useLanguage();
  const groups = [{ title: t.skills.web, icon: Code2, items: web }, { title: t.skills.cloud, icon: CloudCog, items: cloud }];
  return <section id="skills" aria-labelledby="skills-heading" className="section-space bg-[#F2EEF7] dark:bg-[#16131C]">
    <div className="container-site">
      <ScrollReveal><p className="eyebrow">{t.skills.eyebrow}</p><h2 id="skills-heading" className="section-heading mt-5">{t.skills.title}</h2><p className="section-copy mt-6 max-w-[680px]">{t.skills.intro}</p></ScrollReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">{groups.map((group,index) => <ScrollReveal key={group.title} delay={index*.1}><article className="surface-card h-full p-7 sm:p-9">
        <div className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEE2FA] text-brand dark:bg-[#3B2850] dark:text-[#D3AEFA]"><group.icon size={25} aria-hidden /></span><h3 className="text-xl font-extrabold sm:text-2xl">{group.title}</h3></div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">{group.items.map(item => <li key={item} className="flex min-h-12 items-center gap-3 rounded-xl border border-neutral-200 bg-[#FBF9FE] p-3 text-base font-semibold leading-6 dark:border-white/10 dark:bg-[#241D2E]"><Check size={18} aria-hidden className="shrink-0 text-brand dark:text-brand-lime"/>{item === "hardware" ? t.skills.hardware : item === "network" ? t.skills.network : item}</li>)}</ul>
      </article></ScrollReveal>)}</div>
    </div>
  </section>;
}
