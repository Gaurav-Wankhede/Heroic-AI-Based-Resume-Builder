'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Code, Globe, Github, Presentation } from 'lucide-react';

interface TechInnovatorTemplateProps {
  resume: Resume;
  className?: string;
}

export function TechInnovatorTemplate({ resume, className }: TechInnovatorTemplateProps) {
  // Add null checks and default values
  const contact = resume?.contact || {};
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  };
  const projects = resume?.projects || [];
  const experience = resume?.experience || [];

  return (
    <div className={cn('max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-slate-50 to-gray-50', className)}>
      {/* Header with better mobile padding */}
      <header className="mb-6 lg:mb-8">
        <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{resume?.name}</h1>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-slate-300 text-sm sm:text-base">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="hover:text-blue-400 transition-colors">
                {contact.email}
              </a>
            )}
            {contact.mobile && <span>{contact.mobile}</span>}
            {contact.github && (
              <a href={contact.github} className="hover:text-blue-400 transition-colors">GitHub</a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} className="hover:text-blue-400 transition-colors">LinkedIn</a>
            )}
          </div>
        </div>
      </header>

      {/* Responsive grid layout */}
      <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Skills */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-lg mr-3">
                <Code className="h-5 w-5" />
              </span>
              Tech Stack
            </h2>
            <div className="space-y-6">
              {skills.languages && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.split(',').map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.frameworks && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.split(',').map((framework, index) => (
                      <span key={index} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                        {framework.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.developerTools && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">Dev Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.developerTools.split(',').map((tool, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Projects section with better mobile layout */}
          {projects.length > 0 && (
            <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-4 sm:mb-6">Featured Projects</h2>
              <div className="space-y-4 sm:space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{project.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.split(',').map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-white text-slate-600 rounded-md text-xs font-medium border border-slate-200"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-slate-500 text-sm bg-white px-3 py-1 rounded-full border border-slate-200">
                        {project.date}
                      </span>
                    </div>

                    {/* Project Links */}
                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <div className="flex flex-wrap gap-3 mb-3">
                        {project.deployedLink && (
                          <a 
                            href={project.deployedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            Source Code
                          </a>
                        )}
                        {project.presentationLink && (
                          <a 
                            href={project.presentationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Presentation className="h-4 w-4 mr-1" />
                            Demo
                          </a>
                        )}
                      </div>
                    )}

                    <ul className="space-y-2">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-slate-600">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Professional Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700">{exp.title}</h3>
                      <p className="text-slate-600">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-slate-500 text-sm">{exp.date}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="text-sm">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
