import { siteUrl, siteBase, projects, technologies, categories } from './site.js';

const route = (path, title, description, kind, params = {}, index = true) => ({
  path,
  title: path === '/' ? title : `${title} | Kodumi`,
  description,
  kind,
  params,
  index,
  canonical: new URL(path.replace(/^\//, ''), siteUrl).href
});

export const routes = [
  route('/', 'Kodumi — digital products and development', 'Kodumi: web platforms, software products, projects and technologies.', 'home'),
  route('/projects/', 'Projects', 'Catalog of Kodumi projects and products.', 'projects'),
  ...Object.entries(categories).map(([slug, name]) => route(`/projects/category/${slug}/`, name, `Kodumi projects: ${name}.`, 'projects', { category: slug })),
  ...projects.map(project => route(`/projects/${project.slug}/`, project.name, project.summary, 'project', { slug: project.slug }, !project.demo)),
  route('/technologies/', 'Technologies', 'Technologies and related Kodumi projects.', 'technologies'),
  ...technologies.map(tech => route(`/technologies/${tech.slug}/`, `${tech.name} — projects`, tech.description, 'technology', { slug: tech.slug })),
  route('/services/', 'Services', 'Game platforms, web development, software solutions and custom projects.', 'services'),
  route('/about/', 'About Kodumi', 'About the Kodumi brand and its development approach.', 'about'),
  route('/contacts/', 'Contacts', 'Kodumi contact information.', 'contacts'),
  route('/portfolio/', 'Developer portfolio', 'Personal portfolio of the Kodumi developer.', 'portfolio'),
  route('/privacy/', 'Privacy policy', 'Privacy information for Kodumi.', 'privacy', {}, false),
  route('/terms/', 'Terms of use', 'Terms of use for Kodumi.', 'terms', {}, false),
  route('/404.html', 'Page not found', 'The requested page could not be found.', 'notfound', {}, false)
];

export function getRoute(path) {
  return routes.find(route => route.path === path) || routes.at(-1);
}

export function pathFromLocation(path) {
  if (!path.startsWith(siteBase)) return '/404.html';
  let normalized = '/' + path.slice(siteBase.length).replace(/index\.html$/, '');
  if (!normalized.endsWith('/') && !normalized.endsWith('.html')) normalized += '/';
  return normalized;
}
