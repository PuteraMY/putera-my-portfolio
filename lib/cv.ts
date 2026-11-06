import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/data/portfolio";

/** Check the actual public file at build time; don't render a broken CV action. */
export function getCvHref(): string | null {
  const configured = site.cvPath;
  if (!configured || !configured.startsWith("/assets/cv/") || !configured.toLowerCase().endsWith(".pdf")) return null;
  const relative = configured.slice(1);
  if (relative.split("/").includes("..")) return null;
  return existsSync(join(process.cwd(), "public", relative)) ? configured : null;
}
