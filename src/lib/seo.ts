/**
 * SEO-хелперы для генерации canonical URL, Open Graph, JSON-LD.
 */

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://webnostra.pro';

/**
 * Нормализует путь в абсолютный URL с trailing slash.
 */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withTrailing = clean.endsWith('/') ? clean : `${clean}/`;
  return `${SITE_URL}${withTrailing}`;
}

/**
 * Organization schema — глобальный, используется на всех страницах.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'WEBNOSTRA PERFORMANCE',
    'url': SITE_URL,
    'logo': `${SITE_URL}/og-default.jpg`,
    'description': 'Performance-маркетинг с профильными командами под нишу: недвижимость, e-commerce, инфобизнес, туризм, медицина. База на Пхукете, с 2018.',
    'foundingDate': '2018',
    'founders': [
      {
        '@type': 'Person',
        'name': 'Магош Альшанский',
        'jobTitle': 'Managing Director',
      },
      {
        '@type': 'Person',
        'name': 'Владислав Марфин',
        'jobTitle': 'Commercial Director',
      },
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Пхукет',
      'addressCountry': 'TH',
    },
    'sameAs': [
      import.meta.env.PUBLIC_CONTACT_INSTAGRAM,
      import.meta.env.PUBLIC_CONTACT_TG_CHANNEL,
    ].filter(Boolean),
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': import.meta.env.PUBLIC_CONTACT_EMAIL,
      'availableLanguage': ['Russian', 'English'],
    },
  };
}

/**
 * BreadcrumbList schema — для хлебных крошек.
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.name,
      'item': absoluteUrl(item.url),
    })),
  };
}

/**
 * Service schema — для страниц услуг (/services/*).
 * Ссылается на Organization как provider.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': opts.name,
    'description': opts.description,
    'url': absoluteUrl(opts.path),
    'serviceType': opts.serviceType,
    'provider': {
      '@type': 'Organization',
      'name': 'WEBNOSTRA PERFORMANCE',
      'url': SITE_URL,
    },
    'areaServed': (opts.areaServed || ['RU', 'TH', 'AE', 'ID', 'TR', 'CY', 'GE']).map(code => ({
      '@type': 'Country',
      'name': code,
    })),
  };
}

/**
 * FAQ schema — для страниц с блоком FAQ.
 */
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };
}
