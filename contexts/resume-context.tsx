'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { useResume } from '@/hooks/use-resume';
import { Resume, Education, Experience, Project } from '@/types/resume';

interface ResumeContextType {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
  updateNestedField: <T extends keyof Resume>(
    section: T,
    index: number,
    field: T extends 'education' ? keyof Education :
           T extends 'experience' ? keyof Experience :
           T extends 'projects' ? keyof Project : never,
    value: any
  ) => void;
  addEducation: (item: Resume['education'][0]) => void;
  removeEducation: (index: number) => void;
  addExperience: (item: Resume['experience'][0]) => void;
  removeExperience: (index: number) => void;
  addExperienceDetail: (index: number) => void;
  removeExperienceDetail: (expIndex: number, detailIndex: number) => void;
  addProject: (item: Resume['projects'][0]) => void;
  removeProject: (index: number) => void;
  addProjectDetail: (index: number) => void;
  removeProjectDetail: (projIndex: number, detailIndex: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const resumeHook = useResume();

  return (
    <ResumeContext.Provider value={resumeHook}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}

