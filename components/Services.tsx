'use client'

import { useState } from 'react'
import ServiceCard from './ServiceCard'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual')

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
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight px-4">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-light mb-8 sm:mb-12 px-4">
            {t('services.subtitle')}
          </p>
          
          {/* Tabs de filtrage style Apple */}
          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 sm:p-1.5 border border-white/10">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === 'individual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('services.tabs.individual')}
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
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
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 sm:mb-4 tracking-tight px-4">
                {t('services.individual.title')}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-4">
                {t('services.individual.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
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
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 sm:mb-4 tracking-tight px-4">
                {t('services.business.title')}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-4">
                {t('services.business.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
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
      </div>
    </section>
  )
}

