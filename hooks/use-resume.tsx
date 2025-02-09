'use client'

import * as React from 'react'
import type { Resume } from '../types/resume'

const initialResume: Resume = {
  name: 'Gaurav Wankhede',
  contact: {
    mobile: '123-456-7890',
    email: 'gauravanilwankhede2002@gmail.com',
    linkedin: 'https://www.linkedin.com/in/wankhede-gaurav/',
    github: 'https://github.com/Gaurav-Wankhede',
    portfolio: 'https://gaurav-wankhede.vercel.app/'
  },
  education: [
    {
      school: 'Example University',
      degree: 'Bachelor of Science in Computer Science',
      location: 'City, State',
      date: '2020 - 2024'
    }
  ],
  experience: [
    {
      title: 'Data Scientist',
      company: 'Example Corp',
      location: 'City, State',
      date: '2023 - Present',
      details: [
        'Developed and maintained web applications using React and Node.js',
        'Collaborated with cross-functional teams to deliver high-quality software'
      ]
    }
  ],
  projects: [
    {
      name: 'Project Name',
      technologies: 'React, Node.js, MongoDB',
      date: '2023',
      details: [
        'Built a full-stack web application',
        'Implemented user authentication and authorization'
      ]
    }
  ],
  skills: {
    languages: 'Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS',
    frameworks: 'NextJS, Streamlit, WordPress, Material-UI, FastAPI',
    developerTools: 'Git, Docker, Google Cloud Platform, Vercel Cloud, VS Code, Visual Studio, PyCharm',
    libraries: 'Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, Keras, PyTorch'
  },
  summary: 'Experienced software engineer with a strong foundation in building scalable web applications...'
}

interface ResumeContextType {
  resume: Resume
  updateResume: (field: keyof Resume, value: any) => void
}

const ResumeContext = React.createContext<ResumeContextType | null>(null)

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = React.useState<Resume>(initialResume)

  const updateResume = (field: keyof Resume, value: any) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <ResumeContext.Provider value={{ resume, updateResume }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = React.useContext(ResumeContext)
  if (context === null) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
