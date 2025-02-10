import { TechInnovatorTemplate } from '@/components/templates/TechInnovatorTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { CreativeTemplate } from '@/components/templates/CreativeTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { ProjectPortfolioTemplate } from '@/components/templates/ProjectPortfolioTemplate'
import { CantabrigianTemplate } from '@/components/templates/CantabrigianTemplate'
import { OxfordStandardTemplate } from '@/components/templates/OxfordStandardTemplate'
import { AcademicScholarTemplate } from '@/components/templates/AcademicScholarTemplate'

export const templates = {
  'tech-innovator': TechInnovatorTemplate,
  'modern': ModernTemplate,
  'minimalist': MinimalistTemplate,
  'executive': ExecutiveTemplate,
  'creative': CreativeTemplate,
  'professional': ProfessionalTemplate,
  'project-portfolio': ProjectPortfolioTemplate,
  'cantabrigian': CantabrigianTemplate,
  'oxford-standard': OxfordStandardTemplate,
  'academic-scholar': AcademicScholarTemplate,
} as const 