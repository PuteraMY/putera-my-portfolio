"use client";
import { ArrowRight, ArrowDownRight, Download, GitBranch, BriefcaseBusiness } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const { t, language } = useLanguage();
  const editorial = language === "bm"
    ? { label: "PUTERA MY / PORTFOLIO DEVELOPER", line1: "Idea jelas.", line2: "Binaan teliti.", panel: "Bina untuk digunakan.", panelNote: "Antaramuka web / Teknologi awan / Sokongan IT", issue: "EDISI REKA BENTUK", index: "KERJA PILIHAN", nav: "TEROKAI HASIL KERJA" }
    : { label: "PUTERA MY / DEVELOPER PORTFOLIO", line1: "Clear ideas.", line2: "Well built.", panel: "Made to be useful.", panelNote: "Web interfaces / Cloud technology / IT support", issue: "DESIGN EDITION", index: "SELECTED WORK", nav: "EXPLORE THE WORK" };
  return <section className="ed-hero" id="top" aria-labelledby="hero-title">
    <div className="container-site">
      <div className="ed-hero-slim"><span>{editorial.label}</span><span>{t.hero.availability}</span></div>
      <div className="ed-hero-grid">
        <ScrollReveal>
          <div className="ed-hero-kicker ed-smallcaps">{t.hero.eyebrow}</div>
          <h1 id="hero-title">{editorial.line1}<span className="ed-outlined">{editorial.line2}</span></h1>
          <p className="ed-hero-role">{site.name} <span>/</span> {site.role}</p>
          <p className="ed-hero-intro">{t.hero.intro}</p>
          <div className="ed-hero-buttons">
            <a href="#projects" className="button-primary">{t.hero.view} <ArrowRight size={19} aria-hidden /></a>
            {site.cvUrl
              ? <a href={site.cvUrl} download className="button-secondary">{t.hero.cv}<Download size={18} aria-hidden /></a>
              : <span className="button-secondary" aria-label={t.hero.cvPending} style={{ opacity: .7, cursor: "default" }}>{t.hero.cvPending}<Download size={18} aria-hidden /></span>}
          </div>
          <div className="ed-hero-social">
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer"><GitBranch size={18} aria-hidden /> GitHub <ArrowDownRight size={15} aria-hidden /></a>
            {site.linkedinUrl && <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={18} aria-hidden /> LinkedIn <ArrowDownRight size={15} aria-hidden /></a>}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={.12}>
          <div className="ed-edition-card">
            <div className="ed-edition-top ed-smallcaps"><span>{editorial.issue}</span><span>PUTERA MY / 2026</span></div>
            <div className="ed-edition-number" aria-hidden>PM<span>.</span></div>
            <div className="ed-edition-bottom">
              <p className="ed-smallcaps" style={{ color: "#D5A16C" }}>{editorial.index}</p>
              <p className="ed-edition-title">{editorial.panel}</p>
              <p className="ed-edition-caption">{editorial.panelNote}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div className="ed-hero-footer">
        <span>01 / NimbusCloud</span><span>02 / CINEX by PSMY</span><a href="#projects" className="ed-smallcaps" style={{ color: "var(--steel-strong)" }}>{editorial.nav} ↘</a>
      </div>
    </div>
  </section>;
}
