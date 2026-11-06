import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        canvas: "var(--bg)",
        surface: "var(--surface)",
        elevated: "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        brand: "var(--brand)",
        action: "var(--cta)",
        "action-text": "var(--on-cta)",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "Arial", "sans-serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: { card: "16px" },
      maxWidth: { site: "1320px" },
      transitionTimingFunction: { crafted: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};

export default config;
