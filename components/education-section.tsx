'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from 'lucide-react'
import { useResume } from '@/hooks/use-resume'

export function EducationSection() {
  const { resume, updateNestedField, addEducation, removeEducation } = useResume()

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Education</h3>
      {resume.education.map((edu, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <Input
            placeholder="School"
            value={edu.school}
            onChange={(e) => updateNestedField('education', index, 'school', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateNestedField('education', index, 'degree', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Location"
            value={edu.location}
            onChange={(e) => updateNestedField('education', index, 'location', e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Date"
            value={edu.date}
            onChange={(e) => updateNestedField('education', index, 'date', e.target.value)}
            className="mb-2"
          />
          <Button variant="destructive" onClick={() => removeEducation(index)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={() => addEducation({ school: '', degree: '', location: '', date: '' })}>
        Add Education
      </Button>
    </div>
  )
}
