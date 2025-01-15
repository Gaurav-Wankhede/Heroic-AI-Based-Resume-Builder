'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Wand2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useResume } from '@/hooks/use-resume'
import { useToast } from "@/hooks/use-toast"

export function ExperienceSection() {
  const { resume, updateNestedField, addExperience, removeExperience, addExperienceDetail, removeExperienceDetail } = useResume()
  const [generatingAI, setGeneratingAI] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()

  const generateAIDetail = async (index: number, detailIndex: number) => {
    if (!process.env.API_KEY) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google API key to use AI generation.",
        variant: "destructive",
      })
      return
    }

    const key = `experience-${index}-${detailIndex}`
    setGeneratingAI(prev => ({ ...prev, [key]: true }))

    try {
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a concise, impactful bullet point for a resume experience section.
            Role: ${resume.experience[index].title}
            Company: ${resume.experience[index].company}
            Date: ${resume.experience[index].date}
            Current detail: ${resume.experience[index].details[detailIndex]}
            
            Guidelines:
            1. Start with a strong action verb
            2. Quantify achievements where possible
            3. Highlight specific skills or technologies used
            4. Focus on results and impact
            5. Keep it concise (preferably under 20 words)
            
            Generate only the bullet point text, without any additional explanation.`,
          apiKey: process.env.API_KEY,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI content')
      }

      const data = await response.json()
      const newDetails = [...resume.experience[index].details];
      newDetails[detailIndex] = data.content;
      updateNestedField('experience', index, 'details', newDetails);
    } catch (error) {
      console.error('Error generating AI content:', error)
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGeneratingAI(prev => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Experience</h3>
      {resume.experience.map((exp, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <Input
            placeholder="Title"
            value={exp.title}
            onChange={(e) => updateNestedField('experience', index, 'title', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Company"
            value={exp.company}
            onChange={(e) => updateNestedField('experience', index, 'company', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Location"
            value={exp.location}
            onChange={(e) => updateNestedField('experience', index, 'location', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Date"
            value={exp.date}
            onChange={(e) => updateNestedField('experience', index, 'date', e.target.value)}
            className="mb-2"
          />
          {exp.details.map((detail, detailIndex) => (
            <div key={detailIndex} className="flex items-center space-x-2 mb-2">
              <Input
                placeholder="Detail"
                value={detail}
                onChange={(e) => {
                  const newDetails = [...exp.details];
                  newDetails[detailIndex] = e.target.value;
                  updateNestedField('experience', index, 'details', newDetails);
                }}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => generateAIDetail(index, detailIndex)}
                      disabled={generatingAI[`experience-${index}-${detailIndex}`] || !process.env.API_KEY}
                    >
                      {generatingAI[`experience-${index}-${detailIndex}`] ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate AI content using Gemini 2.0 Flash</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="destructive" size="icon" onClick={() => removeExperienceDetail(index, detailIndex)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={() => addExperienceDetail(index)} className="mb-2">Add Detail</Button>
          <Button variant="destructive" onClick={() => removeExperience(index)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Experience
          </Button>
        </div>
      ))}
      <Button onClick={() => addExperience({ title: '', company: '', location: '', date: '', details: [''] })}>
        Add Experience
      </Button>
    </div>
  )
}
