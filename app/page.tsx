import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import Statistics from '@/components/Statistics'
import Expectations from '@/components/Expectations'
import ValueProposition from '@/components/ValueProposition'
import Process from '@/components/Process'

export default function Home() {
  return (
    <>
      <VideoSection />
      <Hero />
      <Statistics />
      <Expectations />
      <ValueProposition />
      <Process />
    </>
  )
}

