import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return {
    title: t('title'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/privacy` },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  const sections = ['s1', 's2', 's3', 's4', 's5', 's6'] as const
  return (
    <article className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 prose-invert">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">{t('title')}</h1>
      <p className="text-gray-400 text-sm mb-4">{t('lastUpdated')}</p>
      <p className="text-gray-500 text-sm mb-8">{t('todo')}</p>
      {sections.map((s) => (
        <section key={s} className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">{t(`${s}t`)}</h2>
          <p className="text-gray-300 leading-relaxed">{t(`${s}c`)}</p>
        </section>
      ))}
    </article>
  )
}
