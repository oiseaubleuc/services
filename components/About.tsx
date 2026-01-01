'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import FramerButton from './FramerButton'

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 xl:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
              {t('about.title')}
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-300 font-light mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
            <FramerButton href="/contact" variant="primary">
              {t('about.cta')}
            </FramerButton>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                {t('about.story.title')}
              </h2>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                {t('about.story.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Mission Grid */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Expertise */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20">
              <div className="mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                  {t('about.expertise.title')}
                </h3>
              </div>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed font-light">
                {t('about.expertise.description1')}
              </p>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-light">
                {t('about.expertise.description2')}
              </p>
              <ul className="space-y-3 sm:space-y-4 text-sm xs:text-base sm:text-lg text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-3 sm:mr-4 text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</span>
                  <span className="font-light">{t('about.expertise.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 sm:mr-4 text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</span>
                  <span className="font-light">{t('about.expertise.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 sm:mr-4 text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</span>
                  <span className="font-light">{t('about.expertise.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 sm:mr-4 text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</span>
                  <span className="font-light">{t('about.expertise.feature4')}</span>
                </li>
              </ul>
            </div>
            
            {/* Mission */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20">
              <div className="mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
                  {t('about.mission.title')}
                </h3>
              </div>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                {t('about.mission.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
              {t('about.values.title')}
            </h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Trust */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.trust.title')}
              </h4>
              <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.trust.description')}
              </p>
            </div>
            
            {/* Pricing */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.pricing.title')}
              </h4>
              <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.pricing.description')}
              </p>
            </div>
            
            {/* Reactivity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 text-center hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
                {t('about.reactivity.title')}
              </h4>
              <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed font-light">
                {t('about.reactivity.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 text-center">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
              {t('about.ctaSection.title')}
            </h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {t('about.ctaSection.description')}
            </p>
            <FramerButton href="/contact" variant="primary">
              {t('about.ctaSection.button')}
            </FramerButton>
          </div>
        </div>
      </section>
    </>
  )
}
