'use client'

import ServiceCard from './ServiceCard'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()

  const services = [
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
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service) => (
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
        </div>
      </div>
    </section>
  )
}

