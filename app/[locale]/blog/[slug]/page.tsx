import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { allBlogSlugs, getPostBySlug } from '@/content/blog'
import { locales, type Locale } from '@/i18n'
import { localizedPath } from '@/lib/paths'
import { site } from '@/content/site'
import Markdown from '@/components/Markdown'
import FramerButton from '@/components/FramerButton'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export function generateStaticParams() {
  return locales.flatMap((locale) => allBlogSlugs(locale).map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(locale as Locale, slug)
  if (!post) return {}
  const loc = locale as Locale
  return {
    title: post.title[loc],
    description: post.description[loc],
    alternates: {
      canonical: `https://hohosolutions.com/${locale}/blog/${post.slug[loc]}`,
      languages: {
        'fr-BE': `https://hohosolutions.com/fr/blog/${post.slug.fr}`,
        'nl-BE': `https://hohosolutions.com/nl/blog/${post.slug.nl}`,
        en: `https://hohosolutions.com/en/blog/${post.slug.en}`,
        'x-default': `https://hohosolutions.com/fr/blog/${post.slug.fr}`,
      },
    },
    openGraph: {
      title: post.title[loc],
      description: post.description[loc],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const loc = locale as Locale
  const post = getPostBySlug(loc, slug)
  if (!post) notFound()
  const t = await getTranslations({ locale, namespace: 'blog' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[loc],
    description: post.description[loc],
    datePublished: post.date,
    inLanguage: loc === 'fr' ? 'fr-BE' : loc === 'nl' ? 'nl-BE' : 'en',
    author: {
      '@type': 'Person',
      name: site.founder.fullName,
      url: `${site.url}/${locale}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/${locale}/blog/${post.slug[loc]}`,
  }

  return (
    <article className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <BreadcrumbJsonLd
        items={[
          { name: 'HohoSolutions', url: `${site.url}/${locale}` },
          { name: t('title'), url: `${site.url}/${locale}/blog` },
          { name: post.title[loc], url: `${site.url}/${locale}/blog/${post.slug[loc]}` },
        ]}
      />
      <Link href={localizedPath(locale, '/blog')} className="text-sm text-gray-400 hover:text-white">
        ← {t('back')}
      </Link>
      <p className="text-xs text-gray-500 mt-6 mb-2">
        {new Date(post.date).toLocaleDateString(loc === 'en' ? 'en-GB' : `${loc}-BE`)}
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
        {post.title[loc]}
      </h1>
      <Markdown source={post.body[loc]} />
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <FramerButton href={localizedPath(locale, '/contact')} variant="primary">
          {tNav('quote')}
        </FramerButton>
      </div>
    </article>
  )
}
