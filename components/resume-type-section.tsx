'use client'

import { Button } from '@/components/ui/button'
import { useResumeContext } from '@/contexts/resume-context'
import { ResumeType } from '@/types/resume'

const RESUME_TYPE_INFO = {
  fresher: 'For students or recent graduates with limited work experience.',
  transition: 'For professionals changing careers or industries.',
  experienced: 'For professionals with significant work experience.'
} as const

export function ResumeTypeSection() {
  const { resume, updateResume } = useResumeContext()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(RESUME_TYPE_INFO) as ResumeType[]).map((type) => (
          <Button
            key={type}
            variant={resume.resumeType === type ? 'default' : 'outline'}
            className="w-full capitalize"
            onClick={() => updateResume('resumeType', type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {resume.resumeType && RESUME_TYPE_INFO[resume.resumeType]}
      </p>
    </div>
  )
} 