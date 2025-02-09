import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Resume } from '@/types/resume'
import { Trash2 } from 'lucide-react'

interface EducationSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function EducationSection({ resume, updateResume }: EducationSectionProps) {
  const addEducation = () => {
    updateResume('education', [
      ...(resume.education || []),
      { school: '', degree: '', location: '', date: '' }
    ])
  }

  const removeEducation = (index: number) => {
    updateResume('education', resume.education?.filter((_, i) => i !== index) || [])
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...(resume.education || [])]
    newEducation[index] = { ...newEducation[index], [field]: value }
    updateResume('education', newEducation)
  }

  return (
    <div className="space-y-4">
      {resume.education?.map((edu, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-lg">
          <Input
            placeholder="School"
            value={edu.school}
            onChange={(e) => updateEducation(index, 'school', e.target.value)}
          />
          <Input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
          />
          <Input
            placeholder="Location"
            value={edu.location}
            onChange={(e) => updateEducation(index, 'location', e.target.value)}
          />
          <Input
            placeholder="Date"
            value={edu.date}
            onChange={(e) => updateEducation(index, 'date', e.target.value)}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeEducation(index)}
            className="mt-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={addEducation} className="w-full">
        Add Education
      </Button>
    </div>
  )
}
