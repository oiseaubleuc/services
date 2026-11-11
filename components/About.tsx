'use client'

import { useLocale, useTranslations } from 'next-intl'
import { site, hasFounderPhoto } from '@/content/site'
import { localizedPath } from '@/lib/paths'
import FramerButton from './FramerButton'
import Image from 'next/image'

const tech = [
  { key: 'next', label: 'Next.js' },
  { key: 'react', label: 'React & TypeScript' },
  { key: 'cms', label: 'CMS' },
  { key: 'payments', label: 'Stripe / Mollie' },
  { key: 'hosting', label: 'Vercel' },
  { key: 'legal', label: 'RGPD / GDPR' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'seo', label: 'SEO' },
] as const

export default function About() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <>
      <section className="relative py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          {hasFounderPhoto() && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-8">
              <Image src={site.founder.photo} alt={site.founder.fullName} fill className="object-cover" />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight text-center">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed text-center">
            {t('intro')}
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">{t('story.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-4">{t('story.p1')}</p>
            <p className="text-gray-300 leading-relaxed">{t('story.p2')}</p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">{t('legal.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('legal.description')}</p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">{t('languages.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('languages.description')}</p>
          </div>

          <div>
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
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 text-center">{t('tech.title')}</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">{t('tech.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tech.map((item) => (
              <div key={item.key} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-white font-medium mb-1">{item.label}</p>
                <p className="text-sm text-gray-300">{t(`tech.${item.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href={site.founder.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white underline underline-offset-4"
          >
            {t('github')}
          </a>
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
