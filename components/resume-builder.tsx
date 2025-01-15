'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Wand2, Download, CreditCard } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { ResumePreview } from './resume-preview'
import { SummarySection } from './summary-section'
import { ContactSection } from './contact-section'
import { JobDescriptionOptimizer } from './job-description-optimizer'
import { JobDescriptionProvider } from '@/contexts/job-description-context'
import { Resume, Experience, Project, Contact } from '../types/resume'
import { generatePDF } from '../utils/generate-pdf'
import { generateAIContent } from '../utils/generate-ai-content'

const initialResume: Resume = {
  name: 'Gaurav Wankhede',
  contact: {
    mobile: '123-456-7890',
    email: 'gauravanilwankhede2002@gmail.com',
    linkedin: 'https://www.linkedin.com/in/wankhede-gaurav/',
    github: 'https://github.com/Gaurav-Wankhede',
    portfolio: 'https://gaurav-wankhede.vercel.app/'
  },
  education: [
    {
      school: 'Southwestern University',
      degree: 'Bachelor of Arts in Computer Science, Minor in Business',
      location: 'Georgetown, TX',
      date: 'Aug. 2018 - May 2021'
    },
    {
      school: 'Blinn College',
      degree: 'Associate\'s in Liberal Arts',
      location: 'Bryan, TX',
      date: 'Aug. 2014 - May 2018'
    }
  ],
  experience: [
    {
      title: 'Undergraduate Research Assistant',
      company: 'Texas A&M University',
      location: 'College Station, TX',
      date: 'June 2020 - Present',
      details: [
        'Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems',
        'Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data',
        'Explored ways to visualize GitHub collaboration in a classroom setting'
      ]
    },
    {
      title: 'Information Technology Support Specialist',
      company: 'Southwestern University',
      location: 'Georgetown, TX',
      date: 'Sep. 2018 - Present',
      details: [
        'Communicate with managers to set up campus computers used on campus',
        'Assess and troubleshoot computer problems brought by students, faculty and staff',
        'Maintain upkeep of computers, classroom equipment, and 200 printers across campus'
      ]
    }
  ],
  projects: [
    {
      name: 'Gitlytics',
      technologies: 'Python, Flask, React, PostgreSQL, Docker',
      date: 'June 2020 - Present',
      details: [
        'Developed a full-stack web application using with Flask serving a REST API with React as the frontend',
        'Implemented GitHub OAuth to get data from user\'s repositories',
        'Visualized GitHub data to show collaboration',
        'Used Celery and Redis for asynchronous tasks'
      ]
    },
    {
      name: 'Simple Paintball',
      technologies: 'Spigot API, Java, Maven, TravisCI, Git',
      date: 'May 2018 - May 2020',
      details: [
        'Developed a Minecraft server plugin to entertain kids during free time for a previous job',
        'Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review',
        'Implemented continuous delivery using TravisCI to build the plugin upon new a release',
        'Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin'
      ]
    }
  ],
  skills: {
    languages: 'Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS',
    frameworks: 'NextJS, Streamlit, WordPress, Material-UI, FastAPI, ',
    developerTools: 'Git, Docker, Google Cloud Platform, Vercel Cloud, VS Code, Visual Studio, PyCharm',
    libraries: 'Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, Keras, PyTorch'
  },
  summary: 'Experienced software engineer with a strong foundation in building scalable web applications...'
}

