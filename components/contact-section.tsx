'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Resume, Contact, Education, Experience, Project, Skills } from '@/types/resume'
import React from 'react'

interface ContactSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: Contact | string | Education[] | Experience[] | Project[] | Skills) => void
}

export function ContactSection({ resume, updateResume }: ContactSectionProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const currentContact = resume.contact || {
      mobile: '',
      email: '',
      linkedin: '',
      github: '',
      portfolio: ''
    }
    updateResume('contact', { ...currentContact, [name]: value })
  }

  const contact = resume.contact || {
    mobile: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: ''
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          type="tel"
          id="mobile"
          name="mobile"
          value={contact.mobile}
          onChange={handleInputChange}
          placeholder="123-456-7890"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={contact.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          type="url"
          id="linkedin"
          name="linkedin"
          value={contact.linkedin}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/your-profile"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="github">GitHub URL</Label>
        <Input
          type="url"
          id="github"
          name="github"
          value={contact.github}
          onChange={handleInputChange}
          placeholder="https://github.com/your-username"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="portfolio">Portfolio URL</Label>
        <Input
          type="url"
          id="portfolio"
          name="portfolio"
          value={contact.portfolio}
          onChange={handleInputChange}
          placeholder="https://your-portfolio.com"
        />
      </div>
    </div>
  )
}
