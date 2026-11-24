import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import TechnologiesPage from './pages/TechnologiesPage.jsx';
import { ServicesPage, AboutPage, ContactsPage, PortfolioPage, LegalPage, NotFoundPage } from './pages/InfoPages.jsx';
import { getRoute, pathFromLocation, routes } from './lib/routes.js';
import { siteBase } from './lib/site.js';
import { updateSeo } from './lib/seo.js';
function Page({ route: r }) { switch (r.kind) {
    case 'home': return <HomePage />;
    case 'projects': return <ProjectsPage {...r.params}/>;
    case 'project': return <ProjectPage {...r.params}/>;
    case 'technologies':
    case 'technology': return <TechnologiesPage {...r.params}/>;
    case 'services': return <ServicesPage />;
    case 'about': return <AboutPage />;
    case 'contacts': return <ContactsPage />;
    case 'portfolio': return <PortfolioPage />;
    case 'privacy':
    case 'terms': return <LegalPage privacy={r.kind === 'privacy'}/>;
    default: return <NotFoundPage />;
} }
export default function App({ initialPath }) { const [path, setPath] = useState(initialPath); const route = getRoute(path); useEffect(() => { updateSeo(route); }, [route]); useEffect(() => { history.scrollRestoration = 'manual'; let current = location.href; const scroll = new Map(); const focus = () => requestAnimationFrame(() => { document.getElementById('content')?.focus({ preventScroll: true }); window.scrollTo(0, 0); }); const onClick = e => { if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
    return; const a = e.target.closest('a[href]'); if (!a || a.target && a.target !== '_self' || a.hasAttribute('download') || a.getAttribute('href').startsWith('#'))
    return; const u = new URL(a.href, location.href); if (u.origin !== location.origin || !u.pathname.startsWith(siteBase) || u.hash || u.search)
    return; const next = pathFromLocation(u.pathname); if (!routes.some(r => r.path === next))
    return; e.preventDefault(); if (u.href === current)
    return; scroll.set(current, window.scrollY); history.pushState({}, '', u.href); current = u.href; setPath(next); focus(); }; const onPop = () => { scroll.set(current, window.scrollY); current = location.href; setPath(pathFromLocation(location.pathname)); requestAnimationFrame(() => window.scrollTo(0, scroll.get(current) || 0)); }; document.addEventListener('click', onClick); window.addEventListener('popstate', onPop); return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPop); }; }, []); return <><a className="skip" href="#content">К содержанию</a><Header path={route.path}/><main id="content" tabIndex={-1}><div key={route.path} className="page-view"><Page route={route}/></div></main><Footer /></>; }
