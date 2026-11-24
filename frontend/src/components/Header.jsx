import React, { useEffect, useState, useRef, useId } from 'react';
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

const languageOptions = [
  { value: 'en', code: 'EN', name: 'English' },
  { value: 'uk', code: 'UA', name: 'Українська' },
  { value: 'ru', code: 'RU', name: 'Русский' }
];

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const id = useId();
  const selected = languageOptions.find(option => option.value === lang) || languageOptions[0];

  useEffect(() => {
    if (!expanded) return;
    const closeOutside = event => {
      if (!container.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [expanded]);

  return (
    <div className="lang-switcher" ref={container} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
    }} onKeyDown={event => {
      if (event.key === 'Escape' && expanded) {
        event.stopPropagation();
        setExpanded(false);
        trigger.current?.focus();
      }
    }}>
      <button ref={trigger} type="button" className="language-trigger" aria-label={`${t('common.language')}: ${selected.name}`} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>
        <span className="language-code">{selected.code}</span><span className="language-chevron" aria-hidden="true" />
      </button>
      <div id={id} className="language-options" hidden={!expanded} role="group" aria-label={t('common.language')}>
        {languageOptions.map(option => (
          <button key={option.value} type="button" className="language-option" aria-pressed={lang === option.value} lang={option.value} onClick={() => {
            setLang(option.value);
            setExpanded(false);
            trigger.current?.focus();
          }}>
            <span className="option-code">{option.code}</span><span className="option-name">{option.name}</span>
            {lang === option.value && <Icon name="check" />}
          </button>
        ))}
      </div>
    </div>
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
