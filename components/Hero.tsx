'use client'

import { useLocale, useTranslations } from 'next-intl'
import { site } from '@/content/site'
import { localizedPath, whatsappLink } from '@/lib/paths'
import FramerButton from './FramerButton'

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 min-h-[90vh] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        aria-hidden
        disablePictureInPicture
        src="/space.mp4"
      >
        <source src="/space.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55 z-[1]" aria-hidden />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-5 tracking-tight leading-tight text-balance">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 max-w-2xl mx-auto font-medium">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto font-light">
          {t('hero.tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <FramerButton href={localizedPath(locale, '/contact')} variant="primary" className="w-full sm:w-auto">
            {t('hero.ctaPrimary')}
          </FramerButton>
          <FramerButton
            href={whatsappLink(site.whatsapp, t('hero.title'))}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {t('hero.ctaSecondary')}
          </FramerButton>
        </div>
        <p className="mt-5 text-xs sm:text-sm text-gray-300">{t('hero.reassurance')}</p>
      </div>
    </section>
  )
}
