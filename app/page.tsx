'use client'

import { ResumeProvider } from '@/contexts/resume-context'
import { ResumeBuilder } from '@/components/resume-builder'

export default function Home() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}
