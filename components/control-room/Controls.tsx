"use client";
import {createContext,useCallback,useContext,useEffect,useMemo,useRef,useState,type ReactNode,type KeyboardEvent} from "react";
import {createPortal} from "react-dom";
import {ThemeProvider,useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import {ArrowRight,Check,Command,Copy,Download,Moon,Sun,X} from "lucide-react";
import {work} from "@/data/work";
import {site,emailReady} from "@/data/site";
type Action={id:string;label:string;detail?:string;disabled?:boolean;run:()=>void|Promise<void>};
type Controls={open:boolean;openPalette:()=>void;closePalette:()=>void;cvHref:string|null;copyEmail:()=>Promise<void>;toast:(message:string)=>void};
const Context=createContext<Controls|null>(null);
export function useControls(){const value=useContext(Context);if(!value)throw Error("ControlProviders required");return value;}
export function SkipToMain(){return <a href="#main-content" className="sr-only fixed left-5 top-4 z-[240] rounded-lg bg-[#F4CF57] px-5 py-3 font-semibold text-[#171B19] focus:not-sr-only">Skip to content</a>}
export function ControlProviders({children,cvHref}:{children:ReactNode;cvHref:string|null}){
 return <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="putera-control-room-theme" disableTransitionOnChange><ControlRuntime cvHref={cvHref}>{children}</ControlRuntime></ThemeProvider>;
}
function ControlRuntime({children,cvHref}:{children:ReactNode;cvHref:string|null}){
 const [open,setOpen]=useState(false);const [notice,setNotice]=useState("");const notifyTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const openPalette=useCallback(()=>setOpen(true),[]);const closePalette=useCallback(()=>setOpen(false),[]);
 const toast=useCallback((message:string)=>{setNotice(message);if(notifyTimer.current)clearTimeout(notifyTimer.current);notifyTimer.current=setTimeout(()=>setNotice(""),1700)},[]);
 useEffect(()=>()=>{if(notifyTimer.current)clearTimeout(notifyTimer.current)},[]);
 const copyEmail=useCallback(async()=>{if(!emailReady)return;try{await navigator.clipboard.writeText(site.email);toast("Copied")}catch{toast("Copy failed — use your email app")}},[toast]);
 useEffect(()=>{function shortcut(event:globalThis.KeyboardEvent){if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setOpen(v=>!v)}else if(event.key==="Escape"){setOpen(false)}}window.addEventListener("keydown",shortcut);return()=>window.removeEventListener("keydown",shortcut)},[]);
 const value=useMemo(()=>({open,openPalette,closePalette,cvHref,copyEmail,toast}),[open,openPalette,closePalette,cvHref,copyEmail,toast]);
 return <Context.Provider value={value}>{children}<Palette open={open} close={closePalette}/><div className="sr-only" aria-live="polite" aria-atomic="true">{notice}</div>{notice&&<div role="status" className="cr-toast cr-mono"><Check size={17} aria-hidden="true" style={{display:"inline",marginRight:9,color:"var(--positive)"}}/>{notice}</div>}</Context.Provider>
}
function Palette({open,close}:{open:boolean;close:()=>void}){
 const router=useRouter();const {setTheme,resolvedTheme}=useTheme();const {cvHref,copyEmail,toast}=useControls();
 const [mounted,setMounted]=useState(false);const [query,setQuery]=useState("");const [active,setActive]=useState(0);
 const input=useRef<HTMLInputElement>(null);const dialog=useRef<HTMLDivElement>(null);const prior=useRef<HTMLElement|null>(null);
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{if(!open)return;prior.current=document.activeElement as HTMLElement;setQuery("");setActive(0);const prev=document.body.style.overflow;document.body.style.overflow="hidden";const raf=requestAnimationFrame(()=>input.current?.focus());return()=>{cancelAnimationFrame(raf);document.body.style.overflow=prev;prior.current?.focus()}},[open]);
 function go(id:string){close();if(window.location.pathname==="/"){document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}else router.push("/#"+id)}
 function project(slug:string){close();router.push("/projects/"+slug)}
 function toggle(){const next=resolvedTheme==="dark"?"light":"dark";setTheme(next);try{localStorage.setItem("putera-control-room-theme",next)}catch{}close();}
 const actions:Action[]=[
  {id:"work",label:"Go to Work",detail:"01 / Selected work",run:()=>go("work")},
  {id:"tools",label:"Go to Toolbox",detail:"02 / What I work with",run:()=>go("toolbox")},
  {id:"path",label:"Go to Path",detail:"03 / Background",run:()=>go("path")},
  {id:"contact",label:"Go to Contact",detail:"04 / Contact",run:()=>go("contact")},
  ...work.map(p=>({id:p.slug,label:"Open "+p.title,detail:p.kind,run:()=>project(p.slug)})),
  {id:"theme",label:"Toggle theme",detail:"Dark / Light",run:toggle},
  ...(emailReady?[{id:"copy",label:"Copy email",detail:site.email,run:async()=>{close();await copyEmail()}}]:[]),
  ...(cvHref?[{id:"cv",label:"Download CV (PDF)",run:()=>{close();const a=document.createElement("a");a.href=cvHref;a.download="Putera_MY_CV.pdf";document.body.appendChild(a);a.click();a.remove();toast("Download started")}}]:[])
 ];
 function score(text:string,phrase:string){text=text.toLowerCase();phrase=phrase.trim().toLowerCase();if(!phrase)return 1;const index=text.indexOf(phrase);if(index>=0)return 100-index;let position=0,points=0;for(const char of phrase){const next=text.indexOf(char,position);if(next<0)return -1;points+=next===position?3:1;position=next+1}return points}
 const result=actions.map(a=>({a,score:score(a.label+" "+(a.detail||""),query)})).filter(i=>i.score>=0).sort((a,b)=>b.score-a.score).map(i=>i.a);
 const selected=Math.min(active,Math.max(0,result.length-1));
 function keyboard(e:KeyboardEvent<HTMLDivElement>){
  if(e.key==="Escape"){e.preventDefault();close();return}
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(result.length)setActive(i=>(i+(e.key==="ArrowDown"?1:-1)+result.length)%result.length);return}
  if(e.key==="Enter"){e.preventDefault();const item=result[selected];if(item&&!item.disabled)void item.run();return}
  if(e.key==="Tab"){const focusables=dialog.current?.querySelectorAll<HTMLElement>('input:not([disabled]),button:not([disabled])');if(!focusables?.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 }
 if(!mounted||!open)return null;
 return createPortal(<div className="cr-palette__layer" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="cr-palette-title" onKeyDown={keyboard} className="cr-palette"><div className="cr-palette__head"><Command size={20} style={{color:"var(--accent)"}} aria-hidden="true"/><label htmlFor="cr-palette-query" className="sr-only">Search commands</label><input id="cr-palette-query" ref={input} role="combobox" aria-controls="cr-palette-options" aria-expanded="true" aria-autocomplete="list" aria-activedescendant={result[selected]?"cr-option-"+result[selected].id:undefined} type="search" autoComplete="off" placeholder="Search work, pages, actions..." className="cr-palette__input" value={query} onChange={e=>{setQuery(e.target.value);setActive(0)}}/><button type="button" className="cr-toggle" aria-label="Close menu" onClick={close}><X size={20}/></button></div><div id="cr-palette-options" className="cr-palette__results" role="listbox" aria-label="Available commands">{result.length===0?<p className="cr-muted" style={{padding:20}}>No matching command.</p>:result.map((action,i)=><button key={action.id} id={"cr-option-"+action.id} role="option" aria-selected={selected===i} type="button" data-active={selected===i} className="cr-palette__row" onMouseEnter={()=>setActive(i)} onClick={()=>void action.run()}><span className="cr-mono cr-muted" style={{minWidth:30}}>{String(i+1).padStart(2,"0")}</span><span style={{flex:1,minWidth:0}}><strong style={{fontWeight:650}}>{action.label}</strong>{action.detail&&<span className="cr-mono cr-muted" style={{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{action.detail}</span>}</span><ArrowRight size={17} aria-hidden="true" style={{color:"var(--accent)"}}/></button>)}</div><div className="cr-palette__footer cr-mono cr-muted"><span>↑ ↓ Navigate</span><span>↵ Select</span><span>ESC Close</span></div></div></div>,document.body)
}
export function ThemeAction(){const {resolvedTheme,setTheme}=useTheme();const [ready,setReady]=useState(false);useEffect(()=>setReady(true),[]);function toggle(){const next=resolvedTheme==="dark"?"light":"dark";setTheme(next);try{localStorage.setItem("putera-control-room-theme",next)}catch{}}return <button type="button" className="cr-toggle" disabled={!ready} aria-label="Toggle light and dark theme" title="Toggle theme" onClick={toggle}>{ready&&resolvedTheme==="dark"?<Sun size={19}/>:<Moon size={19}/>}</button>}
export function CopyEmailAction(){const {copyEmail}=useControls();const [copied,setCopied]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);if(!emailReady)return <span className="cr-mono cr-muted">TODO: Add contact email</span>;return <button type="button" className="cr-button cr-button--accent" onClick={async()=>{await copyEmail();setCopied(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(false),1500)}}>{copied?<Check size={18}/>:<Copy size={18}/>} {copied?"Copied":"Copy email"}</button>}
export function CvAction(){const {cvHref}=useControls();return cvHref?<a className="cr-button cr-button--outline" href={cvHref} download="Putera_MY_CV.pdf"><Download size={18}/>Download CV (PDF)</a>:null}
