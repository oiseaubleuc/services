'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function ValueProposition() {
  const { t } = useLanguage()

  const values = [
    {
      number: '01',
      title: t('valueProposition.quality.title'),
      description: t('valueProposition.quality.description'),
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      number: '02',
      title: t('valueProposition.innovation.title'),
      description: t('valueProposition.innovation.description'),
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      number: '03',
      title: t('valueProposition.partnership.title'),
      description: t('valueProposition.partnership.description'),
      color: 'from-green-500/20 to-emerald-500/20'
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
            {t('valueProposition.title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t('valueProposition.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {values.map((value, index) => (
            <AnimateOnScroll key={index} variant="fadeUp" delay={index * 100} threshold={0.1}>
              <div
                className={`bg-gradient-to-br ${value.color} backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 relative overflow-hidden group hover:scale-105 transition-all duration-300`}
              >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/20 mb-4 sm:mb-6">
                  {value.number}
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-6">
                  {value.title}
                </h3>
                <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}








