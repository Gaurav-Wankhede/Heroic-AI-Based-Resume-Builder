'use client'

import { useResumeContext } from '@/contexts/resume-context'
import { TemplateSelector } from './template-selector'

export function TemplateSection() {
  const { resume, selectedTemplate, setSelectedTemplate } = useResumeContext()

  return (
    <div className="space-y-4">
      <TemplateSelector
        resume={resume}
        onSelect={setSelectedTemplate}
        defaultValue={selectedTemplate}
        className="w-full"
      />
    </div>
  )
} 