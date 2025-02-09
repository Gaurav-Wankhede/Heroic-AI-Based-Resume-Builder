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
    <div className={cn('max-w-4xl mx-auto p-8 bg-white', className)}>
      {/* Header */}
      <header className="mb-8 border-b-2 border-emerald-200 pb-4">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">{resume?.name}</h1>
        <div className="flex flex-wrap gap-4 text-emerald-700">
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
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <section className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-medium text-emerald-800">{edu.school}</h3>
                  <p className="text-emerald-700">{edu.degree}</p>
                  <p className="text-emerald-600 text-sm">{edu.location}</p>
                  <p className="text-emerald-600 text-sm">{edu.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          <section className="bg-emerald-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-900 mb-4">Expertise</h2>
            <div className="space-y-4">
              {skills.languages && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">Languages</h3>
                  <p className="text-emerald-700 text-sm">{skills.languages}</p>
                </div>
              )}
              {skills.frameworks && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">Frameworks</h3>
                  <p className="text-emerald-700 text-sm">{skills.frameworks}</p>
                </div>
              )}
              {skills.developerTools && (
                <div>
                  <h3 className="font-medium text-emerald-800 mb-1">Tools</h3>
                  <p className="text-emerald-700 text-sm">{skills.developerTools}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {resume?.summary && (
            <section className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-900 mb-3">Professional Summary</h2>
              <p className="text-emerald-700">{resume.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-medium text-emerald-800">{exp.title}</h3>
                    <span className="text-emerald-600 text-sm">{exp.date}</span>
                  </div>
                  <p className="text-emerald-700 mb-2">{exp.company} • {exp.location}</p>
                  <ul className="list-disc list-inside text-emerald-700 text-sm space-y-1">
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
            <section className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Notable Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-emerald-800">{project.name}</h3>
                      <p className="text-emerald-700 text-sm">{project.technologies}</p>
                    </div>
                    <span className="text-emerald-600 text-sm">{project.date}</span>
                  </div>

                  {/* Project Links */}
                  {(project.deployedLink || project.githubLink || project.presentationLink) && (
                    <div className="flex gap-3 mb-2 text-sm">
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

                  <ul className="list-disc list-inside text-emerald-700 text-sm space-y-1">
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
