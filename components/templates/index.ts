export { ExecutiveTemplate } from './ExecutiveTemplate';
export { ModernTemplate } from './ModernTemplate';
export { MinimalistTemplate } from './MinimalistTemplate';
export { CreativeTemplate } from './CreativeTemplate';
export { ProfessionalTemplate } from './ProfessionalTemplate';
export { OxfordStandardTemplate } from './OxfordStandardTemplate';
export { CantabrigianTemplate } from './CantabrigianTemplate';
export { TechInnovatorTemplate } from './TechInnovatorTemplate';
export { AcademicScholarTemplate } from './AcademicScholarTemplate';
export { ProjectPortfolioTemplate } from './ProjectPortfolioTemplate';

export type TemplateType = 
  | 'executive' 
  | 'modern' 
  | 'minimalist' 
  | 'creative' 
  | 'professional'
  | 'oxford-standard'
  | 'cantabrigian'
  | 'tech-innovator'
  | 'academic-scholar'
  | 'project-portfolio';

export const templateOptions = [
  {
    value: 'oxford-standard' as const,
    label: 'Oxford Standard',
    description: 'Classic reverse-chronological format, widely accepted across industries',
  },
  {
    value: 'tech-innovator' as const,
    label: 'Tech Innovator',
    description: 'Specialized format for technical roles with prominent skills section',
  },
  {
    value: 'academic-scholar' as const,
    label: 'Academic Scholar',
    description: 'Comprehensive format for academic and research positions',
  },
  {
    value: 'project-portfolio' as const,
    label: 'Project Portfolio',
    description: 'Project-centric format for showcasing detailed work examples',
  },
  {
    value: 'cantabrigian' as const,
    label: 'Cantabrigian Blend',
    description: 'Hybrid format combining skills focus with chronological experience',
  },
  {
    value: 'executive' as const,
    label: 'Executive',
    description: 'Perfect for senior professionals and executives',
  },
  {
    value: 'modern' as const,
    label: 'Modern',
    description: 'Clean and contemporary design for tech professionals',
  },
  {
    value: 'minimalist' as const,
    label: 'Minimalist',
    description: 'Simple and elegant design that focuses on content',
  },
  {
    value: 'creative' as const,
    label: 'Creative',
    description: 'Unique layout for creative professionals',
  },
  {
    value: 'professional' as const,
    label: 'Professional',
    description: 'Traditional format suitable for all industries',
  },
] as const;
