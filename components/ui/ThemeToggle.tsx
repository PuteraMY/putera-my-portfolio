"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type ThemeTransition = { finished: Promise<void> };
type TransitionCapableDocument = Document & {
  startViewTransition?: (update: () => void) => ThemeTransition;
};

/**
 * V5-inspired circle reveal: CSS animates the COMPLETE new-theme snapshot,
 * not individual text/background colors. No washout, overlay or page swipe.
 */
export function ThemeToggle({ inMenu = false }: { inMenu?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const switching = useRef(false);

  useEffect(() => {
    setMounted(true);
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (requested === "dark" || requested === "light") setTheme(requested);
  }, [setTheme]);

  function switchTheme(event: MouseEvent<HTMLButtonElement>) {
    if (switching.current) return;
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mobile browsers must not capture and animate full-page View Transition snapshots.
    // The 3D scene, fixed canvas and glass layers are too costly to composite on phones.
    const mobileOrTouch = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)").matches;

    // Remove only the temporary preview theme override. Preserve the share link.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch {
      // Theme switching still works when History API access is unavailable.
    }

    const apply = () => {
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next === "light" ? "only light" : "dark";
      setTheme(next);
    };

    const doc = document as TransitionCapableDocument;
    if (reduced || mobileOrTouch || typeof doc.startViewTransition !== "function") {
      // Instant, readable theme changes on mobile and low-motion devices.
      // Preserve the optional desktop circular reveal.
      apply();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.round(bounds.left + bounds.width / 2);
    const y = Math.round(bounds.top + bounds.height / 2);
    const radius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )) + 16;

    switching.current = true;
    const button = event.currentTarget;
    button.setAttribute("data-switching", "true");
    root.style.setProperty("--theme-reveal-x", x + "px");
    root.style.setProperty("--theme-reveal-y", y + "px");
    root.style.setProperty("--theme-reveal-radius", radius + "px");
    root.classList.add("theme-circle-active");

    const complete = () => {
      root.classList.remove("theme-circle-active");
      root.style.removeProperty("--theme-reveal-x");
      root.style.removeProperty("--theme-reveal-y");
      root.style.removeProperty("--theme-reveal-radius");
      button.removeAttribute("data-switching");
      switching.current = false;
    };

    try {
      const transition = doc.startViewTransition(() => apply());
      transition.finished.then(complete, complete);
    } catch {
      apply();
      complete();
    }
  }

  if (!mounted) return <span aria-hidden="true" className="theme-toggle theme-placeholder" />;

  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      className={"theme-toggle theme-toggle-animated" + (inMenu ? " theme-toggle-menu" : "")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={switchTheme}
    >
      <span className="theme-toggle-symbol" key={dark ? "sun" : "moon"} aria-hidden="true">
        {dark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
      </span>
      <span className="theme-toggle-word">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
