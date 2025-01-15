import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Resume } from '@/types/resume'
import { Trash2 } from 'lucide-react'

interface ProjectsSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function ProjectsSection({ resume, updateResume }: ProjectsSectionProps) {
  const addProject = () => {
    updateResume('projects', [
      ...resume.projects,
      { name: '', technologies: '', date: '', details: [''] }
    ])
  }

  const removeProject = (index: number) => {
    updateResume('projects', resume.projects.filter((_, i) => i !== index))
  }

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...resume.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateResume('projects', newProjects)
  }

  const addDetail = (projectIndex: number) => {
    const newProjects = [...resume.projects]
    newProjects[projectIndex].details.push('')
    updateResume('projects', newProjects)
  }

  const removeDetail = (projectIndex: number, detailIndex: number) => {
    const newProjects = [...resume.projects]
    newProjects[projectIndex].details = newProjects[projectIndex].details.filter((_, i) => i !== detailIndex)
    updateResume('projects', newProjects)
  }

  const updateDetail = (projectIndex: number, detailIndex: number, value: string) => {
    const newProjects = [...resume.projects]
    newProjects[projectIndex].details[detailIndex] = value
    updateResume('projects', newProjects)
  }

  return (
    <div className="space-y-4">
      {resume.projects.map((project, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-lg">
          <Input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => updateProject(index, 'name', e.target.value)}
          />
          <Input
            placeholder="Technologies"
            value={project.technologies}
            onChange={(e) => updateProject(index, 'technologies', e.target.value)}
          />
          <Input
            placeholder="Date"
            value={project.date}
            onChange={(e) => updateProject(index, 'date', e.target.value)}
          />
          
          <div className="space-y-2">
            {project.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="flex gap-2">
                <Input
                  placeholder="Detail"
                  value={detail}
                  onChange={(e) => updateDetail(index, detailIndex, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeDetail(index, detailIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addDetail(index)}
              className="w-full"
            >
              Add Detail
            </Button>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeProject(index)}
            className="mt-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={addProject} className="w-full">
        Add Project
      </Button>
    </div>
  )
}
