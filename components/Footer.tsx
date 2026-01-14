'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8">
          <div className="text-center md:text-left order-2 md:order-1">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 tracking-tight text-white">HohoSolutions</h3>
            <p className="text-gray-400 text-xs xs:text-sm font-light max-w-md">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs xs:text-sm order-1 md:order-2">
            <Link 
              href="/services" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light px-1"
            >
              {t('nav.services')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/about" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light px-1"
            >
              {t('nav.about')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/contact" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light px-1"
            >
              {t('nav.contact')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light px-1"
            >
              {t('footer.privacy')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light px-1"
            >
              {t('footer.terms')}
            </Link>
          </div>
          
          <div className="text-center md:text-right order-3">
            <p className="text-gray-400 text-xs xs:text-sm font-light mb-1 break-all sm:break-normal">info@hohosolutions.com</p>
            <p className="text-gray-500 text-[10px] xs:text-xs font-light">
              &copy; {new Date().getFullYear()} HohoSolutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

