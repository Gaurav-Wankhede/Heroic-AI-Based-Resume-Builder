'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface CantabrigianTemplateProps {
  resume: Resume;
  className?: string;
}

export function CantabrigianTemplate({ resume, className }: CantabrigianTemplateProps) {
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
    <div className={cn('max-w-4xl mx-auto p-6 bg-white', className)}>
      {/* Header */}
      <header className="mb-4 border-b-2 border-emerald-200 pb-3">
        <h1 className="text-2xl font-bold text-emerald-900 mb-1">{resume?.name}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-emerald-700">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-emerald-500">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span>{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-emerald-500">LinkedIn</a>
          )}
          {contact.github && (
            <a href={contact.github} className="hover:text-emerald-500">GitHub</a>
          )}
          {contact.portfolio && (
            <a href={contact.portfolio} className="hover:text-emerald-500">Portfolio</a>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-4">
          {/* Education */}
          {education.length > 0 && (
            <section className="bg-emerald-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-emerald-900 mb-2">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <h3 className="font-medium text-emerald-800">{edu.school}</h3>
                  <p className="text-sm text-emerald-700">{edu.degree}</p>
                  <p className="text-xs text-emerald-600">{edu.location}</p>
                  <p className="text-xs text-emerald-600">{edu.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          <section className="bg-emerald-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-emerald-900 mb-2">Expertise</h2>
            <div className="space-y-2">
              {skills.languages && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-0.5">Languages</h3>
                  <p className="text-sm text-emerald-700">{skills.languages}</p>
                </div>
              )}
              {skills.frameworks && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-0.5">Frameworks</h3>
                  <p className="text-sm text-emerald-700">{skills.frameworks}</p>
                </div>
              )}
              {skills.developerTools && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-0.5">Tools</h3>
                  <p className="text-sm text-emerald-700">{skills.developerTools}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-4">
          {/* Summary */}
          {resume?.summary && (
            <section className="bg-emerald-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-emerald-900 mb-2">Professional Summary</h2>
              <p className="text-sm text-emerald-700">{resume.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="bg-emerald-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-emerald-900 mb-2">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-emerald-800">{exp.title}</h3>
                    <span className="text-xs text-emerald-600">{exp.date}</span>
                  </div>
                  <p className="text-sm text-emerald-700 mb-1">{exp.company} • {exp.location}</p>
                  <ul className="list-disc list-inside text-sm text-emerald-700 space-y-0.5">
                    {exp.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="bg-emerald-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-emerald-900 mb-2">Notable Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium text-emerald-800">{project.name}</h3>
                      <p className="text-sm text-emerald-700">{project.technologies}</p>
                    </div>
                    <span className="text-xs text-emerald-600">{project.date}</span>
                  </div>

                  {/* Project Links */}
                  {(project.deployedLink || project.githubLink || project.presentationLink) && (
                    <div className="flex gap-2 mb-1 text-xs">
                      {project.deployedLink && (
                        <a 
                          href={project.deployedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-900"
                        >
                          View Project
                        </a>
                      )}
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-900"
                        >
                          Source Code
                        </a>
                      )}
                      {project.presentationLink && (
                        <a 
                          href={project.presentationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-900"
                        >
                          Presentation
                        </a>
                      )}
                    </div>
                  )}

                  <ul className="list-disc list-inside text-sm text-emerald-700 space-y-0.5">
                    {project.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
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
