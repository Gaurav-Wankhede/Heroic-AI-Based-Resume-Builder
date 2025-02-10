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
import { cn } from '@/lib/utils'
import { RESUME_TYPES } from './resume-builder'

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

// Update the type definition
type ResumeType = 'technical' | 'business' | 'creative' | 'academic'

const TEMPLATE_BY_RESUME_TYPE: Record<ResumeType, readonly string[]> = {
  technical: ['tech-innovator', 'professional', 'modern'],
  business: ['executive', 'professional', 'minimalist'],
  creative: ['creative', 'modern', 'project-portfolio'],
  academic: ['academic-scholar', 'oxford-standard', 'cantabrigian']
}

export function ResumePreview({ 
  resume, 
  onDownload,
  isGeneratingPDF = false 
}: ResumePreviewProps) {
  const [templateType, setTemplateType] = useState<TemplateType>('professional')
  const [scale, setScale] = useState(1)
  const [previewHeight, setPreviewHeight] = useState('auto')

  // Calculate the appropriate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      const container = document.querySelector('.resume-preview-container')
      if (container) {
        const containerWidth = container.clientWidth
        const A4Width = 210 * 3.78 // Convert mm to px (1mm ≈ 3.78px)
        const newScale = containerWidth / A4Width
        setScale(Math.min(newScale, 1)) // Don't scale up, only down
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Update preview height based on content
  useEffect(() => {
    const updateHeight = () => {
      const content = document.querySelector('.resume-content')
      if (content) {
        const contentHeight = content.scrollHeight
        setPreviewHeight(`${contentHeight * scale}px`)
      }
    }

    updateHeight()
  }, [resume, templateType, scale])

  // Update the template suggestion logic
  useEffect(() => {
    if (resume.resumeType) {
      const suggestedTemplates = TEMPLATE_BY_RESUME_TYPE[resume.resumeType as ResumeType]
      if (suggestedTemplates && !suggestedTemplates.includes(templateType)) {
        setTemplateType(suggestedTemplates[0] as TemplateType)
      }
    }
  }, [resume.resumeType, templateType])

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
            {resume.resumeType && (
              <div className="text-sm text-muted-foreground">
                Optimized for {RESUME_TYPES.find((t: typeof RESUME_TYPES[number]) => 
                  t.value === resume.resumeType
                )?.label} Roles
              </div>
            )}
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
              resume={resume}
              onSelect={handleTemplateChange}
              defaultValue={templateType}
              className="w-full"
              suggestedTemplates={
                resume.resumeType 
                  ? TEMPLATE_BY_RESUME_TYPE[resume.resumeType as ResumeType]
                  : undefined
              }
            />
          </div>
        </div>

        {/* Template Preview */}
        <div 
          className="resume-preview-container bg-white shadow-lg rounded-lg overflow-hidden"
          style={{ 
            height: previewHeight,
            maxWidth: '210mm',
            margin: '0 auto',
          }}
        >
          {resume && CurrentTemplate && (
            <div 
              className={cn(
                "resume-content origin-top transition-transform duration-200",
                "w-[210mm]"  // A4 width
              )}
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                minHeight: '297mm',  // A4 height
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CurrentTemplate resume={resume} className="w-full h-full" />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
