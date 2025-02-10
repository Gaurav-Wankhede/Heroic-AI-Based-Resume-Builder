import { Resume } from '@/types/resume'
import { ProfessionalPDF } from './professional'
import { ModernPDF } from './modern'
import { MinimalistPDF } from './minimalist'
import { ExecutivePDF } from './executive'
import { CreativePDF } from './creative'
import { ProjectPortfolioPDF } from './project-portfolio'
import { CantabrigianPDF } from './cantabrigian'
import { OxfordStandardPDF } from './oxford-standard'
import { AcademicScholarPDF } from './academic-scholar'
import { TechInnovatorPDF } from './tech-innovator'
import { registerFonts } from './utils'
import { templates } from '@/lib/templates'

// Register fonts on import
registerFonts()

// Map of template names to their PDF components
export const PDFTemplates: Record<keyof typeof templates, React.FC<{ resume: Resume }>> = {
  'professional': ProfessionalPDF,
  'modern': ModernPDF,
  'minimalist': MinimalistPDF,
  'executive': ExecutivePDF,
  'creative': CreativePDF,
  'project-portfolio': ProjectPortfolioPDF,
  'cantabrigian': CantabrigianPDF,
  'oxford-standard': OxfordStandardPDF,
  'academic-scholar': AcademicScholarPDF,
  'tech-innovator': TechInnovatorPDF,
} 