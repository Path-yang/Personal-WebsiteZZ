import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageTransition } from '@/components/ui/PageTransition'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'
import { ClientOnly } from '@/components/providers/ClientOnly'

export default function Home() {
  return (
    <PageTransition>
      <main className="relative">
        <div id="hero">
          <HeroSection />
        </div>
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </PageTransition>
  )
}

