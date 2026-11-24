import React from 'react';
import { useI18n } from '../lib/i18n.jsx';
import { Brand } from './Header.jsx';
import { Link, External } from './Ui.jsx';

export default function Footer() {
  const { site, navigation, projects, messages, t } = useI18n();
  const game = projects.find(project => project.slug === 'kodumi-games');

  return (
    <footer className="footer" id="site-footer">
      <div className="wrap foot-grid">
        <div>
          <Brand />
          <p>{messages.footer.description}</p>
        </div>
        <div>
          <h3>{messages.footer.navigation}</h3>
          <div className="foot-links">
            {navigation.slice(1).map(([to, name]) => <Link key={to} to={to}>{name}</Link>)}
          </div>
        </div>
        <div>
          <h3>{messages.footer.resources}</h3>
          <div className="foot-links">
            {game && (game.url ? <External url={game.url}>{messages.footer.gamePlatform}</External> : <Link to="/projects/kodumi-games/">{messages.footer.gamePlatform}</Link>)}
            {site.portfolioUrl ? <External url={site.portfolioUrl}>{t('common.portfolio')}</External> : <Link to="/portfolio/">{t('common.portfolio')}</Link>}
            <Link to="/projects/">{messages.footer.allProjects}</Link>
          </div>
        </div>
        <div>
          <h3>{messages.footer.contacts}</h3>
          <div className="foot-links">
            {site.email && <a href={'mailto:' + site.email}>{site.email}</a>}
            {site.telegramUrl && <External url={site.telegramUrl}>Telegram</External>}
            {site.githubUrl && <External url={site.githubUrl}>GitHub</External>}
            <Link to="/contacts/">{messages.footer.contactsLink}</Link>
          </div>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>{messages.footer.allRights}</span>
        <div>
          <Link to="/privacy/">{messages.footer.privacy}</Link>
          <Link to="/terms/">{messages.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
