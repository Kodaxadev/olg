import {attorneys,practices} from './data.mjs';
import {home} from './pages/home.mjs';
import {attorneyIndex,attorneyProfile} from './pages/attorneys.mjs';
import {practiceIndex,practiceDetail} from './pages/practice.mjs';
import {about} from './pages/about.mjs';
import {contact} from './pages/contact.mjs';
import {review} from './pages/review.mjs';
import {subhero,button} from './components.mjs';
export const routes=[
 {path:'/',title:'Oviedo Law Group',description:'A Kodaxa design concept for a modern Clovis law-firm website.',render:home},
 {path:'/attorneys/',title:'Our attorneys',description:'A two-attorney profile structure, pending firm approval.',render:attorneyIndex},
 ...attorneys.map(a=>({path:`/attorneys/${a.slug}/`,title:a.name,description:`Draft attorney profile for ${a.name}.`,render:()=>attorneyProfile(a.slug)})),
 {path:'/practice-areas/',title:'The practice',description:'Proposed practice areas for firm review.',render:practiceIndex},
 ...practices.map(p=>({path:`/practice-areas/${p.slug}/`,title:p.title,description:p.short,render:()=>practiceDetail(p.slug)})),
 {path:'/about/',title:'The firm',description:'A Clovis identity and a more considered digital experience.',render:about},
 {path:'/contact/',title:'Contact the office',description:'Published office contact details. This concept does not accept case inquiries.',render:contact},
 {path:'/design-review/',title:'Design review',description:'Design references, content caveats, and pre-launch requirements.',render:review},
 {path:'/404.html',title:'Page not found',description:'This page does not exist in the concept.',render:()=>`${subhero('404 / Page not found','Let’s find<br><em>the right page.</em>','This address is not part of the concept website.')}<section class="section shell">${button('Return to the homepage','/')}</section>`},
];
