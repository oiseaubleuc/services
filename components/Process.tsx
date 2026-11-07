'use client'

import { useTranslations } from 'next-intl'

const steps = ['step1', 'step2', 'step3', 'step4'] as const
const colors = [
  'from-blue-500/20 to-cyan-500/20',
  'from-purple-500/20 to-pink-500/20',
  'from-green-500/20 to-emerald-500/20',
  'from-orange-500/20 to-red-500/20',
]

export default function Process() {
  const t = useTranslations('process')

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light">{t('subtitle')}</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`bg-gradient-to-br ${colors[index]} backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20`}
            >
              <p className="text-4xl font-bold text-white/25 mb-3">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{t(`${step}.title`)}</h3>
              <p className="text-xs uppercase tracking-wide text-yellow-300 mb-3">{t(`${step}.duration`)}</p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{t(`${step}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
