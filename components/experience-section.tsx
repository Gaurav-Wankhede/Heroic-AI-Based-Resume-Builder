import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Resume } from '@/types/resume'
import { Wand2, Plus, Trash, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { generateAIContent } from '@/utils/generate-ai-content'
import { useToast } from '@/hooks/use-toast'

interface ExperienceSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function ExperienceSection({ resume, updateResume }: ExperienceSectionProps) {
  const [isGenerating, setIsGenerating] = useState<number | null>(null)
  const { toast } = useToast()

  // Initialize experience array if undefined
  const experiences = resume.experience || []

  const addExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      location: '',
      date: '',
      details: ['']
    }
    updateResume('experience', [...experiences, newExperience])
  }

  const removeExperience = (index: number) => {
    const updatedExperience = experiences.filter((_, i) => i !== index)
    updateResume('experience', updatedExperience)
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = experiences.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const addDetail = (experienceIndex: number) => {
    const updatedExperience = experiences.map((exp, i) => {
      if (i === experienceIndex) {
        return { ...exp, details: [...(exp.details || []), ''] }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const removeDetail = (experienceIndex: number, detailIndex: number) => {
    const updatedExperience = experiences.map((exp, i) => {
      if (i === experienceIndex) {
        const updatedDetails = exp.details.filter((_, index) => index !== detailIndex)
        return { ...exp, details: updatedDetails }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const updateDetail = (experienceIndex: number, detailIndex: number, value: string) => {
    const updatedExperience = experiences.map((exp, i) => {
      if (i === experienceIndex) {
        const updatedDetails = exp.details.map((detail, j) => {
          if (j === detailIndex) {
            return value
          }
          return detail
        })
        return { ...exp, details: updatedDetails }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const generateDetails = async (index: number) => {
    const experience = experiences[index]
    if (!experience?.title || !experience?.company) {
      toast({
        title: 'Error',
        description: 'Please fill in the job title and company first',
        variant: 'destructive',
      })
      return
    }

    setIsGenerating(index)
    try {
      const prompt = `Generate 3-4 impactful bullet points for the following job experience:
      Title: ${experience.title}
      Company: ${experience.company}
      Date: ${experience.date}

      Please create bullet points that:
      1. Start with strong action verbs
      2. Include quantifiable achievements where possible
      3. Highlight key responsibilities and impact
      4. Are concise and specific
      
      Format: Return only the bullet points, one per line, without numbers or bullet points.`

      const { text, error } = await generateAIContent(prompt)

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        })
        return
      }

      if (text) {
        const details = text.split('\n').filter(line => line.trim())
        const updatedExperience = experiences.map((exp, i) => {
          if (i === index) {
            return { ...exp, details }
          }
          return exp
        })
        updateResume('experience', updatedExperience)
        toast({
          title: 'Success',
          description: 'Generated job details!',
        })
      }
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to generate job details',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(null)
    }
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-lg relative">

          <Input
            placeholder="Job Title"
            value={exp.title || ''}
            onChange={(e) => updateExperience(index, 'title', e.target.value)}
          />
          <Input
            placeholder="Company"
            value={exp.company || ''}
            onChange={(e) => updateExperience(index, 'company', e.target.value)}
          />
          <Input
            placeholder="Location"
            value={exp.location || ''}
            onChange={(e) => updateExperience(index, 'location', e.target.value)}
          />
          <Input
            placeholder="Date"
            value={exp.date || ''}
            onChange={(e) => updateExperience(index, 'date', e.target.value)}
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Details</h4>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => generateDetails(index)}
                  disabled={isGenerating === index}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addDetail(index)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {exp.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="flex items-center gap-2">
                <Input
                  value={detail}
                  onChange={(e) => updateDetail(index, detailIndex, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDetail(index, detailIndex)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
            variant="destructive"
            size="sm"
            onClick={() => removeExperience(index)}
            className="mt-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
          </div>
          
        </div>
      ))}

      <Button onClick={addExperience} className="w-full">
        Add Experience
      </Button>
    </div>
  )
}
