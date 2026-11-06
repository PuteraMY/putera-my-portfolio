import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-inter)", "Arial", "sans-serif"] },
      colors: { brand: { DEFAULT: "#6422B1", deep: "#48137F", lime: "#D1FF76" } },
      maxWidth: { content: "1160px" },
      borderRadius: { card: "1.25rem" }
    }
  },
  plugins: []
};
export default config;
