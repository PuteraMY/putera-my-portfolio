import "server-only";
import {readdirSync} from "node:fs";
import {join} from "node:path";
/** Only advertises real PDF files placed inside public/assets/cv/. */
export function getCvHref():string|null{
 try{
  const directory=join(process.cwd(),"public","assets","cv");
  const match=readdirSync(directory).filter(file=>/\.pdf$/i.test(file)).sort()[0];
  return match?"/assets/cv/"+encodeURIComponent(match):null;
 }catch{return null;}
}