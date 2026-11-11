'use client'

import { useLocale, useTranslations } from 'next-intl'
import { hasPromo, site } from '@/content/site'
import { packages, formatPrice } from '@/content/packages'
import { localizedPath } from '@/lib/paths'
import FramerButton from './FramerButton'

export default function Offer() {
  const t = useTranslations('offer')
  const locale = useLocale()

  const trackOffer = (id: string) => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, event: 'offer_select', packageId: id }),
    }).catch(() => {})
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          {hasPromo() && (
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-500 rounded-full">
              <p className="text-sm font-semibold text-gray-900">
                {site.promo.label} · {site.promo.discount} · {site.promo.endsAt}
              </p>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-light">{t('subtitle')}</p>
          <p className="text-sm text-gray-400 mt-3">{t('vatNote')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
          {packages.map((pkg) => {
            const features = Array.from({ length: pkg.featureCount }, (_, i) => t(`packages.${pkg.id}.feature${i + 1}`))
            const extras = [
              pkg.delivery && { label: t('delivery'), value: pkg.delivery },
              pkg.pages && { label: t('pages'), value: pkg.pages },
              pkg.revisions && { label: t('revisions'), value: pkg.revisions },
              pkg.payment && { label: t('payment'), value: pkg.payment },
            ].filter(Boolean) as { label: string; value: string }[]

            return (
              <article
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl p-6 border bg-white/5 ${
                  pkg.recommended ? 'border-yellow-500/50 md:-mt-2' : 'border-white/10'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {t('popular')}
                  </span>
                )}
                <h2 className="text-xl font-semibold text-white mb-1">{t(`packages.${pkg.id}.name`)}</h2>
                <p className="text-xs text-gray-400 mb-3">{t(`packages.${pkg.id}.highlight`)}</p>
                <p className="text-3xl font-bold text-white mb-1">
                  {pkg.price != null ? formatPrice(pkg.price, locale) : t('packages.custom.priceLabel')}
                  {pkg.price != null && <span className="text-sm font-normal text-gray-400 ml-2">{t('htva')}</span>}
                </p>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{t(`packages.${pkg.id}.description`)}</p>
                <ul className="space-y-2 mb-4 flex-grow">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-yellow-400 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {extras.length > 0 && (
                  <dl className="text-xs text-gray-400 space-y-1 mb-4 border-t border-white/10 pt-3">
                    {extras.map((row) => (
                      <div key={row.label}>
                        <dt className="inline font-medium text-gray-300">{row.label} : </dt>
                        <dd className="inline">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {pkg.notIncluded.length > 0 && (
                  <p className="text-xs text-gray-500 mb-4">
                    {t('notIncluded')} : {pkg.notIncluded.join(', ')}
                  </p>
                )}
                <FramerButton
                  href={localizedPath(locale, `/contact?package=${pkg.id}`)}
                  variant={pkg.recommended ? 'primary' : 'outline'}
                  className="w-full mt-auto"
                  onClick={() => trackOffer(pkg.id)}
                >
                  {pkg.id === 'custom' ? t('ctaProposal') : t('cta')}
                </FramerButton>
              </article>
            )
          })}
        </div>

        <div className="overflow-x-auto mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">{t('compareTitle')}</h2>
          <table className="w-full min-w-[640px] text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-gray-300">
                <th className="py-3 pr-4 font-medium" />
                {packages.map((pkg) => (
                  <th key={pkg.id} className="py-3 px-3 font-semibold text-white">
                    {t(`packages.${pkg.id}.name`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-white">{t('compare.price')}</th>
                {packages.map((pkg) => (
                  <td key={pkg.id} className="py-3 px-3">
                    {pkg.price != null ? `${formatPrice(pkg.price, locale)} ${t('htva')}` : t('packages.custom.priceLabel')}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-white">{t('compare.audience')}</th>
                {packages.map((pkg) => (
                  <td key={pkg.id} className="py-3 px-3">
                    {t(`packages.${pkg.id}.highlight`)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">{t('guarantee.title')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t('guarantee.description')}</p>
        </div>
        <p className="text-center text-sm text-gray-400 mb-6">{t('note')}</p>
        <div className="text-center">
          <FramerButton href={localizedPath(locale, '/contact')} variant="secondary">
            {t('contact')}
          </FramerButton>
        </div>
      </div>
    </section>
  )
}
