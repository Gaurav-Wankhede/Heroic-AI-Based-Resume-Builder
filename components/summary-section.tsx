'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from "@/components/ui/label"
import { Resume } from '@/types/resume'

interface SummarySectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: string) => void;
}

export function SummarySection({ resume, updateResume }: SummarySectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="summary">Professional Summary</Label>
      <Textarea
        id="summary"
        placeholder="Write a brief summary of your professional background and key qualifications..."
        value={resume.summary || ''}
        onChange={(e) => updateResume('summary', e.target.value)}
        className="min-h-[100px] resize-none"
      />
    </div>
  )
}
