'use client'

import { useState } from 'react'
import Image from 'next/image'
import ServiceCard from './ServiceCard'
import { useLanguage } from '@/contexts/LanguageContext'

// Langages, frameworks & outils fullstack — icônes Simple Icons (affichage noir et blanc)
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
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
  { name: 'GitLab', icon: 'https://cdn.simpleicons.org/gitlab/FC6D26' },
  { name: 'Bitbucket', icon: 'https://cdn.simpleicons.org/bitbucket/0052CC' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'Swagger', icon: 'https://cdn.simpleicons.org/swagger/000000' },
  { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/2D3748' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'Netlify', icon: 'https://cdn.simpleicons.org/netlify/00C7B7' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
  { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
  { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: 'Ubuntu', icon: 'https://cdn.simpleicons.org/ubuntu/E95420' },
  { name: 'npm', icon: 'https://cdn.simpleicons.org/npm/CB3837' },
  { name: 'Yarn', icon: 'https://cdn.simpleicons.org/yarn/2C8EBB' },
  { name: 'pnpm', icon: 'https://cdn.simpleicons.org/pnpm/F69220' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'Webpack', icon: 'https://cdn.simpleicons.org/webpack/8DD6F9' },
  { name: 'Jest', icon: 'https://cdn.simpleicons.org/jest/C21325' },
  { name: 'Vitest', icon: 'https://cdn.simpleicons.org/vitest/6E9F18' },
  { name: 'ESLint', icon: 'https://cdn.simpleicons.org/eslint/4B32C3' },
  { name: 'Prettier', icon: 'https://cdn.simpleicons.org/prettier/F7B93E' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'Slack', icon: 'https://cdn.simpleicons.org/slack/4A154B' },
  { name: 'VS Code', icon: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
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
      </div>

      {/* Carrousel tech stack — pleine largeur de la page, logos blancs sur fond noir, défilement continu */}
      <div className="w-full mt-16 sm:mt-20 md:mt-24 lg:mt-32 bg-black border-y border-white/20 overflow-hidden">
        <p className="text-center text-white text-sm sm:text-base font-medium py-4 sm:py-5 border-b border-white/20">
          {t('services.techStack')}
        </p>
        <div className="overflow-hidden py-6 sm:py-8">
          <div className="flex animate-marquee-tech gap-8 sm:gap-10 md:gap-12 w-max">
            {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 sm:w-24"
                title={tech.name}
              >
                {iconErrors.has(index % TECH_STACK.length) ? (
                  <span className="text-white/80 text-xs font-medium text-center">{tech.name}</span>
                ) : (
                  <>
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 grayscale brightness-0 invert">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                        onError={() => setIconErrors((prev) => new Set(prev).add(index % TECH_STACK.length))}
                      />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-medium text-center truncate w-full">
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

