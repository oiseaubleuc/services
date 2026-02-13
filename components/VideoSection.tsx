'use client'

import { useState, useRef, useEffect } from 'react'

export default function VideoSection() {
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setError(false)
    const onError = () => setError(true)
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('error', onError)
    return () => {
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('error', onError)
    }
  }, [])

  return (
    <section
      id="video"
      className="relative z-10 py-12 sm:py-16 md:py-20 bg-black/40 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center mb-6 sm:mb-8">
          Vidéo
        </h2>
        <div className="relative w-full aspect-video min-h-[220px] sm:min-h-[280px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border-2 border-white/20">
          <video
            ref={videoRef}
            src="/video/space.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
            aria-label="HohoSolutions - Présentation"
          >
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400 text-center px-4">
              <p>Vidéo non chargée. Vérifiez que le fichier existe (public/video/space.mp4) et que le site est bien déployé.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
