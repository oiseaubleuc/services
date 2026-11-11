import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Offer from '@/components/Offer'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'offer' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/offres` },
  }
}

export default async function OffresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return (
    <div className="pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'HohoSolutions', url: `https://hohosolutions.com/${locale}` },
          { name: t('nav.offer'), url: `https://hohosolutions.com/${locale}/offres` },
        ]}
      />
      <Offer />
    </div>
  )
}
