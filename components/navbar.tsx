'use client'

import { Wand2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResumeContext } from '@/contexts/resume-context'
import { generatePDF } from '@/utils/generate-pdf'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export function Navbar() {
  const { resume } = useResumeContext()
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(resume)
      toast({
        title: "Success",
        description: "Resume PDF has been downloaded",
      })
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <nav className="border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Heroic AI Based Resume Builder</h1>
          </div>
          <Button 
            onClick={handleDownloadPDF} 
            disabled={isGeneratingPDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </nav>
  )
}
