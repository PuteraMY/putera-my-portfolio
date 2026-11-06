import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, children, centered = false, description, id }: {
  eyebrow: string;
  children: ReactNode;
  centered?: boolean;
  description?: string;
  id?: string;
}) {
  return (
    <div className={`section-heading ${centered ? "section-heading-centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <Reveal><h2 id={id} className="section-title">{children}</h2></Reveal>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
