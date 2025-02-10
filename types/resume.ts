export interface Contact {
  name?: string;
  email?: string;
  mobile?: string;
  linkedin?: string;
  github?: string;
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

export type ResumeType = 'fresher' | 'transition' | 'experienced'

export interface Resume {
  name: string;
  contact: Contact;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  summary?: string;
  resumeType?: ResumeType;
  certifications?: Certification[]
}

export interface AIContent {
  section: keyof Resume;
  content: string | Skills | Experience[] | Project[];
}