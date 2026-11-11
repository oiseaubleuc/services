'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { formatPrice } from '@/content/packages'
import { services as serviceDefs } from '@/content/services'
import { localizedPath } from '@/lib/paths'
import type { Locale } from '@/i18n'

export default function Services() {
  const t = useTranslations('services')
  const locale = useLocale() as Locale

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">{t('title')}</h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceDefs.map((service) => (
            <Link
              key={service.id}
              href={localizedPath(locale, `/${service.slugs[locale]}`)}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{t(`${service.id}.title`)}</h2>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{t(`${service.id}.short`)}</p>
              <p className="text-sm text-yellow-300">
                {service.fromPrice != null
                  ? `${t('from')} ${formatPrice(service.fromPrice, locale)} HTVA`
                  : t('quote')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
