'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
    const { language, setLanguage, t } = useLanguage()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const languages = [
        { code: 'fr' as const, name: 'Français' },
        { code: 'en' as const, name: 'English' },
        { code: 'nl' as const, name: 'Nederlands' },
    ]

    const currentLang = languages.find(lang => lang.code === language) || languages[0]

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'glass-effect shadow-sm' 
                : 'bg-black/20 backdrop-blur-sm'
        }`}>
            <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-2.5 sm:py-3 md:py-4">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity min-w-0"
                    >
                        <div className="relative w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                            <Image
                                src="/logoo.png"
                                alt="HohoSolutions Logo"
                                width={96}
                                height={96}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                        <span className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight truncate">
                            HohoSolutions
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        <Link
                            href="/services"
                            className="text-xs xl:text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                            {t('nav.services')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-xs xl:text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                            {t('nav.about')}
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xs xl:text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                            {t('nav.contact')}
                        </Link>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center space-x-1.5 text-xs xl:text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                <span className="whitespace-nowrap">{currentLang.name}</span>
                                <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isLangMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsLangMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-36 xl:w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code)
                                                    setIsLangMenuOpen(false)
                                                }}
                                                className={`w-full text-left px-4 py-2 text-xs xl:text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-gray-50 font-medium' : ''
                                                    }`}
                                            >
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Tablet/Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white p-1 hover:opacity-80 transition-opacity"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile/Tablet Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 sm:mt-6 space-y-4 sm:space-y-6 pb-4 sm:pb-6 animate-fade-in-up border-t border-white/10 pt-4 sm:pt-6">
                        <Link
                            href="/services"
                            className="block text-sm sm:text-base text-white hover:text-gray-300 transition-colors font-medium py-1"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.services')}
                        </Link>
                        <Link
                            href="/about"
                            className="block text-sm sm:text-base text-white hover:text-gray-300 transition-colors font-medium py-1"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.about')}
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-sm sm:text-base text-white hover:text-gray-300 transition-colors font-medium py-1"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </Link>

                        {/* Mobile Language Selector */}
                        <div className="pt-3 sm:pt-4 border-t border-white/20">
                            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code)
                                            setIsMenuOpen(false)
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${language === lang.code
                                            ? 'bg-white text-gray-900 font-medium'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                            }`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

