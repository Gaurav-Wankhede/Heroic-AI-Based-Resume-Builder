'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'
import { Resume, Education, Experience, Project, Skills, AIContent } from '@/types/resume'

const initialResume: Resume = {
  name: 'Gaurav Wankhede',
  contact: {
    mobile: '123-456-7890',
    email: 'gauravanilwankhede2002@gmail.com',
    linkedin: 'https://www.linkedin.com/in/wankhede-gaurav/',
    github: 'https://github.com/Gaurav-Wankhede',
    portfolio: 'https://gaurav-wankhede.vercel.app/'
  },
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  },
  summary: 'Experienced software engineer with a strong foundation in building scalable web applications...'
}

interface ResumeContextType {
  resume: Resume
  updateResume: (field: keyof Resume, value: any) => void
  updateNestedField: <T extends keyof Resume>(
    section: T,
    index: number,
    field: T extends 'education' ? keyof Education :
           T extends 'experience' ? keyof Experience :
           T extends 'projects' ? keyof Project : never,
    value: any
  ) => void
  addEducation: (item: Education) => void
  removeEducation: (index: number) => void
  addExperience: (item: Experience) => void
  removeExperience: (index: number) => void
  addExperienceDetail: (index: number) => void
  removeExperienceDetail: (expIndex: number, detailIndex: number) => void
  addProject: (item: Project) => void
  removeProject: (index: number) => void
  addProjectDetail: (index: number) => void
  removeProjectDetail: (projIndex: number, detailIndex: number) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume>(initialResume)

  const updateResume = (field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }))
  }

  const updateNestedField = <T extends keyof Resume>(
    section: T,
    index: number,
    field: T extends 'education' ? keyof Education :
           T extends 'experience' ? keyof Experience :
           T extends 'projects' ? keyof Project : never,
    value: any
  ) => {
    setResume(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addEducation = (item: Education) => {
    setResume(prev => ({
      ...prev,
      education: [...(prev.education || []), item],
    }))
  }

  const removeEducation = (index: number) => {
    setResume(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index),
    }))
  }

  const addExperience = (item: Experience) => {
    setResume(prev => ({
      ...prev,
      experience: [...(prev.experience || []), item],
    }))
  }

  const removeExperience = (index: number) => {
    setResume(prev => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== index),
    }))
  }

  const addExperienceDetail = (index: number) => {
    setResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === index ? { ...exp, details: [...(exp.details || []), ''] } : exp
      ),
    }))
  }

  const removeExperienceDetail = (expIndex: number, detailIndex: number) => {
    setResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === expIndex
          ? { ...exp, details: (exp.details || []).filter((_, j) => j !== detailIndex) }
          : exp
      ),
    }))
  }

  const addProject = (item: Project) => {
    setResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), item],
    }))
  }

  const removeProject = (index: number) => {
    setResume(prev => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }))
  }

  const addProjectDetail = (index: number) => {
    setResume(prev => ({
      ...prev,
      projects: (prev.projects || []).map((proj, i) =>
        i === index ? { ...proj, details: [...(proj.details || []), ''] } : proj
      ),
    }))
  }

  const removeProjectDetail = (projIndex: number, detailIndex: number) => {
    setResume(prev => ({
      ...prev,
      projects: (prev.projects || []).map((proj, i) =>
        i === projIndex
          ? { ...proj, details: (proj.details || []).filter((_, j) => j !== detailIndex) }
          : proj
      ),
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateResume,
        updateNestedField,
        addEducation,
        removeEducation,
        addExperience,
        removeExperience,
        addExperienceDetail,
        removeExperienceDetail,
        addProject,
        removeProject,
        addProjectDetail,
        removeProjectDetail,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResumeContext() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider')
  }
  return context
}