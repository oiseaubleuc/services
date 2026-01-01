'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'

interface StatisticItemProps {
  value: string
  label: string
  suffix?: string
  isVisible: boolean
}

function StatisticItem({ value, label, suffix, isVisible }: StatisticItemProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, ''))

  useEffect(() => {
    if (isVisible) {
      let startTimestamp: number | null = null
      const duration = 2000
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        setDisplayValue(Math.floor(progress * numericValue))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [isVisible, numericValue])

  return (
    <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
      <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
        {isVisible ? displayValue : 0}{suffix}
      </div>
      <div className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 font-light">
        {label}
      </div>
    </div>
  )
}

export default function Statistics() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const statistics = [
    {
      value: t('statistics.projects.value'),
      label: t('statistics.projects.label'),
      suffix: '+'
    },
    {
      value: t('statistics.clients.value'),
      label: t('statistics.clients.label'),
      suffix: '+'
    },
    {
      value: t('statistics.satisfaction.value'),
      label: t('statistics.satisfaction.label'),
      suffix: '%'
    },
    {
      value: t('statistics.experience.value'),
      label: t('statistics.experience.label'),
      suffix: '+'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {statistics.map((stat, index) => (
            <StatisticItem
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

