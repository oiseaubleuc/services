'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-sm' : 'bg-transparent'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-lg sm:text-xl font-semibold text-white tracking-tight hover:opacity-80 transition-opacity"
                    >
                        HohoServices
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link
                            href="/services"
                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {t('nav.services')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {t('nav.about')}
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {t('nav.contact')}
                        </Link>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                <span>{currentLang.name}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isLangMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsLangMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code)
                                                    setIsLangMenuOpen(false)
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-gray-50 font-medium' : ''
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
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

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-6 space-y-6 pb-6 animate-fade-in-up">
                        <Link
                            href="/services"
                            className="block text-base text-white hover:text-gray-300 transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.services')}
                        </Link>
                        <Link
                            href="/about"
                            className="block text-base text-white hover:text-gray-300 transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.about')}
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-base text-white hover:text-gray-300 transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </Link>

                        {/* Mobile Language Selector */}
                        <div className="pt-4 border-t border-white/20">
                            <div className="flex items-center space-x-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code)
                                            setIsMenuOpen(false)
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${language === lang.code
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

