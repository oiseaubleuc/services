import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export const config = {
  matcher: ['/', '/(fr|nl|en)/:path*', '/((?!api|_next|_vercel|dashboard|.*\\..*).*)'],
}
