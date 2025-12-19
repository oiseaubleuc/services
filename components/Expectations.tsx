'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

export default function Expectations() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const expectations = [
    {
      title: t('expectations.performance.title'),
      description: t('expectations.performance.description'),
      highlight: t('expectations.performance.highlight')
    },
    {
      title: t('expectations.design.title'),
      description: t('expectations.design.description'),
      highlight: t('expectations.design.highlight')
    },
    {
      title: t('expectations.security.title'),
      description: t('expectations.security.description'),
      highlight: t('expectations.security.highlight')
    },
    {
      title: t('expectations.responsive.title'),
      description: t('expectations.responsive.description'),
      highlight: t('expectations.responsive.highlight')
    },
    {
      title: t('expectations.support.title'),
      description: t('expectations.support.description'),
      highlight: t('expectations.support.highlight')
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % expectations.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [expectations.length])

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
            {t('expectations.title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t('expectations.subtitle')}
          </p>
        </div>

        {/* Main expectation card */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 text-center">
                {expectations[activeIndex].title}
              </h3>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 text-center mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                {expectations[activeIndex].description}
              </p>
              <div className="bg-white/10 rounded-xl p-4 sm:p-6 border border-white/20 text-center">
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white font-medium">
                  {expectations[activeIndex].highlight}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {expectations.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-8 sm:w-12 bg-white'
                  : 'w-2 sm:w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to expectation ${index + 1}`}
            />
          ))}
        </div>

        {/* All expectations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {expectations.map((expectation, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 cursor-pointer hover:scale-105 ${
                activeIndex === index
                  ? 'border-white/40 bg-white/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3">
                {expectation.title}
              </h4>
              <p className="text-xs xs:text-sm sm:text-base text-gray-400 leading-relaxed">
                {expectation.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

