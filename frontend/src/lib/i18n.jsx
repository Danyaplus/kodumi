import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { site as rawSite, projects as rawProjects, technologies as rawTechnologies } from './site.js';

const STORAGE_KEY = 'kodumi-language';
const langs = ['en', 'ru', 'uk'];

const messages = {
  en: {
    carousel: {"carousel": "Carousel", "previous": "Previous project", "next": "Next project", "select": "Choose a card", "catalogLabel": "CATALOG", "catalogTitle": "Explore all projects", "catalogText": "Discover the complete catalog of Kodumi products, concepts and development directions.", "whyKicker": "OUR APPROACH", "whyIntro": "From the first idea to the details that make a product useful.", "reasons": [["layers", "Thoughtful architecture", "A clear foundation that can evolve with the product."], ["web", "Responsive interfaces", "A consistent experience across phones, tablets and computers."], ["code", "Purposeful technology", "Tools chosen to fit the needs of each project."], ["spark", "Distinct design", "Each product has its own identity and visual character."], ["check", "Continuous improvement", "We aim to refine features and usability as products evolve."], ["game", "Ideas across disciplines", "From web platforms to software, games and automation."]]},
    nav: { home: 'Home', projects: 'Projects', services: 'Services', technologies: 'Technologies', about: 'About', contacts: 'Contacts' },
    common: {
      skip: 'Skip to content',
      details: 'Learn more',
      allProjects: 'All projects',
      allTechnologies: 'All technologies',
      contactUs: 'Contact us',
      openProject: 'Open project',
      backHome: 'Back to home',
      featuredProjects: 'Featured projects',
      readAbout: 'Read about Kodumi',
      moreSoon: 'More projects coming soon',
      projectsLabel: 'Projects',
      technology: 'Technology',
      portfolio: 'Developer portfolio',
      language: 'Language',
      pendingLink: 'A public link to this project will be added separately.'
    },
    categories: { web: 'Web projects', games: 'Games', software: 'Software', bots: 'Bots & automation', other: 'Other projects' },
    services: [
      { title: 'Game platforms', text: 'Online games, player profiles and gaming ecosystems.' },
      { title: 'Web development', text: 'Websites, web services and personal dashboards.' },
      { title: 'Software solutions', text: 'Bots, automation and custom applications.' },
      { title: 'Custom projects', text: 'Solutions for specific ideas, tasks and workflows.' }
    ],
    home: {
      eyebrow: 'Development • Services • Technologies',
      title: 'Creating digital products with character.',
      description: 'Kodumi is an independent development brand. We build web platforms, applications and software solutions, combining technology with thoughtful design.',
      primaryCta: 'Our projects',
      secondaryCta: 'About company',
      servicesTitle: 'What we do',
      servicesSub: 'From idea to a working product.',
      servicesLink: 'All services',
      aboutTitle: 'About Kodumi',
      aboutText: 'A single ecosystem of independent projects. We develop products with attention to usability, architecture and detail.',
      projectsTitle: 'Our projects',
      projectsSub: 'Products and developments inside the Kodumi ecosystem.',
      projectsLink: 'All projects',
      placeholderTitle: 'New projects',
      placeholderText: 'The catalog will continue growing as new products are published.',
      placeholderLink: 'Open the catalog',
      approachTitle: 'Why Kodumi',
      approach: ['Thoughtful architecture', 'Adaptive and convenient interfaces', 'Product growth after launch', 'A distinct identity for every project'],
      technologiesTitle: 'Technologies',
      technologiesSub: 'Choose a technology to see related projects.'
    },
    portfolioBanner: {
      title: 'Developer portfolio',
      text: 'Personal projects, skills and professional experience — separately from Kodumi products.',
      action: 'Open portfolio',
      fallback: 'About the portfolio'
    },
    footer: {
      description: 'Digital products, web services and software solutions.',
      navigation: 'Navigation',
      resources: 'Resources',
      contacts: 'Contacts',
      allRights: '© 2026 Kodumi. All rights reserved.',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      allProjects: 'All projects',
      contactsLink: 'Contacts & communication',
      gamePlatform: 'Kodumi Games'
    },
    breadcrumbs: { home: 'Home', projects: 'Projects', technologies: 'Technologies' },
    filters: { allProjects: 'All projects' },
    pages: {
      services: { title: 'Services', description: 'The main directions in which Kodumi products are developed.' },
      about: {
        title: 'About Kodumi',
        description: 'A unified brand for independent digital products.',
        introTitle: 'What is Kodumi?',
        introText: 'Kodumi brings digital projects together under one identity. Every product keeps its own interface, purpose and unique features.',
        workTitle: 'How we work',
        workText: 'Our focus is on clear interfaces, thoughtful architecture and gradual product development.',
        relationTitle: 'Kodumi and Kodumi Games',
        relationText: 'Kodumi is the main brand. Kodumi Games is a separate gaming platform inside its ecosystem.',
        ecosystemTitle: 'Ecosystem',
        ecosystemText: 'Projects, technologies and the developer portfolio are presented separately so it is easier to find exactly what you need.',
        projectsButton: 'Our projects',
        portfolioLink: 'Portfolio'
      },
      contacts: {
        title: 'Contacts',
        description: 'Communication about projects and collaboration.',
        panelTitle: 'Contact Kodumi',
        empty: 'Contact details will be published after the site setup is completed.'
      },
      portfolio: {
        title: 'Developer portfolio',
        description: 'A separate resource about professional skills, personal projects and experience.',
        panelTitle: 'Portfolio',
        text: 'The personal portfolio is not the same as the Kodumi product catalog.',
        empty: 'A link to the separate portfolio site will be added after publication.'
      },
      legal: {
        privacyTitle: 'Privacy policy',
        termsTitle: 'Terms of use',
        description: 'Information about site rules.',
        privacyHead: 'Data information',
        privacyText1: 'The current site does not use registration forms, analytics or ad trackers. Hosting providers may process technical visit data. Other Kodumi products may have their own rules.',
        privacyText2: 'Before final publication, information about the operator, hosting, data processing and contacts should be clarified.',
        termsHead: 'Site materials',
        termsText1: 'This site introduces visitors to Kodumi projects. The use of individual products is governed by the terms of those products. Rights to third-party names and materials belong to their owners.',
        termsText2: 'Before publication, the final terms and rights holder information should be approved.'
      },
      notFound: {
        title: 'Page not found',
        description: 'The address may have changed or the page has not been published yet.',
        button: 'Back to home'
      }
    },
    projectsPage: {
      title: 'All projects',
      description: 'Kodumi product catalog. Choose a category or open a project to learn more.',
      empty: 'Projects in this category will appear here after publication.'
    },
    projectPage: {
      about: 'About the project',
      features: 'Features',
      stackTitle: 'Project technologies',
      stackText: 'What was used during development.',
      gallery: 'Project gallery'
    },
    technologiesPage: {
      title: 'Technologies',
      description: 'Development directions and tools. Open a technology to view related projects.',
      headingPrefix: 'Projects built with ',
      countLabel: 'projects in the catalog',
      empty: 'Public projects with this technology will be added later.',
      cardLabel: 'Projects'
    },
    techDescriptions: {
      python: 'Automation, bots, utilities and desktop applications.',
      php: 'Server-side web development. Public projects in this direction will be added to the catalog.',
      javascript: 'Interactive interfaces and web application logic.',
      react: 'Component-based interfaces and complex web applications.',
      nodejs: 'Server applications, APIs and real-time features.',
      sql: 'Storage, processing and organization of data.',
      supabase: 'Databases, authentication and application infrastructure.',
      'html-css': 'Responsive layouts and accessible web interfaces.'
    },
    projects: {
      'kodumi-games': {
        status: 'In development',
        summary: 'Gaming web platform with online matches, player profiles and its own ecosystem.',
        description: 'Kodumi Games brings together online games, social features and personalization in one interface. The project is evolving as a standalone product inside the Kodumi ecosystem.',
        features: ['Online games and matches', 'Profiles, stats and achievements', 'Chat and personalization', 'Platform administration'],
        technologyNotes: {
          javascript: 'Logic for both the client and server parts.',
          react: 'Interface components, game screens and admin tools.',
          nodejs: 'Server logic and real-time multiplayer interactions.',
          sql: 'Storage and structured data processing.',
          supabase: 'Database and backend infrastructure.'
        }
      }
    },
    visuals: { games: 'GAMING PLATFORM', web: 'WEB PROJECT', software: 'SOFTWARE', bots: 'AUTOMATION', other: 'KODUMI PROJECT' }
  },
  ru: {
    carousel: {"carousel": "Карусель", "previous": "Предыдущий проект", "next": "Следующий проект", "select": "Выбрать карточку", "catalogLabel": "КАТАЛОГ", "catalogTitle": "Все проекты Kodumi", "catalogText": "Откройте полный каталог продуктов, концептов и направлений разработки Kodumi.", "whyKicker": "НАШ ПОДХОД", "whyIntro": "От первой идеи до деталей, которые делают продукт полезным.", "reasons": [["layers", "Продуманная архитектура", "Понятная основа, которая может развиваться вместе с продуктом."], ["web", "Адаптивные интерфейсы", "Удобство на телефонах, планшетах и компьютерах."], ["code", "Подходящие технологии", "Инструменты подбираются под задачи каждого проекта."], ["spark", "Индивидуальный дизайн", "У каждого продукта своя идентичность и визуальный характер."], ["check", "Постоянное развитие", "Стремимся улучшать возможности и удобство продуктов."], ["game", "Разные направления", "От веб-платформ до программ, игр и автоматизации."]]},
    nav: { home: 'Главная', projects: 'Проекты', services: 'Направления', technologies: 'Технологии', about: 'О нас', contacts: 'Контакты' },
    common: {
      skip: 'К содержанию', details: 'Подробнее', allProjects: 'Все проекты', allTechnologies: 'Все технологии', contactUs: 'Связаться', openProject: 'Открыть проект', backHome: 'На главную', featuredProjects: 'Избранные проекты', readAbout: 'Читать о Kodumi', moreSoon: 'Скоро больше проектов', projectsLabel: 'Проекты', technology: 'Технология', portfolio: 'Портфолио разработчика', language: 'Язык', pendingLink: 'Публичная ссылка на проект будет добавлена отдельно.'
    },
    categories: { web: 'Веб-проекты', games: 'Игры', software: 'Программы', bots: 'Боты и автоматизация', other: 'Другие проекты' },
    services: [
      { title: 'Игровые платформы', text: 'Онлайн-игры, профили игроков и игровые экосистемы.' },
      { title: 'Веб-разработка', text: 'Сайты, веб-сервисы и личные кабинеты.' },
      { title: 'Программные решения', text: 'Боты, автоматизация и прикладные приложения.' },
      { title: 'Индивидуальные проекты', text: 'Решения для конкретных идей, задач и рабочих процессов.' }
    ],
    home: {
      eyebrow: 'Разработка • Сервисы • Технологии', title: 'Создаём цифровые продукты с характером.', description: 'Kodumi — независимый бренд разработки. Создаём веб-платформы, приложения и программные решения, объединяя технологии и продуманный дизайн.', primaryCta: 'Наши проекты', secondaryCta: 'О компании', servicesTitle: 'Чем мы занимаемся', servicesSub: 'От идеи до работающего продукта.', servicesLink: 'Все направления', aboutTitle: 'О Kodumi', aboutText: 'Единая экосистема самостоятельных проектов. Мы развиваем продукты, уделяя внимание удобству, архитектуре и деталям.', projectsTitle: 'Наши проекты', projectsSub: 'Продукты и разработки экосистемы Kodumi.', projectsLink: 'Все проекты', placeholderTitle: 'Новые проекты', placeholderText: 'Каталог будет пополняться по мере публикации новых продуктов.', placeholderLink: 'Открыть каталог', approachTitle: 'Почему Kodumi', approach: ['Продуманная архитектура', 'Адаптивные и удобные интерфейсы', 'Развитие продукта после запуска', 'Собственная идентичность у каждого проекта'], technologiesTitle: 'Технологии', technologiesSub: 'Выберите технологию, чтобы увидеть связанные проекты.'
    },
    portfolioBanner: { title: 'Личное портфолио разработчика', text: 'Личные проекты, навыки и профессиональный опыт — отдельно от продуктов Kodumi.', action: 'Открыть портфолио', fallback: 'О портфолио' },
    footer: { description: 'Цифровые продукты, веб-сервисы и программные решения.', navigation: 'Навигация', resources: 'Ресурсы', contacts: 'Контакты', allRights: '© 2026 Kodumi. Все права защищены.', privacy: 'Политика конфиденциальности', terms: 'Условия использования', allProjects: 'Все проекты', contactsLink: 'Контакты и связь', gamePlatform: 'Kodumi Games' },
    breadcrumbs: { home: 'Главная', projects: 'Проекты', technologies: 'Технологии' },
    filters: { allProjects: 'Все проекты' },
    pages: {
      services: { title: 'Направления разработки', description: 'Основные направления, в которых развиваются продукты Kodumi.' },
      about: { title: 'О Kodumi', description: 'Единый бренд для самостоятельных цифровых продуктов.', introTitle: 'Что такое Kodumi?', introText: 'Kodumi объединяет цифровые проекты под общей идентичностью. Каждый продукт сохраняет собственный интерфейс, назначение и особенности.', workTitle: 'Как мы работаем', workText: 'В центре внимания — понятный интерфейс, продуманная архитектура и постепенное развитие продукта.', relationTitle: 'Kodumi и Kodumi Games', relationText: 'Kodumi — основной бренд. Kodumi Games — отдельная игровая платформа в его экосистеме.', ecosystemTitle: 'Экосистема', ecosystemText: 'Проекты, технологии и портфолио разработчика представлены отдельно, чтобы было проще найти нужное.', projectsButton: 'Наши проекты', portfolioLink: 'Портфолио' },
      contacts: { title: 'Контакты', description: 'Связь по вопросам проектов и сотрудничества.', panelTitle: 'Связаться с Kodumi', empty: 'Контактные данные будут опубликованы после настройки сайта.' },
      portfolio: { title: 'Личное портфолио разработчика', description: 'Отдельный ресурс о профессиональных навыках, личных проектах и опыте.', panelTitle: 'Портфолио', text: 'Личное портфолио не совпадает с каталогом продуктов Kodumi.', empty: 'Ссылка на отдельный сайт портфолио будет добавлена после публикации.' },
      legal: { privacyTitle: 'Политика конфиденциальности', termsTitle: 'Условия использования', description: 'Информация о правилах сайта.', privacyHead: 'Информация о данных', privacyText1: 'На текущем сайте не используются формы регистрации, аналитика или рекламные трекеры. Хостинг может обрабатывать технические данные посещений. Другие продукты Kodumi могут иметь собственные правила.', privacyText2: 'Перед финальной публикацией необходимо уточнить сведения об операторе, хостинге, обработке данных и контактах.', termsHead: 'Материалы сайта', termsText1: 'Сайт знакомит посетителей с проектами Kodumi. Использование отдельных продуктов регулируется условиями этих продуктов. Права на сторонние названия и материалы принадлежат их владельцам.', termsText2: 'Перед публикацией необходимо утвердить окончательные условия и сведения о правообладателе.' },
      notFound: { title: 'Страница не найдена', description: 'Возможно, адрес изменился или страница ещё не опубликована.', button: 'На главную' }
    },
    projectsPage: { title: 'Все проекты', description: 'Каталог продуктов Kodumi. Выберите категорию или откройте проект, чтобы узнать больше.', empty: 'Проекты этой категории появятся здесь после публикации.' },
    projectPage: { about: 'О проекте', features: 'Возможности', stackTitle: 'Технологии проекта', stackText: 'Что использовалось при разработке.', gallery: 'Галерея проекта' },
    technologiesPage: { title: 'Технологии', description: 'Направления разработки и инструменты. Откройте технологию, чтобы увидеть соответствующие проекты.', headingPrefix: 'Проекты на ', countLabel: 'проектов в каталоге', empty: 'Публичные проекты с этой технологией будут добавлены позже.', cardLabel: 'Проекты' },
    techDescriptions: {
      python: 'Автоматизация, боты, утилиты и настольные приложения.',
      php: 'Серверная веб-разработка. Публичные проекты этого направления будут добавлены в каталог.',
      javascript: 'Интерактивные интерфейсы и логика веб-приложений.',
      react: 'Компонентные интерфейсы и сложные веб-приложения.',
      nodejs: 'Серверные приложения, API и работа в реальном времени.',
      sql: 'Хранение, обработка и организация данных.',
      supabase: 'Базы данных, авторизация и инфраструктура приложений.',
      'html-css': 'Адаптивная вёрстка и доступные веб-интерфейсы.'
    },
    projects: {
      'kodumi-games': {
        status: 'В разработке',
        summary: 'Игровая веб-платформа с онлайн-матчами, профилями игроков и собственной экосистемой.',
        description: 'Kodumi Games объединяет онлайн-игры, социальные возможности и персонализацию в одном интерфейсе. Проект развивается как самостоятельный продукт внутри экосистемы Kodumi.',
        features: ['Онлайн-игры и матчи', 'Профили, статистика и достижения', 'Чат и персонализация', 'Администрирование платформы'],
        technologyNotes: { javascript: 'Логика клиентской и серверной части.', react: 'Компоненты интерфейса, игровые экраны и административные инструменты.', nodejs: 'Серверная логика и взаимодействие игроков в реальном времени.', sql: 'Хранение и структурная обработка данных.', supabase: 'База данных и серверная инфраструктура.' }
      }
    },
    visuals: { games: 'ИГРОВАЯ ПЛАТФОРМА', web: 'ВЕБ-ПРОЕКТ', software: 'ПРОГРАММА', bots: 'АВТОМАТИЗАЦИЯ', other: 'ПРОЕКТ KODUMI' }
  },
  uk: {
    carousel: {"carousel": "Карусель", "previous": "Попередній проєкт", "next": "Наступний проєкт", "select": "Обрати картку", "catalogLabel": "КАТАЛОГ", "catalogTitle": "Усі проєкти Kodumi", "catalogText": "Відкрийте повний каталог продуктів, концептів і напрямів розробки Kodumi.", "whyKicker": "НАШ ПІДХІД", "whyIntro": "Від першої ідеї до деталей, які роблять продукт корисним.", "reasons": [["layers", "Продумана архітектура", "Зрозуміла основа, що може розвиватися разом із продуктом."], ["web", "Адаптивні інтерфейси", "Зручність на телефонах, планшетах і комп’ютерах."], ["code", "Відповідні технології", "Інструменти добираються під завдання кожного проєкту."], ["spark", "Індивідуальний дизайн", "Кожен продукт має власну ідентичність і візуальний характер."], ["check", "Постійний розвиток", "Прагнемо поліпшувати можливості та зручність продуктів."], ["game", "Різні напрями", "Від веб-платформ до програм, ігор та автоматизації."]]},
    nav: { home: 'Головна', projects: 'Проєкти', services: 'Напрями', technologies: 'Технології', about: 'Про нас', contacts: 'Контакти' },
    common: { skip: 'До вмісту', details: 'Докладніше', allProjects: 'Усі проєкти', allTechnologies: 'Усі технології', contactUs: 'Зв’язатися', openProject: 'Відкрити проєкт', backHome: 'На головну', featuredProjects: 'Обрані проєкти', readAbout: 'Читати про Kodumi', moreSoon: 'Скоро більше проєктів', projectsLabel: 'Проєкти', technology: 'Технологія', portfolio: 'Портфоліо розробника', language: 'Мова', pendingLink: 'Публічне посилання на проєкт буде додано окремо.' },
    categories: { web: 'Веб-проєкти', games: 'Ігри', software: 'Програми', bots: 'Боти й автоматизація', other: 'Інші проєкти' },
    services: [
      { title: 'Ігрові платформи', text: 'Онлайн-ігри, профілі гравців та ігрові екосистеми.' },
      { title: 'Веб-розробка', text: 'Сайти, веб-сервіси та особисті кабінети.' },
      { title: 'Програмні рішення', text: 'Боти, автоматизація та прикладні застосунки.' },
      { title: 'Індивідуальні проєкти', text: 'Рішення для конкретних ідей, завдань і робочих процесів.' }
    ],
    home: { eyebrow: 'Розробка • Сервіси • Технології', title: 'Створюємо цифрові продукти з характером.', description: 'Kodumi — незалежний бренд розробки. Створюємо веб-платформи, застосунки та програмні рішення, поєднуючи технології та продуманий дизайн.', primaryCta: 'Наші проєкти', secondaryCta: 'Про компанію', servicesTitle: 'Чим ми займаємось', servicesSub: 'Від ідеї до готового продукту.', servicesLink: 'Усі напрями', aboutTitle: 'Про Kodumi', aboutText: 'Єдина екосистема самостійних проєктів. Ми розвиваємо продукти, приділяючи увагу зручності, архітектурі та деталям.', projectsTitle: 'Наші проєкти', projectsSub: 'Продукти та розробки екосистеми Kodumi.', projectsLink: 'Усі проєкти', placeholderTitle: 'Нові проєкти', placeholderText: 'Каталог поповнюватиметься в міру публікації нових продуктів.', placeholderLink: 'Відкрити каталог', approachTitle: 'Чому Kodumi', approach: ['Продумана архітектура', 'Адаптивні та зручні інтерфейси', 'Розвиток продукту після запуску', 'Власна ідентичність кожного проєкту'], technologiesTitle: 'Технології', technologiesSub: 'Оберіть технологію, щоб побачити пов’язані проєкти.' },
    portfolioBanner: { title: 'Особисте портфоліо розробника', text: 'Особисті проєкти, навички та професійний досвід — окремо від продуктів Kodumi.', action: 'Відкрити портфоліо', fallback: 'Про портфоліо' },
    footer: { description: 'Цифрові продукти, веб-сервіси та програмні рішення.', navigation: 'Навігація', resources: 'Ресурси', contacts: 'Контакти', allRights: '© 2026 Kodumi. Усі права захищено.', privacy: 'Політика конфіденційності', terms: 'Умови використання', allProjects: 'Усі проєкти', contactsLink: 'Контакти та зв’язок', gamePlatform: 'Kodumi Games' },
    breadcrumbs: { home: 'Головна', projects: 'Проєкти', technologies: 'Технології' },
    filters: { allProjects: 'Усі проєкти' },
    pages: {
      services: { title: 'Напрями розробки', description: 'Основні напрями, у яких розвиваються продукти Kodumi.' },
      about: { title: 'Про Kodumi', description: 'Єдиний бренд для самостійних цифрових продуктів.', introTitle: 'Що таке Kodumi?', introText: 'Kodumi об’єднує цифрові проєкти під спільною ідентичністю. Кожен продукт зберігає власний інтерфейс, призначення та особливості.', workTitle: 'Як ми працюємо', workText: 'У центрі уваги — зрозумілий інтерфейс, продумана архітектура та поступовий розвиток продукту.', relationTitle: 'Kodumi та Kodumi Games', relationText: 'Kodumi — основний бренд. Kodumi Games — окрема ігрова платформа в його екосистемі.', ecosystemTitle: 'Екосистема', ecosystemText: 'Проєкти, технології та портфоліо розробника представлені окремо, щоб було простіше знайти потрібне.', projectsButton: 'Наші проєкти', portfolioLink: 'Портфоліо' },
      contacts: { title: 'Контакти', description: 'Зв’язок щодо проєктів і співпраці.', panelTitle: 'Зв’язатися з Kodumi', empty: 'Контактні дані будуть опубліковані після налаштування сайту.' },
      portfolio: { title: 'Особисте портфоліо розробника', description: 'Окремий ресурс про професійні навички, особисті проєкти та досвід.', panelTitle: 'Портфоліо', text: 'Особисте портфоліо не є каталогом продуктів Kodumi.', empty: 'Посилання на окремий сайт портфоліо буде додано після публікації.' },
      legal: { privacyTitle: 'Політика конфіденційності', termsTitle: 'Умови використання', description: 'Інформація про правила сайту.', privacyHead: 'Інформація про дані', privacyText1: 'На поточному сайті не використовуються форми реєстрації, аналітика чи рекламні трекери. Хостинг може обробляти технічні дані відвідувань. Інші продукти Kodumi можуть мати власні правила.', privacyText2: 'Перед фінальною публікацією необхідно уточнити відомості про оператора, хостинг, обробку даних і контакти.', termsHead: 'Матеріали сайту', termsText1: 'Сайт знайомить відвідувачів із проєктами Kodumi. Використання окремих продуктів регулюється умовами цих продуктів. Права на сторонні назви й матеріали належать їхнім власникам.', termsText2: 'Перед публікацією необхідно затвердити остаточні умови та відомості про правовласника.' },
      notFound: { title: 'Сторінку не знайдено', description: 'Можливо, адресу змінено або сторінку ще не опубліковано.', button: 'На головну' }
    },
    projectsPage: { title: 'Усі проєкти', description: 'Каталог продуктів Kodumi. Оберіть категорію або відкрийте проєкт, щоб дізнатися більше.', empty: 'Проєкти цієї категорії з’являться тут після публікації.' },
    projectPage: { about: 'Про проєкт', features: 'Можливості', stackTitle: 'Технології проєкту', stackText: 'Що використовувалось під час розробки.', gallery: 'Галерея проєкту' },
    technologiesPage: { title: 'Технології', description: 'Напрями розробки та інструменти. Відкрийте технологію, щоб побачити пов’язані проєкти.', headingPrefix: 'Проєкти на ', countLabel: 'проєктів у каталозі', empty: 'Публічні проєкти з цією технологією будуть додані пізніше.', cardLabel: 'Проєкти' },
    techDescriptions: {
      python: 'Автоматизація, боти, утиліти та настільні застосунки.',
      php: 'Серверна веб-розробка. Публічні проєкти цього напряму будуть додані до каталогу.',
      javascript: 'Інтерактивні інтерфейси та логіка веб-застосунків.',
      react: 'Компонентні інтерфейси та складні веб-застосунки.',
      nodejs: 'Серверні застосунки, API та робота в реальному часі.',
      sql: 'Зберігання, обробка та організація даних.',
      supabase: 'Бази даних, авторизація та інфраструктура застосунків.',
      'html-css': 'Адаптивна верстка та доступні веб-інтерфейси.'
    },
    projects: {
      'kodumi-games': {
        status: 'У розробці',
        summary: 'Ігрова веб-платформа з онлайн-матчами, профілями гравців і власною екосистемою.',
        description: 'Kodumi Games об’єднує онлайн-ігри, соціальні можливості та персоналізацію в одному інтерфейсі. Проєкт розвивається як самостійний продукт у межах екосистеми Kodumi.',
        features: ['Онлайн-ігри та матчі', 'Профілі, статистика й досягнення', 'Чат і персоналізація', 'Адміністрування платформи'],
        technologyNotes: { javascript: 'Логіка клієнтської та серверної частини.', react: 'Компоненти інтерфейсу, ігрові екрани та адміністративні інструменти.', nodejs: 'Серверна логіка й взаємодія гравців у реальному часі.', sql: 'Зберігання та структурована обробка даних.', supabase: 'База даних і серверна інфраструктура.' }
      }
    },
    visuals: { games: 'ІГРОВА ПЛАТФОРМА', web: 'ВЕБ-ПРОЄКТ', software: 'ПРОГРАМА', bots: 'АВТОМАТИЗАЦІЯ', other: 'ПРОЄКТ KODUMI' }
  }
};

