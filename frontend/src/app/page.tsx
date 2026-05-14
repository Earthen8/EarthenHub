import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillList } from '@/components/myworlds-section'
import { TimelineSection } from '@/components/timeline-section'
import { ToolsSection } from '@/components/tools-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillList />
      <TimelineSection />
      <ToolsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
