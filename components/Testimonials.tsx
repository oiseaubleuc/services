'use client'

import { useTranslations } from 'next-intl'
import { publishedTestimonials } from '@/content/testimonials'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const items = publishedTestimonials()
  if (items.length === 0) return null

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <blockquote key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-200 leading-relaxed mb-4">“{item.text}”</p>
              <footer className="text-sm text-gray-400">
                <span className="text-white font-medium">{item.name}</span>
                {(item.role || item.company) && (
                  <>
                    {' — '}
                    {[item.role, item.company].filter(Boolean).join(', ')}
                  </>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
