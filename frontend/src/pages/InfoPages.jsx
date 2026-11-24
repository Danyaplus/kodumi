import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Intro, Button, Link, External, Icon, ServiceCards } from '../components/Ui.jsx';

export function ServicesPage() {
  const { messages } = useI18n();
  return <Intro title={messages.pages.services.title} description={messages.pages.services.description}><div className="service-detail"><ServiceCards detail /></div></Intro>;
}

export function AboutPage() {
  const { messages } = useI18n();
  return (
    <Intro title={messages.pages.about.title} description={messages.pages.about.description}>
      <div className="detail-grid">
        <div className="prose">
          <h2>{messages.pages.about.introTitle}</h2>
          <p>{messages.pages.about.introText}</p>
          <h2>{messages.pages.about.workTitle}</h2>
          <p>{messages.pages.about.workText}</p>
          <h2>{messages.pages.about.relationTitle}</h2>
          <p>{messages.pages.about.relationText}</p>
          <Button to="/projects/" primary>{messages.pages.about.projectsButton}</Button>
        </div>
        <aside className="panel">
          <h2>{messages.pages.about.ecosystemTitle}</h2>
          <p>{messages.pages.about.ecosystemText}</p>
          <Link to="/portfolio/" className="textlink" icon="arrow">{messages.pages.about.portfolioLink}</Link>
        </aside>
      </div>
    </Intro>
  );
}

export function ContactsPage() {
  const { site, messages } = useI18n();
  return (
    <Intro title={messages.pages.contacts.title} description={messages.pages.contacts.description}>
      <div className="panel">
        <h2>{messages.pages.contacts.panelTitle}</h2>
        {site.email || site.telegramUrl || site.githubUrl ? (
          <div className="actions">
            {site.email && <a className="btn" href={'mailto:' + site.email}><Icon name="mail" />{site.email}</a>}
            {site.telegramUrl && <External url={site.telegramUrl} className="btn">Telegram</External>}
            {site.githubUrl && <External url={site.githubUrl} className="btn">GitHub</External>}
          </div>
        ) : <p>{messages.pages.contacts.empty}</p>}
      </div>
    </Intro>
  );
}

export function PortfolioPage() {
  const { site, messages } = useI18n();
  return (
    <Intro title={messages.pages.portfolio.title} description={messages.pages.portfolio.description}>
      <div className="panel">
        <h2>{messages.pages.portfolio.panelTitle}</h2>
        <p>{messages.pages.portfolio.text}</p>
        <div className="subsection">
          {site.portfolioUrl ? <External url={site.portfolioUrl} className="btn primary">{messages.portfolioBanner.action}</External> : <p className="notice">{messages.pages.portfolio.empty}</p>}
        </div>
      </div>
    </Intro>
  );
}

export function LegalPage({ privacy }) {
  const { messages } = useI18n();
  const legal = messages.pages.legal;
  return (
    <Intro title={privacy ? legal.privacyTitle : legal.termsTitle} description={legal.description}>
      <div className="prose">
        {privacy ? (
          <>
            <h2>{legal.privacyHead}</h2>
            <p>{legal.privacyText1}</p>
            <p>{legal.privacyText2}</p>
          </>
        ) : (
          <>
            <h2>{legal.termsHead}</h2>
            <p>{legal.termsText1}</p>
            <p>{legal.termsText2}</p>
          </>
        )}
      </div>
    </Intro>
  );
}

export function NotFoundPage() {
  const { messages } = useI18n();
  return <Intro title={messages.pages.notFound.title} description={messages.pages.notFound.description}><Button to="/" primary>{messages.pages.notFound.button}</Button></Intro>;
}
