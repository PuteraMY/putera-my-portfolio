import type {Metadata,Viewport} from "next";
import type {ReactNode} from "react";
import {inter,interTight,mono} from "./fonts";
import {AppProviders,SkipLink} from "@/components/Providers";
import {site} from "@/data/site";
import "./globals.css";
const description="Putera MY's portfolio: web applications, Cloud Computing projects, IT support, CINEX, AsetDesk and NimbusCloud.";
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:"Putera MY | Web Developer & Cloud Computing",template:"%s | Putera MY"},description,applicationName:"Putera MY",keywords:["Putera MY","Web Development","Cloud Computing","IT Support","CINEX","AsetDesk","NimbusCloud"],alternates:{canonical:"/"},openGraph:{type:"website",url:site.url,siteName:"Putera MY",title:"Putera MY | Web Developer & Cloud Computing",description,images:[{url:"/opengraph-image",width:1200,height:630,alt:"Putera MY portfolio"}]},twitter:{card:"summary_large_image",title:"Putera MY",description,images:["/opengraph-image"]},robots:{index:true,follow:true},icons:{icon:"/icon.svg"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:[{media:"(prefers-color-scheme:light)",color:"#FFF9EE"},{media:"(prefers-color-scheme:dark)",color:"#0E1116"}]};
export default function RootLayout({children}:{children:ReactNode}){
 const structured={"@context":"https://schema.org","@type":"Person",name:site.name,alternateName:site.brand,url:site.url,description,sameAs:[site.github,site.linkedin].filter(Boolean),knowsAbout:["Web Development","Cloud Computing","IT Support","Next.js","TypeScript"]};
 return <html lang="en" suppressHydrationWarning><body className={[inter.variable,interTight.variable,mono.variable].join(" ")}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}}/><AppProviders><SkipLink/>{children}</AppProviders></body></html>;
}