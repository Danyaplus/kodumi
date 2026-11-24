import React, { useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Icon, Link } from './Ui.jsx';
import ProjectCard from './ProjectCard.jsx';

const MAX_PROJECTS = 5;

export default function ProjectCarousel({ projects }) {
  const { messages } = useI18n();
  const copy = messages.carousel;
  const items = [...projects.filter(p => p.featured), ...projects.filter(p => !p.featured)].slice(0, MAX_PROJECTS);
  const [selected, setSelected] = useState(0);
  const last = items.length;
  const active = Math.min(selected, last);
  const firstVisible = Math.max(0, Math.min(active - 2, last - 4));
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const move = delta => setSelected(index => Math.min(last, Math.max(0, index + delta)));
  const choose = index => setSelected(Math.min(last, Math.max(0, index)));
  const onKeyDown = event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };
  const start = event => {
    suppressClick.current = false;
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const finish = event => {
    const origin = gesture.current;
    gesture.current = null;
    if (!origin || origin.id !== event.pointerId) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      suppressClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
  };
  return (
    <section className="project-carousel" aria-label={messages.home.projectsTitle} aria-roledescription={copy.carousel} onKeyDown={onKeyDown}>
      <div className="carousel-stage" onPointerDown={start} onPointerUp={finish} onPointerCancel={() => { gesture.current = null; }} onClickCapture={event => {
        if (suppressClick.current) { suppressClick.current = false; event.preventDefault(); event.stopPropagation(); }
      }}>
        <div className="carousel-stack">
          {[...items, null].map((project, index) => {
            const delta = index - active;
            const depth = Math.abs(delta);
            const current = depth === 0;
            // Keep adjacent cards visible; distant cards remain ready for animation.
            const visible = index >= firstVisible && index < firstVisible + 5;
            const style = {
              '--slide-shift': `${Math.sign(delta) * (depth === 0 ? 0 : 18 + (depth - 1) * 8)}%`,
              '--slide-scale': Math.max(.68, 1 - depth * .075),
              '--slide-rise': `${depth * 9}px`,
              '--slide-opacity': visible ? Math.max(.24, 1 - depth * .19) : 0,
              '--slide-z': 10 - depth,
              '--slide-light': Math.max(.48, 1 - depth * .16)
            };
            return (
              <div key={project?.slug || 'catalog'} className={'carousel-slide' + (current ? ' is-current' : '')} style={style}
                aria-hidden={!current} inert={!current} onClick={event => {
                  if (!current || event.target.closest('a, button, input, select, textarea') || window.getSelection()?.toString()) return;
                  event.currentTarget.querySelector(project ? '.cover-link' : '.btn')?.click();
                }}>
                {project ? <ProjectCard project={project} /> : (
                  <article className="project carousel-catalog">
                    <div className="carousel-catalog-art"><Icon name="layers" /></div>
                    <div className="project-body">
                      <span className="carousel-kicker">KODUMI / {copy.catalogLabel}</span>
                      <h3>{copy.catalogTitle}</h3>
                      <p>{copy.catalogText}</p>
                      <Link to="/projects/" className="btn primary" icon="arrow">{messages.common.allProjects}</Link>
                    </div>
                  </article>
                )}
              </div>
            );
          })}
        </div>
        {active > 0 && <button className="carousel-arrow carousel-prev" type="button" aria-label={copy.previous} onClick={() => move(-1)}><Icon name="arrow" /></button>}
        {active < last && <button className="carousel-arrow carousel-next" type="button" aria-label={copy.next} onClick={() => move(1)}><Icon name="arrow" /></button>}
      </div>
      <div className="carousel-controls">
        <div className="carousel-dots" role="group" aria-label={copy.select}>
          {[...items, null].map((project, index) => <button key={project?.slug || 'catalog'} type="button" aria-label={project?.name || copy.catalogTitle} aria-current={active === index ? 'true' : undefined} onClick={() => choose(index)}><span /></button>)}
        </div>
        <span className="carousel-count" aria-live="polite" aria-atomic="true">{active + 1} / {last + 1}<span className="carousel-sr-only"> — {items[active]?.name || copy.catalogTitle}</span></span>
      </div>
    </section>
  );
}
