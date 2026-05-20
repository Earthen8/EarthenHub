import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillList } from '@/components/skill-list'
import { TimelineSection } from '@/components/timeline-section'
import { CertificationsSection } from '@/components/certifications-section'
import { ToolsSection } from '@/components/tools-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

import {
  getDisciplines,
  getFeaturedProjects,
  getExperiences,
  getTools,
  getPhilosophy,
  getCertifications
} from '@/lib/api'

// Add Incremental Static Regeneration (revalidates cache every hour)
export const revalidate = 3600;

export default async function Home() {
  // Fetch all data in parallel for optimal initial load speed
  const [
    disciplines,
    projects,
    experiences,
    tools,
    philosophy,
    certifications
  ] = await Promise.all([
    getDisciplines(),
    getFeaturedProjects(),
    getExperiences(),
    getTools(),
    getPhilosophy(),
    getCertifications()
  ]);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      <HeroSection />
      {/* 
        Pass fetched data as props to the client components.
        This ensures SEO and fast initial rendering while keeping 
        interactivity intact.
      */}
      <AboutSection philosophy={philosophy} />
      <SkillList disciplines={disciplines} projects={projects} />
      <TimelineSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <ToolsSection tools={tools} />
      <ContactSection />
      <Footer />
    </main>
  )
}
