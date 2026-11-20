import PagePlaceholder from '../components/layout/PagePlaceholder';
import Seo from '../components/layout/Seo';

/** P-07 Privacy policy (docs/WEBSITE_STRUCTURE.md §4.7). Content: MI-13. Built in Phase 9. */
export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How we collect, use and protect your personal information."
      />
      <PagePlaceholder eyebrow="Legal" title="Privacy policy" phase="Phase 9" />
    </>
  );
}
