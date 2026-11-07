"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "", as = "div" }: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const reduced = useReducedMotion();
  const variants = reduced ? undefined : { hidden: { opacity: 0, y: 19, scale: 0.99 }, visible: { opacity: 1, y: 0, scale: 1 } };
  const motionProps = {
    className,
    initial: reduced ? false as const : "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.16, margin: "0px 0px -22px 0px" },
    variants,
    transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
    children,
  };
  return as === "section" ? <motion.section {...motionProps} /> : <motion.div {...motionProps} />;
}
