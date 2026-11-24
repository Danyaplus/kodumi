import {build} from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {optimizeImages} from './images.mjs';
import {siteUrl,validate} from '../src/lib/site.js';
const frontend=fileURLToPath(new URL('../',import.meta.url));
const configFile=path.join(frontend,'vite.config.js');
const dist=path.join(frontend,'dist'),ssr=path.join(frontend,'.ssr');
validate();await optimizeImages();
await build({configFile});
await build({configFile,build:{ssr:path.join(frontend,'src/entry-server.jsx'),outDir:ssr,emptyOutDir:true,copyPublicDir:false,rollupOptions:{output:{entryFileNames:'entry-server.mjs'}}}});
const {render,routes,seo}=await import(pathToFileURL(path.join(ssr,'entry-server.mjs')).href);
const template=await fs.readFile(path.join(dist,'index.html'),'utf8');
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function head(r){const s=seo(r);const meta=(type,key,value)=>`<meta ${type}="${key}" content="${esc(value)}">`;return [`<meta name="description" content="${esc(s.description)}">`,meta('name','robots',s.robots),`<link rel="canonical" href="${esc(s.canonical)}">`,...Object.entries({'og:type':'website','og:site_name':'Kodumi','og:title':s.title,'og:description':s.description,'og:url':s.canonical,'og:image':s.image}).map(([k,v])=>meta('property',k,v)),...Object.entries({'twitter:card':'summary_large_image','twitter:title':s.title,'twitter:description':s.description,'twitter:image':s.image}).map(([k,v])=>meta('name',k,v)),`<script type="application/ld+json">${JSON.stringify(s.schema).replace(/</g,'\\u003c')}</script>`].join('\n')}
if(!template.includes('<!-- KODUMI_SEO -->')||!template.includes('<!-- KODUMI_APP -->'))throw Error('HTML template markers missing');
for(const r of routes){const target=path.join(dist,r.path.replace(/^\//,''),r.path.endsWith('/')?'index.html':'');await fs.mkdir(path.dirname(target),{recursive:true});const html=template.replace(/<title>[\s\S]*?<\/title>/,()=>`<title>${esc(r.title)}</title>`).replace('<!-- KODUMI_SEO -->',()=>head(r)).replace('<!-- KODUMI_APP -->',()=>render(r.path));await fs.writeFile(target,html)}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.filter(r=>r.index).map(r=>`  <url><loc>${esc(r.canonical)}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(dist,'sitemap.xml'),sitemap);await fs.writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);await fs.writeFile(path.join(dist,'.nojekyll'),'');await fs.rm(ssr,{recursive:true,force:true});console.log(`[build] ${routes.length} HTML pages, ${routes.filter(r=>r.index).length} sitemap entries`);
