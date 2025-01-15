import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useResume } from '@/hooks/use-resume'
import { generatePDF } from '@/utils/generate-pdf'
import { ContactSection } from './contact-section'
import { EducationSection } from './education-section'
import { ExperienceSection } from './experience-section'
import { ProjectsSection } from './projects-section'
import { ResumePreview } from './resume-preview'
import { SkillsSection } from './skills-section'
import { SummarySection } from './summary-section'
import { useState } from 'react'
import Link from 'next/link'

export function ResumeBuilder() {
  const { resume, updateResume } = useResume()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(resume)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Heroic AI Based Resume Builder
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[1fr_400px] md:gap-6 lg:grid-cols-[1fr_500px]">
        <div className="relative">
          <div className="sticky top-16 z-40 w-full bg-background">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full md:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <ResumePreview resume={resume} />
          </div>
        </div>

        <aside className="sticky top-16 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto py-6 pr-2 md:block">
          <Tabs defaultValue="contact" className="h-full space-y-6">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="contact"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Skills
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contact" className="border-none p-0 outline-none">
              <ContactSection resume={resume} updateResume={updateResume} />
            </TabsContent>
            <TabsContent value="summary" className="border-none p-0 outline-none">
              <SummarySection resume={resume} updateResume={updateResume} />
            </TabsContent>
            <TabsContent value="education" className="border-none p-0 outline-none">
              <EducationSection resume={resume} updateResume={updateResume} />
            </TabsContent>
            <TabsContent value="experience" className="border-none p-0 outline-none">
              <ExperienceSection resume={resume} updateResume={updateResume} />
            </TabsContent>
            <TabsContent value="projects" className="border-none p-0 outline-none">
              <ProjectsSection resume={resume} updateResume={updateResume} />
            </TabsContent>
            <TabsContent value="skills" className="border-none p-0 outline-none">
              <SkillsSection resume={resume} updateResume={updateResume} />
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}