const serviceIcons = ['game', 'web', 'code', 'layers'];
const serviceColors = ['#bf5dff', '#32cfff', '#25e6b2', '#ffb04f'];

const I18nContext = createContext(null);

function getPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function localizeTech(tech, locale) {
  return {
    ...tech,
    description: locale.techDescriptions?.[tech.slug] || tech.description
  };
}

function localizeProject(project, locale, techMap, lang) {
  const translated = project.translations?.[lang] || locale.projects?.[project.slug] || {};
  return {
    ...project,
    status: translated.status || project.status,
    summary: translated.summary || project.summary,
    description: translated.description || project.description,
    features: translated.features || project.features,
    technologyNotes: Object.fromEntries(project.technologies.map(slug => [slug, translated.technologyNotes?.[slug] || project.technologyNotes?.[slug] || techMap[slug]?.description || '']))
  };
}

export function I18nProvider({ children }) {
  const [lang, updateLang] = useState('en');
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (langs.includes(saved)) updateLang(saved);
    } catch { /* Storage can be disabled by the browser. */ }
  }, []);
  function setLang(next) {
    if (!langs.includes(next)) return;
    updateLang(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* optional */ }
  }
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo(() => {
    const locale = messages[lang] || messages.en;
    const technologies = rawTechnologies.map(tech => localizeTech(tech, locale));
    const techBySlug = Object.fromEntries(technologies.map(tech => [tech.slug, tech]));
    const projects = rawProjects.map(project => localizeProject(project, locale, techBySlug, lang));
    const navigation = [
      ['/', locale.nav.home],
      ['/projects/', locale.nav.projects],
      ['/services/', locale.nav.services],
      ['/technologies/', locale.nav.technologies],
      ['/about/', locale.nav.about],
      ['/contacts/', locale.nav.contacts]
    ];
    const services = locale.services.map((service, index) => ({
      icon: serviceIcons[index],
      color: serviceColors[index],
      ...service
    }));

    return {
      lang,
      setLang,
      languages: langs,
      messages: locale,
      t: path => getPath(locale, path) ?? path,
      site: rawSite,
      categories: locale.categories,
      navigation,
      services,
      technologies,
      techBySlug,
      projects,
      visuals: locale.visuals
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
