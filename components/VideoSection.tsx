'use client'

export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative z-10 pt-20 pb-6 xs:pt-24 xs:pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-12">
        <div className="relative w-full aspect-video min-h-[180px] xs:min-h-[200px] sm:min-h-[240px] md:min-h-[280px] rounded-xl xs:rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] lg:rounded-3xl overflow-hidden shadow-2xl bg-gray-900 border border-white/10">
          <video
            src="/video/space.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
            aria-label="HohoSolutions - Présentation"
          >
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
        </div>
      </div>
    </section>
  )
}
