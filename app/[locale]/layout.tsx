import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Space_Grotesk } from 'next/font/google'
import { locales, type Locale } from '@/i18n'
import AnimatedBackground from '@/components/AnimatedBackground'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import PWARegister from '@/components/PWARegister'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0f',
}

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: { index: true, follow: true },
    metadataBase: new URL('https://hohosolutions.com'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://hohosolutions.com/${locale}`,
      siteName: 'HohoSolutions',
      locale: locale === 'fr' ? 'fr_BE' : locale === 'nl' ? 'nl_BE' : 'en',
      type: 'website',
      images: [{ url: '/logos/logo_HS.png', alt: 'HohoSolutions' }],
    },
    alternates: {
      canonical: `https://hohosolutions.com/${locale}`,
      languages: {
        'fr-BE': 'https://hohosolutions.com/fr',
        'nl-BE': 'https://hohosolutions.com/nl',
        'en': 'https://hohosolutions.com/en',
        'x-default': 'https://hohosolutions.com/fr',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale === 'fr' ? 'fr-BE' : locale === 'nl' ? 'nl-BE' : 'en'} className="smooth-scroll">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <PWARegister />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Analytics />
          <AnimatedBackground />
          <Header />
          <main className="relative z-0 min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <PWAInstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
