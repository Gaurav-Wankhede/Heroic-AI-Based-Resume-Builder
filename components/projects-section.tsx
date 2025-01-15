'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Wand2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useResume } from '@/hooks/use-resume'
import { useToast } from "@/hooks/use-toast"

export function ProjectsSection() {
  const { resume, updateResume, addProject, removeProject, addProjectDetail, removeProjectDetail, updateNestedField } = useResume()
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

    const key = `project-${index}-${detailIndex}`
    setGeneratingAI(prev => ({ ...prev, [key]: true }))

    try {
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a concise, impactful bullet point for a resume project section.
            Project: ${resume.projects[index].name}
            Technologies: ${resume.projects[index].technologies}
            Date: ${resume.projects[index].date}
            Current detail: ${resume.projects[index].details[detailIndex]}
            
            Guidelines:
            1. Start with a strong action verb
            2. Highlight specific technologies or methodologies used
            3. Focus on the project's impact or results
            4. Keep it concise (preferably under 20 words)
            
            Generate only the bullet point text, without any additional explanation.`,
          apiKey: process.env.API_KEY,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI content')
      }

      const data = await response.json()
      const newDetails = [...resume.projects[index].details];
      newDetails[detailIndex] = data.content;
      updateNestedField('projects', index, 'details', newDetails)
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
      <h3 className="text-xl font-semibold mb-4">Projects</h3>
      {resume.projects.map((project, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <Input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => updateNestedField('projects', index, 'name', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Technologies"
            value={project.technologies}
            onChange={(e) => updateNestedField('projects', index, 'technologies', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Date"
            value={project.date}
            onChange={(e) => updateNestedField('projects', index, 'date', e.target.value)}
            className="mb-2"
          />
          {project.details.map((detail, detailIndex) => (
            <div key={detailIndex} className="flex items-center space-x-2 mb-2">
              <Input
                placeholder="Detail"
                value={detail}
                onChange={(e) => {
                  const newDetails = [...project.details];
                  newDetails[detailIndex] = e.target.value;
                  updateNestedField('projects', index, 'details', newDetails);
                }}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => generateAIDetail(index, detailIndex)}
                      disabled={generatingAI[`project-${index}-${detailIndex}`] || !process.env.API_KEY}
                    >
                      {generatingAI[`project-${index}-${detailIndex}`] ? (
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
              <Button variant="destructive" size="icon" onClick={() => removeProjectDetail(index, detailIndex)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={() => addProjectDetail(index)} className="mb-2">Add Detail</Button>
          <Button variant="destructive" onClick={() => removeProject(index)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Project
          </Button>
        </div>
      ))}
      <Button onClick={() => addProject({ name: '', technologies: '', date: '', details: [''] })}>
        Add Project
      </Button>
    </div>
  )
}
