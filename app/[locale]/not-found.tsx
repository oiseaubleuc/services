import { getLocale, getTranslations } from 'next-intl/server'
import { localizedPath } from '@/lib/paths'

export default async function NotFound() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'notFound' })
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-24">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">{t('title')}</h1>
      <p className="text-gray-300 mb-8 max-w-md">{t('text')}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href={localizedPath(locale)} className="px-6 py-3 rounded-full bg-white text-gray-900 font-medium">
          {t('home')}
        </a>
        <a href={localizedPath(locale, '/services')} className="px-6 py-3 rounded-full border border-white text-white">
          {t('services')}
        </a>
        <a href={localizedPath(locale, '/contact')} className="px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-semibold">
          {t('contact')}
        </a>
      </div>
    </section>
  )
}
