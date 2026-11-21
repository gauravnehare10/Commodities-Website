import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { BANNER_SIZES, bannerSrcSet } from '../../../utils/images';
import { delay } from '../../../utils/motion';
import './shared.css';

/**
 * Inner-page header: full-width image, dark gradient, white title, breadcrumb and intro
 * (docs/UI_UX_GUIDELINES.md §6). Built on React Bootstrap Container + Breadcrumb.
 *
 * @param {string} title Page h1
 * @param {string} [intro]
 * @param {string} [image] Wide (1600×700) image. Optional: without one, the banner is plain dark (e.g. legal pages).
 * @param {{label: string, to?: string}[]} [breadcrumbs] Last item is the current page (no `to`)
 */
export default function PageHero({ title, intro, image, breadcrumbs = [] }) {
  return (
    <section
      className={`page-hero position-relative overflow-hidden bg-dark text-white${image ? '' : ' page-hero--plain'}`}
      aria-labelledby="page-title"
    >
      {image && (
        <img
          src={image}
          srcSet={bannerSrcSet(image, 800, 1600)}
          sizes={BANNER_SIZES}
          alt=""
          width="1600"
          height="700"
          loading="eager"
          fetchPriority="high"
          className="page-hero__image position-absolute top-0 start-0 w-100 h-100 object-fit-cover animate-settle"
        />
      )}
      <Container className="page-hero__content position-relative d-flex flex-column justify-content-end gap-3">
        {/* Entrance: breadcrumb, title and intro fade up in turn (styles/animations.css) */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb
            className="page-hero__breadcrumb small mb-0 animate-in"
            listProps={{ className: 'mb-0' }}
          >
            {breadcrumbs.map((crumb) =>
              crumb.to ? (
                <Breadcrumb.Item key={crumb.label} linkAs={Link} linkProps={{ to: crumb.to }}>
                  {crumb.label}
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item key={crumb.label} active>
                  {crumb.label}
                </Breadcrumb.Item>
              ),
            )}
          </Breadcrumb>
        )}
        <h1 id="page-title" className="mb-0 animate-in" style={delay(90)}>
          {title}
        </h1>
        {intro && (
          <p className="page-hero__intro fs-5 mb-0 animate-in" style={delay(180)}>
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
