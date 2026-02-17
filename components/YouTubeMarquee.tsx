'use client'

const YOUTUBE_ID = 'EgsgZi07KwE'
const EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&mute=0&loop=0`

function VideoBlock() {
  return (
    <div className="flex-shrink-0 w-[min(85vw,380px)] sm:w-[340px] md:w-[400px] rounded-xl overflow-hidden shadow-xl border-2 border-white/20 bg-black">
      <iframe
        src={EMBED_URL}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video block"
      />
    </div>
  )
}

export default function YouTubeMarquee() {
  return (
    <section className="relative z-10 py-10 sm:py-12 overflow-hidden min-h-[280px]">
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-wider">
          Video
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-6 sm:gap-8 w-max">
          <VideoBlock />
          <VideoBlock />
          <VideoBlock />
        </div>
      </div>
    </section>
  )
}
