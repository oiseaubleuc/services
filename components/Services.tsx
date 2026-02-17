'use client'

import { useState } from 'react'
import Image from 'next/image'
import ServiceCard from './ServiceCard'
import { useLanguage } from '@/contexts/LanguageContext'

// Langages & technos fullstack — icônes via Simple Icons CDN
const TECH_STACK = [
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3/1572B6' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
]

export default function Services() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual')
  const [iconErrors, setIconErrors] = useState<Set<number>>(new Set())

  const individualServices = [
    {
      id: 'website',
      titleKey: 'services.individual.website.title',
      shortDescriptionKey: 'services.individual.website.shortDescription',
      detailsKey: 'services.individual.website.details',
    },
    {
      id: 'portfolio',
      titleKey: 'services.individual.portfolio.title',
      shortDescriptionKey: 'services.individual.portfolio.shortDescription',
      detailsKey: 'services.individual.portfolio.details',
    },
    {
      id: 'ecommerce',
      titleKey: 'services.individual.ecommerce.title',
      shortDescriptionKey: 'services.individual.ecommerce.shortDescription',
      detailsKey: 'services.individual.ecommerce.details',
    },
  ]

  const businessServices = [
    {
      id: 'frontend',
      titleKey: 'services.frontend.title',
      shortDescriptionKey: 'services.frontend.shortDescription',
      detailsKey: 'services.frontend.details',
    },
    {
      id: 'backend',
      titleKey: 'services.backend.title',
      shortDescriptionKey: 'services.backend.shortDescription',
      detailsKey: 'services.backend.details',
    },
    {
      id: 'database',
      titleKey: 'services.database.title',
      shortDescriptionKey: 'services.database.shortDescription',
      detailsKey: 'services.database.details',
    },
    {
      id: 'devops',
      titleKey: 'services.devops.title',
      shortDescriptionKey: 'services.devops.shortDescription',
      detailsKey: 'services.devops.details',
    },
    {
      id: 'architecture',
      titleKey: 'services.architecture.title',
      shortDescriptionKey: 'services.architecture.shortDescription',
      detailsKey: 'services.architecture.details',
    },
    {
      id: 'consulting',
      titleKey: 'services.consulting.title',
      shortDescriptionKey: 'services.consulting.shortDescription',
      detailsKey: 'services.consulting.details',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 sm:px-4">
            {t('services.title')}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-light mb-6 sm:mb-8 md:mb-12 px-4">
            {t('services.subtitle')}
          </p>
          
          {/* Tabs de filtrage style Apple */}
          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full p-0.5 sm:p-1 md:p-1.5 border border-white/10">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === 'individual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('services.tabs.individual')}
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('services.tabs.business')}
            </button>
          </div>
        </div>
        
        {/* Section Particuliers */}
        {activeTab === 'individual' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 sm:px-4">
                {t('services.individual.title')}
              </h3>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-4">
                {t('services.individual.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {individualServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={t(service.titleKey)}
                  shortDescription={t(service.shortDescriptionKey)}
                  details={t(service.detailsKey)}
                  serviceId={service.id}
                  learnMoreText={t('services.learnMore')}
                  showLessText={t('services.showLess')}
                />
              ))}
              {/* Carte "More" */}
              <ServiceCard
                title={t('services.individual.more.title')}
                shortDescription={t('services.individual.more.shortDescription')}
                details={t('services.individual.more.details')}
                serviceId="more-individual"
                learnMoreText={t('services.learnMore')}
                showLessText={t('services.showLess')}
              />
            </div>
          </div>
        )}

        {/* Section Sociétés */}
        {activeTab === 'business' && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 sm:px-4">
                {t('services.business.title')}
              </h3>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-4">
                {t('services.business.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {businessServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={t(service.titleKey)}
                  shortDescription={t(service.shortDescriptionKey)}
                  details={t(service.detailsKey)}
                  serviceId={service.id}
                  learnMoreText={t('services.learnMore')}
                  showLessText={t('services.showLess')}
                />
              ))}
              {/* Carte "More" */}
              <ServiceCard
                title={t('services.business.more.title')}
                shortDescription={t('services.business.more.shortDescription')}
                details={t('services.business.more.details')}
                serviceId="more-business"
                learnMoreText={t('services.learnMore')}
                showLessText={t('services.showLess')}
              />
            </div>
          </div>
        )}

        {/* Stack technique fullstack — langages & technos */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-gray-100">
          <p className="text-center text-gray-600 text-sm sm:text-base font-medium py-4 sm:py-5 border-b border-gray-100">
            {t('services.techStack')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-10">
            {TECH_STACK.map((tech, index) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center gap-1 min-h-[56px] opacity-90 hover:opacity-100 transition-all duration-200"
                title={tech.name}
              >
                {iconErrors.has(index) ? (
                  <span className="text-gray-500 text-xs font-medium">{tech.name}</span>
                ) : (
                  <>
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                        onError={() => setIconErrors((prev) => new Set(prev).add(index))}
                      />
                    </div>
                    <span className="text-gray-500 text-[10px] sm:text-xs font-medium text-center max-w-[4rem] sm:max-w-none truncate">
                      {tech.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

