import Seo from '../components/layout/Seo';
import PageHero from '../components/sections/shared/PageHero';
import Section from '../components/ui/Section';
import { company } from '../data/company';
import { privacy } from '../data/content';
import { mailHref } from '../utils/contact';

/** P-07 Privacy policy (docs/WEBSITE_STRUCTURE.md §4.7). Text supplied by the business (MI-13). */
export default function PrivacyPage() {
  const mail = mailHref(company.email);
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How we collect, use and protect the personal information you give us through this website, and your rights under UK data protection law."
      />

      <PageHero
        title="Privacy policy"
        intro={`Last updated: ${privacy.updated}`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy policy' }]}
      />

      <Section>
        <div className="prose mx-auto">
          {privacy.sections.map((section) => (
            <section key={section.heading} className="mb-5">
              <h2 className="h3 mb-3">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p} className="text-secondary">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <p className="small text-body-secondary border-top pt-4 mb-0">
            Questions about this policy? Email{' '}
            {mail ? <a href={mail}>{company.email}</a> : company.email} or write to{' '}
            {company.legalName}, {company.registeredAddress}.
          </p>
        </div>
      </Section>
    </>
  );
}
