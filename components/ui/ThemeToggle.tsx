"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type TransitionController = { finished: Promise<void> };
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => TransitionController;
};

/**
 * Day/Night Switch.
 *
 * Browser snapshots move the complete NEW page across the OLD page without
 * mixing foreground colors and surfaces. This avoids the gray, low-contrast
 * intermediate frames visible in the previous Android recording.
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

  function switchTheme() {
    if (switching.current) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch {
      // Theme changes must not depend on browser history permission.
    }

    const apply = () => {
      // Apply the complete palette together before the new frame is captured.
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next === "light" ? "only light" : "dark";
      setTheme(next);
    };

    const doc = document as TransitionDocument;

    // No View Transition API: instant correct theme plus the sliding switch.
    // An abrupt but readable switch is preferable to an unreadable gray fade.
    if (reduced || typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }

    switching.current = true;
    root.classList.add("theme-slide-active");
    const finish = () => {
      root.classList.remove("theme-slide-active");
      switching.current = false;
    };

    try {
      const transition = doc.startViewTransition(() => apply());
      transition.finished.then(finish, finish);
    } catch {
      apply();
      finish();
    }
  }

  if (!mounted) return <span aria-hidden="true" className="theme-toggle theme-placeholder" />;

  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      className={"theme-toggle theme-toggle-animated theme-toggle-slider" + (inMenu ? " theme-toggle-menu" : "")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={switchTheme}
    >
      <span className={"daynight-track" + (dark ? " is-night" : " is-day")} aria-hidden="true">
        <span className="daynight-thumb">
          {dark ? <Moon size={13} strokeWidth={2.3} /> : <Sun size={13} strokeWidth={2.3} />}
        </span>
      </span>
      <span className="theme-toggle-word">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
