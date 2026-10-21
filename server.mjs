import http from 'node:http';
import {readFile,realpath} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=await realpath(fileURLToPath(new URL('./dist/',import.meta.url)));
const port=Number(process.argv[2]||8840);
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Choose a port from 1024 to 65535.');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const candidate=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(candidate!==root&&!candidate.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  const actual=await realpath(candidate);
  if(!actual.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  const data=await readFile(actual);
  res.writeHead(200,{'Content-Type':types[path.extname(actual)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:data);
 }catch(error){res.writeHead(error.code==='ENOENT'?404:400);res.end('File not found or invalid request');}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'Port is busy. Try: node server.mjs 8842':error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`C:N Farmer App: http://127.0.0.1:${port}/\nKeep this window open. Press Ctrl+C to stop.`));
