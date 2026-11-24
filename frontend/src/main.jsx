import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { pathFromLocation, getRoute } from './lib/routes.js';
import './styles/global.css';
import './styles/neon.css';
import './styles/responsive.css';
const root = document.getElementById('root');
const path = getRoute(pathFromLocation(location.pathname)).path;
const app = <App initialPath={path}/>;
if (root.querySelector('#site-header'))
    hydrateRoot(root, app);
else
    createRoot(root).render(app);
