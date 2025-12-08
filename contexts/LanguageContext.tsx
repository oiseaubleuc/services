'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import frTranslations from '../locales/fr'
import enTranslations from '../locales/en'
import nlTranslations from '../locales/nl'

type Language = 'fr' | 'en' | 'nl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translationsMap: Record<Language, typeof frTranslations> = {
  fr: frTranslations,
  en: enTranslations,
  nl: nlTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [translations, setTranslations] = useState<typeof frTranslations>(frTranslations)

  useEffect(() => {
    // Charger les traductions selon la langue
    setTranslations(translationsMap[language])
  }, [language])

  useEffect(() => {
    // Récupérer la langue depuis localStorage au chargement
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && ['fr', 'en', 'nl'].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Retourner la clé si la traduction n'est pas trouvée
      }
    }
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

