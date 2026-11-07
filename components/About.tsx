'use client'

import { useLocale, useTranslations } from 'next-intl'
import { localizedPath } from '@/lib/paths'
import Founder from './Founder'
import FramerButton from './FramerButton'

const tech = [
  { key: 'next', label: 'Next.js' },
  { key: 'cms', label: 'CMS' },
  { key: 'payments', label: 'Paiements' },
  { key: 'hosting', label: 'Hébergement' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'seo', label: 'SEO' },
] as const

export default function About() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <>
      <section className="relative py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight">{t('title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">{t('story.title')}</h2>
          <p className="text-gray-300 leading-relaxed">{t('story.description')}</p>
        </div>
      </section>

      <Founder />

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">{t('how.title')}</h2>
          <ul className="space-y-3 text-gray-300">
            {(['item1', 'item2', 'item3', 'item4'] as const).map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-yellow-400">✓</span>
                {t(`how.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 text-center">{t('tech.title')}</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">{t('tech.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tech.map((item) => (
              <div key={item.key} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-white font-medium mb-1">{item.label}</p>
                <p className="text-sm text-gray-300">{t(`tech.${item.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-3">{t('ctaSection.title')}</h2>
          <p className="text-gray-300 mb-6">{t('ctaSection.description')}</p>
          <FramerButton href={localizedPath(locale, '/contact')} variant="primary">
            {t('ctaSection.button')}
          </FramerButton>
        </div>
      </section>
    </>
  )
}
