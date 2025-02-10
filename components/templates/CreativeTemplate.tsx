'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { SectionHeader } from '../section-header';

interface CreativeTemplateProps {
  resume: Resume;
  className?: string;
}

export function CreativeTemplate({ resume, className }: CreativeTemplateProps) {
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
    <div className={cn('max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 p-8', className)}>
      {/* Header with Creative Design */}
      <header className="relative mb-2 pb-4 border-b-2 border-purple-200">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-600 rounded-full opacity-10" />
        <div className="relative">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">{resume?.name}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-purple-700">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="hover:text-purple-500 transition-colors">
                {contact.email}
              </a>
            )}
            {contact.mobile && (
              <>
                <span>|</span>
                <span>{contact.mobile}</span>
              </>
            )}
            {contact.linkedin && (
              <>
                <span>|</span>
                <a href={contact.linkedin} className="hover:text-purple-500 transition-colors">
                  LinkedIn
                </a>
              </>
            )}
            {contact.github && (
              <>
                <span>|</span>
                <a href={contact.github} className="hover:text-purple-500 transition-colors">
                  GitHub
                </a>
              </>
            )}
            {contact.portfolio && (
              <>
                <span>|</span>
                <a href={contact.portfolio} className="hover:text-purple-500 transition-colors">
                  Portfolio
                </a>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Summary Section */}
      {resume?.summary && (
        <section className="mb-2">
          <SectionHeader className="text-lg font-semibold text-purple-900 mb-2" title="Creative Summary" resume={resume} section="summary" />
          <p className="text-purple-700 text-justify">
            {resume.summary}
          </p>
        </section>
      )}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-4">
          {/* Skills Section */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-purple-900 mb-3">Technical Arsenal</h2>
            <div className="space-y-3">
              {skills.languages && (
                <div>
                  <h3 className="text-sm font-medium text-purple-800 mb-1">Languages</h3>
                  <p className="text-purple-700">{skills.languages}</p>
                </div>
              )}
              {skills.frameworks && (
                <div>
                  <h3 className="text-sm font-medium text-purple-800 mb-1">Frameworks</h3>
                  <p className="text-purple-700">{skills.frameworks}</p>
                </div>
              )}
              {skills.developerTools && (
                <div>
                  <h3 className="text-sm font-medium text-purple-800 mb-1">Developer Tools</h3>
                  <p className="text-purple-700">{skills.developerTools}</p>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-purple-900 mb-3">Education</h2>
            {resume?.education?.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="font-medium text-purple-800">{edu.school}</h3>
                <p className="text-sm text-purple-700">{edu.degree}</p>
                <p className="text-sm text-purple-600">{edu.date}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-4">
          {/* Experience Section */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-purple-900 mb-3">Professional Journey</h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium text-purple-800">{exp.title}</h3>
                  <span className="text-sm text-purple-600">{exp.date}</span>
                </div>
                <p className="text-purple-700 mb-1">{exp.company} • {exp.location}</p>
                <ul className="list-disc list-inside text-sm text-purple-700 space-y-0.5">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="text-justify pl-4">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-lg font-bold text-purple-800 mb-3">Creative Projects</h2>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all border border-purple-200">
                    <div className="flex flex-col mb-1.5">
                      <h3 className="text-base font-bold text-purple-900 mb-1">{project.name}</h3>
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-purple-700 font-medium text-sm">{project.technologies}</p>
                        <span className="text-purple-600 text-xs bg-purple-100 px-2 py-0.5 rounded-full">
                          {project.date}
                        </span>
                      </div>
                    </div>

                    {/* Project Links */}
                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {project.deployedLink && (
                          <a 
                            href={project.deployedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-purple-700 hover:text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-purple-700 hover:text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full transition-colors"
                          >
                            Repository
                          </a>
                        )}
                        {project.presentationLink && (
                          <a 
                            href={project.presentationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-purple-700 hover:text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full transition-colors"
                          >
                            Slides
                          </a>
                        )}
                      </div>
                    )}

                    <ul className="space-y-0.5 text-purple-800">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="text-xs flex items-start text-justify">
                          <span className="text-purple-400 mr-1.5 mt-0.5">◆</span>
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
      </div>
    </div>
  );
}
