import { site, hasLegalIdentity, hasFounder } from '@/content/site'

type Faq = { question: string; answer: string }

export default function JsonLd({
  locale,
  faqs,
}: {
  locale: string
  faqs?: Faq[]
}) {
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    telephone: site.phone,
    priceRange: site.priceRange,
    areaServed: {
      '@type': 'Country',
      name: site.country,
    },
    image: `${site.url}/logos/logo_HS.png`,
  }

  if (hasLegalIdentity()) {
    business.address = {
      '@type': 'PostalAddress',
      streetAddress: site.legal.streetAddress,
      postalCode: site.legal.postalCode,
      addressLocality: site.legal.city,
      addressCountry: 'BE',
    }
    business.vatID = site.legal.vat
  }

  if (hasFounder()) {
    business.founder = {
      '@type': 'Person',
      name: site.founder.fullName,
      url: `${site.url}/${locale}/about`,
      sameAs: [site.founder.github],
    }
  }

  const faq =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
    </>
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
