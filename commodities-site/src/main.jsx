import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Bootstrap 5 base styles (Reboot, grid, components). Its JS bundle is not used: React Bootstrap provides behaviour.
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Fonts: Latin subset, only the weights in docs/UI_UX_GUIDELINES.md §3
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';

// 3. Our styles: tokens → Bootstrap theme → base → utilities (later files override earlier ones)
import './styles/variables.css';
import './styles/theme.css';
import './styles/base.css';
import './styles/utilities.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Remove the static default <title>/<meta> from index.html: every page renders its own via <Seo>,
// and two title or description tags would confuse search engines.
document.querySelectorAll('head [data-default-meta]').forEach((el) => el.remove());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
