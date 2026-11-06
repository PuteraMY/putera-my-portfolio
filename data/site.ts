export const site = {
  name: "Putera",
  brand: "PUTERA MY",
  role: "Front-End Developer",
  secondary: "Cloud Computing & IT Support",
  email: "your-email@example.com",
  githubUrl: "https://github.com/puteraaqmalputera-dot",
  linkedinUrl: "",
  cvUrl: "",
  siteUrl: "https://putera-my-portfolio.vercel.app",
  profileImage: "/images/putera.jpg",
} as const;
export const isEmailReady = site.email !== "your-email@example.com";
