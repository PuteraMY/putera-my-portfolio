"use client";
import { ArrowDownRight, ArrowRight, Download, GitBranch, BriefcaseBusiness, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
export default function Hero() {
  const { t } = useLanguage();
  return <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-[#FAF9FC] dark:bg-[#0D0C13]">
    <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-[#D9C2ED]/30 blur-3xl dark:bg-brand/10" aria-hidden />
    <div className="container-site relative grid min-h-[670px] items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
      <ScrollReveal>
        <p className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-bold text-brand dark:border-purple-500/30 dark:bg-white/5 dark:text-[#E3CCFB]"><Sparkles size={15} aria-hidden />{t.hero.eyebrow}</p>
        <h1 id="hero-title" className="mt-8 max-w-[680px] text-[clamp(3.6rem,8vw,6.7rem)] font-extrabold leading-[0.98] tracking-[-0.075em]">{t.hero.title}<br/><span className="text-brand dark:text-[#C49BEC]">{t.hero.emphasis}</span></h1>
        <p className="mt-7 text-xl font-bold text-[#262130] dark:text-white">{site.role} <span className="text-brand dark:text-[#C49BEC]">/</span> {site.secondary}</p>
        <p className="mt-5 max-w-[590px] text-base leading-8 text-[#514B5B] dark:text-[#C5BDCF]">{t.hero.intro}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a className="button-primary" href="#projects">{t.hero.view}<ArrowRight size={19} aria-hidden /></a>
          {site.cvUrl ? <a className="button-secondary" href={site.cvUrl} download><Download size={19} aria-hidden />{t.hero.cv}</a> : <span className="button-secondary cursor-default opacity-65" aria-label={t.hero.cvPending}><Download size={18} aria-hidden />{t.hero.cvPending}</span>}
        </div>
        <div className="mt-8 flex items-center gap-3">
          <a className="icon-button" aria-label="GitHub" href={site.githubUrl} target="_blank" rel="noopener noreferrer"><GitBranch size={20}/></a>
          {site.linkedinUrl && <a className="icon-button" aria-label="LinkedIn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={20}/></a>}
          <a href="#projects" className="ml-3 inline-flex items-center gap-2 text-sm font-semibold text-[#565164] hover:text-brand dark:text-[#C5BDCF]">{t.hero.proof}<ArrowDownRight size={17} aria-hidden /></a>
        </div>
      </ScrollReveal>
      <ScrollReveal className="relative" delay={0.1}>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#21142F] p-8 text-white shadow-[0_32px_90px_rgba(52,18,83,.18)] sm:p-11">
          <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full border-[55px] border-white/5" aria-hidden />
          <div className="relative flex items-center justify-between text-sm font-bold tracking-[.16em]"><span>PUTERA / MY</span><span className="h-3 w-3 rounded-full bg-brand-lime" aria-hidden /></div>
          <div className="relative mt-28 text-[clamp(5rem,12vw,9.4rem)] font-black leading-[.8] tracking-[-.11em]">PM<span className="text-brand-lime">.</span></div>
          <div className="relative mt-12 h-px bg-white/25" />
          <div className="relative mt-7 flex flex-col gap-3">
            <p className="text-sm font-bold uppercase tracking-[.14em] text-brand-lime">{t.hero.availability}</p>
            <p className="text-base leading-7 text-[#D9D1E5]">{site.secondary} · Next.js · TypeScript · Responsive UI</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>;
}
