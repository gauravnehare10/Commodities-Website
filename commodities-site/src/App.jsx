import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import CommoditiesPage from './pages/CommoditiesPage';
import CommodityDetailPage from './pages/CommodityDetailPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import ServicesPage from './pages/ServicesPage';

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
