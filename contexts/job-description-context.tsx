'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface JobDescriptionData {
  jobDescription: string
  analysisResults: {
    summary: string;
    skills: string[];
    projects: string[];
    experience: string[];
  } | null
}

interface JobDescriptionContextType {
  jobData: JobDescriptionData
  setJobDescription: (description: string) => void
  setAnalysisResults: (results: JobDescriptionData['analysisResults']) => void
}

const JobDescriptionContext = createContext<JobDescriptionContextType | undefined>(undefined)

export function JobDescriptionProvider({ children }: { children: ReactNode }) {
  const [jobData, setJobData] = useState<JobDescriptionData>({
    jobDescription: '',
    analysisResults: null
  })

  const setJobDescription = (description: string) => {
    setJobData(prev => ({ ...prev, jobDescription: description }))
  }

  const setAnalysisResults = (results: JobDescriptionData['analysisResults']) => {
    setJobData(prev => ({ ...prev, analysisResults: results }))
  }

  return (
    <JobDescriptionContext.Provider value={{ jobData, setJobDescription, setAnalysisResults }}>
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
