"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Languages } from "lucide-react";
import { translations, type Language } from "@/data/translations";
type LanguageContextValue = { language: Language; setLanguage: (lang: Language) => void; t: typeof translations[Language] };
const LanguageContext = createContext<LanguageContextValue | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const value = localStorage.getItem("putera-my-language"); if (value === "bm" || value === "en") setLanguage(value); }
    catch { /* storage can be unavailable */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language === "bm" ? "ms" : "en";
    try { localStorage.setItem("putera-my-language", language); } catch { /* not essential */ }
  }, [language, ready]);
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is missing");
  return context;
}
export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return <button type="button" aria-label={t.misc.language} title={t.misc.language} onClick={() => setLanguage(language === "en" ? "bm" : "en")} className="icon-button gap-1.5">
    <Languages aria-hidden="true" size={18} /> <span className="text-sm font-bold">{language === "en" ? "BM" : "EN"}</span>
  </button>;
}
