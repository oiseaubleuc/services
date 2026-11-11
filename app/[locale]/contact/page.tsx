import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Contact from '@/components/Contact'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/contact` },
  }
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  )
}
