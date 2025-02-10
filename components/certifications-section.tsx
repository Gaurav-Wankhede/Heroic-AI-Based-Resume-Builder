'use client'

import { Certification } from '@/types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useResumeContext } from '@/contexts/resume-context'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Resume } from '@/types/resume'

interface CertificationsSectionProps {
  resume: Resume
  updateResume: (field: keyof Resume, value: any) => void
}

export function CertificationsSection({ resume, updateResume }: CertificationsSectionProps) {
  const { addCertification, removeCertification, updateCertification } = useResumeContext()
  const { toast } = useToast()

  useEffect(() => {
    console.log('CertificationsSection mounted with resume:', resume)
    if (!resume?.certifications) {
      console.log('No certifications found in resume')
    }
  }, [resume])

  if (!resume) {
    console.error('Resume is undefined')
    return <div>Loading resume...</div>
  }

  const certifications = resume.certifications || []

  const handleAddCertification = () => {
    try {
      console.log('Adding new certification')
      const newCertification: Certification = {
        name: '',
        provider: '',
        issueDate: new Date().toISOString().split('T')[0],
        url: ''
      }
      addCertification(newCertification)
      toast({
        title: "Success",
        description: "New certification added successfully",
      })
    } catch (error) {
      console.error('Error adding certification:', error)
      toast({
        title: "Error",
        description: "Failed to add certification",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCertification = (index: number, field: keyof Certification, value: string) => {
    try {
      console.log('Updating certification:', { index, field, value })
      updateCertification(index, field, value)
    } catch (error) {
      console.error('Error updating certification:', error)
      toast({
        title: "Error",
        description: "Failed to update certification",
        variant: "destructive",
      })
    }
  }

  const handleRemoveCertification = (index: number) => {
    try {
      console.log('Removing certification:', index)
      removeCertification(index)
      toast({
        title: "Success",
        description: "Certification removed successfully",
      })
    } catch (error) {
      console.error('Error removing certification:', error)
      toast({
        title: "Error",
        description: "Failed to remove certification",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {certifications.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No certifications added yet. Click the button below to add one.
        </div>
      )}
      
      {certifications.map((certification, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor={`cert-name-${index}`}>Certificate Name</Label>
                <Input
                  id={`cert-name-${index}`}
                  placeholder="e.g., AWS Solutions Architect"
                  value={certification.name}
                  onChange={(e) => handleUpdateCertification(index, 'name', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`cert-provider-${index}`}>Certificate Provider</Label>
                <Input
                  id={`cert-provider-${index}`}
                  placeholder="e.g., Amazon Web Services"
                  value={certification.provider}
                  onChange={(e) => handleUpdateCertification(index, 'provider', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`cert-date-${index}`}>Date of Issue</Label>
                <Input
                  id={`cert-date-${index}`}
                  type="date"
                  value={certification.issueDate}
                  onChange={(e) => handleUpdateCertification(index, 'issueDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`cert-url-${index}`} className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Certificate URL
                </Label>
                <Input
                  id={`cert-url-${index}`}
                  type="url"
                  placeholder="https://www.credential.net/..."
                  value={certification.url}
                  onChange={(e) => handleUpdateCertification(index, 'url', e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCertification(index)}
              className="ml-2 text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      
      <Button 
        onClick={handleAddCertification} 
        className="w-full"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  )
} 