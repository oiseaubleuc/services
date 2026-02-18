import type { MetadataRoute } from 'next'

const baseUrl = 'https://hohosolutions.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/offer',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ]

  return routes.map((path) => ({
    url: path ? `${baseUrl}${path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))
}
