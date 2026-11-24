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
import { I18nProvider, useI18n } from './lib/i18n.jsx';

function Page({ route }) {
  switch (route.kind) {
    case 'home':
      return <HomePage />;
    case 'projects':
      return <ProjectsPage {...route.params} />;
    case 'project':
      return <ProjectPage {...route.params} />;
    case 'technologies':
    case 'technology':
      return <TechnologiesPage {...route.params} />;
    case 'services':
      return <ServicesPage />;
    case 'about':
      return <AboutPage />;
    case 'contacts':
      return <ContactsPage />;
    case 'portfolio':
      return <PortfolioPage />;
    case 'privacy':
    case 'terms':
      return <LegalPage privacy={route.kind === 'privacy'} />;
    default:
      return <NotFoundPage />;
  }
}

function AppShell({ initialPath }) {
  const { t, lang } = useI18n();
  const [path, setPath] = useState(initialPath);
  const route = getRoute(path);

  useEffect(() => {
    updateSeo(route, lang);
  }, [route, lang]);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    let current = location.href;
    const scroll = new Map();

    const focus = () => requestAnimationFrame(() => {
      document.getElementById('content')?.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    });

    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download') || link.getAttribute('href').startsWith('#')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith(siteBase) || url.hash || url.search) return;
      const next = pathFromLocation(url.pathname);
      if (!routes.some(item => item.path === next)) return;
      event.preventDefault();
      if (url.href === current) return;
      scroll.set(current, window.scrollY);
      history.pushState({}, '', url.href);
      current = url.href;
      setPath(next);
      focus();
    };

    const onPop = () => {
      scroll.set(current, window.scrollY);
      current = location.href;
      setPath(pathFromLocation(location.pathname));
      requestAnimationFrame(() => window.scrollTo(0, scroll.get(current) || 0));
    };

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#content">{t('common.skip')}</a>
      <Header path={route.path} />
      <main id="content" tabIndex={-1}>
        <div key={route.path} className="page-view">
          <Page route={route} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App({ initialPath }) {
  return (
    <I18nProvider>
      <AppShell initialPath={initialPath} />
    </I18nProvider>
  );
}
