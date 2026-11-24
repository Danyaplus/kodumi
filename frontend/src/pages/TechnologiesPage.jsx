import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Intro, Link, TechSymbol, Icon, SectionHead, Empty } from '../components/Ui.jsx';
import { ProjectGrid } from '../components/ProjectCard.jsx';

export default function TechnologiesPage({ slug }) {
  const { projects, technologies, techBySlug, messages } = useI18n();

  if (!slug) {
    return (
      <Intro title={messages.technologiesPage.title} description={messages.technologiesPage.description}>
        <div className="tech-grid">
          {technologies.map(tech => (
            <Link key={tech.slug} to={`/technologies/${tech.slug}/`} className="tech-card" style={{ '--tech': tech.color }}>
              <TechSymbol tech={tech} />
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
              <span className="textlink">{messages.technologiesPage.cardLabel} · {projects.filter(project => project.technologies.includes(tech.slug)).length}<Icon name="arrow" /></span>
            </Link>
          ))}
        </div>
      </Intro>
    );
  }

  const tech = techBySlug[slug];
  const items = projects.filter(project => project.technologies.includes(slug));

  return (
    <Intro title={tech.name} description={tech.description} parents={[['/technologies/', messages.breadcrumbs.technologies]]}>
      <div className="tech-intro-card" style={{ '--tech': tech.color }}>
        <TechSymbol tech={tech} />
        <div>
          <span className="stack-label">{messages.common.technology}</span>
          <h2>{tech.name}</h2>
          <p>{tech.description}</p>
        </div>
        <div className="tech-count"><strong>{items.length}</strong><span>{messages.technologiesPage.countLabel}</span></div>
      </div>
      <SectionHead title={messages.technologiesPage.headingPrefix + tech.name} />
      {items.length ? <ProjectGrid items={items} /> : <Empty message={messages.technologiesPage.empty} />}
    </Intro>
  );
}
