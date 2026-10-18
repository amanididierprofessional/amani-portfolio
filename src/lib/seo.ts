/** Site-wide SEO helpers for Amani Ishimwe Didier (Aidi) portfolio */

export const SITE_URL = 'https://amani-didier.vercel.app';
export const SITE_NAME = 'Aidi — Amani Ishimwe Didier';

/** ~30 high-value keywords: name variants + projects + location/skills */
export const SEO_KEYWORDS = [
  'Amani Ishimwe Didier',
  'Amani Didier',
  'Amani Ishimwe',
  'Aidi',
  'Aidi developer',
  'Aidi portfolio',
  'Stoke Yange',
  'Stoke Yange Rwanda',
  'Bob AI',
  'Bob research',
  'Urugendo',
  'Genie AI',
  'Genie learn AI',
  'Billy YouTube assistant',
  'ICT Chronicles Byimana',
  'Campus Check-in',
  'Rwanda developer',
  'Rwandan software engineer',
  'Musanze developer',
  'Byimana ICT',
  'offline stock management Rwanda',
  'PWA Rwanda',
  'TypeScript developer Rwanda',
  'web developer Musanze',
  'Amani Didier portfolio',
  'Amani Ishimwe Didier portfolio',
  'Aidi GitHub',
  'ishimweamanid',
  'build in public Rwanda',
  'AI tools Rwanda',
].join(', ');

export const DEFAULT_DESCRIPTION =
  'Portfolio of Amani Ishimwe Didier (Aidi) — Rwandan builder & creator from Musanze. Projects: Stoke Yange (stock manager for shops), Bob (AI research), Urugendo, Genie (learn AI), Billy (YouTube assistant). Contact: ishimweamanid@gmail.com · 0796919900.';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amani Ishimwe Didier',
    alternateName: ['Amani Didier', 'Aidi', 'Amani Ishimwe'],
    url: SITE_URL,
    image:
      'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png',
    jobTitle: 'Software Developer & Creator',
    description: DEFAULT_DESCRIPTION,
    email: 'ishimweamanid@gmail.com',
    telephone: '+250796919900',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Musanze',
      addressCountry: 'RW',
    },
    sameAs: [
      'https://github.com/amanididier',
      'https://github.com/amanididierprofessional',
      'https://www.youtube.com/@Aidi',
      'https://wa.me/250796919900',
    ],
    knowsAbout: [
      'Web development',
      'TypeScript',
      'Progressive Web Apps',
      'AI tools',
      'Stoke Yange',
      'Offline-first apps',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Amani Ishimwe Didier',
    },
    inLanguage: 'en',
  };
}

export function pageHead(title: string, description: string, path = '/') {
  const fullTitle = `${title} — Aidi · Amani Ishimwe Didier`;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { name: 'author', content: 'Amani Ishimwe Didier' },
      { name: 'keywords', content: SEO_KEYWORDS },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_US' },
      {
        property: 'og:image',
        content:
          'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      {
        name: 'twitter:image',
        content:
          'https://amani-creative-canvas.lovable.app/__l5e/assets-v1/1666c5fa-cc2b-4384-95f2-e6e60ed60071/aidi-portrait.png',
      },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}
