import type {LocalizedText} from "./site";
export type ProjectStatus="live"|"in-development"|"coming-soon";
export type ProjectColor="cobalt"|"yellow"|"coral"|"mint"|"sky";
export type ProjectImage={path:string;alt:LocalizedText};
export type Project={
 slug:string;title:string;status:ProjectStatus;color:ProjectColor;summary:LocalizedText;problem:LocalizedText;approach:LocalizedText;
 features:LocalizedText[];challenges:LocalizedText[];result:LocalizedText;role:LocalizedText;timeframe:LocalizedText;
 tech:string[];images:ProjectImage[];liveUrl:string;repoUrl:string;featured:boolean;
 builtSoFar?:LocalizedText[];nextSteps?:LocalizedText[]
};
const p=(en:string,bm:string):LocalizedText=>({en,bm});
export const projects:Project[]=[
 {slug:"cinex",title:"CINEX",status:"in-development",color:"cobalt",featured:true,
 summary:p("Film, TV and anime discovery with search, filters and saved titles.","Penerokaan filem, siri TV dan anime dengan carian, penapis dan senarai simpanan."),
 problem:p("Discovering and organizing films, TV and anime can involve separate browsing experiences.","Penerokaan dan penyusunan filem, TV dan anime boleh melibatkan platform berasingan."),
 approach:p("[PLACEHOLDER: Explain API integration and implementation decisions.]","[PLACEHOLDER: Terangkan integrasi API dan keputusan pembangunan.]"),
 features:[p("Search entertainment titles","Cari tajuk hiburan"),p("Filter discovery results","Tapis hasil carian"),p("Save titles to a personal list","Simpan tajuk ke senarai peribadi")],
 challenges:[p("[PLACEHOLDER: Actual technical challenge and solution.]","[PLACEHOLDER: Cabaran teknikal sebenar dan penyelesaiannya.]")],
 result:p("An in-development discovery app with a public preview.","Aplikasi penerokaan dalam pembangunan dengan pratonton awam."),
 role:p("[PLACEHOLDER: Personal responsibilities]","[PLACEHOLDER: Tanggungjawab peribadi]"),timeframe:p("[PLACEHOLDER: Dates]","[PLACEHOLDER: Tarikh]"),
 tech:["Next.js","TypeScript","Third-party APIs"],images:[],liveUrl:"https://psmy-cinex.vercel.app/",repoUrl:"https://github.com/puteraaqmalputera-dot/psmy-cinex-",
 builtSoFar:[p("Search, filters and saved-list features","Ciri carian, penapis dan senarai simpanan")],nextSteps:[p("[PLACEHOLDER: Confirmed next milestone]","[PLACEHOLDER: Sasaran seterusnya]")]},
 {slug:"asetdesk",title:"AsetDesk",status:"in-development",color:"mint",featured:true,
 summary:p("IT asset tracking and a helpdesk ticket system, built with Firebase.","Penjejakan aset IT dan sistem tiket helpdesk menggunakan Firebase."),
 problem:p("IT teams need organized records for equipment and support requests.","Pasukan IT memerlukan rekod peralatan dan permintaan sokongan yang tersusun."),
 approach:p("[PLACEHOLDER: Explain authentication, Firestore data model and UI.]","[PLACEHOLDER: Terangkan pengesahan, data Firestore dan UI.]"),
 features:[p("IT asset management","Pengurusan aset IT"),p("Helpdesk tickets","Tiket helpdesk")],
 challenges:[p("[PLACEHOLDER: A genuine Firebase or application challenge.]","[PLACEHOLDER: Cabaran aplikasi atau Firebase sebenar.]")],
 result:p("In development; no public demo link yet.","Dalam pembangunan; pautan demo awam belum tersedia."),
 role:p("[PLACEHOLDER: Personal responsibilities]","[PLACEHOLDER: Tanggungjawab peribadi]"),timeframe:p("[PLACEHOLDER: Dates]","[PLACEHOLDER: Tarikh]"),
 tech:["HTML","CSS","JavaScript","Firebase Authentication","Firestore"],images:[],liveUrl:"",repoUrl:"",
 builtSoFar:[p("[PLACEHOLDER: Confirm features already implemented]","[PLACEHOLDER: Sahkan fungsi yang telah dibina]")],nextSteps:[p("[PLACEHOLDER: Next milestone]","[PLACEHOLDER: Sasaran seterusnya]")]},
 {slug:"vanta-fun",title:"VANTA FUN",status:"live",color:"yellow",featured:true,
 summary:p("A live academic entertainment website with character discovery, jokes and activity suggestions powered by public APIs.","Laman web tugasan hiburan yang aktif dengan penerokaan watak, jenaka dan cadangan aktiviti melalui API awam."),
 problem:p("The assignment combines three entertainment modules into one searchable interface.","Tugasan ini menggabungkan tiga modul hiburan dalam satu antaramuka yang boleh dicari."),
 approach:p("Built with Vue 3, Vite and JavaScript. The website connects to the Rick and Morty API, JokeAPI and Bored API, with search, filters and detail dialogs.","Dibina dengan Vue 3, Vite dan JavaScript. Website menghubungkan Rick and Morty API, JokeAPI dan Bored API, serta menyediakan carian, penapis dan dialog butiran."),
 features:[p("Character search and filters using Rick and Morty API","Carian dan penapis watak dengan Rick and Morty API"),p("Joke browsing and categories using JokeAPI","Penerokaan jenaka dan kategori dengan JokeAPI"),p("Activity suggestions using Bored API","Cadangan aktiviti dengan Bored API"),p("Responsive interface, loading and error feedback","Antaramuka responsif, pemuatan dan maklum balas ralat")],
 challenges:[p("Display useful loading, empty and error states when external APIs respond unpredictably.","Paparkan keadaan pemuatan, kosong dan ralat yang jelas ketika API luar memberi respons tidak menentu.")],
 result:p("A published Vue 3 academic assignment with three entertainment modules and a public demo.","Tugasan akademik Vue 3 yang diterbitkan dengan tiga modul hiburan serta demo awam."),
 role:p("[TODO: Confirm individual project responsibilities]","[TODO: Sahkan tanggungjawab individu dalam projek]"),
 timeframe:p("[TODO: Confirm project dates]","[TODO: Sahkan tarikh projek]"),
 tech:["Vue 3","Vite","JavaScript","CSS","Vercel","Rick and Morty API","JokeAPI","Bored API"],images:[],
 liveUrl:"https://vanta-fun-vue.vercel.app/",repoUrl:"https://github.com/puteraaqmalputera-dot/vanta-fun-vue"},
 {slug:"nimbuscloud",title:"NimbusCloud",status:"live",color:"sky",featured:true,
 summary:p("A cloud-hosting landing page with an interactive dashboard simulation.","Laman cloud-hosting dengan simulasi papan pemuka interaktif."),
 problem:p("Cloud platform interfaces need clear navigation and understandable interactions.","Antaramuka cloud memerlukan navigasi jelas dan interaksi yang mudah difahami."),
 approach:p("[PLACEHOLDER: Describe your UI and dashboard implementation.]","[PLACEHOLDER: Huraikan pembangunan UI dan papan pemuka.]"),
 features:[p("Cloud-hosting landing page","Laman utama cloud-hosting"),p("Dashboard simulation","Simulasi papan pemuka"),p("Responsive interface","Antaramuka responsif")],
 challenges:[p("[PLACEHOLDER: A real design or implementation challenge.]","[PLACEHOLDER: Cabaran reka bentuk atau pembangunan sebenar.]")],
 result:p("A live UI exercise; not a real hosting service.","Latihan UI yang aktif; bukan perkhidmatan hosting sebenar."),
 role:p("[PLACEHOLDER: Personal responsibilities]","[PLACEHOLDER: Tanggungjawab peribadi]"),timeframe:p("[PLACEHOLDER: Dates]","[PLACEHOLDER: Tarikh]"),
 tech:["Web Development","Responsive UI","Vercel"],images:[],liveUrl:"https://nimbuscloud-eta.vercel.app",repoUrl:""}
];
export const getProject=(slug:string)=>projects.find(p=>p.slug===slug);
export const getProjectPath=(p:Pick<Project,"slug">)=>"/projects/"+p.slug;
export const getNextProject=(slug:string)=>{const i=projects.findIndex(p=>p.slug===slug);return projects.length>1&&i>=0?projects[(i+1)%projects.length]:undefined;};