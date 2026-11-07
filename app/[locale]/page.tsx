import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import ForWho from '@/components/ForWho'
import Projects from '@/components/Projects'
import OffersPreview from '@/components/OffersPreview'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Founder from '@/components/Founder'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import JsonLd from '@/components/JsonLd'

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const faqs = faqKeys.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }))

  return (
    <>
      <JsonLd locale={locale} faqs={faqs} />
      <Hero />
      <ForWho />
      <Projects />
      <OffersPreview />
      <Process />
      <Testimonials />
      <Founder />
      <FAQ />
      <FinalCTA />
    </>
  )
}
