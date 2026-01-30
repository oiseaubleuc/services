import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import AnimatedBackground from '@/components/AnimatedBackground'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import PWARegister from '@/components/PWARegister'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'HohoSolutions – Uw vertrouwde partner',
  description: 'Bouw uw digitale toekomst. We creëren krachtige, schaalbare weboplossingen die uw bedrijf vooruit helpen.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  manifest: '/manifest.json',
  themeColor: '#0a0a0f',
  openGraph: {
    title: 'HohoSolutions – Uw vertrouwde partner',
    description: 'Bouw uw digitale toekomst. We creëren krachtige, schaalbare weboplossingen die uw bedrijf vooruit helpen.',
    url: 'https://hohosolutions.com',
    siteName: 'HohoSolutions',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HohoSolutions',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HohoSolutions" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <PWARegister />
        <LanguageProvider>
          <Analytics />
          <AnimatedBackground />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <PWAInstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  )
}

