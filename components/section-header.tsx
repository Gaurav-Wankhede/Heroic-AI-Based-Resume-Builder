'use client'

import { Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Resume, Experience, Project, Skills, AIContent } from '@/types/resume'
import { generateAIContent } from '@/utils/generate-ai-content'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useResumeContext } from '@/contexts/resume-context'
import { useJobDescription } from '@/contexts/job-description-context'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pencil } from 'lucide-react'
import { RESUME_TYPES } from './resume-builder'

interface SectionHeaderProps {
  title: string
  description?: string
  hasAI?: boolean
  section?: keyof Resume
  resume?: Resume
  className?: string
  projectIndex?: number
}

export function SectionHeader({ 
  title, 
  description,
  hasAI = false, 
  section,
  resume,
  className,
  projectIndex 
}: SectionHeaderProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()
  const { updateResume } = useResumeContext()
  const { jobData } = useJobDescription()

  const handleAIOptimize = async () => {
    if (!section || !resume) return

    if (!jobData?.jobDescription) {
      toast({
        title: "Missing Job Description",
        description: "Please add a job description first to optimize this section.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsGenerating(true)
      let prompt = ''
      
      const currentExperience = resume.experience?.[0]
      const currentRole = currentExperience?.title || 'professional'
      
      switch (section) {
        case 'summary': {
          const resumeTypeConfig = RESUME_TYPES.find((t: typeof RESUME_TYPES[number]) => t.value === resume.resumeType)
          
          prompt = `I'm applying for this position. Here's the job posting:
            ${jobData.jobDescription}

            As an HR professional scanning my summary section in 7 seconds only, you need to see immediate value and impact without preamble.

            My Current Profile:
            Resume Type: ${resumeTypeConfig?.label || 'Professional'}

            My Experience Highlights:
            ${resume.experience?.map(exp => `
            ${exp.title} at ${exp.company} (${exp.date})
            My Key Achievements:
            ${exp.details.map(detail => detail.trim()).join('\n')}
            `).join('\n\n') || 'No prior experience'}

            My Technical Projects:
            ${resume.projects?.map(proj => `
            ${proj.name} (${proj.technologies})
            My Impact: ${proj.details.map(detail => detail.trim()).join('\n')}
            `).join('\n\n') || 'No projects listed'}

            My Core Competencies:
            ${Object.entries(resume.skills || {})
              .filter(([_, value]) => value)
              .map(([category, skills]) => `${category}: ${skills}`)
              .join('\n')}

            Create a powerful ${resumeTypeConfig?.label || 'Professional'} summary that:

            1. Position Statement (10-15 words):
            - Start with current role and experience level
            - Include primary domain expertise
            - Match job requirements exactly

            2. Technical Expertise (15-20 words):
            - Highlight top 2-3 technical skills from job posting
            - Include most impressive quantified achievement
            - Reference relevant technologies

            3. Value Proposition (15-20 words):
            - Emphasize business impact
            - Include scale or scope of work
            - Reference industry relevance

            Requirements:
            - Maximum 50 words total
            - Use present tense
            - Include 1-2 specific metrics
            - Match job keywords exactly
            - Focus on achievements over responsibilities
            - Maintain professional tone
            - No buzzwords or fluff
            - No soft skills without context
            - No personal pronouns at start of sentences
            - No bullet points or markers
            
            Strictly remove any unwanted:
            - *
            - Here are my achievements:
            - Here are my key achievements:
            - Here is my summary:
            - Here is my experience:
            - Here is my projects:
            - Here is my skills:
            - Here is your summary:
            - Here is your experience:
            - Here is your projects:
            - Here is your skills:

            Format:
            [Role/Experience Statement] specializing in [Key Technical Skills]. Demonstrated expertise in [Technical Achievement with Metrics], delivering [Business Impact] for [Industry/Scale Context].

            ATS Optimization:
            - Use exact job posting keywords
            - Do not use any preamble or introduction
            - Do not use bullet points or markers
            - Do not use any prefixes like "Results:" or similar markers
            - Do not add any other text or categories
            - Strictly remove unwanted special characters like * or -
            - Include both full and abbreviated terms
            - Match technical terms precisely
            - Use standard industry terminology
            - Avoid custom formatting

            Example Pattern:
            "Senior full-stack developer with 5+ years building enterprise applications, specializing in React and Node.js microservices. Architected cloud solutions processing 2M+ daily transactions, reducing infrastructure costs by 40% while maintaining 99.9% uptime across high-traffic platforms."`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)
          
          // Clean and format the summary
          const cleanedResponse = response.text
            .replace(/^(Results:|Result:|Summary:|Professional Summary:|Profile:|About:|Overview:)/i, '')
            .replace(/^[•\-*]\s*/gm, '')
            .replace(/\n+/g, ' ')
            .trim()
            .split(' ')
            .slice(0, 50) // Enforce 50-word limit
            .join(' ')
          
          updateResume('summary', cleanedResponse)
          break
        }
        case 'experience': {
          const currentExperience = resume.experience?.[0] || {
            title: currentRole,
            company: '',
            location: '',
            date: new Date().getFullYear().toString(),
            details: []
          }

          prompt = `I'm applying for this position. Here's the job posting:
            ${jobData.jobDescription}

            As an HR professional scanning my experience section in 7 seconds only, you need to see immediate value and impact without preamble.

            Analyze my current experience:
            ${resume.experience?.map(exp => `
            Role: ${exp.title}
            Company: ${exp.company}
            Duration: ${exp.date}
            Key Achievements:
            ${exp.details.map(detail => `  • ${detail}`).join('\n')}
            `).join('\n\n') || 'No prior experience'}

            Technical Context:
            - Skills: ${Object.entries(resume.skills || {})
              .filter(([_, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n  ')}
            - Projects: ${resume.projects?.map(p => p.name).join(', ') || 'None listed'}

            Transform my experience into exactly 3-4 powerful achievement statements that:
            1. Match the job requirements
            2. Showcase technical expertise
            3. Demonstrate business impact
            4. Highlight leadership and growth

            Use these frameworks:

            STAR Method (Situation-Task-Action-Result):
            - Situation: What was the business context/challenge?
            - Task: What was your specific responsibility?
            - Action: What technical solution did you implement?
            - Result: What measurable impact did you achieve?

            Psychology Triggers for HR:
            1. Authority: Technical leadership terms
            2. Scarcity: Unique technical solutions
            3. Social Proof: Industry-standard tools
            4. Problem-Solution: Clear value delivery
            5. Numbers: Leading metrics

            Requirements:
            - Generate EXACTLY 3-4 achievement statements without preamble
            - Begin with powerful action verbs
            - Include exact job posting keywords
            - Focus on achievements over duties
            - Quantify all impacts (%, $, time)
            - Keep each point under 25 words
            - Use past tense
            - Do not include any preamble or introduction
            - Do not use bullet points or markers
            - Do not use any prefixes like "Results:" or similar markers

            Achievement Formula:
            "[Power Verb] [Technical Solution] for [Business Challenge], [Quantified Impact] using [Job-Matched Skills]"

            Format:
            - Direct statements
            - Do not use bullet points or markers
            - Do not use any prefixes like "Results:" or similar markers
            - Do not use any other text or categories
            - Do not use any preamble or introduction
            - One achievement per line
            - Lead with metrics when possible
            - No prefixes or bullets
            - MAXIMUM 4 statements total`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)

          const details = response.text
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^[-•*]\s*/, '').trim())
            .slice(0, 4) // Ensure maximum 4 points

          // Update existing experience with new optimized points
          const updatedExperience = resume.experience?.map((exp, index) => {
            if (index === 0) {
              return {
                ...exp,
                details // Replace existing details with new optimized ones
              }
            }
            return exp
          }) || [{
            ...currentExperience,
            details
          }]

          updateResume('experience', updatedExperience)
          break
        }
        case 'projects': {
          const currentProjects = resume.projects || []
          const currentSkills = resume.skills || {}
          
          prompt = `I'm applying for this position. Here's the job posting:
            ${jobData.jobDescription}

            As an HR professional scanning my projects section, you need to see immediate value and impact.

            Analyze my current projects and skills:
            ${currentProjects.map(proj => `
            Project: ${proj.name}
            Technologies: ${proj.technologies}
            Details: ${proj.details.join('\n')}
            `).join('\n\n')}

            Technical Arsenal:
            ${Object.entries(currentSkills)
              .filter(([_, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n  ')}

            Transform my projects into exactly 3-4 powerful technical achievements with IMPRESSIVE yet REALISTIC metrics:

            Use these realistic metric ranges:
            1. Performance Improvements:
               - Load time: 30-50% reduction
               - Response time: 40-60% faster
               - Database queries: 25-45% optimization
               - Code bundle size: 20-40% reduction

            2. User/Business Impact:
               - User engagement: 15-35% increase
               - User base: 2K-50K monthly users
               - Customer satisfaction: 20-40% improvement
               - Cost savings: $10K-$50K annually

            3. Technical Scale:
               - API requests: 100K-1M daily
               - Data processing: 500MB-5TB
               - Concurrent users: 1K-10K
               - System uptime: 99.9%

            4. Development Efficiency:
               - Deployment time: 40-60% reduction
               - Bug reduction: 30-50% decrease
               - Development cycle: 25-45% faster
               - Code reusability: 30-50% improvement

            Requirements:
            - Generate EXACTLY 3-4 quantified project statements
            - Use realistic but impressive metrics
            - Include specific technologies from job posting
            - Balance technical detail with business impact
            - Keep each point under 25 words
            - Must sound achievable and credible
            - No exaggerated or unrealistic claims

            Project Formula:
            "[Technical Verb] [Project Type] using [Tech Stack], achieving [Realistic Metric] and [Business Impact]"

            Example Patterns:
            - "Engineered React microservices architecture reducing load time by 45% and supporting 25K daily users"
            - "Optimized MongoDB queries cutting response time by 35% while processing 2TB data monthly"
            - "Implemented CI/CD pipeline decreasing deployment time by 40% and reducing bugs by 35%"
            - "Developed user authentication system handling 50K monthly users with 99.9% uptime"`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)

          const details = response.text
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^[-•*]\s*/, '').trim())
            .filter(line => {
              // Ensure line contains realistic metrics
              return /\d+%|\d+K|\d+M|\d+\+|\$\d+/.test(line) && 
                     !line.includes('100%') && // Avoid unrealistic perfect scores
                     !line.includes('1000%')   // Avoid unrealistic improvements
            })
            .slice(0, 4)

          // Update existing projects or create new ones
          const updatedProjects = details.map(detail => {
            // Split the detail into meaningful parts
            const matches = detail.match(/^(.*?)\s+using\s+(.*?)(?:,|\s+to\s+|$)(.*)/)
            if (matches) {
              const [_, projectAction, technologies, remainingDetail] = matches
              return {
                name: projectAction.trim(),
                technologies: technologies.trim(),
                date: new Date().getFullYear().toString(),
                details: [detail] // Quantified detail with realistic metrics
              }
            }
            // Fallback if pattern doesn't match
            return {
              name: detail.split(' ').slice(0, 3).join(' '),
              technologies: currentSkills ? Object.keys(currentSkills)[0] : 'Various technologies',
              date: new Date().getFullYear().toString(),
              details: [detail]
            }
          })

          // Preserve existing projects that aren't being updated
          const finalProjects = currentProjects.length > 0
            ? currentProjects.map((proj, index) => {
                if (index < updatedProjects.length) {
                  return {
                    ...proj,
                    details: updatedProjects[index].details // Update with realistic quantified details
                  }
                }
                return proj
              })
            : updatedProjects

          updateResume('projects', finalProjects)
          break
        }
        case 'skills': {
          const skillsPrompt = `I'm applying for this position. Here's the job posting:
            ${jobData.jobDescription}

            As an HR professional, you need to see my expertise aligned with the role without any preamble.

            Analyze my background:
            Experience:
            ${resume.experience?.map(exp => `
            ${exp.title} at ${exp.company}
            ${exp.details.join('\n')}
            `).join('\n\n') || 'No experience listed'}

            Projects:
            ${resume.projects?.map(proj => `
            ${proj.name} using ${proj.technologies}
            ${proj.details.join('\n')}
            `).join('\n\n') || 'No projects listed'}

            Current Skills:
            ${resume.skills ? Object.entries(resume.skills).map(([key, value]) => 
              `${key}: ${value}`).join('\n') : 'No skills listed'}

            Create a focused skills section that matches exact keywords from the job description.
            
            For Technical Roles, categorize as:
            1. Programming Languages: Core and scripting languages
            2. Frameworks & Technologies: Development frameworks and platforms
            3. Developer Tools: IDE, version control, CI/CD
            4. Databases & Infrastructure: Databases, cloud, servers
            5. Industry Tools: Domain-specific software
            6. Technical Methodologies: Development approaches

            For Business/Non-Technical Roles, categorize as:
            1. Industry Software: Specific tools and platforms
            2. Business Systems: ERP, CRM, analytics tools
            3. Data & Analytics: Analysis and reporting tools
            4. Technical Platforms: Required technical platforms
            5. Industry Standards: Methodologies and practices
            6. Domain Tools: Specialized industry software

            Requirements:
            - Extract exact keywords from job description
            - Use industry-standard terms only
            - Avoid buzzwords and generic terms
            - Do not include any other text or categories
            - Do not include any preamble or introduction
            - Do not use bullet points or markers
            - Do not use any prefixes like "Results:" or similar markers
            - Focus on measurable technical skills
            - List tools by specific names
            - Include version numbers only if required
            - Maximum 8 items per category
            - Sort by relevance to job posting
            - Remove duplicates
            - Skip empty categories
            - No soft skills (these show in experience)

            Format each line as:
            Category: skill1, skill2, skill3, ...

            ATS Optimization:
            - Use exact terms from job posting
            - Include full and abbreviated forms
            - Match capitalization from job posting
            - Use standard industry naming
            - Avoid custom formatting
            - Skip skill levels or ratings`

          const response = await generateAIContent(skillsPrompt)
          if (response.error) throw new Error(response.error)

          const lines = response.text
            .split('\n')
            .filter(line => line.trim() && line.includes(':'))

          // Enhanced skills interface to support more categories
          const updatedSkills: Record<string, string> = {
            languages: '',
            frameworks: '',
            developerTools: '',
            databases: '',
            industryTools: '',
            methodologies: '',
            businessSystems: '',
            dataAnalytics: '',
            technicalPlatforms: '',
            industryStandards: '',
            domainTools: ''
          }

          lines.forEach(line => {
            const [category, skills] = line.split(':').map(s => s.trim())
            if (!category || !skills) return

            const lowerCategory = category.toLowerCase()
            const skillsArray = skills
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
              .filter((skill, index, self) => self.indexOf(skill) === index)
              .slice(0, 8) // Maximum 8 skills per category

            // Map categories to our storage structure
            const categoryMap: Record<string, string> = {
              'programming languages': 'languages',
              'frameworks': 'frameworks',
              'developer tools': 'developerTools',
              'databases': 'databases',
              'industry tools': 'industryTools',
              'technical methodologies': 'methodologies',
              'business systems': 'businessSystems',
              'data & analytics': 'dataAnalytics',
              'technical platforms': 'technicalPlatforms',
              'industry standards': 'industryStandards',
              'domain tools': 'domainTools'
            }

            const mappedCategory = Object.entries(categoryMap)
              .find(([key]) => lowerCategory.includes(key.toLowerCase()))?.[1]

            if (mappedCategory && skillsArray.length > 0) {
              updatedSkills[mappedCategory] = skillsArray.join(', ')
            }
          })

          // Remove empty categories
          const finalSkills = Object.fromEntries(
            Object.entries(updatedSkills)
              .filter(([_, value]) => value.trim().length > 0)
          )

          updateResume('skills', finalSkills)
          break
        }
        default:
          return
      }

      toast({
        title: "Success",
        description: `${title} has been optimized based on the job description`,
      })
    } catch (error) {
      console.error('AI Generation error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // In SectionHeader component, replace the button with a div when inside a template
  const EditButton = hasAI ? (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleAIOptimize}
              disabled={isGenerating}
              className={cn(
                "h-8 w-8 p-2 rounded-full hover:bg-gray-100 transition-colors",
                isGenerating && "animate-pulse"
              )}
            >
              <Wand2 className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {projectIndex !== undefined 
                ? `Optimize this project's content` 
                : `Optimize ${title.toLowerCase()} based on job description`}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ) : null;

  // Remove the edit button at the end
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {EditButton}
    </div>
  )
}