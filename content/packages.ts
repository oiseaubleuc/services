export type PackageId = 'essential' | 'professional' | 'enterprise' | 'custom'

export type PackageDef = {
  id: PackageId
  price: number | null
  priceLabel?: string
  vat: 'HTVA'
  recommended?: boolean
  recommendedLabelKey: string
  /** Empty strings are omitted on the page until the owner fills them. */
  delivery: string
  pages: string
  revisions: string
  notIncluded: string[]
  payment: string
  featureCount: number
}

export const packages: PackageDef[] = [
  {
    id: 'essential',
    price: 990,
    vat: 'HTVA',
    recommendedLabelKey: 'offer.packages.essential.highlight',
    delivery: '', // TODO(owner)
    pages: '', // TODO(owner)
    revisions: '', // TODO(owner)
    notIncluded: [], // TODO(owner)
    payment: '', // TODO(owner)
    featureCount: 6,
  },
  {
    id: 'professional',
    price: 2490,
    vat: 'HTVA',
    recommended: true,
    recommendedLabelKey: 'offer.packages.professional.highlight',
    delivery: '', // TODO(owner)
    pages: '', // TODO(owner)
    revisions: '', // TODO(owner)
    notIncluded: [], // TODO(owner)
    payment: '', // TODO(owner)
    featureCount: 8,
  },
  {
    id: 'enterprise',
    price: 4990,
    vat: 'HTVA',
    recommendedLabelKey: 'offer.packages.enterprise.highlight',
    delivery: '', // TODO(owner)
    pages: '', // TODO(owner)
    revisions: '', // TODO(owner)
    notIncluded: [], // TODO(owner)
    payment: '', // TODO(owner)
    featureCount: 10,
  },
  {
    id: 'custom',
    price: null,
    priceLabel: 'offer.packages.custom.priceLabel',
    vat: 'HTVA',
    recommendedLabelKey: 'offer.packages.custom.highlight',
    delivery: '',
    pages: '',
    revisions: '',
    notIncluded: [],
    payment: '',
    featureCount: 6,
  },
]

export const packageAliases: Record<string, PackageId> = {
  starter: 'essential',
  essential: 'essential',
  professional: 'professional',
  enterprise: 'enterprise',
  custom: 'custom',
}

export function resolvePackageId(value?: string | null): PackageId | null {
  if (!value) return null
  return packageAliases[value] ?? null
}

export function formatPrice(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-BE' : locale === 'en' ? 'en-BE' : 'fr-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
