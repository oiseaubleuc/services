import type { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { allContentSlugs } from '@/content/services'

const baseUrl = 'https://hohosolutions.com'

const staticPaths = [
  '',
  '/services',
  '/offres',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/mentions-legales',
  '/audit-gratuit',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: {
            'fr-BE': `${baseUrl}/fr${path}`,
            'nl-BE': `${baseUrl}/nl${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      })
    }
    for (const slug of allContentSlugs(locale)) {
      entries.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
