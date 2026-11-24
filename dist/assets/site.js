/* Each destination is also a complete static HTML document. */
(()=>{
 const main=()=>document.querySelector('#content'),nav=document.querySelector('#site-nav'),toggle=document.querySelector('.menu-toggle'),progress=document.querySelector('#route-progress');
 if(!main()||!nav||!toggle)return;
 const initial=new URL(location.href),root=new URL(document.querySelector('.brand').getAttribute('href'),document.baseURI),base=root.pathname.replace(/\/?$/,'/');
 const normalize=p=>p.replace(/index\.html$/,'').replace(/\/?$/,'/');
 const routeOf=u=>'/'+normalize(u.pathname).slice(base.length);
 function rebase(el,url){for(const node of el.querySelectorAll('[href],[src]'))for(const attr of ['href','src'])if(node.hasAttribute(attr)){const val=node.getAttribute(attr);if(val&&!val.startsWith('#')&&!/^(mailto:|tel:|data:|javascript:)/i.test(val))node.setAttribute(attr,new URL(val,url).href)}}
 rebase(document.querySelector('#site-header'),document.baseURI);rebase(document.querySelector('#site-footer'),document.baseURI);rebase(main(),document.baseURI);
 function menu(open){nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')}
 toggle.addEventListener('click',()=>menu(!nav.classList.contains('open')));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu(false);toggle.focus()}});
 document.addEventListener('click',e=>{if(!e.target.closest('#site-header'))menu(false)});
 function mark(url){const path=routeOf(url);for(const a of nav.querySelectorAll('[data-nav]')){const n=a.dataset.nav;if(n==='/'?path==='/':path.startsWith(n))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}}
 const selectors=['meta[name="description"]','meta[name="robots"]','link[rel="canonical"]','meta[property^="og:"]','meta[name^="twitter:"]','script[type="application/ld+json"]'];
 function updateHead(doc){document.title=doc.title;for(const s of selectors){document.head.querySelectorAll(s).forEach(n=>n.remove());doc.head.querySelectorAll(s).forEach(n=>document.head.append(document.importNode(n,true)))}}
 let controller,currentUrl=initial.href,token=0,scrollFrame=0;
 if(document.querySelector('meta[name="kodumi-preview"]')||!history.pushState||!window.fetch||!window.DOMParser||location.protocol==='file:')return;
 history.scrollRestoration='manual';history.replaceState({...history.state,kodumi:true,y:window.scrollY},'');
 function saveScroll(){if(location.href===currentUrl)history.replaceState({...history.state,kodumi:true,y:window.scrollY},'')}
 window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;saveScroll()})},{passive:true});
 async function go(url,pop=false,restore=0){const id=++token;if(controller)controller.abort();controller=new AbortController();progress?.classList.add('busy');menu(false);if(!pop)saveScroll();
 try{const res=await fetch(url.href,{signal:controller.signal,headers:{'Accept':'text/html'}});if(!res.ok||!res.headers.get('content-type')?.includes('text/html'))throw Error('Not HTML');const doc=new DOMParser().parseFromString(await res.text(),'text/html'),next=doc.querySelector('#content');if(!next||!doc.querySelector('#site-header'))throw Error('Not a Kodumi page');if(id!==token)return;
 const resolved=new URL(res.url||url.href);if(url.hash)resolved.hash=url.hash;rebase(next,resolved);if(!pop)history.pushState({kodumi:true,y:0},'',resolved.href);currentUrl=location.href;main().replaceChildren(...Array.from(next.childNodes).map(n=>document.importNode(n,true)));updateHead(doc);mark(resolved);main().classList.remove('route-enter');void main().offsetWidth;main().classList.add('route-enter');if(!pop)main().focus({preventScroll:true});if(resolved.hash&&!pop){const anchor=document.getElementById(decodeURIComponent(resolved.hash.slice(1)));if(anchor)anchor.scrollIntoView();else window.scrollTo(0,0)}else window.scrollTo(0,pop?restore:0);
 }catch(err){if(err.name!=='AbortError'&&id===token)location.assign(url.href)}finally{if(id===token)progress?.classList.remove('busy')}}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||a.hasAttribute('download')||(a.target&&a.target!=='_self'))return;const raw=a.getAttribute('href');if(raw.startsWith('#'))return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||!u.pathname.startsWith(base)||(!u.pathname.endsWith('/')&&!u.pathname.endsWith('/index.html'))||u.href===location.href)return;if(u.pathname===location.pathname&&u.hash)return;e.preventDefault();go(u)});
 window.addEventListener('popstate',e=>{if(location.href!==currentUrl)go(new URL(location.href),true,e.state?.y||0)});
})();
