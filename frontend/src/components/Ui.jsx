import React from 'react';
import icons from '../lib/icons.json';
import technologyIcons from '../lib/technologyIcons.json';
import { href, asset } from '../lib/site.js';
import manifest from '../lib/imageManifest.json';
import { useI18n } from '../lib/i18n.jsx';

export function Icon({ name }) {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[name] || icons.spark }} />;
}

export function Link({ to, icon, children, ...props }) {
  return <a href={href(to)} {...props}>{children}{icon && <Icon name={icon} />}</a>;
}

export function External({ url, children, className }) {
  return <a href={url} className={className} target="_blank" rel="noopener noreferrer">{children}{className && <Icon name="external" />}</a>;
}

export function Button({ to, primary = false, children }) {
  return <Link to={to} className={'btn' + (primary ? ' primary' : '')} icon="arrow">{children}</Link>;
}

export function SectionHead({ title, sub, to, label }) {
  const { t } = useI18n();
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {to && <Link to={to} className="textlink" icon="arrow">{label || t('common.details')}</Link>}
    </div>
  );
}

export function Intro({ title, description, parents = [], children }) {
  const { messages } = useI18n();
  return (
    <div className="wrap inner-page">
      <nav className="crumbs" aria-label="Breadcrumbs">
        <Link to="/">{messages.breadcrumbs.home}</Link>
        {parents.map(([to, label]) => (
          <React.Fragment key={to}>
            <span> / </span>
            <Link to={to}>{label}</Link>
          </React.Fragment>
        ))}
        <span> / </span>
        <span aria-current="page">{title}</span>
      </nav>
      <div className="page-intro">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function ResponsiveImage({ name, alt = '', priority = false, sizes = '(max-width: 600px) 92vw, (max-width: 1000px) 60vw, 600px', ...props }) {
  const info = manifest[name];
  if (!info) return null;
  const seen = new Set();
  const srcSet = ['mobile', 'tablet', 'desktop']
    .filter(key => {
      if (seen.has(info[key])) return false;
      seen.add(info[key]);
      return true;
    })
    .map(key => `${asset(`${key}/${name}`)} ${info[key]}w`)
    .join(', ');

  return (
    <img
      {...props}
      src={asset('desktop/' + name)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

export const hasImage = name => Boolean(manifest[name]);

export function ServiceCards({ detail = false }) {
  const { services } = useI18n();
  return services.map(service => {
    const children = (
      <>
        <Icon name={service.icon} />
        <h3>{service.title}</h3>
        <p>{service.text}</p>
      </>
    );
    return detail
      ? <article key={service.title} className="service" style={{ '--tone': service.color }}>{children}</article>
      : <Link key={service.title} to="/services/" className="service" style={{ '--tone': service.color }}>{children}</Link>;
  });
}

export function TechSymbol({ tech }) {
  const glyph = technologyIcons[tech.slug];
  return <span className={'tech-symbol tech-symbol-' + tech.slug} aria-hidden="true">{glyph ? <svg viewBox={glyph.viewBox} fill="currentColor">{glyph.paths.map((path, index) => <path key={index} d={path} />)}</svg> : tech.slug === 'supabase' ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 1 2 14h10l-1 9 11-13H12z" /></svg> : tech.slug === 'html-css' ? <Icon name="code" /> : tech.symbol}</span>;
}

export function TechChip({ tech }) {
  return <Link to={`/technologies/${tech.slug}/`} className="chip" style={{ '--tech': tech.color }}><TechSymbol tech={tech} /><span>{tech.name}</span></Link>;
}

export function TechStrip({ items }) {
  return <div className="tech-strip">{items.map(tech => <TechChip key={tech.slug} tech={tech} />)}</div>;
}

export function Tags({ project }) {
  const { techBySlug } = useI18n();
  return <div className="tag-row">{project.technologies.map(slug => <Link key={slug} to={`/technologies/${slug}/`} className="tag" style={{ '--tech': techBySlug[slug].color }}><span className="tag-dot" />{techBySlug[slug].name}</Link>)}</div>;
}

export function PortfolioBanner() {
  const { site, messages } = useI18n();
  return (
    <aside className="portfolio-banner">
      <Icon name="briefcase" />
      <div>
        <h2>{messages.portfolioBanner.title}</h2>
        <p>{messages.portfolioBanner.text}</p>
      </div>
      {site.portfolioUrl ? <External url={site.portfolioUrl} className="btn primary">{messages.portfolioBanner.action}</External> : <Button to="/portfolio/" primary>{messages.portfolioBanner.fallback}</Button>}
    </aside>
  );
}

export function Empty({ message }) {
  const { t } = useI18n();
  return <div className="empty"><Icon name="folder" /><h2>{t('home.placeholderTitle')}</h2><p>{message}</p><Button to="/projects/">{t('common.allProjects')}</Button></div>;
}
