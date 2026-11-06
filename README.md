# Putera MY — Dual-Theme Developer Portfolio

A Next.js App Router + TypeScript + Tailwind CSS 3.4 portfolio based closely on the provided dark / light Putera MY reference image. The layout uses a geometric heading font, purple accents, a yellow dark-mode CTA, a CSS-built laptop visual, editorial counters, technology coverage bars, and responsive project artwork.

## Stack

Next.js 16.4.5, React 19, TypeScript, Tailwind CSS v3.4, Framer Motion, next-themes, lucide-react, next/font (Plus Jakarta Sans, Inter, JetBrains Mono), and next/image. No UI kit, backend, database, or server form.

## Installation

Requires Node.js 20.9+ (Node 22 recommended). In the project directory:

```bash
npm install
npm run dev
```

Visit <http://localhost:3000>.

### Production

```bash
npm run typecheck
npm run build
npm run start
```

Deploy the repository to Vercel using the Next.js framework preset. No custom environment variables are required.

### Exact dependency installation (if creating the project from scratch)

```bash
npm install next@16.4.5 react@19.3.1 react-dom@19.3.1 next-themes@0.4.6 framer-motion@12.23.24 lucide-react@0.468.0
npm install -D typescript@5.8.3 @types/node@22 @types/react@19 @types/react-dom@19 tailwindcss@3.4.19 postcss@8.5.0 autoprefixer@10.4.20
```

All source files are included; `package-lock.json` will be generated on `npm install`.

## File-by-file map

```text
app/
  globals.css                         Full design system, themes, layouts and breakpoints
  layout.tsx                          Fonts, metadata, providers, skip link
  page.tsx                            Single-page composition
  projects/[slug]/page.tsx           Static project case studies
  icon.svg                            Custom logo favicon
  opengraph-image.tsx                 1200×630 dynamic OG image
  sitemap.ts, robots.ts              Search engine metadata
  not-found.tsx                       Custom 404
components/
  sections/Header.tsx                 Sticky nav, active underline, mobile drawer, scroll progress
  sections/Hero.tsx                   Hero, illustration, technology strip
  sections/About.tsx                  About and automatically derived counters
  sections/Skills.tsx                 Three grouped technology-usage columns
  sections/Projects.tsx               Project cards and responsive scroll-snap carousel
  sections/Blog.tsx                   Honest unpublished blog placeholder
  sections/Contact.tsx                GitHub and conditional contact actions, no fake testimonial
  sections/Footer.tsx                 Footer
  ui/Button.tsx                       Reusable buttons and links
  ui/Badge.tsx                        Shared badge
  ui/SectionHeading.tsx               Section headings
  ui/Reveal.tsx                       Reduced-motion-aware reveal
  ui/ThemeToggle.tsx                  Persistent dark/light toggle
  ui/CountUp.tsx                      In-view factual counters
  ui/SkillBar.tsx                     In-view bars showing featured-project usage, not proficiency
context/theme-provider.tsx           next-themes
data/portfolio.ts                    All factual content and URLs
lib/cv.ts                            Build-time guard for real CV PDFs
public/projects/*.svg                Original ILLUSTRATIVE assets, not actual screenshots
```

## Updating content

Edit `data/portfolio.ts`. The site exports `site`, `projects`, and `skills`. The selected projects appear automatically in the homepage, case-study pages, and sitemap. Replace illustrative SVG files with real screenshots as you obtain them, using `next/image` and accurate `alt` text. Do **not** describe the illustration as a real captured project screenshot.

**Contact:** `site.email`, `site.phone`, `site.linkedin`, `site.whatsapp`, and `site.cvPath` are deliberately empty until verified. The Copy Email action and private contact links will appear only after you supply valid values. CV download appears only when the configured PDF actually exists inside `public/assets/cv/` at build time. Redeploy after adding it.

**Blog:** The image includes a Blog navigation tab; the implemented section displays an honest empty state until you publish real posts.

**Facts:** All four count-up numbers are derived from real featured projects (3 featured, 2 live, 1 in development, 3 focus areas). The example image's 4+ years, 50+ projects, 30+ clients, 100% satisfaction, fabricated phone number and testimonial were intentionally **not used**.

**Skills:** Bar lengths indicate appearances across these **three featured projects**, not personal ability, competence or proficiency. Recalculate automatically when project stack arrays change.

## QA checklist

- Review desktop at 1440 px and mobile at 360 px / 390 px.
- Confirm mobile menu can open, close by Escape/backdrop, and trap Tab focus.
- Confirm dark and light theme toggle, system preference on first load, persistence after refresh.
- Verify links, page routes, metadata, SVG project illustration text, and responsive carousel.
- Review actual screenshots and professional content before publishing.
- Use Lighthouse on a real production build and real devices; 90+ is a target, not an audited claim.

## Known limitations of this handoff

This environment has no access to the npm registry, so `npm install`, `next build`, Playwright against the compiled Next app, and Lighthouse could **not** be executed here. Syntax and source checks can run without dependencies; run the commands above before production. All source and original project illustration SVGs are included.

### Android auto-dark rendering
The website declares `color-scheme: only light` in its light theme so browsers using *force darken websites* do not incorrectly turn the white mockup into charcoal. `/?theme=light` and `/?theme=dark` permit direct theme comparison. Use the LIGHT / DARK header button to switch; it also clears the URL override.
