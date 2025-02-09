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

interface SectionHeaderProps {
  title: string
  hasAI?: boolean
  section?: keyof Resume
  resume?: Resume
  className?: string
}

// Add type for the formatted content
type FormattedContent = string | Skills | Experience[] | Project[];

export function SectionHeader({ 
  title, 
  hasAI = false, 
  section,
  resume,
  className 
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
      
      const resumeTypeContext = resume?.resumeType ? 
        `This is a ${resume.resumeType.toUpperCase()} resume. ` +
        `${resume.resumeType === 'fresher' ? 'Focus on academic projects and internships. ' : 
          resume.resumeType === 'transition' ? 'Emphasize transferable skills and relevant projects. ' :
          'Highlight progressive responsibility and key achievements. '}` : ''
      
      const jobContext = `Given this job description:\n${jobData.jobDescription}\n\n${resumeTypeContext}\n`
      let prompt = ''
      
      const currentExperience = resume.experience?.[0]
      const currentRole = currentExperience?.title || 'professional'
      
      switch (section) {
        case 'summary': {
          prompt = jobContext +
            `Generate a powerful professional summary that positions you as an ideal candidate for this role.

            Current Context:
            - Resume Type: ${resume.resumeType || 'professional'}
            - Current Role: ${currentRole}
            - Experience: ${resume.experience?.map(exp => 
                `\n    • ${exp.title} at ${exp.company} (${exp.date})\n      ${exp.details.join('\n      ')}`
              ).join('\n') || 'No prior experience'}
            - Projects: ${resume.projects?.map(proj => 
                `\n    • ${proj.name} (${proj.technologies})\n      ${proj.details.join('\n      ')}`
              ).join('\n') || 'No projects listed'}
            - Education: ${resume.education?.map(edu =>
                `\n    • ${edu.degree} from ${edu.school} (${edu.date})`
              ).join('\n') || 'No education listed'}
            - Skills: ${Object.entries(resume.skills || {})
                .filter(([_, value]) => value)
                .map(([key, value]) => `\n    • ${key}: ${value}`)
                .join('') || 'No skills listed'}

            Requirements:
            - Write in first person, present tense
            - Start with your role and years of experience
            - Include key technical skills relevant to the job
            - Mention significant achievements with metrics
            - Keep under 50 words
            - Make it direct and impactful
            - NO prefixes like "Results:" or similar markers
            - NO bullet points
            
            Example Format:
            "Senior software engineer with 5+ years building scalable applications. Specialize in React, Node.js, and cloud architecture, delivering solutions that handle 1M+ daily users. Reduced infrastructure costs by 40% while maintaining 99.9% uptime across multiple high-traffic platforms."
            
            Important:
            - Focus on matching job requirements
            - Include relevant technologies
            - Highlight measurable achievements
            - Keep it concise and professional
            - Write in a natural, flowing style`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)
          
          // Clean up any remaining markers and trim
          const cleanedResponse = response.text
            .replace(/^(Results:|Result:|Summary:|Professional Summary:)/i, '')
            .trim()
          
          updateResume('summary', cleanedResponse)
          break
        }
        case 'experience': {
          const currentExperience = resume.experience?.[0] || {
            title: currentRole,
            company: '',
            location: '',
            date: new Date().getFullYear().toString(),
            details: [] // Add details array to match Experience type
          }

          prompt = jobContext +
            `Generate 3-4 impactful experience points for ${currentExperience.title} at ${currentExperience.company} using STAR (Situation, Task, Action, Result) or CAR (Challenge, Action, Result) method.

            Current Context:
            - Resume Type: ${resume.resumeType || 'professional'}
            - Current Role: ${currentRole}
            - Current Experience: ${JSON.stringify(resume.experience, null, 2)}

            Guidelines:
            1. Each point must follow this structure:
               - Situation/Challenge: Brief context of the problem
               - Action: Technical implementation and approach
               - Result: Quantifiable impact with metrics

            2. Format each point as:
               "[Action Verb] [Technical Solution] to address [Challenge/Situation], resulting in [Measurable Outcome]"

            3. Requirements:
               - Start with powerful action verbs (e.g., Engineered, Implemented, Architected)
               - Include specific technologies and methodologies
               - Quantify results with numbers and percentages
               - Keep each point under 30 words
               - Focus on achievements relevant to the job requirements
               - Each point must be on a new line
               - NO bullet points or symbols`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)

          const details = response.text
            .split('\n')
            .filter(line => line.trim())

          // Update existing experience instead of creating new ones
          const updatedExperience = resume.experience?.map((exp, index) => {
            if (index === 0) {
              return {
                ...exp,
                details: [...(exp.details || []), ...details]
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
          const allSkills = Object.values(currentSkills).filter(Boolean).join(', ')
          
          prompt = jobContext +
            `Generate 3-4 impactful project descriptions using STAR (Situation, Task, Action, Result) or PAR (Problem, Action, Result) method.

            Current Context:
            - Resume Type: ${resume.resumeType || 'professional'}
            - Current Skills: ${allSkills}
            - Current Projects: ${JSON.stringify(currentProjects, null, 2)}
            
            Guidelines:
            1. Each project should follow this structure:
               - Situation/Problem: Brief context of the challenge
               - Task/Action: Technical implementation details
               - Result: Quantifiable impact and metrics
            2. Include specific technologies from the job description
            3. Format each project as: "[Action Verb] [Project Type] using [Technologies], [Problem/Situation], resulting in [Measurable Result]"
            4. Keep each project description under 25 words
            5. Each project must be on a new line
            6. Do NOT use bullet points or numbers`

          const response = await generateAIContent(prompt)
          if (response.error) throw new Error(response.error)

          // Process the response with improved parsing
          const details = response.text
            .split('\n')
            .filter(line => line.trim())

          // Update existing projects or create new ones if none exist
          const updatedProjects = currentProjects.length > 0 
            ? currentProjects.map((proj, index) => {
                if (index < details.length) {
                  const [actionPart, ...restParts] = details[index].split(' using ')
                  return {
                    ...proj,
                    name: actionPart.trim(),
                    technologies: restParts.join(' using ').split(',')[0].trim(),
                    details: [details[index]]
                  }
                }
                return proj
              })
            : details.map(detail => {
                const [actionPart, ...restParts] = detail.split(' using ')
                return {
                  name: actionPart.trim(),
                  technologies: restParts.join(' using ').split(',')[0].trim(),
                  date: new Date().getFullYear().toString(),
                  details: [detail]
                }
              })

          updateResume('projects', updatedProjects)
          break
        }
        case 'skills': {
          // Create a comprehensive prompt for skills
          const skillsPrompt = `Based on the following job description and candidate's experience, generate a comprehensive skills section categorized appropriately.

Job Description:
${jobData.jobDescription}

Professional Experience:
${resume.experience?.map(exp => `
- ${exp.title} at ${exp.company} (${exp.date})
  ${exp.details.join('\n  ')}
`).join('\n') || 'No experience listed'}

Projects:
${resume.projects?.map(proj => `
- ${proj.name} (${proj.technologies}) - ${proj.date}
  ${proj.details.join('\n  ')}
`).join('\n') || 'No projects listed'}

Current Skills:
${resume.skills ? `
- Languages: ${resume.skills.languages || 'None'}
- Frameworks: ${resume.skills.frameworks || 'None'}
- Developer Tools: ${resume.skills.developerTools || 'None'}
- Libraries: ${resume.skills.libraries || 'None'}
` : 'No skills listed'}

Please extract and categorize ALL technical skills mentioned above into these categories:
1. Programming Languages (languages)
2. Frameworks (frameworks)
3. Developer Tools (developerTools)
4. Libraries (libraries)

Format your response EXACTLY as:
Programming Languages: skill1, skill2, ...
Frameworks: skill1, skill2, ...
Developer Tools: skill1, skill2, ...
Libraries: skill1, skill2, ...

Important: 
- Include skills from job description, experience, projects, and current skills
- Separate skills with commas
- Do not add any other text or categories`

          const response = await generateAIContent(skillsPrompt)
          if (response.error) throw new Error(response.error)

          const lines = response.text.split('\n').filter(line => line.trim())
          const updatedSkills: Skills = {
            languages: '',
            frameworks: '',
            developerTools: '',
            libraries: ''
          }

          lines.forEach(line => {
            const [category, skills] = line.split(':').map(s => s.trim())
            if (!category || !skills) return

            const lowerCategory = category.toLowerCase()
            const skillsArray = skills.split(',').map(s => s.trim())

            if (lowerCategory.includes('programming') || lowerCategory.includes('language')) {
              updatedSkills.languages = skillsArray.join(', ')
            } else if (lowerCategory.includes('framework')) {
              updatedSkills.frameworks = skillsArray.join(', ')
            } else if (lowerCategory.includes('developer') || lowerCategory.includes('tool')) {
              updatedSkills.developerTools = skillsArray.join(', ')
            } else if (lowerCategory.includes('librar')) {
              updatedSkills.libraries = skillsArray.join(', ')
            }
          })

          // Ensure all required fields are present with at least empty strings
          updateResume('skills', updatedSkills)
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

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {hasAI && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAIOptimize}
                disabled={isGenerating}
                className={cn(
                  "h-8 w-8",
                  isGenerating && "animate-pulse"
                )}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Optimize {title.toLowerCase()} based on job description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <button
        onClick={() => {
          // Handle edit action for the section
          console.log(`Edit ${section}`);
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={`Edit ${section}`}
      >
      </button>
    </div>
  )
}