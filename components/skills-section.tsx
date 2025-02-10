'use client'

import { Input } from '@/components/ui/input'
import { Resume } from '@/types/resume'

interface SkillsSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
  categories: string[];
}

export function SkillsSection({ resume, updateResume, categories }: SkillsSectionProps) {
  const skills = resume.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }

  const updateSkills = (field: keyof Resume['skills'], value: string) => {
    updateResume('skills', { ...skills, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Programming Languages"
          value={skills.languages || ''}
          onChange={(e) => updateSkills('languages', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Frameworks"
          value={skills.frameworks || ''}
          onChange={(e) => updateSkills('frameworks', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Developer Tools"
          value={skills.developerTools || ''}
          onChange={(e) => updateSkills('developerTools', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Libraries"
          value={skills.libraries || ''}
          onChange={(e) => updateSkills('libraries', e.target.value)}
        />
      </div>
    </div>
  )
}
