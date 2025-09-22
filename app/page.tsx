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
    <ErrorBoundary>
      <PageTransition>
        <main className="relative">
          <div id="hero">
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <AboutSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <EducationSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ExperienceSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ProjectsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <SkillsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <ContactSection />
          </ErrorBoundary>
        </main>
      </PageTransition>
    </ErrorBoundary>
  )
}

