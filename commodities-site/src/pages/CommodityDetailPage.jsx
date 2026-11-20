import { useParams } from 'react-router-dom';
import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';
import { getCommodity } from '../data/commodities';
import NotFoundPage from './NotFoundPage';

/** P-04 Commodity detail: one template for every category (docs/WEBSITE_STRUCTURE.md §4.4). Built in Phase 6. */
export default function CommodityDetailPage() {
  const { slug } = useParams();
  const commodity = getCommodity(slug);

  if (!commodity) return <NotFoundPage />;

  return (
    <>
      <Seo
        title={`${commodity.name} Recycling & Trading`}
        description={`${commodity.name}: the grades we handle, what we accept and how to request a quote.`}
      />
      <PagePlaceholder eyebrow="Commodities" title={commodity.name} phase="Phase 6" />
    </>
  );
}
