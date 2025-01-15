import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Resume } from '@/types/resume'
import { Wand2, Plus, Trash } from 'lucide-react'
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

  const addExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      location: '',
      date: '',
      details: ['']
    }
    updateResume('experience', [...resume.experience, newExperience])
  }

  const removeExperience = (index: number) => {
    const updatedExperience = resume.experience.filter((_, i) => i !== index)
    updateResume('experience', updatedExperience)
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = resume.experience.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const addDetail = (experienceIndex: number) => {
    const updatedExperience = resume.experience.map((exp, i) => {
      if (i === experienceIndex) {
        return { ...exp, details: [...exp.details, ''] }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const removeDetail = (experienceIndex: number, detailIndex: number) => {
    const updatedExperience = resume.experience.map((exp, i) => {
      if (i === experienceIndex) {
        const updatedDetails = exp.details.filter((_, j) => j !== detailIndex)
        return { ...exp, details: updatedDetails }
      }
      return exp
    })
    updateResume('experience', updatedExperience)
  }

  const updateDetail = (experienceIndex: number, detailIndex: number, value: string) => {
    const updatedExperience = resume.experience.map((exp, i) => {
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
    const experience = resume.experience[index]
    if (!experience.title || !experience.company) {
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
        const updatedExperience = resume.experience.map((exp, i) => {
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
    <div className="space-y-6">
      {resume.experience.map((exp, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeExperience(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => updateExperience(index, 'title', e.target.value)}
            />
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
            />
            <Input
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(index, 'location', e.target.value)}
            />
            <Input
              placeholder="Date"
              value={exp.date}
              onChange={(e) => updateExperience(index, 'date', e.target.value)}
            />
          </div>

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
              <div key={detailIndex} className="flex gap-2">
                <Input
                  placeholder="Add detail..."
                  value={detail}
                  onChange={(e) =>
                    updateDetail(index, detailIndex, e.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDetail(index, detailIndex)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={addExperience} className="w-full">
        Add Experience
      </Button>
    </div>
  )
}
