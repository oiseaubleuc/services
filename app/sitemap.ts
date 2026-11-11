import type { MetadataRoute } from 'next'
import { locales, type Locale } from '@/i18n'
import { allContentSlugs } from '@/content/services'
import { posts } from '@/content/blog'

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
  '/blog',
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
    for (const post of posts) {
      const path = `/blog/${post.slug[locale as Locale]}`
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            'fr-BE': `${baseUrl}/fr/blog/${post.slug.fr}`,
            'nl-BE': `${baseUrl}/nl/blog/${post.slug.nl}`,
            en: `${baseUrl}/en/blog/${post.slug.en}`,
          },
        },
      })
    }
  }

  return entries
}
