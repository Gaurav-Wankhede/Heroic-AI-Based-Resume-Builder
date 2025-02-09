'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface MinimalistTemplateProps {
  resume: Resume;
  className?: string;
}

export function MinimalistTemplate({ resume, className }: MinimalistTemplateProps) {
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
  const education = resume?.education || [];

  return (
    <div className={cn('max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 bg-white', className)}>
      {/* Minimal Header */}
      <header className="mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-3">{resume?.name}</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-gray-900 transition-colors">
              {contact.email}
            </a>
          )}
          {contact.mobile && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{contact.mobile}</span>
            </>
          )}
          {contact.linkedin && (
            <>
              <span className="hidden sm:inline">•</span>
              <a href={contact.linkedin} className="hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
            </>
          )}
          {contact.location && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{contact.location}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {resume?.summary && (
        <section className="mb-8 lg:mb-12">
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-8 lg:mb-12">
        <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Experience</h2>
        <div className="space-y-6 sm:space-y-8">
          {experience.map((exp, index) => (
            <div key={index} className="group">
              <div className="grid grid-cols-[1fr_auto] gap-4 mb-1">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{exp.date}</span>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-2">
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="text-sm text-gray-600 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:bg-gray-300">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8 lg:mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Projects</h2>
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.technologies}</p>
                  </div>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>
                <ul className="mt-2 space-y-2">
                {(project.deployedLink || project.githubLink) && (
                  <div className="mt-2 flex gap-4 text-sm">
                    {project.deployedLink && (
                      <a 
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        View Project →
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Source →
                      </a>
                    )}
                  </div>
                )}

                  {project.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-600 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:bg-gray-300">
                      {detail}
                    </li>
                  ))}
                </ul>
                
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8 lg:mb-12">
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.school}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{edu.date}</span>
                  <p className="text-sm text-gray-500">{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - Minimal Display */}
      {(skills.languages || skills.frameworks || skills.developerTools) && (
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider">Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {skills.languages && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Languages</h3>
                <p className="text-gray-600">{skills.languages}</p>
              </div>
            )}
            {skills.frameworks && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Frameworks</h3>
                <p className="text-gray-600">{skills.frameworks}</p>
              </div>
            )}
            {skills.developerTools && (
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Tools</h3>
                <p className="text-gray-600">{skills.developerTools}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
