"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ inMenu = false }: { inMenu?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // An explicit preview URL takes precedence over the saved preference.
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (requested === "dark" || requested === "light") setTheme(requested);
  }, [setTheme]);

  function switchTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("theme")) {
        url.searchParams.delete("theme");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    } catch { /* Theme switching works without URL history access. */ }
  }

  if (!mounted) return <span aria-hidden="true" className="theme-toggle theme-placeholder" />;

  const dark = resolvedTheme === "dark";
  return (
    <button type="button" className={"theme-toggle" + (inMenu ? " theme-toggle-menu" : "")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark} title={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={switchTheme}>
      {dark ? <Sun size={18} strokeWidth={2} aria-hidden /> : <Moon size={18} strokeWidth={2} aria-hidden />}
      <span className="theme-toggle-word">{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
