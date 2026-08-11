import { degree } from '@/content/education';
import { experience } from '@/content/experience';
import { links, profile } from '@/content/profile';
import type { Project } from '@/content/projects';
import { SITE_URL } from '@/lib/paths';

/**
 * Stable @id values let every page point at one canonical Person node instead of
 * redeclaring it. That is what lets a search engine treat the whole site as being
 * about a single entity rather than seven unrelated documents.
 */
const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

/** Schema.org wants absolute URLs. SITE_URL already carries the basePath. */
const absolute = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  url: `${SITE_URL}/`,
  image: absolute('/opengraph-image.png'),
  jobTitle: profile.role,
  description: profile.metaDescription,
  email: `mailto:${links.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'ZA' },
  // The profiles a name search is most likely to surface alongside this site.
  // Linking them here helps a search engine reconcile them as one person.
  sameAs: [links.github, links.linkedin, links.x],
  knowsAbout: [
    'Software engineering',
    'AI engineering',
    'Retrieval-Augmented Generation',
    'ASP.NET Core',
    'C#',
    'Python',
    'LangGraph',
    'Azure',
    'Clean Architecture',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: degree.issuer,
  },
  worksFor: {
    '@type': 'Organization',
    name: experience[0].company,
  },
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: `${profile.name} — Portfolio`,
  description: profile.metaDescription,
  inLanguage: 'en-ZA',
  publisher: { '@id': PERSON_ID },
  about: { '@id': PERSON_ID },
};

/** Person + WebSite, emitted site-wide from the root layout. */
export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [person, website],
};

/**
 * ProfilePage is the type search engines use for "this page is about a person".
 * Homepage only — the case studies are articles about work, not about Kwanele.
 */
export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: `${SITE_URL}/`,
  name: `${profile.name} — ${profile.role}`,
  isPartOf: { '@id': SITE_ID },
  mainEntity: { '@id': PERSON_ID },
};

export function projectSchema(project: Project) {
  const url = `${SITE_URL}/projects/${project.slug}/`;
  const image = absolute(project.image ?? '/opengraph-image.png');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: `${project.name} — ${project.tagline}`,
        description: project.problem,
        image,
        url,
        mainEntityOfPage: url,
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': SITE_ID },
        inLanguage: 'en-ZA',
        about: {
          '@type': 'SoftwareApplication',
          name: project.name,
          applicationCategory: 'DeveloperApplication',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: profile.name, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  };
}
