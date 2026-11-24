"""Reusable layout, header, footer and UI components."""
from .config import *
icons={'arrow':'<path d="M4 12h15m-6-6 6 6-6 6"/>','external':'<path d="M13 5h6v6m0-6-9 9M19 13v6H5V5h6"/>','menu':'<path d="M4 6h16M4 12h16M4 18h16"/>','game':'<path d="M7 7h10c3 0 4 3 5 8s-3 5-5 1H7c-2 4-6 4-5-1s2-8 5-8zM7 10v5m-2.5-2.5h5M16 11h.01M19 14h.01"/>','web':'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>','code':'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20"/>','layers':'<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>','check':'<path d="m5 12 4 4 10-10"/>','briefcase':'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 13h18m-11 0v2h4v-2"/>','mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>','github':'<path d="M9 19c-4 1-4-2-6-2m12 5v-4a4 4 0 0 0-1-3c3 0 6-1 6-6a5 5 0 0 0-1-3 5 5 0 0 0 0-3s-1 0-4 2a12 12 0 0 0-6 0C6 3 5 3 5 3a5 5 0 0 0 0 3 5 5 0 0 0-1 3c0 5 3 6 6 6a4 4 0 0 0-1 3v4"/>','send':'<path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13"/>','folder':'<path d="M3 7V5h7l2 2h9v13H3z"/>','spark':'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>'}
def ico(n):return f'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">{icons[n]}</svg>'
# Relative paths also work on static hosting in a subdirectory. Canonicals use the configured origin.
def rel(target, route):
 depth=len(route.strip('/').split('/')) if route.strip('/') else 0
 return '../'*depth+target.lstrip('/') if target!='/' else ('../'*depth or './')
def link(target,label,route,cls='',icon=None,attrs=''):
 return f'<a href="{E(rel(target,route))}" {f"class=\"{cls}\"" if cls else ""} {attrs}>{label}{ico(icon) if icon else ""}</a>'
def ext(url,label,cls=''):
 return f'<a href="{E(url)}" class="{cls}" target="_blank" rel="noopener noreferrer">{label}{ico("external") if cls else ""}</a>'
nav=[('/','Главная'),('/projects/','Проекты'),('/services/','Направления'),('/technologies/','Технологии'),('/about/','О нас'),('/contacts/','Контакты')]
def current(target,route):return route==target if target=='/' else route.startswith(target)
def brand(route):return f'<a class="brand" href="{rel("/",route)}" aria-label="Kodumi — главная"><img src="{rel("/assets/logo.svg",route)}" width="33" height="33" alt="">Kodumi</a>'
def header(route):
 return f'<header class="header" id="site-header"><div class="wrap head-inner">{brand(route)}<nav class="nav" id="site-nav" aria-label="Основная навигация">'+''.join(link(t,n,route,attrs=f'data-nav="{t}"'+(' aria-current="page"' if current(t,route) else '')) for t,n in nav)+f'</nav>{link("/contacts/","Связаться",route,"btn primary","arrow")}<button class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="site-nav">{ico("menu")}</button></div></header>'
def footer(route):
 contacts=''
 if D['email']:contacts+=f'<a href="mailto:{E(D["email"])}">{E(D["email"])}</a>'
 if D['telegramUrl']:contacts+=ext(D['telegramUrl'],'Telegram')
 if D['githubUrl']:contacts+=ext(D['githubUrl'],'GitHub')
 contacts+=link('/contacts/','Контакты и связь',route)
 games=next((p for p in P if p['slug']=='kodumi-games'),None)
 game_link=ext(games['url'],'Kodumi Games') if games and games.get('url') else link('/projects/kodumi-games/','Kodumi Games',route) if games else ''
 portfolio=ext(D['portfolioUrl'],'Портфолио разработчика') if D['portfolioUrl'] else link('/portfolio/','Портфолио разработчика',route)
 return f'<footer class="footer" id="site-footer"><div class="wrap foot-grid"><div>{brand(route)}<p>Цифровые продукты, веб-сервисы и программные решения.</p></div><div><h3>Навигация</h3><div class="foot-links">'+''.join(link(t,n,route) for t,n in nav if t!='/')+f'</div></div><div><h3>Наши ресурсы</h3><div class="foot-links">{game_link}{portfolio}{link("/projects/","Все проекты",route)}</div></div><div><h3>Контакты</h3><div class="foot-links">{contacts}</div></div></div><div class="wrap foot-bottom"><span>© 2026 Kodumi. Все права защищены.</span><div>{link("/privacy/","Политика конфиденциальности",route)}{link("/terms/","Условия использования",route)}</div></div></footer>'
# Header and footer have identical structure; router rebases their relative links to the original document URL.
services=[('game','Игровые платформы','Онлайн-игры, профили и игровые экосистемы.','#b58aff'),('web','Веб-разработка','Сайты, веб-сервисы и личные кабинеты.','#6bc9ef'),('code','Программные решения','Боты, автоматизация и приложения.','#62d5b0'),('layers','Индивидуальные проекты','Решения для конкретных задач и идей.','#edb96f')]
def service_cards(route,detail=False):
 return ''.join(f'<{"article" if detail else "a"} class="service" style="--tone:{c}" '+('' if detail else f'href="{rel("/services/",route)}"')+f'>{ico(i)}<h3>{n}</h3><p>{s}</p></{"article" if detail else "a"}>' for i,n,s,c in services)
def techchip(t,route):return f'<a class="chip" href="{rel("/technologies/"+t["slug"]+"/",route)}"><span class="tech-symbol" style="--tech:{E(t["color"])}">{E(t["symbol"])}</span>{E(t["name"])}</a>'
def tags(p,route):return '<div class="tag-row">'+''.join(link('/technologies/'+t+'/',E(T[t]['name']),route,'tag') for t in p['technologies'])+'</div>'
def project(p,route):
 target='/projects/'+p['slug']+'/'
 image=p.get('image') or 'assets/games.svg'
 return f'<article class="project"><a href="{rel(target,route)}" aria-label="{E(p["name"])}"><img src="{rel("/"+image,route)}" alt="" width="640" height="280" loading="lazy"></a><div class="project-body"><span class="status">{E(p["status"])}</span><h3>{link(target,E(p["name"]),route)}</h3><p>{E(p["summary"])}</p>{tags(p,route)}{link(target,"Подробнее о проекте",route,"textlink","arrow")}</div></article>'
def sectionhead(title,sub,route,target=None,label='Подробнее'):
 return f'<div class="section-head"><div><h2>{title}</h2>{f"<p>{sub}</p>" if sub else ""}</div>{link(target,label,route,"textlink","arrow") if target else ""}</div>'
def portfolio_banner(route):
 b=ext(D['portfolioUrl'],'Открыть портфолио','btn primary') if D['portfolioUrl'] else link('/portfolio/','О портфолио',route,'btn primary','arrow')
 return f'<aside class="portfolio-banner">{ico("briefcase")}<div><h2>Личное портфолио разработчика</h2><p>Личные проекты, навыки и профессиональный опыт — отдельно от продуктов Kodumi.</p></div>{b}</aside>'
def empty(route,msg):return f'<div class="empty">{ico("folder")}<h2>Пока нет опубликованных проектов</h2><p>{msg}</p>{link("/projects/","Все проекты",route,"btn","arrow")}</div>'
