import { ResumeType } from '@/components/resume-builder'

export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  location?: string;
  role?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  date: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  details: string[];
}

export interface Project {
  name: string;
  technologies: string;
  date: string;
  details: string[];
  deployedLink?: string;
  githubLink?: string;
  presentationLink?: string;
}

export interface Skills {
  languages: string;
  frameworks: string;
  developerTools: string;
  libraries: string;
}

export interface Certification {
  name: string
  provider: string
  issueDate: string
  url: string
}

export interface Resume {
  name: string;
  contact: {
    email?: string;
    mobile?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    location?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  summary?: string;
  resumeType: ResumeType;
  certifications?: Certification[]
}

export interface AIContent {
  section: keyof Resume;
  content: string | Skills | Experience[] | Project[];
}