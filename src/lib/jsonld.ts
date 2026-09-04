import { profile, SITE_URL } from '../data/profile';

export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;

const abs = (path: string) => new URL(path, SITE_URL).toString();
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    alternateName: [...profile.alternateName],
    url: `${SITE_URL}/`,
    image: { '@type': 'ImageObject', url: abs(profile.portrait), width: 800, height: 800, caption: `${profile.name}, AI engineer in Kathmandu` },
    email: `mailto:${profile.email}`,
    jobTitle: profile.jobTitle,
    description: profile.headline,
    worksFor: { '@type': 'Organization', name: profile.currentEmployer.name },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: `${profile.education.school}, ${profile.education.university}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    },
    address: { '@type': 'PostalAddress', addressLocality: profile.location.locality, addressCountry: profile.location.country },
    nationality: { '@type': 'Country', name: profile.location.countryName },
    knowsAbout: [...profile.knowsAbout],
    knowsLanguage: ['en', 'ne'],
    sameAs: Object.values(profile.socials),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE_URL}/`,
    name: profile.name,
    alternateName: ['Sushank Ghimire portfolio', 'sushankghimire.com.np'],
    description: profile.headline,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };
}

export function profilePage(dateModified: Date) {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${profile.name}, AI Engineer`,
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
    dateModified: iso(dateModified),
    inLanguage: 'en',
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function blogPosting(
  post: {
    id: string;
    data: { title: string; description: string; pubDate: Date; updatedDate?: Date; tags: string[] };
  },
  path: string,
  wordCount?: number,
) {
  const url = abs(path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.data.title,
    description: post.data.description,
    url,
    mainEntityOfPage: url,
    datePublished: iso(post.data.pubDate),
    dateModified: iso(post.data.updatedDate ?? post.data.pubDate),
    image: abs(`/og/${post.id}.png`),
    keywords: post.data.tags.join(', '),
    wordCount,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en',
  };
}

export function blogIndex(posts: { id: string }[]) {
  return {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog/#blog`,
    url: `${SITE_URL}/blog/`,
    name: `Writing by ${profile.name}`,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
    blogPost: posts.map((p) => ({ '@id': `${abs(`/blog/${p.id}/`)}#article` })),
  };
}

export function softwareSourceCode(project: {
  id: string;
  data: { title: string; tagline: string; stack: readonly string[]; year: number; links: { live?: string; repo?: string } };
}) {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${abs(`/projects/${project.id}/`)}#code`,
    name: project.data.title,
    description: project.data.tagline,
    url: abs(`/projects/${project.id}/`),
    codeRepository: project.data.links.repo,
    programmingLanguage: project.data.stack[0],
    runtimePlatform: project.data.stack.join(', '),
    dateCreated: String(project.data.year),
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
  };
}

export function scholarlyArticles() {
  return profile.research.map((s) => ({
    '@type': 'ScholarlyArticle',
    '@id': `${SITE_URL}/research/#${s.slug}`,
    headline: s.title,
    description: s.summary,
    url: abs(encodeURI(s.pdf)),
    about: s.method,
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en',
  }));
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
