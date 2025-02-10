'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DonateButton } from '@/components/donate-button'
import { Download, Coffee } from 'lucide-react'
import { useResumeContext } from '@/contexts/resume-context'
import { generatePDF } from '@/utils/generate-pdf'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'

export function Navbar() {
  const { resume, selectedTemplate } = useResumeContext()
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(resume, selectedTemplate)
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-x-6">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Heroic Resume Builder
            </span>
          </Link>
          <nav className="flex items-center gap-x-4">
            <Link
              href="/resume"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/resume'
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground'
              )}
            >
              Resume
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-x-4">
          <Button 
            variant="ghost"
            className={cn(
              "gap-2 rounded-full transition-all duration-200",
              "bg-[#FF813F] hover:bg-[#FF9B3F]",
              "text-white font-medium",
              "shadow-[0_2px_8px_rgba(255,129,63,0.25)]",
              "hover:shadow-[0_4px_12px_rgba(255,129,63,0.35)]",
              "border border-[#FF9B3F]/20"
            )}
            onClick={() => setIsOpen(true)}
          >
            <Coffee className="h-4 w-4 animate-bounce" />
            <span className="font-medium">Buy me a coffee</span>
          </Button>

          <Button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className={cn(
              "gap-2 rounded-full transition-all duration-200",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "hover:from-blue-600 hover:to-blue-700",
              "text-white font-medium",
              "shadow-[0_2px_8px_rgba(59,130,246,0.25)]",
              "hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]",
              "border border-blue-400/20"
            )}
          >
            <Download className="h-4 w-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </header>
  )
}
