import { siteUrl } from './site.js';

export function seo(route) {
  const image = new URL('images/desktop/site/social.webp', siteUrl).href;
  return {
    title: route.title,
    description: route.description,
    robots: route.index ? 'index,follow' : 'noindex,follow',
    canonical: route.canonical,
    image,
    schema: {
      '@context': 'https://schema.org',
      '@type': route.kind === 'home' ? 'WebSite' : 'WebPage',
      name: route.title,
      url: route.canonical,
      description: route.description,
      ...(route.kind === 'home'
        ? { publisher: { '@type': 'Organization', name: 'Kodumi', url: siteUrl, logo: new URL('images/desktop/site/logo.webp', siteUrl).href } }
        : {})
    }
  };
}

export function updateSeo(route, lang = 'en') {
  const data = seo(route);
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
  document.title = data.title;

  const set = (type, key, value) => {
    let element = document.head.querySelector(`meta[${type}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(type, key);
      document.head.append(element);
    }
    element.content = value;
  };

  set('name', 'description', data.description);
  set('name', 'robots', data.robots);

  for (const [key, value] of Object.entries({
    'og:type': 'website',
    'og:site_name': 'Kodumi',
    'og:title': data.title,
    'og:description': data.description,
    'og:url': data.canonical,
    'og:image': data.image
  })) set('property', key, value);

  for (const [key, value] of Object.entries({
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image
  })) set('name', key, value);

  let canonical = document.querySelector('link[rel=canonical]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = data.canonical;

  let jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLd) {
    jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    document.head.append(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(data.schema).replace(/</g, '\\u003c');
}
