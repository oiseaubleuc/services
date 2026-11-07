import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import About from '@/components/About'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `https://hohosolutions.com/${locale}/about` },
  }
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
    </div>
  )
}
