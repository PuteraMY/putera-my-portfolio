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
  headline: "I build useful things for the web.",
  bio: "Computer Technology student focused on Cloud Computing, practical web apps and IT support. Here is work I can demonstrate and explain.",
  about:
    "I study Computer Technology with a Cloud Computing focus. I build responsive web interfaces, connect public APIs and explore how web apps are deployed and supported. The projects here are linked to demonstrable work.",
  availability: "Exploring internship and junior opportunities",
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
      "A searchable TV, anime and film experience with ratings, genre filters and browser-saved favorites. In development.",
    problem:
      "Entertainment discovery often involves browsing across separate categories and services.",
    solution:
      "The Next.js interface combines discovery from public entertainment APIs with genre filtering, sorting, details and browser-saved favorites.",
    features: ["TV, anime and film collections", "Search, genre filtering and sorting", "Local saved favorites", "Details drawn from external APIs"],
    learnings: ["The Next.js interface normalizes data from several entertainment API schemas.", "A browser-saved list uses localStorage rather than requiring an account or database."],
    stack: ["Next.js", "TypeScript", "React", "CSS", "APIs", "Vercel", "GitHub"],
    status: "in-development",
    image: "/projects/cinex-real.webp",
    imageAlt: "Screenshot of the live CINEX discovery website captured 7 November 2026",
    imageIsIllustrative: false,
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
    learnings: ["Vue reactive state coordinates content modules, search and filters.", "The source includes API error states and fallbacks for unavailable upstream services."],
    stack: ["Vue 3", "Vite", "JavaScript", "HTML", "CSS", "APIs", "Vercel", "GitHub"],
    status: "live",
    image: "/projects/vanta-fun-real.webp",
    imageAlt: "Screenshot of the live VANTA FUN entertainment website captured 7 November 2026",
    imageIsIllustrative: false,
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
    learnings: ["This public project is a dashboard and hosting UI simulation, not a real provisioning service.", "Infrastructure deployment, live billing and customer accounts are outside the scope of this concept."],
    stack: ["Responsive web", "UI design", "Vercel"],
    status: "live",
    image: "/projects/nimbuscloud-real.webp",
    imageAlt: "Screenshot of the live NimbusCloud UI concept captured 7 November 2026",
    imageIsIllustrative: false,
    accent: "teal",
    liveUrl: "https://nimbuscloud-eta.vercel.app",
    sourceUrl: "",
  },
];

export type Skill = {
  label: string;
  icon: "html" | "css" | "js" | "ts" | "react" | "next" | "vue" | "github" | "vercel" | "api";
  category: "Web foundations" | "Frameworks" | "Workflow & deployment";
  evidence: string;
};
export const skills: Skill[] = [
  { label: "HTML", icon: "html", category: "Web foundations", evidence: "Markup in VANTA FUN" },
  { label: "CSS", icon: "css", category: "Web foundations", evidence: "Responsive styling" },
  { label: "JavaScript", icon: "js", category: "Web foundations", evidence: "VANTA FUN data flows" },
  { label: "TypeScript", icon: "ts", category: "Web foundations", evidence: "CINEX data models" },
  { label: "React", icon: "react", category: "Frameworks", evidence: "CINEX UI" },
  { label: "Next.js", icon: "next", category: "Frameworks", evidence: "CINEX implementation" },
  { label: "Vue 3", icon: "vue", category: "Frameworks", evidence: "VANTA FUN assignment" },
  { label: "GitHub", icon: "github", category: "Workflow & deployment", evidence: "Public project source" },
  { label: "Vercel", icon: "vercel", category: "Workflow & deployment", evidence: "Live project demos" },
  { label: "REST APIs", icon: "api", category: "Workflow & deployment", evidence: "Public data integrations" },
];
export const projectCounts = {
  featured: projects.length,
  live: projects.filter((p) => p.status === "live").length,
  active: projects.filter((p) => p.status === "in-development").length,
  areas: site.focusAreas.length,
};
export const isEmailConfigured = () => Boolean(site.email && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(site.email));
