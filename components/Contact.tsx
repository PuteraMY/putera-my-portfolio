"use client";
import { ArrowUpRight, GitBranch, BriefcaseBusiness, Mail } from "lucide-react";
import { site, isEmailReady } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
export default function Contact() {
  const { t } = useLanguage();
  return <section id="contact" aria-labelledby="contact-heading" className="section-space bg-[#21132F] text-white">
    <div className="container-site">
      <ScrollReveal><p className="eyebrow !text-brand-lime">{t.contact.eyebrow}</p><h2 id="contact-heading" className="mt-5 max-w-[850px] text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-tight tracking-[-.06em]">{t.contact.title}</h2><p className="mt-6 max-w-[650px] text-base leading-8 text-[#DBD1E6]">{t.contact.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {isEmailReady ? <a href={"mailto:" + site.email} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-lime px-6 py-3 text-base font-bold text-[#20112E] hover:bg-white"><Mail size={19} aria-hidden />{t.contact.email}</a> : <span className="inline-flex min-h-12 cursor-default items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-base text-[#D7CDDE]"><Mail size={19} aria-hidden />{t.contact.emailPending}</span>}
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-bold hover:bg-white/10"><GitBranch size={19} aria-hidden />{t.contact.github}<ArrowUpRight size={17} aria-hidden /></a>
          {site.linkedinUrl ? <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-bold hover:bg-white/10"><BriefcaseBusiness size={19} aria-hidden />{t.contact.linkedin}<ArrowUpRight size={17} aria-hidden /></a> : <span className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-base text-[#D7CDDE]"><BriefcaseBusiness size={19} aria-hidden />{t.contact.linkedinPending}</span>}
        </div>
      </ScrollReveal>
    </div>
  </section>;
}
