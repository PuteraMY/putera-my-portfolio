export type ProjectStatus = "live" | "in-development" | "coming-soon";
export type LocalizedText = { en: string; bm: string };
export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  summary: LocalizedText;
  problem: LocalizedText;
  tech: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
};
export const projects: Project[] = [
  {
    id: "nimbuscloud",
    title: "NimbusCloud",
    status: "live",
    summary: {
      en: "A responsive cloud-hosting landing page with interactive features.",
      bm: "Laman cloud hosting responsif dengan fungsi interaktif."
    },
    problem: {
      en: "Make cloud hosting services easier to discover and understand.",
      bm: "Memudahkan pengguna memahami dan meneroka perkhidmatan cloud hosting."
    },
    tech: ["Web Development", "Responsive UI", "Vercel"],
    image: "/images/nimbuscloud.png",
    liveUrl: "https://nimbuscloud-eta.vercel.app",
    repoUrl: "",
    featured: true
  },
  {
    id: "cinex",
    title: "CINEX",
    status: "in-development",
    summary: {
      en: "A film, TV and anime discovery experience with search, filters and saved titles.",
      bm: "Aplikasi penerokaan filem, siri TV dan anime dengan carian, penapis dan simpanan."
    },
    problem: {
      en: "Make entertainment data from multiple APIs easier to browse and organize.",
      bm: "Memudahkan data hiburan daripada beberapa API diterokai dan disusun."
    },
    tech: ["Next.js", "React", "TypeScript", "REST APIs", "Vercel"],
    image: "/images/cinex.png",
    liveUrl: "https://psmy-cinex.vercel.app/",
    repoUrl: "https://github.com/puteraaqmalputera-dot/psmy-cinex-",
    featured: true
  },
  {
    id: "next-project",
    title: "Next Project",
    status: "coming-soon",
    summary: {
      en: "New practical work will appear here after it is ready to share.",
      bm: "Projek praktikal baharu akan dipaparkan apabila sedia untuk dikongsi."
    },
    problem: {
      en: "An upcoming opportunity to turn another real need into a useful product.",
      bm: "Peluang seterusnya untuk menjadikan keperluan sebenar sebuah produk berguna."
    },
    tech: [],
    image: "",
    liveUrl: "",
    repoUrl: "",
    featured: false
  }
];
