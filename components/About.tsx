'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t('about.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light px-4">
              {t('about.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-12 sm:mb-16 lg:mb-20">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                {t('about.expertise.title')}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed font-light">
                {t('about.expertise.description1')}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-light">
                {t('about.expertise.description2')}
              </p>
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-3 text-lg sm:text-xl">✓</span>
                  <span className="font-light">{t('about.expertise.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 text-lg sm:text-xl">✓</span>
                  <span className="font-light">{t('about.expertise.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 text-lg sm:text-xl">✓</span>
                  <span className="font-light">{t('about.expertise.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 text-lg sm:text-xl">✓</span>
                  <span className="font-light">{t('about.expertise.feature4')}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/20">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                {t('about.mission.title')}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {t('about.mission.description')}
              </p>
            </div>
          </div>

          {/* Section Confiance, Prix, Réactivité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/20 text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.trust.title')}
              </h4>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.trust.description')}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/20 text-center">
              <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.pricing.title')}
              </h4>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.pricing.description')}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/20 text-center sm:col-span-2 lg:col-span-1">
              <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.reactivity.title')}
              </h4>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.reactivity.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

