import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { posts } from '@/content/blog'
import { locales, type Locale } from '@/i18n'
import { localizedPath } from '@/lib/paths'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://hohosolutions.com/${locale}/blog`,
      languages: {
        'fr-BE': 'https://hohosolutions.com/fr/blog',
        'nl-BE': 'https://hohosolutions.com/nl/blog',
        en: 'https://hohosolutions.com/en/blog',
        'x-default': 'https://hohosolutions.com/fr/blog',
      },
    },
  }
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  const t = await getTranslations({ locale, namespace: 'blog' })

  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">{t('title')}</h1>
      <p className="text-gray-300 text-lg mb-10">{t('subtitle')}</p>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs text-gray-500 mb-2">
              {new Date(post.date).toLocaleDateString(loc === 'en' ? 'en-GB' : `${loc}-BE`)}
            </p>
            <h2 className="text-xl font-semibold text-white mb-2">
              <Link href={localizedPath(locale, `/blog/${post.slug[loc]}`)} className="hover:underline">
                {post.title[loc]}
              </Link>
            </h2>
            <p className="text-gray-300 text-sm mb-4">{post.description[loc]}</p>
            <Link
              href={localizedPath(locale, `/blog/${post.slug[loc]}`)}
              className="text-yellow-400 text-sm font-medium hover:text-yellow-300"
            >
              {t('read')} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
