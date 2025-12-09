'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight text-white">HohoServices</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link 
              href="/services" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light"
            >
              {t('nav.services')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/about" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light"
            >
              {t('nav.about')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/contact" 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-light"
            >
              {t('nav.contact')}
            </Link>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-xs sm:text-sm font-light mb-1 break-all sm:break-normal">hohoservicess@gmail.com</p>
            <p className="text-gray-500 text-xs font-light">
              &copy; {new Date().getFullYear()} HohoServices
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

