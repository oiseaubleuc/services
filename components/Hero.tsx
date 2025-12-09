'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pt-20 sm:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            {t('hero.title')}
            <br />
            <span className="text-gray-300">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-3 sm:mb-4 max-w-3xl mx-auto font-medium leading-tight px-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
            {t('hero.tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-gray-900 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border-2 border-white text-white rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

