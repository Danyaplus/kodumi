"""Public site data and validation."""
from pathlib import Path
import json, html, re, os
from urllib.parse import urlparse
from xml.sax.saxutils import escape as xml_escape
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'data/site.json').read_text(encoding='utf-8'))
BASE=(os.environ.get('SITE_URL') or D['siteUrl']).rstrip('/')
assert urlparse(BASE).scheme in ('http','https') and urlparse(BASE).netloc and not urlparse(BASE).query and not urlparse(BASE).fragment, 'siteUrl must be an HTTP(S) site root URL'
E=lambda x:html.escape(str(x),quote=True)
T={x['slug']:x for x in D['technologies']}; P=D['projects']; cats={'web':'Веб-проекты','games':'Игры','software':'Программы','bots':'Боты и автоматизация','other':'Другие проекты'}
for x in [*D['technologies'],*P]: assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',x['slug']), 'Invalid slug'
assert len(T)==len(D['technologies']) and len({p['slug'] for p in P})==len(P), 'Duplicate slug'
for p in P: assert p['category'] in cats and all(t in T for t in p['technologies']), 'Invalid project category or technology'
