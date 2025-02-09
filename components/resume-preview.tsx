'use client'

import { useState, useEffect } from 'react'
import { Resume } from '@/types/resume'
import { TemplateSelector } from './template-selector'
import { TemplateType } from './templates'
import { ExecutiveTemplate } from './templates/ExecutiveTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { MinimalistTemplate } from './templates/MinimalistTemplate'
import { CreativeTemplate } from './templates/CreativeTemplate'
import { ProfessionalTemplate } from './templates/ProfessionalTemplate'
import { OxfordStandardTemplate } from './templates/OxfordStandardTemplate'
import { CantabrigianTemplate } from './templates/CantabrigianTemplate'
import { TechInnovatorTemplate } from './templates/TechInnovatorTemplate'
import { AcademicScholarTemplate } from './templates/AcademicScholarTemplate'
import { ProjectPortfolioTemplate } from './templates/ProjectPortfolioTemplate'
import { Button } from "./ui/button"
import { Download } from "lucide-react"
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

interface ResumePreviewProps {
  resume: Resume
  onDownload?: () => void
  isGeneratingPDF?: boolean
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 bg-red-50 text-red-900 rounded-lg">
      <h2 className="text-lg font-semibold">Something went wrong:</h2>
      <pre className="text-sm">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
      >
        Try again
      </button>
    </div>
  )
}

const TemplateComponents = {
  'executive': ExecutiveTemplate,
  'modern': ModernTemplate,
  'minimalist': MinimalistTemplate,
  'creative': CreativeTemplate,
  'professional': ProfessionalTemplate,
  'oxford-standard': OxfordStandardTemplate,
  'cantabrigian': CantabrigianTemplate,
  'tech-innovator': TechInnovatorTemplate,
  'academic-scholar': AcademicScholarTemplate,
  'project-portfolio': ProjectPortfolioTemplate,
} as const

export function ResumePreview({ 
  resume, 
  onDownload,
  isGeneratingPDF = false 
}: ResumePreviewProps) {
  const [templateType, setTemplateType] = useState<TemplateType>('professional')

  const handleTemplateChange = (newTemplate: TemplateType) => {
    setTemplateType(newTemplate)
  }

  const CurrentTemplate = TemplateComponents[templateType]

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setTemplateType('professional')
      }}
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
            {onDownload && (
              <Button
                onClick={onDownload}
                disabled={isGeneratingPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Select Template Style
            </label>
            <TemplateSelector
              onSelect={handleTemplateChange}
              defaultValue={templateType}
              className="w-full"
            />
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {resume && CurrentTemplate && (
            <div key={templateType} className="animate-fadeIn">
              <CurrentTemplate resume={resume} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
