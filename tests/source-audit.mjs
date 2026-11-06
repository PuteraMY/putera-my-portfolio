import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const essential = [
  "app/layout.tsx", "app/page.tsx", "app/globals.css", "app/projects/[slug]/page.tsx",
  "app/opengraph-image.tsx", "app/sitemap.ts", "app/robots.ts", "app/not-found.tsx",
  "tailwind.config.ts", "context/theme-provider.tsx", "lib/cv.ts", "data/portfolio.ts",
  "components/sections/Header.tsx", "components/sections/Hero.tsx",
  "components/sections/About.tsx", "components/sections/Skills.tsx",
  "components/sections/Projects.tsx", "components/sections/Blog.tsx",
  "components/sections/Contact.tsx", "components/sections/Footer.tsx",
];
for (const file of essential) assert(existsSync(join(root, file)), `Missing file: ${file}`);
for (const slug of ["cinex", "vanta-fun", "nimbuscloud"]) {
  const image = join(root, `public/projects/${slug}.svg`);
  assert(existsSync(image), `Missing original illustration: ${image}`);
  assert.match(readFileSync(image, "utf8"), /ILLUSTRATIVE PREVIEW/);
}
const data = readFileSync(join(root, "data/portfolio.ts"), "utf8");
assert.match(data, /https:\/\/psmy-cinex\.vercel\.app\//);
assert.match(data, /https:\/\/vanta-fun-vue\.vercel\.app\//);
assert.match(data, /https:\/\/nimbuscloud-eta\.vercel\.app/);
assert.doesNotMatch(data, /50\+ projects|30\+ happy|100% client|4\+ years/i);
assert.match(data, /CV.*TODO|TODO.*CV|TODO.*real file path|TODO.*real email/);
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
assert.match(packageJson.devDependencies.tailwindcss, /^3\.4\./);
assert(packageJson.dependencies["next-themes"]);
assert(packageJson.dependencies["framer-motion"]);
console.log(`PASS — ${essential.length} essential files, 3 project illustrations, verified links and content guardrails.`);
