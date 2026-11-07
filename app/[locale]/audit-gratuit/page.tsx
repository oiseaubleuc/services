import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import LeadForm from '@/components/LeadForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'audit' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/audit-gratuit` },
  }
}

export default async function AuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'audit' })
  return (
    <section className="pt-24 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">{t('title')}</h1>
      <p className="text-gray-300 mb-8 leading-relaxed">{t('subtitle')}</p>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <LeadForm source="audit" showSiteUrl compact />
      </div>
    </section>
  )
}
