import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { hasLegalIdentity, site } from '@/content/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })
  return {
    title: t('title'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/mentions-legales` },
  }
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })
  const ok = hasLegalIdentity()

  return (
    <article className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-6">{t('title')}</h1>
      {!ok && <p className="mb-6">{t('missing')}</p>}
      <dl className="space-y-3">
        <div>
          <dt className="text-white font-medium">{t('company')}</dt>
          <dd>{ok ? site.legal.legalName : site.name}</dd>
        </div>
        {ok && (
          <>
            <div>
              <dt className="text-white font-medium">{t('address')}</dt>
              <dd>
                {site.legal.streetAddress}, {site.legal.postalCode} {site.legal.city}, {site.country}
              </dd>
            </div>
            <div>
              <dt className="text-white font-medium">{t('bce')}</dt>
              <dd>{site.legal.bce}</dd>
            </div>
            <div>
              <dt className="text-white font-medium">{t('vat')}</dt>
              <dd>{site.legal.vat}</dd>
            </div>
          </>
        )}
        <div>
          <dt className="text-white font-medium">{t('email')}</dt>
          <dd>
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-white font-medium">{t('phone')}</dt>
          <dd>
            <a className="underline" href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-white font-medium">{t('hosting')}</dt>
          <dd>{t('hostingValue')}</dd>
        </div>
      </dl>
    </article>
  )
}
