'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from "@/components/ui/label"
import { Resume } from '@/types/resume'
import { SectionHeader } from './section-header'

interface SummarySectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: string) => void;
}

export function SummarySection({ resume, updateResume }: SummarySectionProps) {
  return (
    
      <div className="space-y-2">
        <Textarea
          id="summary"
          placeholder="A results-driven software engineer with expertise in building scalable applications..."
          value={resume.summary || ''}
          onChange={(e) => updateResume('summary', e.target.value)}
          className="min-h-[150px] resize-none"
        />
      </div>
  )
}
