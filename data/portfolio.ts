/** The only source for content on the homepage and case studies. */
export type ProjectStatus = "live" | "in-development";
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  learnings: string[];
  stack: string[];
  status: ProjectStatus;
  image: string;
  imageAlt: string;
  imageIsIllustrative: boolean;
  accent: "violet" | "sky" | "teal";
  liveUrl: string;
  sourceUrl: string;
};

export type Site = {
  name: string; shortName: string; url: string; description: string; headline: string; bio: string; about: string; availability: string;
  focusAreas: string[]; github: string; linkedin: string; whatsapp: string; email: string; phone: string; cvPath: string;
};

export const site: Site = {
  name: "Putera MY",
  shortName: "Putera",
  url: "https://putera-my-portfolio.vercel.app",
  description:
    "Portfolio of Putera MY, a Computer Technology student focused on Cloud Computing, IT support and web development.",
  headline: "I build things for the web.",
  bio: "I'm a Computer Technology student focusing on Cloud Computing, IT support and practical web applications.",
  about:
    "I work on web interfaces and explore the systems behind them. My portfolio includes entertainment discovery, interactive API-powered pages and cloud-inspired UI concepts.",
  availability: "Open to internships and junior roles",
  focusAreas: ["Web development", "Cloud Computing", "IT support"],
  github: "https://github.com/puteraaqmalputera-dot",
  linkedin: "", // TODO: Add verified LinkedIn profile URL.
  whatsapp: "", // TODO: Add verified WhatsApp https://wa.me/ URL.
  email: "", // TODO: Add real email; this also enables Copy Email.
  phone: "", // TODO: Add a real phone number only if you want it public.
  cvPath: "", // TODO: Set a real file path, e.g. /assets/cv/putera-my.pdf, after adding the PDF.
};

export const projects: Project[] = [
  {
    slug: "cinex",
    title: "CINEX",
    category: "Entertainment discovery app",
    description:
      "A film, TV and anime discovery app with search, filters and a saved list. In active development.",
    problem:
      "Entertainment discovery often involves browsing across separate categories and services.",
    solution:
      "CINEX brings title discovery, filtering and a saved-list experience into a single web app using Next.js and third-party APIs.",
    features: ["Search titles", "Filter discovery results", "Save titles to a list"],
    learnings: ["TODO: Add a verified technical challenge and what you learned while building CINEX."],
    stack: ["Next.js", "TypeScript", "React", "APIs", "Vercel", "GitHub"],
    status: "in-development",
    image: "/projects/cinex.svg",
    imageAlt: "Illustrative purple film discovery interface for CINEX; not a real screenshot",
    imageIsIllustrative: true,
    accent: "violet",
    liveUrl: "https://psmy-cinex.vercel.app/",
    sourceUrl: "https://github.com/puteraaqmalputera-dot/psmy-cinex-",
  },
  {
    slug: "vanta-fun",
    title: "VANTA FUN",
    category: "Academic Vue web assignment",
    description:
      "An entertainment website exploring characters, jokes and activity ideas using public APIs.",
    problem: "Build a responsive, API-powered entertainment experience for an academic assignment.",
    solution:
      "A Vue 3 and Vite web app that connects character discovery, jokes and activity suggestions in one experience.",
    features: [
      "Explore Rick and Morty characters",
      "Discover jokes using JokeAPI",
      "Find activity ideas using the Bored API",
    ],
    learnings: ["TODO: Add a verified lesson learned from the Vue assignment."],
    stack: ["Vue 3", "Vite", "JavaScript", "CSS", "APIs", "Vercel", "GitHub"],
    status: "live",
    image: "/projects/vanta-fun.svg",
    imageAlt: "Illustrative light entertainment interface for VANTA FUN; not a real screenshot",
    imageIsIllustrative: true,
    accent: "sky",
    liveUrl: "https://vanta-fun-vue.vercel.app/",
    sourceUrl: "https://github.com/puteraaqmalputera-dot/vanta-fun-vue",
  },
  {
    slug: "nimbuscloud",
    title: "NimbusCloud",
    category: "Cloud hosting UI concept",
    description:
      "A concept landing page and interactive dashboard simulation. A design exercise, not a hosting service.",
    problem: "Show how a cloud product interface can present hosting information clearly.",
    solution:
      "A landing page and dashboard simulation that explore the presentation of cloud hosting controls.",
    features: ["Cloud-themed landing page", "Interactive dashboard simulation", "Responsive interface"],
    learnings: ["TODO: Add the actual implementation stack and a verified learning outcome."],
    stack: ["Responsive web", "UI design", "Vercel"],
    status: "live",
    image: "/projects/nimbuscloud.svg",
    imageAlt: "Illustrative dark analytics interface for NimbusCloud; not a real screenshot",
    imageIsIllustrative: true,
    accent: "teal",
    liveUrl: "https://nimbuscloud-eta.vercel.app",
    sourceUrl: "",
  },
];

export type Skill = { label: string; symbol: string; swatch: string; category: string };
export const skills: Skill[] = [
  { label: "JavaScript", symbol: "JS", swatch: "#FACC15", category: "Web languages" },
  { label: "TypeScript", symbol: "TS", swatch: "#3B82F6", category: "Web languages" },
  { label: "CSS", symbol: "CSS", swatch: "#38BDF8", category: "Web languages" },
  { label: "Next.js", symbol: "N", swatch: "#BFB4FF", category: "Frameworks" },
  { label: "React", symbol: "R", swatch: "#5EEAD4", category: "Frameworks" },
  { label: "Vue 3", symbol: "V", swatch: "#4ADE80", category: "Frameworks" },
  { label: "Vercel", symbol: "▲", swatch: "#D4D4D8", category: "Tools & platforms" },
  { label: "GitHub", symbol: "G", swatch: "#A78BFA", category: "Tools & platforms" },
  { label: "APIs", symbol: "{ }", swatch: "#FB923C", category: "Tools & platforms" },
];

/** Project use is computed from published work, NOT a claimed proficiency score. */
export const skillUsage = (skill: Skill) =>
  projects.filter((p) => p.stack.includes(skill.label)).length;

export const projectCounts = {
  featured: projects.length,
  live: projects.filter((p) => p.status === "live").length,
  active: projects.filter((p) => p.status === "in-development").length,
  areas: site.focusAreas.length,
};

export const isEmailConfigured = () => Boolean(site.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email));
