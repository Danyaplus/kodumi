#!/usr/bin/env python3
"""Build a complete, deployable static website in dist/. Python 3.12+."""
from pathlib import Path
import shutil
from urllib.parse import urlparse
from xml.sax.saxutils import escape
from src.render import PAGES, BASE, render, E

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
shutil.copytree(ROOT / 'frontend' / 'assets', DIST / 'assets')
base_path = urlparse(BASE).path.rstrip('/') + '/'
for route, args in PAGES.items():
    target = DIST / ('404.html' if route == '/404.html' else route.strip('/') + '/index.html' if route != '/' else 'index.html')
    target.parent.mkdir(parents=True, exist_ok=True)
    page = render(route, *args)
    if route == '/404.html':
        page = page.replace('<head>', f'<head><base href="{E(base_path)}">', 1)
    target.write_text(page, encoding='utf-8')
(DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\n', encoding='utf-8')
(DIST / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{escape(BASE+r)}</loc></url>\n' for r,v in PAGES.items() if v[-1]) + '</urlset>\n', encoding='utf-8')
(DIST / '.htaccess').write_text(f'DirectoryIndex index.html\nErrorDocument 404 {base_path}404.html\n', encoding='utf-8')
(DIST / '.nojekyll').touch()
# Repository-root HTML is a working preview, not an additional public URL.
preview = (DIST / 'index.html').read_text(encoding='utf-8').replace('<head>', '<head><base href="./dist/"><meta name="kodumi-preview" content="1">', 1)
(ROOT / 'index.html').write_text(preview, encoding='utf-8')
print(f'Generated {len(PAGES)} HTML pages, {sum(v[-1] for v in PAGES.values())} sitemap URLs. Site: {BASE}')
