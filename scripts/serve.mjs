import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {watch} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';
import {spawn} from 'node:child_process';
import {root,out,build} from './build.mjs';
const port=Number(process.env.PORT||4173);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT must be an integer from 1 to 65535.');
const dev=process.argv.includes('--dev');
await build();
let timer,busy=false,queued=false;
function rebuild(){
 if(busy){queued=true;return;}
 busy=true;
 const child=spawn(process.execPath,[join(root,'scripts/build.mjs')],{stdio:'inherit'});
 child.on('error',error=>console.error('Rebuild failed:',error.message));
 child.on('close',()=>{busy=false;if(queued){queued=false;rebuild();}});
}
if(dev)for(const directory of ['src','public'])watch(join(root,directory),{recursive:true},()=>{
 clearTimeout(timer);timer=setTimeout(rebuild,100);
});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.avif':'image/avif','.webp':'image/webp','.png':'image/png','.txt':'text/plain; charset=utf-8'};
const csp="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'; connect-src 'none'";
const server=createServer(async(req,res)=>{
 res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 res.setHeader('X-Frame-Options','DENY');
 res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.setHeader('Content-Security-Policy',csp);
 res.setHeader('Cache-Control','no-store');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
 let file=resolve(out,'.'+pathname);
 if(file!==out&&!file.startsWith(out+sep)){res.writeHead(403);res.end('Forbidden');return;}
 try{
  const info=await stat(file);
  if(info.isDirectory()){
   if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'});res.end();return;}
   file=join(file,'index.html');
  }
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});
  res.end(req.method==='HEAD'?undefined:data);
 }catch{
  res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
  try{res.end(req.method==='HEAD'?undefined:await readFile(join(out,'404.html')));}catch{res.end('Page not found');}
 }
});
server.on('error',error=>{console.error(error.message);process.exit(1);});
server.listen(port,'127.0.0.1',()=>console.log(`OLG concept: http://localhost:${port}${dev?' — changes rebuild automatically; refresh the browser':''}`));
