'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Wand2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { generateAIContent } from '@/utils/generate-ai-content'
import { Resume, Contact, Education, Experience, Project, Skills } from '@/types/resume'
import { useJobDescription } from '@/contexts/job-description-context'

interface JobDescriptionOptimizerProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: Contact | string | Education[] | Experience[] | Project[] | Skills) => void
}

export function JobDescriptionOptimizer({ resume, updateResume }: JobDescriptionOptimizerProps) {
  const { toast } = useToast()
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { jobData, setJobDescription, setAnalysisResults } = useJobDescription()

  const optimizeResume = async () => {
    if (!jobData?.jobDescription?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description first",
        variant: "destructive",
      })
      return
    }

    setIsOptimizing(true)
    try {
      const experienceString = resume?.experience?.map(exp => 
        `- ${exp.title} at ${exp.company} (${exp.date})
          ${exp.details?.join('\n  ')}`)?.join('\n') || 'No experience listed'

      const projectsString = resume?.projects?.map(proj => 
        `- ${proj.name} (${proj.technologies})
          ${proj.details?.join('\n  ')}`)?.join('\n') || 'No projects listed'

      const prompt = `As an ATS (Applicant Tracking System) optimization expert, analyze this resume against the job description and provide specific recommendations. Focus on increasing the resume's ATS score and matching rate.

Job Description:
${jobData.jobDescription}

Current Resume:
Name: ${resume?.name || ''}
Summary: ${resume?.summary || ''}

Technical Skills:
- Languages: ${resume?.skills?.languages || ''}
- Frameworks: ${resume?.skills?.frameworks || ''}
- Developer Tools: ${resume?.skills?.developerTools || ''}
- Libraries: ${resume?.skills?.libraries || ''}

Professional Experience:
${experienceString}

Projects:
${projectsString}

Please provide the following sections with ATS optimization in mind:
[Rest of your prompt...]`

      const aiResponse = await generateAIContent(prompt)
      if (aiResponse.error) {
        throw new Error(aiResponse.error)
      }

      // Parse AI response sections
      const sections = aiResponse.text.split('\n')
      const results = {
        summary: '',
        skills: [] as string[],
        projects: [] as string[],
        experience: [] as string[]
      }

      type SectionKey = 'summary' | 'skills' | 'projects' | 'experience'
      let currentSection: SectionKey = 'summary'

      for (const line of sections) {
        if (line.startsWith('SUMMARY:')) {
          currentSection = 'summary'
          results.summary = line.replace('SUMMARY:', '').trim()
        } else if (line.startsWith('SKILLS:')) {
          currentSection = 'skills'
        } else if (line.startsWith('PROJECTS:')) {
          currentSection = 'projects'
        } else if (line.startsWith('EXPERIENCE:')) {
          currentSection = 'experience'
        } else if (line.trim() && currentSection !== 'summary') {
          results[currentSection].push(line.trim())
        }
      }

      // Update resume summary and store analysis results
      updateResume('summary', results.summary)
      setAnalysisResults(results)

      toast({
        title: "Success",
        description: "Resume optimized for the job description",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="jobDescription">Job Description</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={optimizeResume}
                disabled={isOptimizing || !jobData.jobDescription.trim()}
              >
                {isOptimizing ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Optimize resume for this job description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id="jobDescription"
        value={jobData.jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here to optimize your resume..."
        className="min-h-[200px]"
      />
      <div className="text-sm text-gray-500">
        <p>Tips for ATS optimization:</p>
        <ul className="list-disc list-inside">
          <li>Use keywords from the job description</li>
          <li>Avoid images, tables, and special characters</li>
          <li>Use standard section headings</li>
          <li>Keep formatting simple</li>
        </ul>
      </div>
    </Card>
  )
}
