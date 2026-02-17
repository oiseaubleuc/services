'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import FramerButton from './FramerButton'

export default function Hero() {
  const { t } = useLanguage()
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onError = () => setVideoError(true)
    const onLoadedData = () => {
      setVideoError(false)
      setVideoReady(true)
    }
    const onCanPlay = () => setVideoReady(true)
    v.addEventListener('error', onError)
    v.addEventListener('loadeddata', onLoadedData)
    v.addEventListener('canplay', onCanPlay)
    return () => {
      v.removeEventListener('error', onError)
      v.removeEventListener('loadeddata', onLoadedData)
      v.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 min-h-screen overflow-hidden">
      {/* Vidéo en arrière-plan — remplit tout l'espace (là où était le vide) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        aria-hidden
        disablePictureInPicture
        disableRemotePlayback
        style={{ touchAction: 'none' }}
        src="/api/video"
      >
        <source src="/api/video" type="video/mp4" />
        <source src="/space.mp4" type="video/mp4" />
        <source src="/video/space.mp4" type="video/mp4" />
      </video>
      {/* Overlay sombre pour garder le texte lisible */}
      <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden />
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center z-[2] bg-black/80">
          <a href="/api/video" target="_blank" rel="noopener noreferrer" className="text-white underline">
            Ouvrir la vidéo
          </a>
        </div>
      )}
      {/* Contenu par-dessus la vidéo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 w-full flex flex-col items-center">
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

