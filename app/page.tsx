import Hero from '@/components/Hero'
import Statistics from '@/components/Statistics'
import Expectations from '@/components/Expectations'
import ValueProposition from '@/components/ValueProposition'
import Process from '@/components/Process'
import YouTubeMarquee from '@/components/YouTubeMarquee'

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <YouTubeMarquee />
      <Expectations />
      <ValueProposition />
      <Process />
    </>
  )
}

