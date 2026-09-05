import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {routes} from '../src/routes.mjs';
import {firm,attorneys,practices} from '../src/data.mjs';
import {e} from '../src/components.mjs';
const out=resolve('dist');
const fileFor=path=>join(out,path==='/404.html'?'404.html':path.slice(1)+'index.html');
for(const route of routes){
 test(`${route.path} renders semantic, review-only HTML`,async()=>{
  const html=await readFile(fileFor(route.path),'utf8');
  assert.match(html,/<!doctype html>/i);assert.match(html,/<html lang="en">/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'exactly one h1');
  assert.match(html,/<meta name="robots" content="noindex, nofollow, noarchive">/);
  assert.match(html,/id="main"/);assert.match(html,/href="#main"/);
  assert.match(html,/DESIGN CONCEPT/);assert.doesNotMatch(html,/1990 Shaw|712 Pollasky|San Joaquin College of Law/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length,'unique element ids');
  for(const image of html.matchAll(/<img\b[^>]*>/g))assert.match(image[0],/\balt="[^"]+"/);
  for(const found of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const url=found[1];if(!url.startsWith('/'))continue;
   const pathname=url.split(/[?#]/)[0];
   const target=pathname.endsWith('/')?join(out,pathname,'index.html'):join(out,pathname);
   await assert.doesNotReject(()=>stat(target),`missing local link ${url}`);
  }
 });
}
test('all configured practice areas and attorneys have pages',()=>{
 for(const p of practices)assert.ok(routes.some(r=>r.path===`/practice-areas/${p.slug}/`));
 for(const a of attorneys)assert.ok(routes.some(r=>r.path===`/attorneys/${a.slug}/`));
 assert.equal(attorneys.length,2);assert.equal(firm.preview,true);
});
test('contact cannot collect or submit an inquiry',async()=>{
 const html=await readFile(fileFor('/contact/'),'utf8');
 assert.match(html,/<fieldset disabled>/);assert.match(html,/type="submit" disabled/);
 assert.doesNotMatch(html,/\baction="|textarea|type="file"/);
 const js=await readFile(join(out,'app.js'),'utf8');assert.match(js,/preventDefault/);
 assert.doesNotMatch(js,/fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});
test('robots and hosting configuration preserve preview restrictions',async()=>{
 assert.match(await readFile(join(out,'robots.txt'),'utf8'),/Disallow: \//);
 const vercel=JSON.parse(await readFile('vercel.json','utf8'));
 assert.equal(vercel.outputDirectory,'dist');
 assert.ok(vercel.headers[0].headers.some(h=>h.key==='X-Robots-Tag'&&h.value.includes('noindex')));
 assert.ok(vercel.headers[0].headers.some(h=>h.key==='Content-Security-Policy'&&h.value.includes("form-action 'none'")));
});
test('runtime image assets exist and have AVIF container signatures',async()=>{
 for(const name of ['homepage-concept','attorneys-concept','office-study']){
  const data=await readFile(join(out,'images',name+'.avif'));
  assert.ok(data.subarray(0,48).includes(Buffer.from('avif')),name);
 }
});
test('all CSS asset URLs resolve',async()=>{
 for(const name of ['base','components','pages','responsive']){
  const css=await readFile(join(out,'styles',name+'.css'),'utf8');
  for(const match of css.matchAll(/url\(['"]?(\/[^)'"\s]+)/g))await assert.doesNotReject(()=>stat(join(out,match[1])));
 }
});
test('content escapes HTML special characters',()=>assert.equal(e('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;'));
