# Putera MY · CONTROL ROOM

Dark-first, English-language portfolio for Putera, a Computer Technology student focusing on Cloud Computing, IT support and web apps. Designed to give recruiters direct access to actual projects, case studies and verified contact details.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3.4, next/font (Inter Tight, Inter, JetBrains Mono), next/image, next/og, next-themes, lucide-react. No database, forms backend, tracking or unverified experience claims.

## Start and verify

Node.js 22 required.

~~~sh
npm install
npm run dev
npm run build
npm run typecheck
npx playwright install chromium
npm run start
# In another terminal:
npm run test:browser
~~~

The GitHub Actions workflow runs five-viewport Chromium checks and uploads dark/light browser screenshots from the production build.

## Source of truth

- data/projects.ts holds the original, factual bilingual source records. All rendered UI text is English.
- data/work.ts selects **only projects with verified public links** and adds truthful type/year labels. New public work enters the homepage, command palette, static case-study route, sitemap and OG generation through this array.
- data/site.ts holds the verified GitHub account and placeholder email/LinkedIn.
- public/assets/cv/ is scanned at build time for a real PDF. If none exists, CV buttons and palette actions are hidden. Redeploy after adding a PDF.
- components/control-room/Experience.tsx assembles header, hero, work index, toolbox, path and contact.
- components/control-room/Controls.tsx handles the mobile Menu and Cmd/Ctrl+K palette, theme and accessible copy feedback.
- components/control-room/CaseStudy.tsx contains case-study reading flow and keyboard-operated screenshot lightbox.
- app/globals.css holds design tokens, fluid type, responsive layout, dark/light color system, safe areas and reduced-motion fallback.
- AUDIT.md records the pre-change findings, verification evidence and owner TODOs.

## Public projects

- CINEX — in-progress discovery web app, public development preview and source.
- VANTA FUN — live Vue 3 / Vite entertainment assignment, public source.
- NimbusCloud — live cloud-hosting landing-page **concept** and dashboard simulation; not a hosting provider.

AsetDesk and PulseBoard are not published in this version because their own public repository or demo URLs have not been verified. Do not present either as completed work until evidence exists.

## Interaction and accessibility

- Sticky, safe-area-aware header; mobile shows just logo and MENU.
- Mobile MENU opens the full-height, searchable command dialog. Keyboard: Ctrl/Cmd+K, arrows, Enter, Escape, Tab focus loop and focus return.
- Theme uses the browser's system preference on first visit and saves manual overrides. Color contrast pairs are documented in AUDIT.md.
- Hero uses a one-time, transform-only yellow underline; a clearly labeled simulated log is paused when not visible. Reduced-motion disables nonessential animation.
- Cursor decoration and magnetic View work action are desktop/fine-pointer only.
- Sticky yellow scroll-progress indicator, active numbered sections and no floating Back-to-Top button.
- Actual project routes are statically built; missing screenshots use fixed-ratio TODO tiles, never stock imagery.

## Owner checklist

1. Replace the placeholder email in data/site.ts to activate Copy email.
2. Provide real WhatsApp and LinkedIn URLs; only then add their contact links.
3. Add a PDF inside public/assets/cv/; the build will reveal Download CV (PDF).
4. Add real screenshot files and meaningful alt text to data/projects.ts.
5. Confirm real individual role, project dates and implementation decisions.
6. Confirm education attendance dates at TVETMARA Besut and actual technology proficiency.
7. Supply public code/demo for AsetDesk or PulseBoard before listing them as built.
8. Approve screenshots, contrast, keyboard interactions, Lighthouse results and the PR before merging to main.

This branch must not be merged or promoted to production until the owner approves the preview. Lighthouse 90+ remains a target, not an assumed score.
