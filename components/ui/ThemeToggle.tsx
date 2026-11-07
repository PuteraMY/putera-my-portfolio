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

/**
 * Circular light/dark reveal starts at the pressed control.
 * Falls back gracefully in browsers without the View Transitions API.
 */
export function ThemeToggle({ inMenu = false }: { inMenu?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const changing = useRef(false);

  useEffect(() => {
    setMounted(true);
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (requested === "dark" || requested === "light") setTheme(requested);
  }, [setTheme]);

  function switchTheme(event: MouseEvent<HTMLButtonElement>) {
    if (changing.current) return;

    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);

    // Update both the visible class and persisted next-themes preference
    // inside one view-transition snapshot, so the wipe never mixes themes.
    const apply = () => {
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next === "light" ? "only light" : "dark";
      setTheme(next);
    };

    // Remove a direct preview override, but keep the Vercel share token.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch {
      // Theme switching does not depend on History API access.
    }

    const doc = document as ThemeTransitionDocument;
    if (reduced || !doc.startViewTransition) {
      apply();
      if (!reduced) {
        document.body.animate(
          [{ opacity: 0.82 }, { opacity: 1 }],
          { duration: 330, easing: "ease-out" },
        );
      }
      return;
    }

    changing.current = true;
    try {
      const transition = doc.startViewTransition(() => apply());
      transition.ready
        .then(() => {
          const radius = Math.ceil(Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          ));
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 620,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
              pseudoElement: "::view-transition-new(root)",
            } as KeyframeAnimationOptions,
          );
        })
        .catch(() => {
          // The theme itself has already changed; animation is optional.
        });
      transition.finished.then(
        () => { changing.current = false; },
        () => { changing.current = false; },
      );
    } catch {
      changing.current = false;
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
      <span key={dark ? "sun" : "moon"} className="theme-toggle-symbol" aria-hidden="true">
        {dark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
      </span>
      <span className="theme-toggle-word">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
