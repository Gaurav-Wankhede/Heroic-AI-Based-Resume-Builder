'use client'

import { useResumeContext } from '@/contexts/resume-context'
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

const skillCategories = [
  'languages',
  'frameworks',
  'developerTools',
  'libraries'
]

export function ResumeForm() {
  const { resume, updateResume } = useResumeContext()

  const sections = [
    {
      value: 'job-description',
      label: 'Job Description',
      description: 'Add the job description to optimize your resume',
      content: <JobDescriptionSection />,
      hasAI: true
    },
    {
      value: 'resume-type',
      label: 'Resume Type',
      description: 'Select your resume type',
      content: <ResumeTypeSection />,
    },
    {
      value: 'template',
      label: 'Template',
      description: 'Choose a template for your resume',
      content: <TemplateSection />,
    },
    {
      value: 'contact',
      label: 'Contact',
      description: 'Add your contact information',
      content: <ContactSection resume={resume} updateResume={updateResume} />,
      hasAI: true
    },
    {
      value: 'summary',
      label: 'Summary',
      description: 'Write a compelling professional summary',
      content: <SummarySection resume={resume} updateResume={updateResume} />,
      hasAI: true
    },
    {
      value: 'education',
      label: 'Education',
      description: 'Add your educational background',
      content: <EducationSection resume={resume} updateResume={updateResume} />,
    },
    {
      value: 'experience',
      label: 'Experience',
      description: 'Add your work experience',
      content: <ExperienceSection resume={resume} updateResume={updateResume} />,
      hasAI: true
    },
    {
      value: 'projects',
      label: 'Projects',
      description: 'Add your notable projects',
      content: <ProjectsSection resume={resume} updateResume={updateResume} />,
      hasAI: true
    },
    {
      value: 'skills',
      label: 'Skills',
      description: 'Add your technical skills',
      content: (
        <SkillsSection 
          resume={resume} 
          updateResume={updateResume}
          categories={skillCategories}
        />
      ),
      hasAI: true
    },
    {
      value: 'certifications',
      label: 'Certifications',
      description: 'Add your certifications',
      content: <CertificationsSection resume={resume} updateResume={updateResume} />,
    }
  ]

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.value} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{section.label}</h2>
              {section.description && (
                <p className="text-sm text-muted-foreground">{section.description}</p>
              )}
            </div>
            {section.hasAI && (
              <div className="flex items-center gap-2">
                {/* AI controls if needed */}
              </div>
            )}
          </div>
          {section.content}
        </section>
      ))}
    </div>
  )
} 