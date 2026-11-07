export const site = {
  name: 'HohoSolutions',
  url: 'https://hohosolutions.com',
  email: 'info@hohosolutions.com',
  whatsapp: '32451015476',
  phone: '+32451015476',
  phoneDisplay: '+32 451 01 54 76',
  country: 'Belgique',
  areaServed: ['BE'],
  priceRange: '€990–€4990+',
  legal: {
    legalName: '', // TODO(owner)
    streetAddress: '', // TODO(owner)
    postalCode: '', // TODO(owner)
    city: '', // TODO(owner)
    bce: '', // TODO(owner)
    vat: '', // TODO(owner)
  },
  /** If set, the contact page embeds this booking URL instead of the native form. */
  calendlyUrl: '', // TODO(owner)
  promo: {
    enabled: false,
    label: '',
    discount: '',
    endsAt: '',
    eligibility: '',
  },
  founder: {
    firstName: '', // TODO(owner)
    role: '',
    photo: '',
    bio: '',
  },
  stats: {
    enabled: false,
    projects: 0,
    clients: 0,
    satisfaction: 0,
    years: 0,
  },
  maintenance: {
    enabled: false, // TODO(owner): set true and fill price if offered
    priceLabel: '',
  },
} as const

export function hasLegalIdentity() {
  const { legalName, streetAddress, city, bce, vat } = site.legal
  return Boolean(legalName && streetAddress && city && bce && vat)
}

export function hasFounder() {
  return Boolean(site.founder.firstName && site.founder.bio)
}

export function hasPromo() {
  return Boolean(site.promo.enabled && site.promo.label && site.promo.discount && site.promo.endsAt)
}
