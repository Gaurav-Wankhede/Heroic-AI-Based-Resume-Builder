'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Wand2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { generateAIContent } from '@/utils/generate-ai-content'
import { Resume } from '@/types/resume'
import { useState } from "react"
import { useJobDescription } from '@/contexts/job-description-context'

interface SummarySectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function SummarySection({ resume, updateResume }: SummarySectionProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const { jobData } = useJobDescription()

  const generateSummary = async () => {
    setIsGenerating(true)
    try {
      const prompt = `As an ATS optimization expert, create a powerful professional summary that will maximize the resume's ATS score. Use the following information:

${jobData.jobDescription ? `Job Description:
${jobData.jobDescription}

Target Role Requirements:
1. Extract and use exact skill keywords from the job description
2. Match the seniority level and years of experience required
3. Include specific technical requirements mentioned
4. Use the exact job title from the posting

` : ''}Current Profile:
Name: ${resume.name}

Technical Expertise:
- Programming: ${resume.skills.languages}
- Frameworks/Tools: ${resume.skills.frameworks}
- Development Tools: ${resume.skills.developerTools}
- Technical Libraries: ${resume.skills.libraries}

Professional Background:
${resume.experience.map(exp => `• ${exp.title} at ${exp.company} (${exp.date})
  Key Achievements: ${exp.details.join(', ')}`).join('\n')}

Notable Projects:
${resume.projects.map(proj => `• ${proj.name} using ${proj.technologies}
  Impact: ${proj.details.join(', ')}`).join('\n')}

Education:
${resume.education.map(edu => `• ${edu.degree} from ${edu.school} (${edu.date})`).join('\n')}

Requirements for the summary:
1. Length: 3-4 impactful sentences (50-75 words)
2. Structure:
   - First sentence: Professional identity and years of experience
   - Second sentence: Key technical skills and expertise
   - Third sentence: Notable achievements and impact
   - (Optional) Fourth sentence: Career objective aligned with job requirements

3. ATS Optimization:
   - Use industry-standard job titles
   - Include exact keyword matches from job description
   - Maintain proper formatting (no special characters)
   - Prioritize technical skills mentioned in job requirements

4. Format:
   - Write in first person
   - Use active voice
   - Quantify achievements where possible
   - Focus on relevant experience

Generate only the summary text, without any additional explanation or formatting.`

      const aiContent = await generateAIContent(prompt)
      if (aiContent.error) {
        throw new Error(aiContent.error)
      }

      updateResume('summary', aiContent.text)
      toast({
        title: "Success",
        description: "Generated professional summary",
      })
    } catch (error) {
      console.error('Error generating summary:', error)
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="summary">Professional Summary</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={generateSummary}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate summary using AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id="summary"
        value={resume.summary}
        onChange={(e) => updateResume('summary', e.target.value)}
        placeholder="A brief professional summary highlighting your key skills and experiences..."
        className="min-h-[100px]"
      />
    </div>
  )
}
