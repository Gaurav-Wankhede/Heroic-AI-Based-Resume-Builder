'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'
import { Resume, Education, Experience, Project, Skills, AIContent, Certification } from '@/types/resume'
import { templates } from '@/lib/templates'

const initialResume: Resume = {
  name: 'John Developer',
  contact: {
    email: 'john.developer@email.com',
    mobile: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johndeveloper',
    github: 'https://github.com/johndeveloper',
    portfolio: 'https://johndeveloper.dev',
  },
  summary: 'Full-stack developer with 4+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Proven track record of delivering high-performance solutions that drive business growth. Led teams in developing applications serving 100K+ users.',
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      location: 'San Francisco, CA',
      date: '2015 - 2019'
    },
    {
      school: 'Tech Institute',
      degree: 'Full-Stack Web Development Bootcamp',
      location: 'San Francisco, CA',
      date: '2019'
    }
  ],
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      date: '2021 - Present',
      details: [
        'Architected and implemented a microservices-based e-commerce platform using Next.js and Node.js, resulting in a 40% improvement in page load times',
        'Led a team of 5 developers in migrating legacy systems to modern React-based architecture, reducing technical debt by 60%',
        'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 70% and improving team productivity',
        'Optimized database queries and implemented caching strategies, reducing server response time by 50%'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations Co.',
      location: 'San Francisco, CA',
      date: '2019 - 2021',
      details: [
        'Developed and maintained multiple React-based web applications serving 50K+ daily active users',
        'Implemented responsive designs and accessibility features, achieving WCAG 2.1 compliance',
        'Created RESTful APIs using Express.js and integrated with various third-party services',
        'Reduced infrastructure costs by 30% through AWS optimization and implementation of serverless architecture'
      ]
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      technologies: 'Next.js, Node.js, PostgreSQL, Redis, AWS',
      date: '2023',
      details: [
        'Built a full-featured e-commerce platform with real-time inventory management and payment processing',
        'Implemented advanced caching strategies and optimized database queries, achieving sub-100ms response times',
        'Integrated with multiple payment gateways and shipping providers using microservices architecture'
      ],
      deployedLink: 'https://ecommerce-platform.demo',
      githubLink: 'https://github.com/johndeveloper/ecommerce-platform'
    },
    {
      name: 'Task Management System',
      technologies: 'React, TypeScript, Express.js, MongoDB, Docker',
      date: '2022',
      details: [
        'Developed a collaborative task management system with real-time updates using WebSocket',
        'Implemented drag-and-drop functionality and keyboard shortcuts for improved user experience',
        'Containerized the application using Docker and implemented automated testing with Jest'
      ],
      deployedLink: 'https://task-manager.demo',
      githubLink: 'https://github.com/johndeveloper/task-manager'
    }
  ],
  skills: {
    languages: 'JavaScript, TypeScript, Python, SQL, HTML5, CSS3',
    frameworks: 'React, Next.js, Node.js, Express.js, Django',
    developerTools: 'Git, Docker, AWS, GitHub Actions, Jest, Webpack',
    libraries: 'Redux, TailwindCSS, Material-UI, Mongoose, Prisma'
  },
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      provider: 'Amazon Web Services',
      issueDate: '2023-01-15',
      url: 'https://aws.amazon.com/certification/verify'
    },
    {
      name: 'Professional Scrum Master I',
      provider: 'Scrum.org',
      issueDate: '2022-06-30',
      url: 'https://www.scrum.org/certificates/verify'
    }
  ],
  resumeType: 'experienced'
}

interface ResumeContextType {
  resume: Resume
  selectedTemplate: keyof typeof templates
  setSelectedTemplate: (template: keyof typeof templates) => void
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
  addCertification: (item: Certification) => void
  removeCertification: (index: number) => void
  updateCertification: (index: number, field: keyof Certification, value: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume>(initialResume)
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('professional')

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

  const addCertification = (item: Certification) => {
    setResume(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), item],
    }))
  }

  const removeCertification = (index: number) => {
    setResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }))
  }

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    setResume(prev => {
      const certifications = [...(prev.certifications || [])]
      if (index >= 0 && index < certifications.length) {
        certifications[index] = { ...certifications[index], [field]: value }
      }
      return { ...prev, certifications }
    })
  }

  const value = {
    resume,
    selectedTemplate,
    setSelectedTemplate,
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
    addCertification,
    removeCertification,
    updateCertification,
  }

  return (
    <ResumeContext.Provider value={value}>
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