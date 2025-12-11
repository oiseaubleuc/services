'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight px-2">
            {t('hero.title')}
            <br />
            <span className="text-gray-300">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-2 sm:mb-3 md:mb-4 max-w-3xl mx-auto font-medium leading-tight px-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
            {t('hero.tagline')}
          </p>
          <div className="flex flex-col xs:flex-row gap-2.5 xs:gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              href="/contact"
              className="w-full xs:w-auto px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-white text-gray-900 rounded-full text-xs xs:text-sm sm:text-base font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              href="/services"
              className="w-full xs:w-auto px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-transparent border-2 border-white text-white rounded-full text-xs xs:text-sm sm:text-base font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

