"use client";
import Image from "next/image";
import { useState } from "react";
import { GraduationCap, Layers3 } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "./LanguageToggle";
import ScrollReveal from "./ScrollReveal";
export default function About() {
  const { t } = useLanguage();
  const [photoMissing, setPhotoMissing] = useState(false);
  return <section id="about" aria-labelledby="about-heading" className="section-space">
    <div className="container-site grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <ScrollReveal><div className="relative mx-auto max-w-[430px]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-purple-200 bg-gradient-to-br from-[#3C1365] via-brand to-[#8956C4] dark:border-white/10">
          {!photoMissing ? <Image src={site.profileImage} alt={t.about.photo} fill sizes="(min-width:1024px) 430px, 100vw" className="object-cover" onError={() => setPhotoMissing(true)} /> :
            <div role="img" aria-label={t.about.profile} className="flex h-full flex-col items-center justify-center text-white"><span className="text-[clamp(6rem,16vw,9rem)] font-black tracking-[-.1em]" aria-hidden>PM<span className="text-brand-lime">.</span></span><span className="text-base font-bold tracking-[.12em]">{t.about.profile}</span></div>}
        </div>
        <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold shadow-xl dark:border-white/10 dark:bg-[#251B31]"><GraduationCap size={21} className="text-brand dark:text-brand-lime" aria-hidden/>Cloud Computing</div>
      </div></ScrollReveal>
      <ScrollReveal delay={.1}><p className="eyebrow">{t.about.eyebrow}</p><h2 id="about-heading" className="section-heading mt-5">{t.about.title}</h2>
        <div className="mt-7 space-y-4">{[t.about.p1,t.about.p2,t.about.p3,t.about.p4].map((p,i) => <p key={i} className="section-copy">{p}</p>)}</div>
        <div className="mt-9 flex gap-4 rounded-2xl border border-neutral-200 bg-[#F7F4FA] p-5 dark:border-white/10 dark:bg-white/5"><Layers3 className="mt-1 shrink-0 text-brand dark:text-brand-lime" size={24} aria-hidden/><p className="text-base font-semibold leading-7">Front-End · Cloud Computing · IT Support</p></div>
      </ScrollReveal>
    </div>
  </section>;
}
