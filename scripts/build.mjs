import {cp,mkdir,rm,writeFile} from 'node:fs/promises';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {routes} from '../src/routes.mjs';
import {layout} from '../src/components.mjs';
export const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const out=join(root,'dist');
export async function build(){
 await rm(out,{recursive:true,force:true});
 await mkdir(out,{recursive:true});
 await cp(join(root,'public'),out,{recursive:true});
 await cp(join(root,'src/styles'),join(out,'styles'),{recursive:true});
 for(const route of routes){
  const relative=route.path==='/404.html'?'404.html':join(route.path.slice(1),'index.html');
  const file=join(out,relative);
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,layout({...route,body:route.render()}));
 }
 console.log(`Built ${routes.length} pages → dist/ (preview only; no indexing or intake).`);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{await build();}catch(error){console.error(error);process.exitCode=1;}
}
