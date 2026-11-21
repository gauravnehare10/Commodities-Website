import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

/*
 * Each page is loaded only when visited (code splitting), so the first visit downloads
 * just the shared layout plus that page (docs/TECHNICAL_ARCHITECTURE.md §10).
 */
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CommoditiesPage = lazy(() => import('./pages/CommoditiesPage'));
const CommodityDetailPage = lazy(() => import('./pages/CommodityDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Route map: docs/WEBSITE_STRUCTURE.md §1–2 and docs/TECHNICAL_ARCHITECTURE.md §5. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} /> {/* P-01 */}
        <Route path="about" element={<AboutPage />} /> {/* P-02 */}
        <Route path="commodities" element={<CommoditiesPage />} /> {/* P-03 */}
        <Route path="commodities/:slug" element={<CommodityDetailPage />} /> {/* P-04 */}
        <Route path="services" element={<ServicesPage />} /> {/* P-05 */}
        <Route path="contact" element={<ContactPage />} /> {/* P-06 */}
        <Route path="privacy" element={<PrivacyPage />} /> {/* P-07 */}
        <Route path="*" element={<NotFoundPage />} /> {/* P-08 */}
      </Route>
    </Routes>
  );
}
