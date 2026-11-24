import React from 'react';
import { visuals } from '../lib/site.js';
import { useI18n } from '../lib/i18n.jsx';
import { Icon, Link, ResponsiveImage, hasImage, Tags, TechSymbol } from './Ui.jsx';

export function ProjectCover({ project }) {
  const { categories, visuals: visualLabels } = useI18n();
  const [icon, color, defaultLabel] = visuals[project.category];
  const image = project.image || `projects/${project.slug}/cover.webp`;
  const label = visualLabels?.[project.category] || defaultLabel;

  return (
    <div className="project-cover" style={{ '--cover': color }}>
      <div className="cover-fallback" aria-hidden="true">
        <div className="cover-orbit" />
        <div className="cover-mark"><Icon name={icon} /></div>
        <div className="cover-title">
          <small>{label}</small>
          <strong>{project.name}</strong>
        </div>
        <span className="cover-corner">{categories[project.category]}</span>
      </div>
      {hasImage(image) && <ResponsiveImage name={image} alt={'Cover ' + project.name} width="640" height="280" onError={event => { event.currentTarget.hidden = true; }} />}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { categories, t } = useI18n();
  const to = `/projects/${project.slug}/`;

  return (
    <article className="project">
      <Link to={to} className="cover-link" aria-label={project.name + ' — details'}>
        <ProjectCover project={project} />
      </Link>
      <div className="project-body">
        <div className="project-meta">
          <span className="status">{project.status}</span>
          <span className="category-label">{categories[project.category]}</span>
        </div>
        <h3><Link to={to}>{project.name}</Link></h3>
        <p>{project.summary}</p>
        <div className="stack-mini">
          <div className="stack-label"><Icon name="code" /><span>{t('projectPage.stackTitle')}</span></div>
          <Tags project={project} />
        </div>
        <Link to={to} className="textlink" icon="arrow">{t('common.details')}</Link>
      </div>
    </article>
  );
}

export function ProjectGrid({ items, className = 'catalog' }) {
  return <div className={'project-grid ' + className}>{items.map(project => <ProjectCard key={project.slug} project={project} />)}</div>;
}

export function ProjectStack({ project }) {
  const { techBySlug } = useI18n();
  return (
    <div className="stack-list">
      {project.technologies.map(slug => {
        const tech = techBySlug[slug];
        return (
          <Link key={slug} to={`/technologies/${slug}/`} className="stack-item" style={{ '--tech': tech.color }}>
            <TechSymbol tech={tech} />
            <div>
              <strong>{tech.name}</strong>
              <small>{project.technologyNotes?.[slug] || tech.description}</small>
            </div>
            <Icon name="arrow" />
          </Link>
        );
      })}
    </div>
  );
}

export function Gallery({ project }) {
  const images = (project.gallery || []).filter(hasImage);
  const { t } = useI18n();
  return images.length > 0 && (
    <section className="subsection">
      <h2>{t('projectPage.gallery')}</h2>
      <div className="gallery-grid">
        {images.map((name, index) => (
          <a key={name} href={`#${name}`} aria-label={`Open screenshot ${index + 1}`} onClick={event => event.preventDefault()}>
            <ResponsiveImage name={name} alt={`Screenshot ${index + 1} — ${project.name}`} />
          </a>
        ))}
      </div>
    </section>
  );
}
