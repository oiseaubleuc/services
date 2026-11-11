'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const

export default function FAQ() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<string | null>('q1')

  return (
    <section className="py-16 sm:py-20 md:py-24 relative" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light">{t('subtitle')}</p>
        </div>
        <div className="space-y-3">
          {keys.map((key) => {
            const isOpen = open === key
            return (
              <div key={key} className="border border-white/15 rounded-xl bg-white/5 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-white font-medium text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span>{t(`${key}.question`)}</span>
                  <span className="text-gray-400 text-xl leading-none" aria-hidden>
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                    {t(`${key}.answer`)}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function faqItems(t: (key: string) => string) {
  return keys.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }))
}
