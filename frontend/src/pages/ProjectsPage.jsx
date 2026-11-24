import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Intro, Link, TechStrip, Empty } from '../components/Ui.jsx';
import { ProjectGrid } from '../components/ProjectCard.jsx';

export default function ProjectsPage({ category }) {
  const { categories, projects, technologies, messages } = useI18n();
  const selected = projects.filter(project => !category || project.category === category);

  return (
    <Intro title={category ? categories[category] : messages.projectsPage.title} description={messages.projectsPage.description} parents={category ? [['/projects/', messages.breadcrumbs.projects]] : []}>
      <nav className="filters" aria-label="Project categories">
        {[['', messages.filters.allProjects], ...Object.entries(categories)].map(([key, name]) => (
          <Link key={key} to={key ? `/projects/category/${key}/` : '/projects/'} className="filter" aria-current={(category || '') === key ? 'page' : undefined}>{name}</Link>
        ))}
      </nav>
      <div style={{ marginBottom: 20 }}><TechStrip items={technologies} /></div>
      {selected.length ? <ProjectGrid items={selected} /> : <Empty message={messages.projectsPage.empty} />}
    </Intro>
  );
}
