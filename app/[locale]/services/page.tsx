import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Services from '@/components/Services'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/services` },
  }
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Services />
    </div>
  )
}
