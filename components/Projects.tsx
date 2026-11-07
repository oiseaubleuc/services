'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { publishedProjects } from '@/content/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const items = publishedProjects()
  if (items.length === 0) return null

  return (
    <section className="py-16 sm:py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project) => (
            <article key={project.id} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="relative aspect-[16/10] bg-black/40">
                <Image src={project.image} alt={project.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  {project.demo && (
                    <span className="text-[10px] uppercase tracking-wide bg-white/15 text-gray-200 px-2 py-0.5 rounded-full">
                      {t('demo')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{project.sector}</p>
                <p className="text-sm text-gray-200">{project.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
