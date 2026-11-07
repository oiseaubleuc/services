'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { hasFounder, site } from '@/content/site'
import { localizedPath } from '@/lib/paths'
import FramerButton from './FramerButton'

export default function Founder() {
  const t = useTranslations('founder')
  const locale = useLocale()
  if (!hasFounder()) return null

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
          {site.founder.photo && (
            <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
              <Image src={site.founder.photo} alt={site.founder.firstName} fill className="object-cover" />
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{t('title')}</h2>
            <p className="text-white font-medium mb-1">
              {site.founder.firstName}
              {site.founder.role ? ` · ${site.founder.role}` : ''}
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">{site.founder.bio}</p>
            <FramerButton href={localizedPath(locale, '/contact')} variant="outline">
              {t('cta')}
            </FramerButton>
          </div>
        </div>
      </div>
    </section>
  )
}
