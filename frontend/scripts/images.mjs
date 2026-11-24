import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const frontend=fileURLToPath(new URL('../',import.meta.url));
const originals=path.join(frontend,'src/assets/images');
const output=path.join(frontend,'public/images');
const variants={mobile:[480,75],tablet:[800,80],desktop:[1440,85]};
async function walk(dir){const files=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())files.push(...await walk(p));else if(/\.(webp|png|jpe?g|avif)$/i.test(entry.name))files.push(p)}return files.sort()}
export async function optimizeImages(){const manifest={};const inputs=await walk(originals);const plan=inputs.map(file=>[file,path.relative(originals,file).split(path.sep).join('/').replace(/\.[^.]+$/,'.webp')]);if(new Set(plan.map(([,name])=>name)).size!==plan.length)throw Error('Duplicate image filenames after WebP conversion');for(const key of Object.keys(variants)){await fs.rm(path.join(output,key),{recursive:true,force:true});await fs.mkdir(path.join(output,key),{recursive:true})}for(const [file,name] of plan){manifest[name]={};for(const [key,[width,quality]] of Object.entries(variants)){const target=path.join(output,key,name);await fs.mkdir(path.dirname(target),{recursive:true});const result=await sharp(file).rotate().resize({width,withoutEnlargement:true}).webp({quality,effort:5,lossless:name==='site/logo.webp'}).toFile(target);manifest[name][key]=result.width}}await fs.writeFile(path.join(frontend,'src/lib/imageManifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log(`[images] ${inputs.length} originals, ${inputs.length*3} WebP variants`)}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await optimizeImages();
