'use client'

import { useJobDescription } from '@/contexts/job-description-context'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function JobDescriptionSection() {
  const { jobData, updateJobDescription, clearJobDescription } = useJobDescription()
  const { toast } = useToast()

  const handleUpdateDescription = (value: string) => {
    try {
      updateJobDescription(value)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job description",
        variant: "destructive",
      })
    }
  }

  const handleClearDescription = () => {
    try {
      clearJobDescription()
      toast({
        title: "Success",
        description: "Job description cleared successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear job description",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Textarea
          placeholder="Paste the job description here..."
          value={jobData?.jobDescription || ''}
          onChange={(e) => handleUpdateDescription(e.target.value)}
          className="flex-1 min-h-[200px]"
        />
        {jobData?.jobDescription && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearDescription}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Add the job description to help optimize your resume content. The AI will use this to tailor your resume sections.
      </p>
    </div>
  )
} 