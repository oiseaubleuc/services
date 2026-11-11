'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { hasFounder, hasLegalIdentity, site } from '@/content/site'
import { localizedPath, telLink } from '@/lib/paths'
import { track } from '@/lib/track'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="text-lg font-semibold text-white mb-2">HohoSolutions</p>
            <p className="text-gray-400 text-sm font-light max-w-sm">{t('footer.description')}</p>
            {hasFounder() && (
              <p className="text-gray-500 text-xs mt-3">{site.founder.fullName}</p>
            )}
            {hasLegalIdentity() && (
              <p className="text-gray-500 text-xs mt-2">
                {site.legal.legalName}
                <br />
                {site.legal.streetAddress}, {site.legal.postalCode} {site.legal.city}
                <br />
                BCE {site.legal.bce} · TVA {site.legal.vat}
              </p>
            )}
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm justify-center md:justify-start">
            <Link href={localizedPath(locale, '/services')} className="text-gray-400 hover:text-white">
              {t('nav.services')}
            </Link>
            <Link href={localizedPath(locale, '/offres')} className="text-gray-400 hover:text-white">
              {t('nav.offer')}
            </Link>
            <Link href={localizedPath(locale, '/about')} className="text-gray-400 hover:text-white">
              {t('nav.about')}
            </Link>
            <Link href={localizedPath(locale, '/blog')} className="text-gray-400 hover:text-white">
              {t('footer.blog')}
            </Link>
            <Link href={localizedPath(locale, '/contact')} className="text-gray-400 hover:text-white">
              {t('nav.contact')}
            </Link>
            <Link href={localizedPath(locale, '/mentions-legales')} className="text-gray-400 hover:text-white">
              {t('footer.legalNotice')}
            </Link>
            <Link href={localizedPath(locale, '/privacy')} className="text-gray-400 hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link href={localizedPath(locale, '/terms')} className="text-gray-400 hover:text-white">
              {t('footer.terms')}
            </Link>
          </nav>

          <div className="text-sm text-center md:text-right">
            <a href={`mailto:${site.email}`} className="block text-gray-400 hover:text-white mb-1">
              {site.email}
            </a>
            <a
              href={telLink(site.phone)}
              className="block text-gray-400 hover:text-white mb-1"
              onClick={() => track('phone_click')}
            >
              {site.phoneDisplay}
            </a>
            {hasFounder() && (
              <a
                href={site.founder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white mb-1"
              >
                {t('footer.github')}
              </a>
            )}
            <p className="text-gray-500 text-xs mt-2">
              © {new Date().getFullYear()} HohoSolutions · {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
