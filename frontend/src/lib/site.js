import data from '../../../shared/site.json' with { type: 'json' };
export const site = data;
export const siteUrl = (typeof process !== 'undefined' && process.env?.VITE_SITE_URL || import.meta.env?.VITE_SITE_URL || data.siteUrl).replace(/\/+$/, '') + '/';
export const siteBase = new URL(siteUrl).pathname.replace(/\/?$/, '/');
export const projects = data.projects;
export const technologies = data.technologies;
export const techBySlug = Object.fromEntries(technologies.map(t => [t.slug, t]));
export const categories = { web: 'Веб-проекты', games: 'Игры', software: 'Программы', bots: 'Боты и автоматизация', other: 'Другие проекты' };
export const navigation = [['/', 'Главная'], ['/projects/', 'Проекты'], ['/services/', 'Направления'], ['/technologies/', 'Технологии'], ['/about/', 'О нас'], ['/contacts/', 'Контакты']];
export const href = path => siteBase + path.replace(/^\/+/, '');
export const asset = path => href('images/' + path);
export const services = [['game', 'Игровые платформы', 'Онлайн-игры, профили и игровые экосистемы.', '#bf5dff'], ['web', 'Веб-разработка', 'Сайты, веб-сервисы и личные кабинеты.', '#32cfff'], ['code', 'Программные решения', 'Боты, автоматизация и приложения.', '#25e6b2'], ['layers', 'Индивидуальные проекты', 'Решения для конкретных задач и идей.', '#ffb04f']];
export const visuals = { games: ['game', '#ac62ff', 'GAMING PLATFORM'], web: ['web', '#3cc5ff', 'WEB PROJECT'], software: ['code', '#20e7bb', 'SOFTWARE'], bots: ['spark', '#ffbf60', 'AUTOMATION'], other: ['layers', '#a997ff', 'KODUMI PROJECT'] };
export function validate() { const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; for (const list of [projects, technologies]) {
    if (new Set(list.map(x => x.slug)).size !== list.length)
        throw Error('Duplicate slug');
    for (const x of list)
        if (!slug.test(x.slug))
            throw Error('Invalid slug: ' + x.slug);
} for (const p of projects) {
    if (!Object.hasOwn(categories, p.category) || !p.technologies.every(t => Object.hasOwn(techBySlug, t)))
        throw Error('Invalid project: ' + p.slug);
} }
