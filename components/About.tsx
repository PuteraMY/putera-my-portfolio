"use client";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const { t, language } = useLanguage();
  const [photoMissing, setPhotoMissing] = useState(false);
  return <section className="ed-about" id="about" aria-labelledby="about-heading">
    <div className="container-site">
      <div className="ed-about-grid">
        <ScrollReveal>
          <div className="ed-about-image" role={!photoMissing ? undefined : "img"} aria-label={photoMissing ? t.about.profile : undefined}>
            {photoMissing ? <>
              <small>{t.about.profile}</small>
              <strong aria-hidden>PM<span style={{ color: "#D5A16C" }}>.</span></strong>
              <small>FRONT-END / CLOUD / IT</small>
            </> : <Image src={site.profileImage} alt={t.about.photo} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" onError={() => setPhotoMissing(true)} />}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={.1}>
          <div className="ed-section-line" style={{ borderColor: "var(--hairline)", color: "var(--secondary)" }}>
            <span>{t.about.eyebrow}</span><span>PUTERA MY</span>
          </div>
          <div className="ed-about-copy">
            <h2 className="ed-section-heading" id="about-heading" style={{ marginTop: 26 }}>{t.about.title}</h2>
            {[t.about.p1, t.about.p2, t.about.p3, t.about.p4].map((s, i) => <p key={i}>{s}</p>)}
            <div className="ed-about-separator">{language === "bm" ? "FRONT-END / PENGKOMPUTERAN AWAN / SOKONGAN IT" : "FRONT-END / CLOUD COMPUTING / IT SUPPORT"}</div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>;
}
