'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Process() {
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      number: '02',
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      number: '03',
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      number: '04',
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      color: 'from-orange-500/20 to-red-500/20'
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
            {t('process.title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/30 to-white/20 transform -translate-y-1/2" style={{ top: '50%' }}></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${step.color} backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 hover:scale-105 transition-all duration-300 group`}
            >
              {/* Connection dot for desktop */}
              <div className="hidden lg:block absolute top-1/2 -right-5 w-10 h-10 bg-white/20 rounded-full border-4 border-white/40 transform -translate-y-1/2 z-10 group-hover:bg-white/40 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/20 mb-4 sm:mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-6">
                  {step.title}
                </h3>
                <p className="text-sm xs:text-base sm:text-lg text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


