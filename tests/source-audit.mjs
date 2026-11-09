import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const mustExist = [
  "app/layout.tsx", "app/page.tsx", "app/globals.css", "app/projects/[slug]/page.tsx",
  "app/opengraph-image.tsx", "app/sitemap.ts", "app/robots.ts", "app/not-found.tsx",
  "tailwind.config.ts", "context/theme-provider.tsx", "lib/cv.ts", "data/portfolio.ts",
  "components/sections/Header.tsx", "components/sections/Hero.tsx",
  "components/sections/About.tsx", "components/sections/Skills.tsx",
  "components/sections/Projects.tsx", "components/sections/Contact.tsx",
  "components/ui/TechnologyIcon.tsx", "components/ui/TechnologyItem.tsx",
];
for (const path of mustExist) assert(existsSync(join(root, path)), "Missing "+path);
for (const slug of ["cinex","vanta-fun","nimbuscloud"]) {
  const path=join(root, "public/projects/"+slug+"-real.webp");
  assert(existsSync(path), "Missing verified site screenshot: "+path);
  const bytes=readFileSync(path);
  assert.equal(bytes.toString("ascii",0,4),"RIFF","Invalid WebP container: "+slug);
}
const data=readFileSync(join(root,"data/portfolio.ts"),"utf8");
assert.match(data,/https:\/\/psmy-cinex\.vercel\.app\//);
assert.match(data,/https:\/\/vanta-fun-vue\.vercel\.app\//);
assert.match(data,/https:\/\/nimbuscloud-eta\.vercel\.app/);
assert.doesNotMatch(data,/50\+ projects|30\+ happy|100% client|4\+ years/i);
assert.doesNotMatch(data,/imageIsIllustrative: true/);
assert(data.includes('email: "puteraaqmalputera@gmail.com"'));
assert.match(data,/cvPath: ""/);
const page=readFileSync(join(root,"app/page.tsx"),"utf8");
assert.doesNotMatch(page,/<Blog\s*\/>/);
const nav=readFileSync(join(root,"components/sections/Header.tsx"),"utf8");
assert.doesNotMatch(nav,/id: "blog"/);
const css=readFileSync(join(root,"app/globals.css"),"utf8");
assert.match(css,/ANDROID LIGHT THEME PAINT GUARD/);
assert.match(css,/background-image: linear-gradient\(#F8F7FF, #F8F7FF\)/);
const pkg=JSON.parse(readFileSync(join(root,"package.json"),"utf8"));
assert(pkg.dependencies["react-icons"]);
assert(pkg.dependencies["next-themes"]);
assert(pkg.dependencies["framer-motion"]);

const hero=readFileSync(join(root,"components/sections/Hero.tsx"),"utf8");
// Keep the polish layer separate from core styles and preserve the original aurora.
const threeD=readFileSync(join(root,"app/hero-3d.css"),"utf8");
assert.match(threeD,/scene-depth/);
assert.match(threeD,/scene-service-stack/);
assert.match(threeD,/scene-stat-card/);
assert.match(threeD,/prefers-reduced-motion: reduce/);
assert.match(threeD,/max-width: 400px/);
assert.match(threeD,/Performance mode \(Nov 2026\)/);
assert.match(threeD,/hover: none/);
assert.match(threeD,/backdrop-filter: none !important/);
assert.match(threeD,/\.hero-section::after/);
assert.doesNotMatch(threeD,/\.hero-section::after\s*\{/);
assert.match(hero,/latestScenePointer/);
assert.match(hero,/hero-metrics/);
const projectsUI=readFileSync(join(root,"components/sections/Projects.tsx"),"utf8");
const skillsUI=readFileSync(join(root,"components/sections/Skills.tsx"),"utf8");
assert.match(hero,/handleAuroraMove/);
assert.match(projectsUI,/onCardMove/);
assert.match(projectsUI,/project-swipe-hint/);
assert.match(skillsUI,/<Reveal className="skill-column"/);
assert.match(css,/Aurora Interaction v5/);
assert.match(css,/prefers-reduced-motion:reduce/);
assert.match(css,/case-enter/);

const toggle=readFileSync(join(root,"components/ui/ThemeToggle.tsx"),"utf8");
assert.match(toggle,/startViewTransition/);
assert.match(toggle,/mobileOrTouch/);
assert.match(toggle,/reduced \|\| mobileOrTouch/);
assert.match(toggle,/theme-circle-active/);
assert.match(toggle,/theme-toggle-symbol/);
assert.match(toggle,/prefers-reduced-motion: reduce/);
assert.match(toggle,/setTheme\(next\)/);
assert.doesNotMatch(toggle,/daynight-track/);
assert.doesNotMatch(toggle,/theme-wipe-layer/);
assert.match(projectsUI,/selected=\{active === index\}/);
assert.match(css,/Mobile card and aurora refinements/);
assert.match(css,/mobile-aurora-breathe/);
assert.match(css,/V8 — smoother V5-style circular theme reveal/);
assert.match(css,/theme-circle-grow/);
assert.doesNotMatch(css,/daynight-page-swipe/);
assert.doesNotMatch(css,/--tilt-x:\s*0deg/);

const heroUI=readFileSync(join(root,"components/sections/Hero.tsx"),"utf8");
const header=readFileSync(join(root,"components/sections/Header.tsx"),"utf8");
const robotsSource=readFileSync(join(root,"app/robots.ts"),"utf8");
const cvSource=readFileSync(join(root,"lib/cv.ts"),"utf8");
assert.match(toggle,/theme-circle-active/);
assert.doesNotMatch(toggle,/theme-wipe-layer/);
assert.doesNotMatch(toggle,/daynight-track/);
assert.doesNotMatch(css,/\.theme-wipe-layer\s*\{/);
assert.doesNotMatch(css,/\.theme-soft-swap/);
assert.match(css,/FINAL POLISH: composited theme reveal/);
assert.match(css,/pagination-dot::before/);
assert.match(header,/aria-modal="true"/);
assert.match(header,/progressRef/);
assert.match(header,/window.innerWidth < 1024/);
assert.doesNotMatch(header,/setScroll\(/);
assert.match(header,/Let&apos;s Connect/);
assert.match(projectsUI,/aria-roledescription="slide"/);
assert.match(projectsUI,/aria-live="polite"/);
assert.match(projectsUI,/getBoundingClientRect\(\)/);
assert.match(robotsSource,/disallow: "\/"/);
assert.match(robotsSource,/VERCEL_ENV === "production"/);
assert.match(cvSource,/existsSync/);
assert.match(heroUI,/getCvHref|cvHref/);
console.log("PASS: source integrity, UX and accessibility guardrails, SEO preview noindex, final-polish CSS");
