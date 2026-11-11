'use client'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      >
        <source src="/space.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0a0a0f]/40" />
    </div>
  )
}
