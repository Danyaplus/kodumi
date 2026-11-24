import data from '../../../shared/site.json' with { type: 'json' };

export const site = data;
export const siteUrl = ((typeof process !== 'undefined' && process.env?.VITE_SITE_URL) || import.meta.env?.VITE_SITE_URL || data.siteUrl).replace(/\/+$/, '') + '/';
export const siteBase = new URL(siteUrl).pathname.replace(/\/?$/, '/');
export const projects = data.projects;
export const technologies = data.technologies;
export const techBySlug = Object.fromEntries(technologies.map(t => [t.slug, t]));
export const categories = {
  web: 'Web projects',
  games: 'Games',
  software: 'Software',
  bots: 'Bots & automation',
  other: 'Other projects'
};
export const navigation = [
  ['/', 'Home'],
  ['/projects/', 'Projects'],
  ['/services/', 'Services'],
  ['/technologies/', 'Technologies'],
  ['/about/', 'About'],
  ['/contacts/', 'Contacts']
];
export const href = path => siteBase + path.replace(/^\/+/, '');
export const asset = path => href('images/' + path);
export const serviceMeta = [
  ['game', '#bf5dff'],
  ['web', '#32cfff'],
  ['code', '#25e6b2'],
  ['layers', '#ffb04f']
];
export const visuals = {
  games: ['game', '#ac62ff', 'GAMING PLATFORM'],
  web: ['web', '#3cc5ff', 'WEB PROJECT'],
  software: ['code', '#20e7bb', 'SOFTWARE'],
  bots: ['spark', '#ffbf60', 'AUTOMATION'],
  other: ['layers', '#a997ff', 'KODUMI PROJECT']
};

export function validate() {
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const list of [projects, technologies]) {
    if (new Set(list.map(x => x.slug)).size !== list.length) throw Error('Duplicate slug');
    for (const item of list) if (!slug.test(item.slug)) throw Error('Invalid slug: ' + item.slug);
  }

  for (const project of projects) {
    if (!Object.hasOwn(categories, project.category) || !project.technologies.every(t => Object.hasOwn(techBySlug, t))) {
      throw Error('Invalid project: ' + project.slug);
    }
  }
}
