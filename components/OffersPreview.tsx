'use client'

import { useLocale, useTranslations } from 'next-intl'
import { packages, formatPrice } from '@/content/packages'
import { localizedPath } from '@/lib/paths'
import FramerButton from './FramerButton'

export default function OffersPreview() {
  const t = useTranslations()
  const locale = useLocale()
  const visible = packages.filter((pkg) => pkg.id !== 'custom')

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('offersPreview.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light">{t('offersPreview.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((pkg) => (
            <article
              key={pkg.id}
              className={`rounded-2xl p-6 border bg-white/5 ${
                pkg.recommended ? 'border-yellow-500/50' : 'border-white/10'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {t(`offer.packages.${pkg.id}.name`)}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{t(`offer.packages.${pkg.id}.highlight`)}</p>
              <p className="text-3xl font-bold text-white">
                {t('offersPreview.from')} {formatPrice(pkg.price ?? 0, locale)}
                <span className="text-sm font-normal text-gray-400 ml-2">{t('offersPreview.htva')}</span>
              </p>
            </article>
          ))}
        </div>
        <div className="text-center">
          <FramerButton href={localizedPath(locale, '/offres')} variant="yellow">
            {t('offersPreview.cta')}
          </FramerButton>
        </div>
      </div>
    </section>
  )
}
