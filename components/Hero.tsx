'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import FramerButton from './FramerButton'

export default function Hero() {
  const { t } = useLanguage()
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onError = () => setVideoError(true)
    const onLoadedData = () => setVideoError(false)
    v.addEventListener('error', onError)
    v.addEventListener('loadeddata', onLoadedData)
    return () => {
      v.removeEventListener('error', onError)
      v.removeEventListener('loadeddata', onLoadedData)
    }
  }, [])

  return (
    <section className="relative flex flex-col items-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 w-full flex flex-col items-center">
        {/* Video first — visible as soon as you land */}
        <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 flex-shrink-0">
          <div className="relative w-full aspect-video max-h-[50vh] min-h-[200px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border-2 border-white/20">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              aria-label="HohoSolutions"
            >
              <source src="/space.mp4" type="video/mp4" />
              <source src="/video/space.mp4" type="video/mp4" />
              Video not available.
            </video>
            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900/95 text-white p-4 text-center">
                <p className="text-sm sm:text-base font-medium">Video could not load.</p>
                <a
                  href="/space.mp4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:text-primary-300 underline"
                >
                  Open video in new tab →
                </a>
                <p className="text-xs text-gray-400">If that works, the file is fine and the embed may be blocked (e.g. by browser or deployment).</p>
              </div>
            )}
          </div>
        </div>
        <div className="animate-fade-in-up">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight px-2">
            {t('hero.title')}
            <br />
            <span className="text-gray-300">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-white mb-2 sm:mb-3 md:mb-4 max-w-3xl mx-auto font-medium leading-tight px-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-xs xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
            {t('hero.tagline')}
          </p>
          <div className="flex flex-col xs:flex-row gap-2.5 xs:gap-3 sm:gap-4 justify-center items-center px-4">
            <FramerButton
              href="/contact"
              variant="primary"
              className="w-full xs:w-auto"
            >
              {t('hero.ctaPrimary')}
            </FramerButton>
            <FramerButton
              href="/services"
              variant="secondary"
              className="w-full xs:w-auto"
            >
              {t('hero.ctaSecondary')}
            </FramerButton>
            <FramerButton
              href="/offer"
              variant="yellow"
              className="w-full xs:w-auto"
            >
              {t('hero.ctaOffers')}
            </FramerButton>
          </div>
        </div>
      </div>
    </section>
  )
}