export function ResumeBuilder() {
  const [resume, setResume] = useState<Resume>(initialResume)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [generatingAI, setGeneratingAI] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()

  const updateResume = (field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }))
  }

  const updateNestedField = (
    section: 'education' | 'experience' | 'projects',
    index: number,
    field: string,
    value: any
  ) => {
    setResume(prev => {
      const sectionArray = prev[section] as any[];
      const newSection = [...sectionArray];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  }

  const addItem = (section: 'education' | 'experience' | 'projects', item: any) => {
    setResume(prev => ({ ...prev, [section]: [...prev[section], item] }))
  }

  const removeItem = (section: 'education' | 'experience' | 'projects', index: number) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const updateDetail = (section: 'experience' | 'projects', itemIndex: number, detailIndex: number, value: string) => {
    setResume(prev => {
      const newSection = [...prev[section]]
      newSection[itemIndex] = {
        ...newSection[itemIndex],
        details: newSection[itemIndex].details.map((detail, i) =>
          i === detailIndex ? value : detail
        )
      }
      return { ...prev, [section]: newSection }
    })
  }

  const addDetail = (section: 'experience' | 'projects', itemIndex: number) => {
    setResume(prev => {
      const newSection = [...prev[section]]
      newSection[itemIndex] = {
        ...newSection[itemIndex],
        details: [...newSection[itemIndex].details, '']
      }
      return { ...prev, [section]: newSection }
    })
  }

  const removeDetail = (section: 'experience' | 'projects', itemIndex: number, detailIndex: number) => {
    setResume(prev => {
      const newSection = [...prev[section]]
      newSection[itemIndex] = {
        ...newSection[itemIndex],
        details: newSection[itemIndex].details.filter((_, i) => i !== detailIndex)
      }
      return { ...prev, [section]: newSection }
    })
  }

  const generateAIDetail = async (section: 'experience' | 'projects', itemIndex: number, detailIndex: number) => {
    const key = `${section}-${itemIndex}-${detailIndex}`
    setGeneratingAI(prev => ({ ...prev, [key]: true }))

    const item = resume[section][itemIndex]
    const roleTitle = section === 'experience' ? (item as Experience).title : (item as Project).name
    const companyOrTech = section === 'experience' ? (item as Experience).company : (item as Project).technologies

    const prompt = `Generate a concise, impactful bullet point for a resume ${section} section.
      Role: ${roleTitle}
      ${section === 'experience' ? 'Company' : 'Technologies'}: ${companyOrTech}
      Date: ${item.date}
      Current detail: ${item.details[detailIndex]}
      
      Guidelines:
      1. Start with a strong action verb
      2. Quantify achievements where possible
      3. Highlight specific skills or technologies used
      4. Focus on results and impact
      5. Keep it concise (preferably under 20 words)
      
      Generate only the bullet point text, without any additional explanation.`
    
    try {
      const aiContent = await generateAIContent(prompt)
      if (aiContent.error) {
        throw new Error(aiContent.error)
      }
      updateDetail(section, itemIndex, detailIndex, aiContent.text)
    } catch (error) {
      console.error('Error generating AI content:', error)
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGeneratingAI(prev => ({ ...prev, [key]: false }))
    }
  }

  const generateAllAIDetails = async (section: 'experience' | 'projects', itemIndex: number) => {
    const item = resume[section][itemIndex]
    setGeneratingAI(prev => ({ ...prev, [`${section}-${itemIndex}-all`]: true }))

    const prompt = `Generate 3-5 concise, impactful bullet points for a resume ${section} section.
      Role: ${section === 'experience' ? (item as Experience).title : (item as Project).name}
      ${section === 'experience' ? 'Company' : 'Technologies'}: ${section === 'experience' ? (item as Experience).company : (item as Project).technologies}
      Date: ${item.date}
      
      Guidelines:
      1. Start each point with a strong action verb
      2. Quantify achievements where possible
      3. Highlight specific skills or technologies used
      4. Focus on results and impact
      5. Keep each point concise (preferably under 20 words)
      
      Generate only the bullet points, separated by newlines, without any additional explanation.`

    try {
      const aiContent = await generateAIContent(prompt)
      if (aiContent.error) {
        throw new Error(aiContent.error)
      }
      const newDetails = aiContent.text.split('\n').filter(detail => detail.trim() !== '')

      setResume(prev => {
        const newSection = [...prev[section]]
        newSection[itemIndex] = {
          ...newSection[itemIndex],
          details: newDetails
        }
        return { ...prev, [section]: newSection }
      })
    } catch (error) {
      console.error('Error generating AI content:', error)
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGeneratingAI(prev => ({ ...prev, [`${section}-${itemIndex}-all`]: false }))
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(resume)
      toast({
        title: "PDF Generated",
        description: "Your resume PDF has been successfully generated and downloaded.",
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleAddAICredits = () => {
    console.log('Adding AI credits')
    toast({
      title: "AI Credits",
      description: "AI credit functionality not implemented yet.",
    })
  }

  return (
    <JobDescriptionProvider>
      <div className="flex flex-col h-screen">
        <nav className="bg-primary text-primary-foreground shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="font-bold text-xl">Heroic AI Based Resume Builder</span>
              </div>
              <div className="flex items-center">
                <Button 
                  onClick={handleDownloadPDF} 
                  disabled={isGeneratingPDF}
                  variant="secondary"
                >
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={resume.name}
                  onChange={(e) => updateResume('name', e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <ContactSection resume={resume} updateResume={updateResume} />
              </div>
              
              <SummarySection resume={resume} updateResume={updateResume} />

              <div className="mt-6 mb-4">
                <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
                <JobDescriptionOptimizer resume={resume} updateResume={updateResume} />
              </div>
              
              <h3 className="text-xl font-semibold mt-4">Education</h3>
              {resume.education.map((edu, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <Input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => updateNestedField('education', index, 'school', e.target.value)}
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateNestedField('education', index, 'degree', e.target.value)}
                  />
                  <Input
                    placeholder="Date"
                    value={edu.date}
                    onChange={(e) => updateNestedField('education', index, 'date', e.target.value)}
                  />
                  <Button variant="destructive" onClick={() => removeItem('education', index)}>Remove</Button>
                </div>
              ))}
              <Button onClick={() => addItem('education', { school: '', degree: '', date: '', details: [''] })}>
                Add Education
              </Button>
              
              <h3 className="text-xl font-semibold mt-4">Experience</h3>
              {resume.experience.map((exp, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <Input
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => updateNestedField('experience', index, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateNestedField('experience', index, 'company', e.target.value)}
                  />
                  <Input
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => updateNestedField('experience', index, 'location', e.target.value)}
                  />
                  <Input
                    placeholder="Date"
                    value={exp.date}
                    onChange={(e) => updateNestedField('experience', index, 'date', e.target.value)}
                  />
                  {exp.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2">
                      <Input
                        placeholder="Detail"
                        value={detail}
                        onChange={(e) => updateDetail('experience', index, detailIndex, e.target.value)}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => generateAIDetail('experience', index, detailIndex)}
                              disabled={generatingAI[`experience-${index}-${detailIndex}`]}
                            >
                              {generatingAI[`experience-${index}-${detailIndex}`] ? (
                                <span className="animate-spin">⏳</span>
                              ) : (
                                <Wand2 className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate AI content using Gemini 2.0 Flash</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button variant="destructive" size="icon" onClick={() => removeDetail('experience', index, detailIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addDetail('experience', index)}>Add Detail</Button>
                  <Button 
                    onClick={() => generateAllAIDetails('experience', index)} 
                    disabled={generatingAI[`experience-${index}-all`]} 
                    className="mt-2"
                  >
                    {generatingAI[`experience-${index}-all`] ? (
                      <span className="animate-spin mr-2">⏳</span>
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate All Details
                  </Button>
                  <Button variant="destructive" onClick={() => removeItem('experience', index)}>Remove Experience</Button>
                </div>
              ))}
              <Button onClick={() => addItem('experience', { title: '', company: '', location: '', date: '', details: [''] })}>
                Add Experience
              </Button>
              
              <h3 className="text-xl font-semibold mt-4">Projects</h3>
              {resume.projects.map((project, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <Input
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateNestedField('projects', index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Technologies"
                    value={project.technologies}
                    onChange={(e) => updateNestedField('projects', index, 'technologies', e.target.value)}
                  />
                  <Input
                    placeholder="Date"
                    value={project.date}
                    onChange={(e) => updateNestedField('projects', index, 'date', e.target.value)}
                  />
                  {project.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2">
                      <Input
                        placeholder="Detail"
                        value={detail}
                        onChange={(e) => updateDetail('projects', index, detailIndex, e.target.value)}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => generateAIDetail('projects', index, detailIndex)}
                              disabled={generatingAI[`projects-${index}-${detailIndex}`]}
                            >
                              {generatingAI[`projects-${index}-${detailIndex}`] ? (
                                <span className="animate-spin">⏳</span>
                              ) : (
                                <Wand2 className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate AI content using Gemini 2.0 Flash</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button variant="destructive" size="icon" onClick={() => removeDetail('projects', index, detailIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addDetail('projects', index)}>Add Detail</Button>
                  <Button 
                    onClick={() => generateAllAIDetails('projects', index)} 
                    disabled={generatingAI[`projects-${index}-all`]} 
                    className="mt-2"
                  >
                    {generatingAI[`projects-${index}-all`] ? (
                      <span className="animate-spin mr-2">⏳</span>
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate All Details
                  </Button>
                  <Button variant="destructive" onClick={() => removeItem('projects', index)}>Remove Project</Button>
                </div>
              ))}
              <Button onClick={() => addItem('projects', { name: '', technologies: '', date: '', details: [''] })}>
                Add Project
              </Button>
              
              <h3 className="text-xl font-semibold mt-4">Technical Skills</h3>
              <div>
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  value={resume.skills.languages}
                  onChange={(e) => updateResume('skills', { ...resume.skills, languages: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="frameworks">Frameworks</Label>
                <Input
                  id="frameworks"
                  value={resume.skills.frameworks}
                  onChange={(e) => updateResume('skills', { ...resume.skills, frameworks: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="developerTools">Developer Tools</Label>
                <Input
                  id="developerTools"
                  value={resume.skills.developerTools}
                  onChange={(e) => updateResume('skills', { ...resume.skills, developerTools: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="libraries">Libraries</Label>
                <Input
                  id="libraries"
                  value={resume.skills.libraries}
                  onChange={(e) => updateResume('skills', { ...resume.skills, libraries: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="w-1/2 p-4 bg-gray-100 overflow-y-auto">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </JobDescriptionProvider>
  )
}
