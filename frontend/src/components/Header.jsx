import React, { useEffect, useState } from 'react';
import { asset } from '../lib/site.js';
import { useI18n } from '../lib/i18n.jsx';
import { Link, Icon, Button } from './Ui.jsx';

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Kodumi — home">
      <img src={asset('desktop/site/logo.webp')} width="36" height="36" alt="" />
      <span>Kodumi</span>
    </Link>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <label className="lang-switcher" aria-label={t('common.language')}>
      <span>{t('common.language')}</span>
      <select value={lang} onChange={event => setLang(event.target.value)}>
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="uk">UA</option>
      </select>
    </label>
  );
}

export default function Header({ path }) {
  const { navigation, t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    const outside = event => {
      if (!event.target.closest('#site-header')) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('click', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('click', outside);
    };
  }, []);

  return (
    <header className="header" id="site-header">
      <div className="wrap head-inner">
        <Brand />
        <nav className={'nav' + (open ? ' open' : '')} id="site-nav" aria-label="Main navigation">
          {navigation.map(([to, name]) => (
            <Link key={to} to={to} aria-current={(to === '/' ? path === '/' : path.startsWith(to)) ? 'page' : undefined}>
              {name}
            </Link>
          ))}
          <div className="mobile-controls">
            <LanguageSwitcher />
            <Button to="/contacts/" primary>{t('common.contactUs')}</Button>
          </div>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <Button to="/contacts/" primary>{t('common.contactUs')}</Button>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}
