import {projects,type Project} from "./projects";
export type WorkKind="Web application"|"Academic web project"|"UI concept";
export type PublicWork=Project&{kind:WorkKind;year:string;note:string};
const approved:Record<string,{kind:WorkKind;year:string;note:string}>={
 cinex:{kind:"Web application",year:"TODO",note:"In progress · public development preview"},
 "vanta-fun":{kind:"Academic web project",year:"2026",note:"Vue 3 assignment · live"},
 nimbuscloud:{kind:"UI concept",year:"TODO",note:"Cloud-hosting interface concept · live"}
};
export const work:PublicWork[]=projects.filter(p=>Boolean(approved[p.slug])&&(Boolean(p.liveUrl)||Boolean(p.repoUrl))).map(p=>({...p,...approved[p.slug]}));
export function findWork(slug:string):PublicWork|undefined{return work.find(p=>p.slug===slug);}
export function nextWork(slug:string):PublicWork|undefined{const i=work.findIndex(p=>p.slug===slug);return i<0||work.length<2?undefined:work[(i+1)%work.length]}
