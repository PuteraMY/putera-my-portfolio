"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Clipboard, Github, Mail, MessageCircle, FileText, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { site, isEmailConfigured } from "@/data/portfolio";

export function Contact({ cvHref }: { cvHref: string | null }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  const hasEmail = isEmailConfigured();

  async function copyEmail() {
    if (!hasEmail) return;
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 1600);
    } catch { setCopied(false); }
  }

  return (
    <section id="contact" className="section-block contact-section" aria-labelledby="contact-heading">
      <div className="page-container contact-grid">
        <div className="contact-message">
          <SectionHeading eyebrow="LET'S CONNECT" id="contact-heading">Open to the next challenge.</SectionHeading>
          <p>I'm exploring internship and junior opportunities involving web development, cloud and IT support. My public demos and code are ready to review.</p>
          <div className="contact-buttons">
            <LinkButton href={site.github} external>Explore GitHub <ArrowUpRight size={18} aria-hidden="true" /></LinkButton>
            {cvHref && <LinkButton href={cvHref} variant="secondary" download>Download CV <FileText size={18} aria-hidden="true" /></LinkButton>}
            {hasEmail && <LinkButton href={"mailto:" + site.email} variant="secondary">Email me <Mail size={18} aria-hidden="true" /></LinkButton>}
          </div>
        </div>
        <div className="contact-feature">
          <span className="eyebrow">EVIDENCE, NOT CLAIMS</span>
          <h3>See the work behind the words.</h3>
          <p>Three public project demos, two public source repositories and focused case studies explaining technical choices and limitations.</p>
          <a className="contact-project-link" href="#projects">Browse selected work <ExternalLink size={16} aria-hidden="true" /></a>
        </div>
        <div className="contact-social">
          <span className="eyebrow">FIND ME ONLINE</span>
          <div className="social-icons">
            <a href={site.github} aria-label="View GitHub profile" title="GitHub" target="_blank" rel="noopener noreferrer"><Github size={21} /></a>
            {site.linkedin && <a href={site.linkedin} aria-label="View LinkedIn profile" target="_blank" rel="noopener noreferrer">in</a>}
            {site.whatsapp && <a href={site.whatsapp} aria-label="Message on WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle size={21} /></a>}
          </div>
          <div className="contact-lines">
            <a className="contact-line" href={site.github} target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" /><span>github.com/PuteraMY</span></a>
            {hasEmail && <button type="button" onClick={copyEmail} className="contact-line contact-copy" aria-label="Copy professional email address">{copied ? <Check size={18} /> : <Clipboard size={18} />}<span aria-live="polite">{copied ? "Copied" : site.email}</span></button>}
            {site.phone && <a href={"tel:" + site.phone.replace(/\s+/g, "")} className="contact-line"><span>{site.phone}</span></a>}
          </div>
        </div>
      </div>
    </section>
  );
}
