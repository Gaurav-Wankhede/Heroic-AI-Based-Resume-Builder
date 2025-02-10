'use client'

import { ResumeBuilder } from '@/components/resume-builder'
import { ResumeProvider } from '@/contexts/resume-context'
import { JobDescriptionProvider } from '@/contexts/job-description-context'
import { Navbar } from '@/components/navbar'

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <div className="pt-14"> {/* Add padding to account for fixed navbar */}
        <ResumeBuilder />
      </div>
    </>
  )
}
