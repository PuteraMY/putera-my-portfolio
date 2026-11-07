"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";

/**
 * Reliable theme wipe for phones and desktops.
 * Do not depend on document.startViewTransition: support varies on Android.
 * The temporary overlay is an SVG surface so Chrome forced darkening cannot
 * turn the light-mode reveal charcoal. Actual theme changes under the veil.
 */
export function ThemeToggle({ inMenu = false }: { inMenu?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const switching = useRef(false);
  const activeLayer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (requested === "dark" || requested === "light") setTheme(requested);
    return () => {
      activeLayer.current?.remove();
      activeLayer.current = null;
    };
  }, [setTheme]);

  function switchTheme(event: MouseEvent<HTMLButtonElement>) {
    if (switching.current || document.querySelector(".theme-wipe-layer")) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const button = event.currentTarget;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = button.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    const radius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )) + 10;

    const apply = () => {
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next === "light" ? "only light" : "dark";
      setTheme(next);
    };

    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch {
      // Keep the theme control usable without access to URL history.
    }

    if (reduced) {
      apply();
      return;
    }

    // A small, temporary SVG covers the page with the NEXT palette.
    // The circular wipe is visible even when View Transitions API is absent.
    const layer = document.createElement("div");
    layer.className = "theme-wipe-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.setProperty("--wipe-x", x + "px");
    layer.style.setProperty("--wipe-y", y + "px");
    layer.style.setProperty("--wipe-accent", next === "dark" ? "rgba(184, 140, 255, .22)" : "rgba(139, 92, 246, .14)");
    layer.style.clipPath = `circle(0px at ${x}px ${y}px)`;

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("focusable", "false");
    const surface = document.createElementNS(ns, "rect");
    surface.setAttribute("width", "100%");
    surface.setAttribute("height", "100%");
    surface.setAttribute("fill", next === "dark" ? "#0B0B1A" : "#F8F7FF");
    svg.appendChild(surface);
    layer.appendChild(svg);
    const halo = document.createElement("span");
    halo.className = "theme-wipe-halo";
    layer.appendChild(halo);

    let applied = false;
    const applyOnce = () => {
      if (applied) return;
      applied = true;
      apply();
    };
    switching.current = true;
    button.setAttribute("data-switching", "true");
    activeLayer.current = layer;
    document.body.appendChild(layer);

    const animateWipe = async () => {
      try {
        // WAAPI works on current Android Chrome and most modern WebViews.
        // CSS transitions cover the remaining browsers.
        if (typeof layer.animate === "function") {
          const reveal = layer.animate(
            [
              { clipPath: `circle(0px at ${x}px ${y}px)` },
              { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
            ],
            { duration: 540, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
          );
          await reveal.finished;
          applyOnce();
          const fade = layer.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 240, easing: "ease-out", fill: "forwards" },
          );
          await fade.finished;
        } else {
          layer.style.transition = "clip-path 540ms cubic-bezier(.22,1,.36,1), opacity 240ms ease-out";
          await new Promise<void>((done) => {
            requestAnimationFrame(() => {
              layer.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
              window.setTimeout(done, 570);
            });
          });
          applyOnce();
          layer.style.opacity = "0";
          await new Promise<void>((done) => window.setTimeout(done, 250));
        }
      } catch {
        applyOnce();
      } finally {
        applyOnce();
        layer.remove();
        if (activeLayer.current === layer) activeLayer.current = null;
        switching.current = false;
        button.removeAttribute("data-switching");
      }
    };
    void animateWipe();
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
