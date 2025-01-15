'use client'

import { ResumeBuilder } from '@/components/resume-builder'
import { JobDescriptionOptimizer } from '@/components/job-description-optimizer'
import { JobDescriptionProvider } from '@/contexts/job-description-context'
import { ResumeProvider } from '@/contexts/resume-context'
import { Navbar } from '@/components/navbar'
import { ContactSection } from '@/components/contact-section'
import { EducationSection } from '@/components/education-section'
import { ExperienceSection } from '@/components/experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsSection } from '@/components/skills-section'
import { ResumePreview } from '@/components/resume-preview'
import { SectionHeader } from '@/components/section-header'
import { SummarySection } from '@/components/summary-section'
import { Card } from '@/components/ui/card'
import { useResumeContext } from '@/contexts/resume-context'
import { Resume } from '@/types/resume'

function PageContent() {
  const { resume, updateResume } = useResumeContext()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <main className="flex-1">
        <div className="container max-w-[1800px] grid lg:grid-cols-[1fr,minmax(0,800px)] gap-6 px-4 py-6">
          {/* Left Column - Job Description and Resume Builder */}
          <div className="h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:block flex flex-col space-y-6">
            {/* Job Description Card */}
            <Card className="p-4 md:p-6">
              <JobDescriptionOptimizer resume={resume} updateResume={updateResume} />
            </Card>

            {/* Contact Information Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Contact Information"
                className="mt-0"
              />
              <ContactSection resume={resume} updateResume={updateResume} />
            </Card>

            {/* Professional Summary Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Professional Summary"
                hasAI
                section="summary"
                resume={resume}
              />
              <SummarySection resume={resume} updateResume={updateResume} />
            </Card>

            {/* Experience Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Experience"
                hasAI
                section="experience"
                resume={resume}
              />
              <ExperienceSection resume={resume} updateResume={updateResume} />
            </Card>

            {/* Education Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Education"
                className="mt-0"
              />
              <EducationSection resume={resume} updateResume={updateResume} />
            </Card>

            {/* Projects Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Projects"
                hasAI
                section="projects"
                resume={resume}
              />
              <ProjectsSection resume={resume} updateResume={updateResume} />
            </Card>

            {/* Skills Card */}
            <Card className="p-4 md:p-6">
              <SectionHeader
                title="Skills"
                hasAI
                section="skills"
                resume={resume}
              />
              <SkillsSection resume={resume} updateResume={updateResume} />
            </Card>
          </div>

          {/* Right Column - Resume Preview */}
          <div className="lg:sticky lg:top-[80px] h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:block flex flex-col">
            <Card className="p-4 md:p-6">
              <ResumePreview resume={resume} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <ResumeProvider>
      <JobDescriptionProvider>
        <PageContent />
      </JobDescriptionProvider>
    </ResumeProvider>
  )
}
