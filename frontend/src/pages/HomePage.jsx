import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Button, Link, Icon, SectionHead, ServiceCards, TechStrip, PortfolioBanner, ResponsiveImage } from '../components/Ui.jsx';
import ProjectCarousel from '../components/ProjectCarousel.jsx';

export default function HomePage() {
  const { messages, projects, technologies } = useI18n();

  return (
    <>
      <section className="hero">
        <div className="wrap hero-shell">
          <div className="hero-card">
            <ResponsiveImage
              className="hero-bg"
              name="site/hero.webp"
              alt=""
              priority
              width="2172"
              height="724"
              sizes="(max-width: 600px) 94vw, (max-width: 1300px) 96vw, 1240px"
            />
            <div className="hero-overlay">
              <div className="eyebrow">{messages.home.eyebrow}</div>
              <h1>{messages.home.title}</h1>
              <p>{messages.home.description}</p>
              <div className="actions">
                <Button to="/projects/" primary>{messages.home.primaryCta}</Button>
                <Button to="/about/">{messages.home.secondaryCta}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section home-grid">
          <div>
            <SectionHead title={messages.home.servicesTitle} sub={messages.home.servicesSub} to="/services/" label={messages.home.servicesLink} />
            <div className="services-grid"><ServiceCards /></div>
          </div>
          <aside className="panel">
            <h2>{messages.home.aboutTitle}</h2>
            <p>{messages.home.aboutText}</p>
            <Link to="/about/" className="textlink" icon="arrow">{messages.common.readAbout}</Link>
          </aside>
        </section>

        <section className="section home-showcase">
          <div className="showcase-projects">
            <SectionHead title={messages.home.projectsTitle} sub={messages.home.projectsSub} to="/projects/" label={messages.home.projectsLink} />
            <ProjectCarousel projects={projects} />
          </div>
          <aside className="panel why-panel">
            <span className="why-kicker"><Icon name="spark" /> {messages.carousel.whyKicker}</span>
            <h2>{messages.home.approachTitle}</h2>
            <p>{messages.carousel.whyIntro}</p>
            <div className="why-list">
              {messages.carousel.reasons.map(([icon, title, description]) => (
                <div className="why-item" key={title}>
                  <span className="why-icon"><Icon name={icon} /></span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </div>
              ))}
            </div>
            <Link to="/about/" className="textlink" icon="arrow">{messages.common.readAbout}</Link>
          </aside>
        </section>

        <section className="section">
          <SectionHead title={messages.home.technologiesTitle} sub={messages.home.technologiesSub} to="/technologies/" label={messages.common.allTechnologies} />
          <TechStrip items={technologies} />
        </section>

        <section className="section"><PortfolioBanner /></section>
      </div>
    </>
  );
}
