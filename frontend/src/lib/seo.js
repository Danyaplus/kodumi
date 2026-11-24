import { siteUrl } from './site.js';
export function seo(route) { const image = new URL('images/desktop/site/social.webp', siteUrl).href; return { title: route.title, description: route.description, robots: route.index ? 'index,follow' : 'noindex,follow', canonical: route.canonical, image, schema: { '@context': 'https://schema.org', '@type': route.kind === 'home' ? 'WebSite' : 'WebPage', name: route.title, url: route.canonical, description: route.description, ...(route.kind === 'home' ? { publisher: { '@type': 'Organization', name: 'Kodumi', url: siteUrl, logo: new URL('images/desktop/site/logo.webp', siteUrl).href } } : {}) } }; }
export function updateSeo(route) { const s = seo(route); document.title = s.title; const set = (type, key, value) => { let el = document.head.querySelector(`meta[${type}="${key}"]`); if (!el) {
    el = document.createElement('meta');
    el.setAttribute(type, key);
    document.head.append(el);
} el.content = value; }; set('name', 'description', s.description); set('name', 'robots', s.robots); for (const [k, v] of Object.entries({ 'og:type': 'website', 'og:site_name': 'Kodumi', 'og:title': s.title, 'og:description': s.description, 'og:url': s.canonical, 'og:image': s.image }))
    set('property', k, v); for (const [k, v] of Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': s.title, 'twitter:description': s.description, 'twitter:image': s.image }))
    set('name', k, v); let c = document.querySelector('link[rel=canonical]'); if (!c) {
    c = document.createElement('link');
    c.rel = 'canonical';
    document.head.append(c);
} c.href = s.canonical; let j = document.querySelector('script[type="application/ld+json"]'); if (!j) {
    j = document.createElement('script');
    j.type = 'application/ld+json';
    document.head.append(j);
} j.textContent = JSON.stringify(s.schema).replace(/</g, '\\u003c'); }
