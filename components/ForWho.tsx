'use client'

import { useTranslations } from 'next-intl'

const cards = ['freelancers', 'businesses', 'companies', 'ecommerce'] as const

export default function ForWho() {
  const t = useTranslations('forWho')

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((key) => (
            <article
              key={key}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{t(`${key}.title`)}</h3>
              <p className="text-sm text-gray-400 mb-3 leading-relaxed">{t(`${key}.problem`)}</p>
              <p className="text-sm text-gray-200 leading-relaxed">{t(`${key}.solution`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
