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
assert.match(data,/email: ""/);
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
assert.match(toggle,/theme-wipe-layer/);
assert.match(toggle,/await reveal.finished/);
assert.match(toggle,/prefers-reduced-motion: reduce/);
assert.match(toggle,/setTheme\(next\)/);
assert.match(projectsUI,/selected=\{active === index\}/);
assert.match(css,/VISUAL FIX V6/);
assert.match(css,/mobile-aurora-breathe/);
assert.doesNotMatch(css,/--tilt-x:\s*0deg/);
const provider=readFileSync(join(root,"context/theme-provider.tsx"),"utf8");
assert.match(provider,/disableTransitionOnChange=\{false\}/);
assert.match(toggle,/theme-animating/);
assert.match(toggle,/fill-opacity/);
assert.match(css,/V6\.1: crossfade actual content/);
console.log("PASS: verified assets, accessible controls, mobile motion, translucent theme wipe and color crossfade");
