import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { BentoGrid } from '@/components/bento-grid'
import { TimelineSection } from '@/components/timeline-section'
import { GearSection } from '@/components/gear-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <HeroSection />
      <BentoGrid />
      <TimelineSection />
      <GearSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
