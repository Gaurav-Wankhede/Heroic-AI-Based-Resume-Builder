'use client'

import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react'

export interface JobDescriptionContextType {
  jobData: {
    jobDescription?: string;
    analysisResults?: any; // Define proper type if needed
  };
  updateJobData: (data: Partial<{ jobDescription: string; analysisResults: any }>) => void;
}

export const JobDescriptionContext = createContext<JobDescriptionContextType>({
  jobData: {},
  updateJobData: () => {}
})

export function JobDescriptionProvider({ children }: { children: React.ReactNode }) {
  const [jobData, setJobData] = useState<JobDescriptionContextType['jobData']>({})

  const updateJobData = useCallback((data: Partial<{ jobDescription: string; analysisResults: any }>) => {
    setJobData(prev => ({ ...prev, ...data }))
  }, [])

  return (
    <JobDescriptionContext.Provider value={{ jobData, updateJobData }}>
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
