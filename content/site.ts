export const site = {
  name: 'HohoSolutions',
  url: 'https://hohosolutions.com',
  email: 'info@hohosolutions.com',
  whatsapp: '32451015476',
  phone: '+32451015476',
  phoneDisplay: '+32 451 015 476',
  country: 'Belgique',
  areaServed: ['BE'],
  priceRange: '€990–€4990+',
  legal: {
    legalName: 'Houdaifa Hamouchi — HohoSolutions',
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
    firstName: 'Houdaifa',
    lastName: 'Hamouchi',
    fullName: 'Houdaifa Hamouchi',
    photo: '', // TODO(owner): public/founder.jpg
    github: 'https://github.com/oiseaubleuc',
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
  const { streetAddress, city, bce, vat } = site.legal
  return Boolean(streetAddress && city && bce && vat)
}

export function hasFounder() {
  return Boolean(site.founder.firstName)
}

export function hasPromo() {
  return Boolean(site.promo.enabled && site.promo.label && site.promo.discount && site.promo.endsAt)
}

export function hasFounderPhoto() {
  return Boolean(site.founder.photo)
}
