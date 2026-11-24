import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Button, Link, Icon, SectionHead, ServiceCards, TechStrip, PortfolioBanner, ResponsiveImage } from '../components/Ui.jsx';
import ProjectCarousel from '../components/ProjectCarousel.jsx';

const showcaseByLang = {
  en: {
    kicker: 'OUR PROJECTS',
    leadTitle: 'Products and development inside the Kodumi ecosystem',
    leadText: 'Real projects, technologies and product directions. We create digital products — from concept to growth.',
    stats: ['projects', 'technologies', 'directions'],
    techLead: 'Choose the right stack for each product: modern, scalable and tailored to the task.'
  },
  ru: {
    kicker: 'НАШИ ПРОЕКТЫ',
    leadTitle: 'Продукты и разработка экосистемы Kodumi',
    leadText: 'Реальные проекты, технологии и направления развития. Создаём цифровые продукты — от идеи до масштабирования.',
    stats: ['проектов', 'технологий', 'направлений'],
    techLead: 'Выбираем оптимальный стек под задачи проекта: современно, надёжно и с запасом на рост.'
  },
  uk: {
    kicker: 'НАШІ ПРОЄКТИ',
    leadTitle: 'Продукти та розробка екосистеми Kodumi',
    leadText: 'Реальні проєкти, технології та напрями розвитку. Створюємо цифрові продукти — від ідеї до масштабування.',
    stats: ['проєктів', 'технологій', 'напрямів'],
    techLead: 'Добираємо оптимальний стек під задачі проєкту: сучасно, надійно й із запасом на розвиток.'
  }
};

export default function HomePage() {
  const { lang, messages, projects, technologies, categories } = useI18n();
  const copy = showcaseByLang[lang] || showcaseByLang.en;
  const stats = [
    { icon: 'layers', value: `${projects.length}+`, label: copy.stats[0] },
    { icon: 'code', value: `${technologies.length}+`, label: copy.stats[1] },
    { icon: 'spark', value: `${Object.keys(categories).length}+`, label: copy.stats[2] }
  ];

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
          <aside className="panel panel-soft">
            <h2>{messages.home.aboutTitle}</h2>
            <p>{messages.home.aboutText}</p>
            <Link to="/about/" className="textlink" icon="arrow">{messages.common.readAbout}</Link>
          </aside>
        </section>

        <section className="section home-showcase">
          <div className="showcase-projects">
            <div className="showcase-top">
              <div>
                <span className="showcase-kicker">{copy.kicker}</span>
                <h2>{messages.home.projectsTitle}</h2>
                <p>{messages.home.projectsSub}</p>
              </div>
              <Link to="/projects/" className="textlink" icon="arrow">{messages.home.projectsLink}</Link>
            </div>
            <div className="showcase-composition">
              <div className="showcase-copy">
                <h3>{copy.leadTitle}</h3>
                <p>{copy.leadText}</p>
                <div className="showcase-stats">
                  {stats.map((item) => (
                    <div className="showcase-stat" key={item.label}>
                      <span className="showcase-stat-icon"><Icon name={item.icon} /></span>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ProjectCarousel projects={projects} />
            </div>
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

        <section className="section tech-section">
          <div className="tech-panel">
            <div className="tech-panel-head">
              <div className="tech-panel-title">
                <span className="tech-glow-icon"><Icon name="layers" /></span>
                <div>
                  <h2>{messages.home.technologiesTitle}</h2>
                  <p>{messages.home.technologiesSub}</p>
                </div>
              </div>
              <Link to="/technologies/" className="textlink" icon="arrow">{messages.common.allTechnologies}</Link>
            </div>
            <p className="tech-panel-copy">{copy.techLead}</p>
            <TechStrip items={technologies} />
          </div>
        </section>

        <section className="section portfolio-section"><PortfolioBanner /></section>
      </div>
    </>
  );
}
