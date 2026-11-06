import type { Config } from "tailwindcss";
const colors=["bg","surface","surface-2","ink","muted","border","hairline","primary","primary-fill","primary-hover","on-primary","sun","sun-ink","coral","coral-text","success","danger"] as const;
const themeColors=Object.fromEntries(colors.map(k=>[k,"var(--"+k+")"]));
const config:Config={darkMode:"class",content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],theme:{extend:{
 colors:themeColors,fontFamily:{heading:["var(--font-inter-tight)","Arial","sans-serif"],sans:["var(--font-inter)","Arial","sans-serif"],mono:["var(--font-jetbrains-mono)","monospace"]},
 maxWidth:{content:"1240px"},borderRadius:{card:"16px"},boxShadow:{offset:"4px 4px 0 var(--shadow-ink)"},transitionTimingFunction:{out:"cubic-bezier(0.16,1,0.3,1)"}
}},plugins:[]}; export default config;