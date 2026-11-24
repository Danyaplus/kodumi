import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Intro, External } from '../components/Ui.jsx';
import { ProjectCover, ProjectStack, Gallery } from '../components/ProjectCard.jsx';

export default function ProjectPage({ slug }) {
  const { projects, messages } = useI18n();
  const project = projects.find(item => item.slug === slug);
  if (!project) return null;

  return (
    <Intro title={project.name} description={project.summary} parents={[['/projects/', messages.breadcrumbs.projects]]}>
      <div className="detail-grid">
        <div>
          <ProjectCover project={project} />
          <div className="prose subsection">
            <h2>{messages.projectPage.about}</h2>
            <p>{project.description}</p>
            <h2>{messages.projectPage.features}</h2>
            <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </div>
          <Gallery project={project} />
        </div>
        <aside className="panel stack-panel">
          <span className="status">{project.status}</span>
          <h2 style={{ marginTop: 12 }}>{messages.projectPage.stackTitle}</h2>
          <p>{messages.projectPage.stackText}</p>
          <ProjectStack project={project} />
          <div className="subsection">
            {project.url ? <External url={project.url} className="btn primary">{messages.common.openProject}</External> : <p className="notice">{messages.common.pendingLink}</p>}
          </div>
        </aside>
      </div>
    </Intro>
  );
}
