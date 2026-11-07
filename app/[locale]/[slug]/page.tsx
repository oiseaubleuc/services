import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { locales, type Locale } from '@/i18n'
import {
  allContentSlugs,
  getLocalPageBySlug,
  getServiceBySlug,
} from '@/content/services'
import { formatPrice } from '@/content/packages'
import { localizedPath } from '@/lib/paths'
import { site } from '@/content/site'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import FramerButton from '@/components/FramerButton'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allContentSlugs(locale).map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const loc = locale as Locale
  const service = getServiceBySlug(loc, slug)
  const local = getLocalPageBySlug(loc, slug)
  const t = await getTranslations({ locale })

  if (service) {
    const title = t(`services.${service.id}.h1`)
    return {
      title,
      description: t(`services.${service.id}.problem`),
      alternates: { canonical: `https://hohosolutions.com/${locale}/${slug}` },
    }
  }
  if (local) {
    const title = t('local.h1', { city: local.city[loc] })
    return {
      title,
      description: t('local.subtitle', { city: local.city[loc] }),
      alternates: { canonical: `https://hohosolutions.com/${locale}/${slug}` },
    }
  }
  return {}
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const loc = locale as Locale
  const service = getServiceBySlug(loc, slug)
  const local = getLocalPageBySlug(loc, slug)
  const t = await getTranslations({ locale })

  if (service) {
    const price =
      service.fromPrice != null
        ? `${t('services.from')} ${formatPrice(service.fromPrice, loc)} HTVA`
        : t('services.quote')
    const faq = {
      question: t(`services.${service.id}.faqQ`),
      answer: t(`services.${service.id}.faqA`),
    }
    return (
      <article className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <BreadcrumbJsonLd
          items={[
            { name: 'HohoSolutions', url: `https://hohosolutions.com/${locale}` },
            { name: t('nav.services'), url: `https://hohosolutions.com/${locale}/services` },
            { name: t(`services.${service.id}.title`), url: `https://hohosolutions.com/${locale}/${slug}` },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: t(`services.${service.id}.h1`),
              provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
              areaServed: 'BE',
            }),
          }}
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
          {t(`services.${service.id}.h1`)}
        </h1>
        <p className="text-lg text-gray-300 mb-6">{t(`services.${service.id}.problem`)}</p>
        <p className="text-yellow-300 font-medium mb-8">{price}</p>
        <h2 className="text-2xl font-semibold text-white mb-3">{t(`services.${service.id}.title`)}</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">{t(`services.${service.id}.included`)}</p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
          <h2 className="text-xl font-semibold text-white mb-2">{faq.question}</h2>
          <p className="text-gray-300">{faq.answer}</p>
        </div>
        <FramerButton href={localizedPath(locale, '/contact')} variant="primary">
          {t('hero.ctaPrimary')}
        </FramerButton>
      </article>
    )
  }

  if (local) {
    const city = local.city[loc]
    return (
      <article className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
          {t('local.h1', { city })}
        </h1>
        <p className="text-lg text-gray-300 mb-6">{t('local.subtitle', { city })}</p>
        <h2 className="text-2xl font-semibold text-white mb-3">{t('local.why')}</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">{local.uniqueIntro[loc]}</p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
          <h2 className="text-xl font-semibold text-white mb-2">{t('local.faqQ', { city })}</h2>
          <p className="text-gray-300">{t('local.faqA', { city })}</p>
        </div>
        <FramerButton href={localizedPath(locale, '/contact')} variant="primary">
          {t('local.cta', { city })}
        </FramerButton>
      </article>
    )
  }

  notFound()
}
