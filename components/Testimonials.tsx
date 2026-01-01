'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

export default function Testimonials() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      company: t('testimonials.testimonial1.company'),
      text: t('testimonials.testimonial1.text'),
      rating: 5
    },
    {
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      company: t('testimonials.testimonial2.company'),
      text: t('testimonials.testimonial2.text'),
      rating: 5
    },
    {
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
      company: t('testimonials.testimonial3.company'),
      text: t('testimonials.testimonial3.text'),
      rating: 5
    }
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 sm:mb-6 tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              {/* Rating stars */}
              <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 text-center font-light leading-relaxed italic">
                "{testimonials[activeIndex].text}"
              </blockquote>

              <div className="text-center">
                <div className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                  {testimonials[activeIndex].name}
                </div>
                <div className="text-sm sm:text-base text-gray-400">
                  {testimonials[activeIndex].role} {testimonials[activeIndex].company && `@ ${testimonials[activeIndex].company}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-8 sm:w-12 bg-white'
                  : 'w-2 sm:w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 cursor-pointer hover:scale-105 ${
                activeIndex === index
                  ? 'border-white/40 bg-white/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs xs:text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4 italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="text-sm sm:text-base font-semibold text-white mb-1">
                  {testimonial.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {testimonial.role} {testimonial.company && `@ ${testimonial.company}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


