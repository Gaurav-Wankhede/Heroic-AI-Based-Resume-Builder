'use client';

import { Project, Resume } from '@/types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

interface ProjectsSectionProps {
  resume: Resume;
  updateResume: (field: keyof Resume, value: any) => void;
}

export function ProjectsSection({ resume, updateResume }: ProjectsSectionProps) {
  const projects = resume.projects || [];

  const addProject = () => {
    const newProject: Project = {
      name: '',
      technologies: '',
      date: '',
      details: [''],
      deployedLink: '',
      githubLink: '',
      presentationLink: ''
    };
    updateResume('projects', [...projects, newProject]);
  }

  const updateProject = (index: number, key: keyof Project, value: string | string[]) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === index) {
        return { 
          ...project, 
          [key]: value 
        };
      }
      return project;
    });
    updateResume('projects', updatedProjects);
  }

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    updateResume('projects', updatedProjects);
  }

  const removeProjectDetail = (projectIndex: number, detailIndex: number) => {
    const updatedProjects = projects.map((project, i) => {
      if (i === projectIndex) {
        const newDetails = project.details.filter((_, j) => j !== detailIndex);
        return { ...project, details: newDetails };
      }
      return project;
    });
    updateResume('projects', updatedProjects);
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{project.name}</h3>
            <SectionHeader
              title=""
              hasAI={true}
              section="projects"
              resume={resume}
              projectIndex={index}
              className="mb-0"
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-4">
              <Input
                placeholder="Project name"
                value={project.name || ''}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
              />
              <Input
                placeholder="Technologies used"
                value={project.technologies || ''}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
              />
              <Input
                placeholder="Date (e.g., 2023 or Jan 2023)"
                value={project.date || ''}
                onChange={(e) => updateProject(index, 'date', e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Deployed URL"
                  value={project.deployedLink || ''}
                  onChange={(e) => updateProject(index, 'deployedLink', e.target.value)}
                />
                <Input
                  placeholder="GitHub Repository URL"
                  value={project.githubLink || ''}
                  onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                />
                <Input
                  placeholder="Presentation/Demo URL"
                  value={project.presentationLink || ''}
                  onChange={(e) => updateProject(index, 'presentationLink', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                {project.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2">
                    <Textarea
                      placeholder="Project detail"
                      value={detail || ''}
                      onChange={(e) => {
                        const newDetails = [...project.details];
                        newDetails[detailIndex] = e.target.value;
                        updateProject(index, 'details', newDetails);
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProjectDetail(index, detailIndex)}
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDetails = [...project.details, ''];
                    updateProject(index, 'details', newDetails);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Detail
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeProject(index)}
              className="ml-2 text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <Button onClick={addProject} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
