"use client";
import { ArrowUpRight, GitBranch, BriefcaseBusiness, Mail } from "lucide-react";
import { site, isEmailReady } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const { t, language } = useLanguage();
  return <section className="ed-contact" id="contact" aria-labelledby="contact-heading">
    <div className="container-site">
      <ScrollReveal>
        <div className="ed-section-line" style={{ borderColor: "rgba(255,255,255,.3)", color: "#CED9DD" }}>
          <span>{t.contact.eyebrow}</span><span>PUTERA MY / CONTACT</span>
        </div>
        <div className="ed-contact-content">
          <div>
            <h2 id="contact-heading">{t.contact.title}</h2>
            <p>{t.contact.intro}</p>
          </div>
          <div className="ed-contact-links">
            {isEmailReady ? <a href={"mailto:" + site.email}><span><Mail size={19} aria-hidden style={{ display: "inline-block", marginRight: 10 }}/> {t.contact.email}</span><ArrowUpRight size={20} aria-hidden /></a> : <span><span><Mail size={19} aria-hidden style={{ display: "inline-block", marginRight: 10 }}/> {t.contact.emailPending}</span></span>}
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer"><span><GitBranch size={19} aria-hidden style={{ display: "inline-block", marginRight: 10 }}/> GitHub</span><ArrowUpRight size={20} aria-hidden /></a>
            {site.linkedinUrl ? <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer"><span><BriefcaseBusiness size={19} aria-hidden style={{ display: "inline-block", marginRight: 10 }}/> LinkedIn</span><ArrowUpRight size={20} aria-hidden /></a>
              : <span><span><BriefcaseBusiness size={19} aria-hidden style={{ display: "inline-block", marginRight: 10 }}/> {t.contact.linkedinPending}</span></span>}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>;
}
