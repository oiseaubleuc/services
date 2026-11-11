import type { Locale } from '@/i18n'

export function localizedPath(locale: string, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

export function whatsappLink(number: string, text?: string) {
  const url = `https://wa.me/${number}`
  if (!text) return url
  return `${url}?text=${encodeURIComponent(text)}`
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

export const hreflangMap: Record<Locale, string> = {
  fr: 'fr-BE',
  nl: 'nl-BE',
  en: 'en',
}
