"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Clipboard, Github, Mail, MessageCircle, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { site, isEmailConfigured } from "@/data/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  const configured = isEmailConfigured();

  async function copy() {
    if (!configured) return;
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 1500);
    } catch { setCopied(false); }
  }

  return (
    <section id="contact" className="section-block contact-section" aria-labelledby="contact-heading">
      <div className="page-container contact-grid">
        <div className="contact-message">
          <SectionHeading eyebrow="LET'S WORK TOGETHER" id="contact-heading">Have a project in mind?</SectionHeading>
          <p>I&apos;m looking for opportunities in web development, cloud and IT support. Explore my work or connect through GitHub.</p>
          <LinkButton href={site.github} external>Visit My GitHub <ArrowUpRight size={18} /></LinkButton>
        </div>
        <div className="contact-feature" aria-label="Featured project note, not a client testimonial">
          <span className="quote-mark" aria-hidden="true">“</span>
          <p>One codebase, several kinds of work: API-driven web apps, an academic Vue project, and a cloud dashboard concept.</p>
          <div className="feature-author"><span className="feature-monogram">PM</span><div><strong>Portfolio snapshot</strong><span>Verified project categories, not a client quote</span></div></div>
        </div>
        <div className="contact-social">
          <span className="eyebrow">FOLLOW / CONTACT</span>
          <div className="social-icons"><a href={site.github} aria-label="GitHub profile" title="GitHub" target="_blank" rel="noopener noreferrer"><Github size={21} /></a>{site.linkedin && <a href={site.linkedin} aria-label="LinkedIn profile" target="_blank" rel="noopener noreferrer">in</a>}{site.whatsapp && <a href={site.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><MessageCircle size={21} /></a>}</div>
          <div className="contact-lines">
            {configured ? <button type="button" onClick={copy} className="contact-line contact-copy" aria-label="Copy email address">{copied ? <Check size={18} /> : <Clipboard size={18} />}<span aria-live="polite">{copied ? "Copied" : site.email}</span></button> : <span className="contact-line contact-todo"><Mail size={18} /><span>TODO: Add a real email address</span></span>}
            {site.phone ? <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="contact-line"><Send size={18} /><span>{site.phone}</span></a> : <span className="contact-line contact-todo"><Send size={18} /><span>Phone: not provided</span></span>}
            {!site.linkedin && <span className="contact-todo contact-meta">TODO: Add LinkedIn if available</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
