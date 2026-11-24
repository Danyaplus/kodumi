import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { siteBase } from './src/lib/site.js';
const root = fileURLToPath(new URL('../', import.meta.url));
export default defineConfig({root,base:siteBase,plugins:[react()],publicDir:fileURLToPath(new URL('./public',import.meta.url)),build:{outDir:fileURLToPath(new URL('./dist',import.meta.url)),emptyOutDir:true},server:{fs:{allow:[root]}}});
