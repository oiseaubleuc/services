'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 tracking-tight leading-tight">
            {t('hero.title')}
            <br />
            <span className="text-gray-300">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#contact"
              className="px-8 py-3.5 bg-white text-gray-900 rounded-full text-base font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              href="#services"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white rounded-full text-base font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

