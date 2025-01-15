'use client'

import { Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Resume, Experience, Project, Skills } from '@/types/resume'
import { generateAIContent } from '@/utils/generate-ai-content'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useResumeContext } from '@/contexts/resume-context'
import { useJobDescription } from '@/contexts/job-description-context'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SectionHeaderProps {
  title: string
  hasAI?: boolean
  section?: keyof Resume
  resume?: Resume
  className?: string
}

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

    if (!jobData.jobDescription) {
      toast({
        title: "Missing Job Description",
        description: "Please add a job description first to optimize this section.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsGenerating(true)
      
      const jobContext = `Given this job description:\n${jobData.jobDescription}\n\n`
      let prompt = ''
      
      switch (section) {
        case 'experience':
          prompt = jobContext +
          `Generate 4-5 strong experience points that highlight achievements and impact relevant to this role. Guidelines:
1. Start each point with an action verb
2. Include specific numbers and metrics
3. Focus on achievements and impact that match job requirements
4. Do NOT use any bullet points, dashes, or symbols
5. Each point should be on a new line
6. Remove any leading spaces

Example format:
Increased website performance by optimizing database queries, resulting in 40% faster load times
Implemented automated testing pipeline reducing deployment time by 60%
Led development of new feature increasing user engagement by 25%

Current Experience:
${JSON.stringify(resume.experience, null, 2)}`
          break
        case 'projects':
          prompt = jobContext +
          `Generate 3-4 strong project description points that align with the job requirements. Guidelines:
1. Start each point with an action verb
2. Include specific technologies used that are relevant to the job
3. Focus on technical implementation and impact
4. Do NOT use any bullet points, dashes, or symbols
5. Each point should be on a new line
6. Remove any leading spaces

Example format:
Developed full-stack web application using React and Node.js handling 10k daily users
Implemented real-time data processing pipeline using Apache Kafka
Created automated deployment workflow reducing deployment time by 50%

Current Projects:
${JSON.stringify(resume.projects, null, 2)}`
          break
        case 'summary':
          prompt = jobContext +
          `Generate a concise professional summary (max 4 lines) for ${resume.name} that aligns with the job requirements:
Role: ${resume.experience[0]?.title || 'N/A'}
Key stats: ${resume.projects.length} projects, ${resume.experience.length} jobs
Skills: ${Object.values(resume.skills).join(', ')}
Focus on value proposition and key achievements that match the job description. Ensure the response is exactly 4 lines or fewer.`
          break
        case 'skills':
          prompt = jobContext +
          `Based on this resume experience and projects, generate a comprehensive list of technical skills that are most relevant to the job requirements. Guidelines:
1. Do NOT use any bullet points dashes or symbols
2. Each category should be on a new line
3. Use plain text with simple comma separation
4. Maintain consistent capitalization
5. Remove any leading or trailing spaces
6. Skills should be sorted by relevance to job

Current Resume Content
Experience: ${JSON.stringify(resume.experience, null, 2)}
Projects: ${JSON.stringify(resume.projects, null, 2)}

Return the skills in exactly this format without any symbols or extra spaces:
Languages: skill1, skill2, skill3
Frameworks: framework1, framework2
Developer Tools: tool1, tool2
Libraries: lib1, lib2`
          break
        default:
          return
      }

      const content = await generateAIContent(prompt)
      if (content.text) {
        let formattedContent: string | Experience[] | Project[] | Skills = content.text.trim()
        
        // Format content based on section
        switch (section) {
          case 'experience': {
            const points = content.text
              .split('\n')
              .filter(line => line.trim())
              .map(line => line.replace(/^[-•*]\s*/, ''))
            
            formattedContent = resume.experience.map(exp => ({
              ...exp,
              details: points
            }))
            break
          }
          case 'projects': {
            const points = content.text
              .split('\n')
              .filter(line => line.trim())
              .map(line => line.replace(/^[-•*]\s*/, ''))
            
            formattedContent = resume.projects.map(proj => ({
              ...proj,
              details: points
            }))
            break
          }
          case 'skills': {
            const currentSkills = resume.skills || {
              languages: '',
              frameworks: '',
              developerTools: '',
              libraries: ''
            }
            
            const lines = content.text.split('\n').filter(line => line.trim())
            const updatedSkills = { ...currentSkills }
            
            lines.forEach(line => {
              const [category, skills] = line.split(':').map(s => s.trim())
              if (!category || !skills) return
              
              const lowerCategory = category.toLowerCase()
              if (lowerCategory.includes('language')) {
                updatedSkills.languages = skills
              } else if (lowerCategory.includes('framework')) {
                updatedSkills.frameworks = skills
              } else if (lowerCategory.includes('tool')) {
                updatedSkills.developerTools = skills
              } else if (lowerCategory.includes('librar')) {
                updatedSkills.libraries = skills
              }
            })
            
            formattedContent = updatedSkills
            break
          }
        }

        updateResume(section, formattedContent)
        toast({
          title: "Success",
          description: `${title} has been optimized based on the job description`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to optimize ${title}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
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
    </div>
  )
}
