'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Resume, Contact } from '@/types/resume'

interface ContactSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function ContactSection({ resume, updateResume }: ContactSectionProps) {
  const updateContact = (field: keyof Contact, value: string) => {
    const currentContact = resume.contact || {
      mobile: '',
      email: '',
      linkedin: '',
      github: '',
      portfolio: ''
    }
    updateResume('contact', { ...currentContact, [field]: value })
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
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          id="mobile"
          type="tel"
          placeholder="+1 (123) 456-7890"
          value={contact.mobile || ''}
          onChange={(e) => updateContact('mobile', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={contact.email || ''}
          onChange={(e) => updateContact('email', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={contact.linkedin || ''}
          onChange={(e) => updateContact('linkedin', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="github">GitHub URL</Label>
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/yourusername"
          value={contact.github || ''}
          onChange={(e) => updateContact('github', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="portfolio">Portfolio URL</Label>
        <Input
          id="portfolio"
          type="url"
          placeholder="https://yourportfolio.com"
          value={contact.portfolio || ''}
          onChange={(e) => updateContact('portfolio', e.target.value)}
        />
      </div>
    </div>
  )
}
