'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface Service {
  id: string
  titleKey: string
  detailsKey: string
}

interface ServiceDetailsProps {
  services: Service[]
}

export default function ServiceDetails({ services }: ServiceDetailsProps) {
  const { t } = useLanguage()

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            {t('services.detailsTitle')}
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            {t('services.detailsSubtitle')}
          </p>
        </div>
        
        <div className="space-y-16">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
            >
              <h3 className="text-3xl font-semibold text-white mb-6 tracking-tight">
                {t(service.titleKey)}
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                {t(service.detailsKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

