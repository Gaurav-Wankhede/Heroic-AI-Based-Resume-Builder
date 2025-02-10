'use client'

import { createContext, useContext, useState } from 'react'

export interface JobData {
  jobDescription?: string
  analysisResults?: any // Replace with proper type
}

export interface JobDescriptionContextType {
  jobData: JobData
  setJobData: (data: JobData) => void
  setJobDescription: (description: string) => void
  setAnalysisResults: (results: any) => void
}

const JobDescriptionContext = createContext<JobDescriptionContextType | undefined>(undefined)

export function JobDescriptionProvider({ children }: { children: React.ReactNode }) {
  const [jobData, setJobData] = useState<JobData>({})

  const setJobDescription = (description: string) => {
    setJobData(prev => ({ ...prev, jobDescription: description }))
  }

  const setAnalysisResults = (results: any) => {
    setJobData(prev => ({ ...prev, analysisResults: results }))
  }

  return (
    <JobDescriptionContext.Provider value={{ 
      jobData, 
      setJobData,
      setJobDescription,
      setAnalysisResults 
    }}>
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
