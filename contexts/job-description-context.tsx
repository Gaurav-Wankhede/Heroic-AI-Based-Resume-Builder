'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'

interface JobData {
  jobDescription: string
}

interface JobDescriptionContextType {
  jobData: JobData | null
  updateJobDescription: (description: string) => void
  clearJobDescription: () => void
}

const JobDescriptionContext = createContext<JobDescriptionContextType | undefined>(undefined)

export function JobDescriptionProvider({ children }: { children: ReactNode }) {
  const [jobData, setJobData] = useState<JobData | null>(null)

  const updateJobDescription = (description: string) => {
    setJobData({ jobDescription: description })
  }

  const clearJobDescription = () => {
    setJobData(null)
  }

  return (
    <JobDescriptionContext.Provider
      value={{
        jobData,
        updateJobDescription,
        clearJobDescription,
      }}
    >
      {children}
    </JobDescriptionContext.Provider>
  )
}

export function useJobDescription() {
  const context = useContext(JobDescriptionContext)
  if (context === undefined) {
    throw new Error('useJobDescription must be used within a JobDescriptionProvider')
  }
  return context
}
