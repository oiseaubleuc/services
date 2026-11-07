import type { Locale } from '@/i18n'

export type ServiceId =
  | 'vitrine'
  | 'ecommerce'
  | 'portfolio'
  | 'custom-app'
  | 'refonte'
  | 'maintenance'

export type ServiceDef = {
  id: ServiceId
  slugs: Record<Locale, string>
  fromPrice: number | null
  fromPriceLabel?: string
}

export const services: ServiceDef[] = [
  {
    id: 'vitrine',
    slugs: {
      fr: 'creation-site-vitrine',
      nl: 'bedrijfswebsite-laten-maken',
      en: 'showcase-website',
    },
    fromPrice: 990,
  },
  {
    id: 'ecommerce',
    slugs: {
      fr: 'creation-site-e-commerce',
      nl: 'webshop-laten-maken',
      en: 'ecommerce-website',
    },
    fromPrice: 2490,
  },
  {
    id: 'portfolio',
    slugs: {
      fr: 'site-portfolio',
      nl: 'portfolio-website',
      en: 'portfolio-website',
    },
    fromPrice: 990,
  },
  {
    id: 'custom-app',
    slugs: {
      fr: 'application-web-sur-mesure',
      nl: 'webapplicatie-op-maat',
      en: 'custom-web-app',
    },
    fromPrice: 4990,
  },
  {
    id: 'refonte',
    slugs: {
      fr: 'refonte-site-web',
      nl: 'website-vernieuwen',
      en: 'website-redesign',
    },
    fromPrice: 990,
  },
  {
    id: 'maintenance',
    slugs: {
      fr: 'maintenance-site-web',
      nl: 'website-onderhoud',
      en: 'website-maintenance',
    },
    fromPrice: null,
    fromPriceLabel: 'quote',
  },
]

export function getServiceBySlug(locale: Locale, slug: string) {
  return services.find((service) => service.slugs[locale] === slug) ?? null
}

export function getServiceById(id: ServiceId) {
  return services.find((service) => service.id === id) ?? null
}

export type LocalPage = {
  slug: Record<Locale, string | null>
  city: Record<Locale, string>
  published: boolean
  uniqueIntro: Record<Locale, string>
}

export const localPages: LocalPage[] = [
  {
    slug: {
      fr: 'creation-site-internet-bruxelles',
      nl: 'website-laten-maken-brussel',
      en: 'website-creation-brussels',
    },
    city: { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels' },
    published: true,
    uniqueIntro: {
      fr: 'Bruxelles concentre indépendants, commerces du centre et sièges de PME. Un site clair, bilingue si besoin, et visible sur Google Maps fait souvent plus pour un salon, un resto ou un cabinet qu’une brochure papier.',
      nl: 'Brussel bundelt zelfstandigen, winkels in het centrum en KMO-hoofdkantoren. Een duidelijke, desnoods tweetalige site die zichtbaar is op Google Maps, levert een salon, restaurant of praktijk vaak meer op dan een papieren brochure.',
      en: 'Brussels concentrates freelancers, city-centre shops and SME headquarters. A clear, bilingual-if-needed website that shows up on Google Maps often does more for a salon, restaurant or practice than a paper brochure.',
    },
  },
  {
    slug: { fr: 'creation-site-internet-liege', nl: null, en: null },
    city: { fr: 'Liège', nl: 'Luik', en: 'Liège' },
    published: false, // TODO(owner): write unique copy before publishing
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
  {
    slug: { fr: 'creation-site-internet-namur', nl: null, en: null },
    city: { fr: 'Namur', nl: 'Namen', en: 'Namur' },
    published: false,
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
  {
    slug: { fr: 'creation-site-internet-charleroi', nl: null, en: null },
    city: { fr: 'Charleroi', nl: 'Charleroi', en: 'Charleroi' },
    published: false,
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
  {
    slug: { fr: 'creation-site-internet-mons', nl: null, en: null },
    city: { fr: 'Mons', nl: 'Bergen', en: 'Mons' },
    published: false,
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
  {
    slug: { fr: null, nl: 'website-laten-maken-gent', en: null },
    city: { fr: 'Gand', nl: 'Gent', en: 'Ghent' },
    published: false,
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
  {
    slug: { fr: null, nl: 'website-laten-maken-antwerpen', en: null },
    city: { fr: 'Anvers', nl: 'Antwerpen', en: 'Antwerp' },
    published: false,
    uniqueIntro: { fr: '', nl: '', en: '' },
  },
]

export function getLocalPageBySlug(locale: Locale, slug: string) {
  return (
    localPages.find(
      (page) => page.published && page.slug[locale] === slug && page.uniqueIntro[locale]
    ) ?? null
  )
}

export function allContentSlugs(locale: Locale) {
  const serviceSlugs = services.map((service) => service.slugs[locale])
  const citySlugs = localPages
    .filter((page) => page.published && page.slug[locale] && page.uniqueIntro[locale])
    .map((page) => page.slug[locale] as string)
  return [...serviceSlugs, ...citySlugs]
}
