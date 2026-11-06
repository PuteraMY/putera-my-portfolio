export type Language="en"|"bm";
export type LocalizedText={en:string;bm:string};
export const site={
 name:"Putera",brand:"Putera MY",url:"https://putera-my-portfolio.vercel.app",
 email:"your-email@example.com",github:"https://github.com/puteraaqmalputera-dot",linkedin:"",
 cvPath:"/cv.pdf",cvAvailable:false,photoPath:"/images/putera.jpg",photoAvailable:false,
 availability:{on:true,text:{en:"Open to internships and junior roles",bm:"Terbuka kepada latihan industri dan jawatan junior"}},
 roles:{en:["Web developer","Cloud learner","IT support"],bm:["Pembangun web","Pelajar teknologi awan","Sokongan IT"]},
 location:"Malaysia, MYT",timeZone:"Asia/Kuala_Lumpur"
} as const;
export type Skill={name:string;level:"daily"|"learning"};
export const skills:{web:Skill[];cloud:Skill[]}={
 web:[{name:"HTML / CSS",level:"learning"},{name:"JavaScript",level:"learning"},{name:"TypeScript",level:"learning"},{name:"React",level:"learning"},{name:"Next.js",level:"learning"},{name:"REST APIs",level:"learning"}],
 cloud:[{name:"Firebase",level:"learning"},{name:"Vercel",level:"learning"},{name:"GitHub",level:"learning"},{name:"Hardware troubleshooting",level:"learning"},{name:"Basic networking",level:"learning"}]
};
export const emailReady=site.email!=="your-email@example.com"&&!!site.email;
export const cvReady=site.cvAvailable;
export const linkedInReady=!!site.linkedin;