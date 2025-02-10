'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Code, Globe, Github, Presentation } from 'lucide-react';

interface ProjectPortfolioTemplateProps {
  resume: Resume;
  className?: string;
}

export function ProjectPortfolioTemplate({ resume, className }: ProjectPortfolioTemplateProps) {
  // Add null checks and default values
  const contact = resume?.contact || {};
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  };
  const projects = resume?.projects || [];

  return (
    <div className={cn('max-w-4xl mx-auto p-6 bg-gradient-to-r from-teal-50 to-cyan-50', className)}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-teal-900 mb-2">{resume?.name}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-teal-700">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-teal-500 transition-colors">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span>{contact.mobile}</span>}
          {contact.github && (
            <a href={contact.github} className="hover:text-teal-500 transition-colors">
              GitHub
            </a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-teal-500 transition-colors">
              LinkedIn
            </a>
          )}
          {contact.portfolio && (
            <a href={contact.portfolio} className="hover:text-teal-500 transition-colors">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-teal-900 mb-3">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.languages && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-1">
                {skills.languages.split(',').map((lang, index) => (
                  <span key={index} className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs">
                    {lang.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          {skills.frameworks && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Frameworks</h3>
              <div className="flex flex-wrap gap-1">
                {skills.frameworks.split(',').map((framework, index) => (
                  <span key={index} className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs">
                    {framework.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-teal-900 mb-4">Featured Projects</h2>
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-teal-800 mb-1">{project.name}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.split(',').map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded text-xs font-medium"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                    {project.date}
                  </span>
                </div>

                {/* Project Links */}
                {(project.deployedLink || project.githubLink || project.presentationLink) && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.deployedLink && (
                      <a 
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-teal-600 hover:text-teal-800 bg-teal-50 px-2 py-1 rounded-full transition-colors"
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-teal-600 hover:text-teal-800 bg-teal-50 px-2 py-1 rounded-full transition-colors"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Source Code
                      </a>
                    )}
                    {project.presentationLink && (
                      <a 
                        href={project.presentationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-teal-600 hover:text-teal-800 bg-teal-50 px-2 py-1 rounded-full transition-colors"
                      >
                        <Presentation className="h-3 w-3 mr-1" />
                        Presentation
                      </a>
                    )}
                  </div>
                )}

                <ul className="space-y-1.5">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-teal-500 mr-1.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
