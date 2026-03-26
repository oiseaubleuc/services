import Hero from '@/components/Hero'
import Statistics from '@/components/Statistics'
import Expectations from '@/components/Expectations'
import ValueProposition from '@/components/ValueProposition'
import Process from '@/components/Process'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export default function Home() {
  return (
    <>
      <Hero />
      <AnimateOnScroll variant="fadeUp" rootMargin="0px 0px -60px 0px">
        <Statistics />
      </AnimateOnScroll>
      <AnimateOnScroll variant="fadeUp" rootMargin="0px 0px -60px 0px">
        <Expectations />
      </AnimateOnScroll>
      <AnimateOnScroll variant="fadeUp" rootMargin="0px 0px -60px 0px">
        <ValueProposition />
      </AnimateOnScroll>
      <AnimateOnScroll variant="fadeUp" rootMargin="0px 0px -60px 0px">
        <Process />
      </AnimateOnScroll>
    </>
  )
}

