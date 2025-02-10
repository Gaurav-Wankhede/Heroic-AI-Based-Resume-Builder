'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Resume } from '@/types/resume'
import { SectionHeader } from './section-header'
import { ContactSection } from './contact-section'
import { SummarySection } from './summary-section'
import { EducationSection } from './education-section'
import { ExperienceSection } from './experience-section'
import { ProjectsSection } from './projects-section'
import { SkillsSection } from './skills-section'
import { CertificationsSection } from './certifications-section'
import { ResumeTypeSection } from './resume-type-section'
import { TemplateSection } from './template-section'
import { JobDescriptionSection } from './job-description-section'

const tabs = [
  {
    value: 'job-description',
    label: 'Job Description',
    description: 'Add the job description to tailor your resume',
    content: <JobDescriptionSection />,
    hasAI: true
  },
  {
    value: 'resume-type',
    label: 'Resume Type',
    description: 'Choose your resume type',
    content: <ResumeTypeSection />,
    hasAI: false
  },
  {
    value: 'template',
    label: 'Template',
    description: 'Choose your resume template',
    content: <TemplateSection />,
    hasAI: false
  },
  {
    value: 'contact',
    label: 'Contact',
    description: 'Add your contact information',
    content: <ContactSection />,
    hasAI: true
  },
  {
    value: 'summary',
    label: 'Summary',
    description: 'Write a professional summary',
    content: <SummarySection />,
    hasAI: true
  },
  {
    value: 'education',
    label: 'Education',
    description: 'Add your educational background',
    content: <EducationSection />,
    hasAI: true
  },
  {
    value: 'experience',
    label: 'Experience',
    description: 'Add your work experience',
    content: <ExperienceSection />,
    hasAI: true
  },
  {
    value: 'projects',
    label: 'Projects',
    description: 'Add your projects',
    content: <ProjectsSection />,
    hasAI: true
  },
  {
    value: 'skills',
    label: 'Skills',
    description: 'Add your technical skills',
    content: <SkillsSection />,
    hasAI: true
  },
  {
    value: 'certifications',
    label: 'Certifications',
    description: 'Add your certifications',
    content: <CertificationsSection />,
    hasAI: true
  }
] as const

type TabValue = typeof tabs[number]['value']

export function ResumeForm() {
  return (
    <Tabs defaultValue="job-description" className="w-full">
      <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur">
        <TabsList className="flex flex-nowrap justify-start p-1 bg-transparent overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
                "hover:bg-white/80"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Card>

      <Card className="p-6 shadow-sm bg-white border-none">
        {tabs.map(tab => (
          <TabsContent 
            key={tab.value} 
            value={tab.value} 
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="space-y-6">
              {tab.description && (
                <SectionHeader
                  title={tab.label}
                  description={tab.description}
                  hasAI={tab.hasAI}
                  section={tab.value}
                />
              )}
              {tab.content}
            </div>
          </TabsContent>
        ))}
      </Card>
    </Tabs>
  )
} 