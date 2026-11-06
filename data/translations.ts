export type Language = "en" | "bm";
export const translations = {
  en: {
    nav: { projects:"Projects", skills:"Skills", about:"About", contact:"Contact" },
    hero: {
      eyebrow:"WELCOME TO MY PORTFOLIO", title:"I build thoughtful", emphasis:"digital experiences.",
      intro:"I'm Putera, a Computer Technology student focusing on Cloud Computing. I build responsive web interfaces and bring practical front-end, cloud deployment and IT support skills to every project.",
      view:"View projects", cv:"Download CV", cvPending:"CV coming soon",
      availability:"OPEN TO INTERNSHIP & ENTRY-LEVEL OPPORTUNITIES", proof:"REAL PROJECTS. PRACTICAL SKILLS."
    },
    projects: {
      eyebrow:"SELECTED WORK / 01", title:"Work that speaks for itself.", intro:"Working projects, clear problems and real technology—explore the results.",
      featured:"FEATURED", all:"All", live:"Live", development:"In development", soon:"Coming soon",
      view:"Visit website", source:"View code", details:"The problem", technologies:"Built with",
      image:"Project preview", none:"No projects match this status."
    },
    skills: {
      eyebrow:"EXPERTISE / 02", title:"A practical toolkit.",
      intro:"A balance of front-end development and the systems that support reliable digital products.",
      web:"Web Development", cloud:"Cloud & IT Support",
      hardware:"Hardware troubleshooting", network:"Basic networking"
    },
    about: {
      eyebrow:"ABOUT / 03", title:"Curious about technology. Focused on useful outcomes.",
      p1:"I'm Putera, a Computer Technology student specialising in Cloud Computing.",
      p2:"My work combines interface design, responsive development and practical troubleshooting.",
      p3:"Through NimbusCloud and CINEX, I put ideas into usable web experiences, integrate external data and deploy working products.",
      p4:"I'm looking for opportunities to contribute to a real team through an internship or entry-level role.",
      profile:"PUTERA MY / PROFILE", photo:"Portrait of Putera"
    },
    contact: {
      eyebrow:"CONTACT / 04", title:"Let's make something useful.",
      intro:"If you're hiring an intern or junior developer, explore my work and get in touch.",
      email:"Email me", github:"GitHub", linkedin:"LinkedIn", emailPending:"Email coming soon", linkedinPending:"LinkedIn coming soon"
    },
    footer:"Created by Putera MY",
    misc:{top:"Back to top",language:"Switch language",theme:"Switch theme",menu:"Open menu",close:"Close menu",skip:"Skip to content"}
  },
  bm: {
    nav: { projects:"Projek", skills:"Kemahiran", about:"Tentang Saya", contact:"Hubungi" },
    hero: {
      eyebrow:"SELAMAT DATANG KE PORTFOLIO", title:"Saya bina pengalaman", emphasis:"digital yang bermakna.",
      intro:"Saya Putera, pelajar Teknologi Komputer dengan fokus Cloud Computing. Saya membina antaramuka web responsif dan mengaplikasikan kemahiran front-end, penerbitan awan serta sokongan IT.",
      view:"Lihat projek", cv:"Muat turun CV", cvPending:"CV akan ditambah",
      availability:"TERBUKA KEPADA LATIHAN INDUSTRI & KERJA PERINGKAT PERMULAAN", proof:"PROJEK SEBENAR. KEMAHIRAN PRAKTIKAL."
    },
    projects: {
      eyebrow:"HASIL KERJA / 01", title:"Hasil kerja yang membuktikan kebolehan.", intro:"Projek berfungsi, masalah yang jelas dan teknologi sebenar—teroka hasilnya.",
      featured:"PROJEK UTAMA", all:"Semua", live:"Aktif", development:"Dalam pembangunan", soon:"Akan datang",
      view:"Buka website", source:"Lihat kod", details:"Masalah yang ditangani", technologies:"Teknologi",
      image:"Pratonton projek", none:"Tiada projek untuk status ini."
    },
    skills: {
      eyebrow:"KEMAHIRAN / 02", title:"Kemahiran untuk membina.",
      intro:"Gabungan pembangunan front-end dengan asas sistem yang menyokong produk digital.",
      web:"Pembangunan Web", cloud:"Cloud & Sokongan IT",
      hardware:"Penyelesaian masalah perkakasan", network:"Asas rangkaian"
    },
    about: {
      eyebrow:"TENTANG SAYA / 03", title:"Minat terhadap teknologi. Fokus pada hasil berguna.",
      p1:"Saya Putera, pelajar Teknologi Komputer dengan pengkhususan Cloud Computing.",
      p2:"Hasil kerja saya menggabungkan reka bentuk antaramuka, pembangunan responsif dan penyelesaian masalah praktikal.",
      p3:"Melalui NimbusCloud dan CINEX, saya membina pengalaman web berguna, mengintegrasi data luaran serta menerbitkan produk yang berfungsi.",
      p4:"Saya mencari peluang untuk menyumbang kepada pasukan sebenar melalui latihan industri atau jawatan peringkat permulaan.",
      profile:"PUTERA MY / PROFIL", photo:"Gambar Putera"
    },
    contact: {
      eyebrow:"HUBUNGI / 04", title:"Mari bina sesuatu yang berguna.",
      intro:"Jika anda mencari pelatih industri atau pembangun junior, teroka hasil kerja saya dan hubungi saya.",
      email:"Hantar e-mel", github:"GitHub", linkedin:"LinkedIn", emailPending:"E-mel akan ditambah", linkedinPending:"LinkedIn akan ditambah"
    },
    footer:"Dihasilkan oleh Putera MY",
    misc:{top:"Kembali ke atas",language:"Tukar bahasa",theme:"Tukar tema",menu:"Buka menu",close:"Tutup menu",skip:"Langkau ke kandungan"}
  }
} as const;
export type Dictionary = typeof translations.en;
