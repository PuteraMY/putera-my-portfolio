import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVuedotjs, SiGithub, SiVercel } from "react-icons/si";
import { Braces } from "lucide-react";
import type { Skill } from "@/data/portfolio";

type IconKey = Skill["icon"];
const icons = {
  html: SiHtml5, css: SiCss3, js: SiJavascript, ts: SiTypescript,
  react: SiReact, next: SiNextdotjs, vue: SiVuedotjs,
  github: SiGithub, vercel: SiVercel, api: Braces,
} as const;

export function TechnologyIcon({ name, size = 21 }: { name: IconKey; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} aria-hidden="true" focusable="false" />;
}
