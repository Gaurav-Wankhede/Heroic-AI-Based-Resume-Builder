'use client'

import { JobDescriptionOptimizer } from './job-description-optimizer'
import { useJobDescription } from '@/contexts/job-description-context'
import { useResumeContext } from '@/contexts/resume-context'
import { useToast } from '@/hooks/use-toast'

export function JobDescriptionSection() {
  const { jobData, updateJobData } = useJobDescription()
  const { resume, updateResume } = useResumeContext()
  const { toast } = useToast()

  const handleUpdateDescription = (value: string) => {
    updateJobData({ jobDescription: value })
    toast({
      title: "Job Description Updated",
      description: "Your resume will be optimized based on this description.",
    })
  }

  const handleClear = () => {
    updateJobData({ jobDescription: '', analysisResults: undefined })
    toast({
      title: "Cleared",
      description: "Job description has been cleared.",
    })
  }

  return (
    <div className="space-y-4">
      <JobDescriptionOptimizer 
        resume={resume} 
        updateResume={updateResume}
      />
    </div>
  )
} 