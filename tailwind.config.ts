import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-inter)", "Arial", "sans-serif"] },
      colors: {
        brand: {
          DEFAULT: "#142638",
          deep: "#0C1B27",
          lime: "#D5A16C"
        }
      },
      maxWidth: { content: "1180px" },
      borderRadius: { card: "0.5rem" }
    }
  },
  plugins: []
};
export default config;
