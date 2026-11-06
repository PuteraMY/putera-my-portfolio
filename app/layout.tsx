import type {Metadata,Viewport} from "next";
import type {ReactNode} from "react";
import {inter,interTight,mono} from "./fonts";
import {ControlProviders,SkipToMain} from "@/components/control-room/Controls";
import {getCvHref} from "@/lib/cv";
import {site} from "@/data/site";
import "./globals.css";
const description="Putera MY — web applications, Cloud Computing and IT support. Explore real project work including CINEX, VANTA FUN and NimbusCloud.";
export const metadata:Metadata={
 metadataBase:new URL(site.url),
 title:{default:"Putera MY — Web, Cloud & IT",template:"%s | Putera MY"},
 description,
 applicationName:"Putera MY",
 keywords:["Putera MY","Cloud Computing","Web Developer","IT Support","CINEX","VANTA FUN","NimbusCloud"],
 alternates:{canonical:"/"},
 openGraph:{type:"website",title:"Putera MY — Web, Cloud & IT",description,url:site.url,siteName:"Putera MY",images:[{url:"/opengraph-image",width:1200,height:630,alt:"Putera MY — Control Room portfolio"}]},
 twitter:{card:"summary_large_image",title:"Putera MY — Web, Cloud & IT",description,images:["/opengraph-image"]},
 icons:{icon:"/icon.svg"},
 robots:{index:true,follow:true}
};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:[{media:"(prefers-color-scheme:dark)",color:"#101312"},{media:"(prefers-color-scheme:light)",color:"#F7F4EC"}]};
export default function RootLayout({children}:{children:ReactNode}){
 const jsonLd={"@context":"https://schema.org","@type":"Person",name:site.name,alternateName:site.brand,url:site.url,sameAs:[site.github,site.linkedin].filter(Boolean),knowsAbout:["Web development","Cloud computing","IT support"]};
 return <html lang="en" suppressHydrationWarning><body className={[inter.variable,interTight.variable,mono.variable].join(" ")}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><ControlProviders cvHref={getCvHref()}><SkipToMain/>{children}</ControlProviders></body></html>;
}