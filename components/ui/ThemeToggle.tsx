"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ThemeTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

/** A theme reveal starts at the pressed button; the theme works without animation too. */
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
    const button = event.currentTarget;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Remove only the direct theme override; keep any Vercel share parameter.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch {
      // The theme itself does not depend on the History API.
    }

    const apply = () => {
      // Update synchronously so the View Transitions API captures a coherent
      // light/dark snapshot before next-themes persists the selection.
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next === "light" ? "only light" : "dark";
      setTheme(next);
    };

    const documentWithTransition = document as ThemeTransitionDocument;
    if (reduced) {
      apply();
      return;
    }

    // Older browsers get a soft color change, not a full-page opacity flash.
    if (typeof documentWithTransition.startViewTransition !== "function") {
      root.classList.add("theme-soft-swap");
      apply();
      window.setTimeout(() => root.classList.remove("theme-soft-swap"), 350);
      return;
    }

    switching.current = true;
    button.setAttribute("data-switching", "true");
    try {
      const transition = documentWithTransition.startViewTransition(apply);
      transition.ready
        .then(() => {
          const radius = Math.ceil(Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          ));
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 570,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
              pseudoElement: "::view-transition-new(root)",
            } as KeyframeAnimationOptions,
          );
        })
        .catch(() => {
          // A cancelled transition does not undo the theme.
        });
      const done = () => {
        switching.current = false;
        button.removeAttribute("data-switching");
      };
      transition.finished.then(done, done);
    } catch {
      switching.current = false;
      button.removeAttribute("data-switching");
      apply();
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
        {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
      </span>
      <span className="theme-toggle-word">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
