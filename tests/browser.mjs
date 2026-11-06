import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {chromium} from "@playwright/test";
const ROOT=process.env.TEST_URL||"http://127.0.0.1:3000";
const WIDTHS=[360,390,768,1280,1920];
await mkdir("test-results",{recursive:true});
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
let checks=0;const report=[];
async function verify(page,label,width){
 const details=await page.evaluate(()=>{
  const doc=document.documentElement;const root=document.querySelector("h1");const hero=root?.getBoundingClientRect();const menu=document.querySelector(".cr-menu")?.getBoundingClientRect();const logo=document.querySelector(".cr-logo")?.getBoundingClientRect();
  return{scrollWidth:doc.scrollWidth,clientWidth:doc.clientWidth,heroRight:hero?.right,heroLeft:hero?.left,titleOverflow:root?root.scrollWidth-root.clientWidth:0,menuLeft:menu?.left||0,logoRight:logo?.right||0};
 });
 assert(details.scrollWidth<=width+1,label+" horizontal overflow: "+JSON.stringify(details));
 assert(details.titleOverflow<=2,label+" hero text overflows: "+JSON.stringify(details));
 assert(details.heroRight<=width+1&&details.heroLeft>=-1,label+" hero outside viewport");
 if(width<1051)assert(details.menuLeft>=details.logoRight+4,label+" menu overlaps logo: "+JSON.stringify(details));
 checks+=4;return details;
}
for(const width of WIDTHS){
 const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,colorScheme:"dark",reducedMotion:"reduce"});
 const page=await ctx.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
 await page.goto(ROOT+"/",{waitUntil:"load"});await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator("h1").innerText(),"Putera MY.");
 const measured=await verify(page,"dark "+width,width);
 if(width===390||width===1280)await page.screenshot({path:"test-results/control-room-"+width+"-dark.png",fullPage:true,animations:"disabled"});
 if(width<=1050){
  const menu=page.getByRole("button",{name:"Open menu and command palette"});
  assert.equal(await menu.isVisible(),true,"Mobile menu missing "+width);
  await menu.click();
  const dialog=page.getByRole("dialog",{name:"Menu and command palette"});
  assert(await dialog.isVisible(),"Menu did not open");
  assert.equal(await menu.getAttribute("aria-expanded"),"true");
  await page.keyboard.press("Escape");
  assert.equal(await dialog.count(),0,"Escape did not close menu");
  assert.equal(await menu.getAttribute("aria-expanded"),"false");
  checks+=5;
 }else{
  assert(await page.getByRole("navigation",{name:"Primary navigation"}).isVisible());
  await page.keyboard.press("Control+k");
  assert(await page.getByRole("dialog",{name:"Menu and command palette"}).isVisible(),"Ctrl+K failed");
  await page.keyboard.press("Escape");
  checks+=3;
 }
 await page.emulateMedia({colorScheme:"light"});await page.reload({waitUntil:"load"});
 await page.waitForTimeout(120);
 assert(await page.locator("html").evaluate(e=>e.classList.contains("light")),"System light theme not applied");
 await verify(page,"light "+width,width);
 if(width===390||width===1280)await page.screenshot({path:"test-results/control-room-"+width+"-light.png",fullPage:true,animations:"disabled"});
 assert.equal(errors.length,0,"Console errors at "+width+": "+errors.join(" | "));
 report.push({width,measured,consoleErrors:errors.length});await ctx.close();
}
const context=await browser.newContext({viewport:{width:1280,height:900},colorScheme:"dark",reducedMotion:"reduce"});
const page=await context.newPage();const exceptions=[];page.on("pageerror",e=>exceptions.push(e.message));
await page.goto(ROOT+"/",{waitUntil:"load"});
assert.equal(await page.locator(".cr-workrow").count(),3,"Expected 3 verified public project rows");
assert.equal(await page.locator(".cr-workrow").first().getAttribute("href"),"/projects/cinex");
assert.equal(await page.getByRole("link",{name:"Download CV (PDF)"}).count(),0,"CV must not appear without PDF");
assert.equal(await page.getByRole("button",{name:"Copy email"}).count(),0,"Placeholder email should not be actionable");
await page.keyboard.press("Control+k");await page.locator("#cr-palette-query").fill("Open CINEX");await page.keyboard.press("Enter");
await page.waitForURL("**/projects/cinex");
assert(await page.getByText("What I built").first().isVisible());
await page.getByRole("link",{name:"Back to work"}).click();await page.waitForURL(/\/#work/);
assert.equal(new URL(page.url()).pathname,"/");
for(const slug of ["vanta-fun","nimbuscloud"]){
 await page.goto(ROOT+"/projects/"+slug,{waitUntil:"load"});
 assert(await page.locator("h1").innerText(),slug==="vanta-fun"?"VANTA FUN.":"NimbusCloud.");
 await verify(page,"case "+slug,1280);
}
await page.goto(ROOT+"/",{waitUntil:"load"});
const response=await page.request.get(ROOT+"/sitemap.xml");assert.equal(response.status(),200);const xml=await response.text();
assert(xml.includes("projects/cinex")&&xml.includes("projects/vanta-fun")&&xml.includes("projects/nimbuscloud"));
assert(!xml.includes("projects/asetdesk"),"Unverified AsetDesk should not be indexed");
const notFound=await page.goto(ROOT+"/projects/asetdesk",{waitUntil:"load"});assert.equal(notFound?.status(),404);
assert.equal(exceptions.length,0,exceptions.join(" | "));
await context.close();await browser.close();
console.log(JSON.stringify({passed:true,checks:checks+16,viewports:report},null,2));