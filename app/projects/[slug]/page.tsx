import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { LinkButton } from "@/components/ui/Button";
import { projects, site } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const url = `/projects/${slug}`;
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { title: `${project.title} | Putera MY`, description: project.description, url: site.url + url, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: project.title, description: project.description, images: ["/opengraph-image"] },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <article>
          <div className="page-container">
            <header className="case-header">
              <Link href="/#projects" className="case-back"><ArrowLeft size={19} aria-hidden="true" /> Back to projects</Link>
              <div className="mt-6"><span className="eyebrow">PROJECT / {project.category.toUpperCase()}</span></div>
              <h1 className="case-title">{project.title}<span className="gradient-name">.</span></h1>
              <p className="case-intro">{project.description}</p>
              <div className="case-buttons">
                {project.liveUrl && <LinkButton external href={project.liveUrl}>Live project <ExternalLink size={18} aria-hidden="true" /></LinkButton>}
                {project.sourceUrl && <LinkButton external variant="secondary" href={project.sourceUrl}>Source code <Github size={18} aria-hidden="true" /></LinkButton>}
              </div>
            </header>
            <dl className="case-facts">
              <div><dt>STATUS</dt><dd>{project.status === "live" ? "Live" : "In development"}</dd></div>
              <div><dt>TECH STACK</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
              <div><dt>EVIDENCE</dt><dd>{project.sourceUrl ? "Public source + demo" : "Live UI concept demo"}</dd></div>
            </dl>
            <figure>
              <div className="case-cover"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 1100px" priority /></div>
              <figcaption className="case-illustration-note">{project.imageIsIllustrative ? "Conceptual artwork" : "Actual screenshot of the publicly accessible project website, captured 7 November 2026."}</figcaption>
            </figure>
            <div className="case-body">
              <section className="case-section"><span className="eyebrow">01 / PROBLEM</span><div><h2>Problem</h2><p>{project.problem}</p></div></section>
              <section className="case-section"><span className="eyebrow">02 / APPROACH</span><div><h2>What I built</h2><p>{project.solution}</p><ul>{project.features.map((f) => <li key={f}>{f}</li>)}</ul></div></section>
              <section className="case-section"><span className="eyebrow">03 / TOOLS</span><div><h2>Stack</h2><p>{project.stack.join(" · ")}</p></div></section>
              <section className="case-section"><span className="eyebrow">04 / ENGINEERING NOTES</span><div><h2>Technical observations</h2><ul>{project.learnings.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></div></section>
              <section className="case-section"><span className="eyebrow">05 / NEXT</span><div><h2>Links</h2><p>{project.status === "in-development" ? "This project is still in development. The live link points to its public preview." : "Explore the public project and available source."}</p><div className="case-buttons">{project.liveUrl && <LinkButton external href={project.liveUrl}>Open live site <ArrowUpRight size={18} /></LinkButton>}{project.sourceUrl && <LinkButton external variant="secondary" href={project.sourceUrl}>Open source <ExternalLink size={18} /></LinkButton>}</div></div></section>
            </div>
          </div>
          <Link href={`/projects/${next.slug}`} className="case-next"><div className="page-container"><div><span className="eyebrow">NEXT PROJECT</span><strong>{next.title}</strong></div><ArrowRight size={32} aria-hidden="true" /></div></Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
