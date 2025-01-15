'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResume } from '@/hooks/use-resume'

export function SkillsSection() {
  const { resume, updateResume } = useResume()

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="languages">Languages</Label>
          <Input
            id="languages"
            value={resume.skills.languages}
            onChange={(e) => {
              const updatedSkills = { ...resume.skills, languages: e.target.value };
              updateResume('skills', updatedSkills);
            }}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="frameworks">Frameworks</Label>
          <Input
            id="frameworks"
            value={resume.skills.frameworks}
            onChange={(e) => {
              const updatedSkills = { ...resume.skills, frameworks: e.target.value };
              updateResume('skills', updatedSkills);
            }}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="developerTools">Developer Tools</Label>
          <Input
            id="developerTools"
            value={resume.skills.developerTools}
            onChange={(e) => {
              const updatedSkills = { ...resume.skills, developerTools: e.target.value };
              updateResume('skills', updatedSkills);
            }}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="libraries">Libraries</Label>
          <Input
            id="libraries"
            value={resume.skills.libraries}
            onChange={(e) => {
              const updatedSkills = { ...resume.skills, libraries: e.target.value };
              updateResume('skills', updatedSkills);
            }}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}

