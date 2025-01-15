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
  }
  
export interface Skills {
    languages: string;
    frameworks: string;
    developerTools: string;
    libraries: string;
  }
  
export interface Contact {
    mobile: string;
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
  }

export interface Resume {
    name: string;
    contact: Contact;
    summary: string;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: Skills;
  }