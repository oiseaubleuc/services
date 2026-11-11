'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { localizedPath } from '@/lib/paths'
import { getLocalPageBySlug, getServiceBySlug, localPages } from '@/content/services'
import { getPostBySlug } from '@/content/blog'
import type { Locale } from '@/i18n'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' },
  ]
  const currentLang = languages.find((lang) => lang.code === locale) || languages[0]

  const getPathnameWithoutLocale = () => pathname.replace(`/${locale}`, '') || '/'

  const hrefForLocale = (next: Locale) => {
    const rest = getPathnameWithoutLocale()
    if (rest === '/blog' || rest.startsWith('/blog/')) {
      const blogSlug = rest.replace(/^\/blog\/?/, '')
      if (!blogSlug) return `/${next}/blog`
      const post = getPostBySlug(locale as Locale, blogSlug)
      if (post) return `/${next}/blog/${post.slug[next]}`
      return `/${next}/blog`
    }
    const slug = rest.replace(/^\//, '')
    const service = getServiceBySlug(locale as Locale, slug)
    if (service) return `/${next}/${service.slugs[next]}`
    const local = localPages.find((page) => page.slug[locale as Locale] === slug)
    if (local?.slug[next]) return `/${next}/${local.slug[next]}`
    return `/${next}${rest === '/' ? '' : rest}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-2 min-w-0 text-white hover:opacity-80">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image src="/logos/logo_HS.png" alt="HohoSolutions" width={48} height={48} className="object-contain" priority />
            </div>
            <span className="text-sm sm:text-lg font-semibold truncate">HohoSolutions</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link href={localizedPath(locale, '/services')} className="text-sm text-gray-300 hover:text-white">
              {t('nav.services')}
            </Link>
            <Link href={localizedPath(locale, '/offres')} className="text-sm text-gray-300 hover:text-white">
              {t('nav.offer')}
            </Link>
            <Link href={localizedPath(locale, '/about')} className="text-sm text-gray-300 hover:text-white">
              {t('nav.about')}
            </Link>
            <Link href={localizedPath(locale, '/contact')} className="text-sm text-gray-300 hover:text-white">
              {t('nav.contact')}
            </Link>
            <Link
              href={localizedPath(locale, '/contact')}
              className="text-sm font-semibold bg-yellow-500 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-400"
            >
              {t('nav.quote')}
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
              >
                {currentLang.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-20">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={hrefForLocale(lang.code as Locale)}
                        onClick={() => setIsLangMenuOpen(false)}
                        className={`block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 ${locale === lang.code ? 'font-semibold' : ''}`}
                      >
                        {lang.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={localizedPath(locale, '/contact')}
              className="text-xs font-semibold bg-yellow-500 text-gray-900 px-3 py-1.5 rounded-full"
            >
              {t('nav.quote')}
            </Link>
            <button type="button" className="p-1 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 border-t border-white/10 pt-4 pb-4">
            {[
              ['/services', 'nav.services'],
              ['/offres', 'nav.offer'],
              ['/about', 'nav.about'],
              ['/contact', 'nav.contact'],
            ].map(([path, key]) => (
              <Link
                key={path}
                href={localizedPath(locale, path)}
                className="block text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={hrefForLocale(lang.code as Locale)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${locale === lang.code ? 'bg-white text-gray-900' : 'bg-white/20 text-white'}`}
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
