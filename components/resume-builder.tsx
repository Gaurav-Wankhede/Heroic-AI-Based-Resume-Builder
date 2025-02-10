'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { generatePDF } from '@/utils/generate-pdf'
import { useToast } from '@/hooks/use-toast'
import { templates } from '@/lib/templates'
import { Card } from './ui/card'
import { useResumeContext } from '@/contexts/resume-context'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobDescriptionSection } from './job-description-section'
import { ContactSection } from './contact-section'
import { SummarySection } from './summary-section'
import { EducationSection } from './education-section'
import { ExperienceSection } from './experience-section'
import { ProjectsSection } from './projects-section'
import { SkillsSection } from './skills-section'
import { CertificationsSection } from './certifications-section'
import { SectionHeader } from './section-header'
import { TemplateSelector } from './template-selector'
import { Resume } from '@/types/resume';

interface ResumeBuilderProps {
  template?: keyof typeof templates
}

const skillCategories = [
  'languages',
  'frameworks',
  'developerTools',
  'libraries'
]

export const RESUME_TYPES = ['fresher', 'transition', 'experienced'] as const

const initialResume: Resume = {
  name: '',
  contact: {
    email: '',
    mobile: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }
}

export function ResumeBuilder({ template = 'professional' }: ResumeBuilderProps) {
  const { resume, selectedTemplate, setSelectedTemplate, updateResume } = useResumeContext()
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [activeTab, setActiveTab] = useState('job-description')

  // Initialize template from props
  useEffect(() => {
    setSelectedTemplate(template)
  }, [template, setSelectedTemplate])

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(resume, selectedTemplate)
      toast({
        title: 'Success',
        description: 'Resume PDF has been downloaded',
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const tabs = [
    {
      value: 'job-description',
      label: 'Job Description',
      content: <JobDescriptionSection />,
      description: "Add the job description to optimize your resume."
    },
    {
      value: 'resume-type',
      label: 'Resume Type',
      content: (
        <div className="space-y-4">
          {RESUME_TYPES.map((type) => (
            <Button
              key={type}
              variant={resume.resumeType === type ? 'default' : 'outline'}
              className="w-full capitalize"
              onClick={() => updateResume('resumeType', type)}
            >
              {type}
            </Button>
          ))}
          <p className="text-sm text-muted-foreground">
            {resume.resumeType === 'fresher' && 'For students or recent graduates with limited work experience.'}
            {resume.resumeType === 'transition' && 'For professionals changing careers or industries.'}
            {resume.resumeType === 'experienced' && 'For professionals with significant work experience.'}
          </p>
        </div>
      ),
      description: "Select your resume type to get tailored suggestions."
    },
    {
      value: 'template',
      label: 'Template',
      content: (
        <TemplateSelector
          onSelect={setSelectedTemplate}
          defaultValue={selectedTemplate}
          className="w-full"
          resume={resume}
        />
      ),
      description: "Choose a template that best fits your style."
    },
    {
      value: 'contact',
      label: 'Contact',
      content: <ContactSection resume={resume} updateResume={updateResume} />
    },
    {
      value: 'summary',
      label: 'Summary',
      content: <SummarySection resume={resume} updateResume={updateResume} />,
      hasAI: true,
      description: "Write a compelling professional summary."
    },
    {
      value: 'education',
      label: 'Education',
      content: <EducationSection resume={resume} updateResume={updateResume} />,
      description: "Add your educational background."
    },
    {
      value: 'experience',
      label: 'Experience',
      content: <ExperienceSection resume={resume} updateResume={updateResume} />,
      hasAI: true,
      description: "Add your work experience."
    },
    {
      value: 'projects',
      label: 'Projects',
      content: <ProjectsSection resume={resume} updateResume={updateResume} />,
      hasAI: true,
      description: "Add your notable projects and achievements."
    },
    {
      value: 'skills',
      label: 'Skills',
      content: <SkillsSection 
        resume={resume} 
        updateResume={updateResume}
        categories={skillCategories}
      />,
      hasAI: true,
      description: "Add your technical skills and competencies."
    },
    {
      value: 'certifications',
      label: 'Certifications',
      content: <CertificationsSection />,
      description: "Add your professional certifications and credentials."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <div className="container mx-auto max-w-[1400px] px-4 py-6">
        {/* Tabs Navigation and Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="shadow-sm bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-none">
            <TabsList className="flex flex-wrap justify-start gap-2 p-4 bg-transparent h-auto">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "text-gray-600 hover:text-gray-900",
                    "data-[state=active]:bg-white data-[state=active]:text-blue-600",
                    "data-[state=active]:shadow-sm data-[state=active]:shadow-black/5",
                    "data-[state=active]:after:content-[''] data-[state=active]:after:absolute",
                    "data-[state=active]:after:bottom-0 data-[state=active]:after:left-1/2",
                    "data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:translate-y-1/2",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Card>

          <div className="grid lg:grid-cols-[minmax(400px,_0.4fr)_minmax(600px,_0.6fr)] gap-8 items-start">
            {/* Form Section */}
            <div className="relative order-2 lg:order-1 w-full">
              <div className="sticky top-[5.5rem] max-h-[calc(100vh-7rem)] overflow-y-auto">
                <Card className="p-6 shadow-sm bg-white border-none rounded-xl">
                  {tabs.map(tab => (
                    <TabsContent 
                      key={tab.value} 
                      value={tab.value}
                      className={cn(
                        "mt-0 ring-0 outline-none",
                        "data-[state=active]:animate-in data-[state=active]:fade-in-0",
                        "data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0",
                        "transition-all duration-200 ease-in-out"
                      )}
                    >
                      <div className="space-y-6">
                        {tab.description && (
                          <SectionHeader
                            title={tab.label}
                            description={tab.description}
                            hasAI={tab.hasAI}
                            section={tab.value as any}
                            resume={resume}
                          />
                        )}
                        {tab.content}
                      </div>
                    </TabsContent>
                  ))}
                </Card>
              </div>
            </div>

            {/* Preview Section */}
            <div className="relative order-1 lg:order-2 w-full">
              <div className="sticky top-[5.5rem]">
                <Card className="bg-white shadow-lg border-none overflow-hidden rounded-xl">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50">
                    {resume && templates[selectedTemplate] && (
                      <div 
                        className="resume-preview-container"
                        style={{ 
                          width: '210mm',
                          minHeight: '297mm',
                          margin: '0 auto',
                          backgroundColor: 'white',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          borderRadius: '0.5rem',
                        }}
                      >
                        {React.createElement(templates[selectedTemplate], {
                          resume,
                          className: "template-preview w-full h-full"
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}