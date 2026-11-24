import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export { routes } from './lib/routes.js';
export { seo } from './lib/seo.js';
export function render(path) { return renderToString(<App initialPath={path}/>); }
