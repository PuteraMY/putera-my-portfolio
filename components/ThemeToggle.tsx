"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useLanguage } from "./LanguageToggle";
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <NextThemesProvider attribute="class" defaultTheme="system" storageKey="putera-my-theme" enableSystem disableTransitionOnChange>{children}</NextThemesProvider>;
}
export default function ThemeToggle() {
  const [ready, setReady] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const { t } = useLanguage();
  useEffect(() => setReady(true), []);
  if (!ready) return <span aria-hidden="true" className="icon-button"><Monitor size={18} /></span>;
  const icon = resolvedTheme === "dark" ? <Moon size={19} aria-hidden /> : <Sun size={19} aria-hidden />;
  return <button type="button" className="icon-button" title={t.misc.theme} aria-label={t.misc.theme} aria-pressed={theme === "dark"} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{icon}</button>;
}
