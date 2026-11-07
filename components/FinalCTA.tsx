'use client'

import { useTranslations } from 'next-intl'
import { site } from '@/content/site'
import { whatsappLink } from '@/lib/paths'
import LeadForm from './LeadForm'

export default function FinalCTA() {
  const t = useTranslations('cta.final')
  const tHero = useTranslations('hero')

  return (
    <section className="py-16 sm:py-20 md:py-24 relative" id="devis">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light mb-4">{t('subtitle')}</p>
          <a
            href={whatsappLink(site.whatsapp, tHero('title'))}
            className="inline-block text-sm text-yellow-300 hover:text-yellow-200 underline underline-offset-4"
          >
            {tHero('ctaSecondary')}
          </a>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-5 sm:p-8 rounded-2xl border border-white/20">
          <LeadForm source="home" compact />
        </div>
      </div>
    </section>
  )
}
