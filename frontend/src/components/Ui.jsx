import React from 'react';
import icons from '../lib/icons.json';
import { href, asset, services, site, techBySlug } from '../lib/site.js';
import manifest from '../lib/imageManifest.json';
export function Icon({ name }) { return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[name] || icons.spark }}/>; }
export function Link({ to, icon, children, ...props }) { return <a href={href(to)} {...props}>{children}{icon && <Icon name={icon}/>}</a>; }
export function External({ url, children, className }) { return <a href={url} className={className} target="_blank" rel="noopener noreferrer">{children}{className && <Icon name="external"/>}</a>; }
export function Button({ to, primary = false, children }) { return <Link to={to} className={'btn' + (primary ? ' primary' : '')} icon="arrow">{children}</Link>; }
export function SectionHead({ title, sub, to, label = 'Подробнее' }) { return <div className="section-head"><div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>{to && <Link to={to} className="textlink" icon="arrow">{label}</Link>}</div>; }
export function Intro({ title, description, parents = [], children }) { return <div className="wrap inner-page"><nav className="crumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link>{parents.map(([to, label]) => <React.Fragment key={to}><span> / </span><Link to={to}>{label}</Link></React.Fragment>)}<span> / </span><span aria-current="page">{title}</span></nav><div className="page-intro"><h1>{title}</h1><p>{description}</p></div>{children}</div>; }
export function ResponsiveImage({ name, alt = '', priority = false, sizes = '(max-width: 600px) 92vw, (max-width: 1000px) 60vw, 600px', ...props }) { const info = manifest[name]; if (!info)
    return null; const seen = new Set(); const srcSet = ['mobile', 'tablet', 'desktop'].filter(k => { if (seen.has(info[k]))
    return false; seen.add(info[k]); return true; }).map(k => `${asset(`${k}/${name}`)} ${info[k]}w`).join(', '); return <img {...props} src={asset('desktop/' + name)} srcSet={srcSet} sizes={sizes} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"/>; }
export const hasImage = name => Boolean(manifest[name]);
export function ServiceCards({ detail = false }) { return services.map(([icon, name, text, color]) => { const children = <><Icon name={icon}/><h3>{name}</h3><p>{text}</p></>; return detail ? <article key={name} className="service" style={{ '--tone': color }}>{children}</article> : <Link key={name} to="/services/" className="service" style={{ '--tone': color }}>{children}</Link>; }); }
export function TechSymbol({ tech }) { return <span className="tech-symbol" aria-hidden="true">{tech.symbol}</span>; }
export function TechChip({ tech }) { return <Link to={`/technologies/${tech.slug}/`} className="chip" style={{ '--tech': tech.color }}><TechSymbol tech={tech}/><span>{tech.name}</span></Link>; }
export function TechStrip({ items }) { return <div className="tech-strip">{items.map(t => <TechChip key={t.slug} tech={t}/>)}</div>; }
export function Tags({ project }) { return <div className="tag-row">{project.technologies.map(k => <Link key={k} to={`/technologies/${k}/`} className="tag" style={{ '--tech': techBySlug[k].color }}><span className="tag-dot"/>{techBySlug[k].name}</Link>)}</div>; }
export function PortfolioBanner() { return <aside className="portfolio-banner"><Icon name="briefcase"/><div><h2>Личное портфолио разработчика</h2><p>Личные проекты, навыки и профессиональный опыт — отдельно от продуктов Kodumi.</p></div>{site.portfolioUrl ? <External url={site.portfolioUrl} className="btn primary">Открыть портфолио</External> : <Button to="/portfolio/" primary>О портфолио</Button>}</aside>; }
export function Empty({ message }) { return <div className="empty"><Icon name="folder"/><h2>Пока нет опубликованных проектов</h2><p>{message}</p><Button to="/projects/">Все проекты</Button></div>; }
