'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface AcademicScholarTemplateProps {
  resume: Resume;
  className?: string;
}

export function AcademicScholarTemplate({ resume, className }: AcademicScholarTemplateProps) {
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
      <header className="mb-8 border-b-2 border-indigo-200 pb-4">
        <h1 className="text-3xl font-serif text-indigo-900 mb-2">{resume?.name}</h1>
        <div className="flex flex-wrap gap-4 text-indigo-700">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-indigo-500">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span>{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-indigo-500">LinkedIn</a>
          )}
        </div>
      </header>

      {/* Research Interests */}
      {resume?.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-4">Research Interests</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-indigo-800">{edu.school}</h3>
                  <p className="text-indigo-700">{edu.degree}</p>
                  <p className="text-indigo-600">{edu.location}</p>
                </div>
                <span className="text-indigo-600">{edu.date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Research Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-4">Research Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-medium text-indigo-800">{exp.title}</h3>
                  <p className="text-indigo-700">{exp.company}</p>
                  <p className="text-indigo-600">{exp.location}</p>
                </div>
                <span className="text-indigo-600">{exp.date}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Publications & Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-4">Publications & Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0 bg-indigo-50 p-6 rounded-lg">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-medium text-indigo-800">{project.name}</h3>
                <span className="text-indigo-600">{project.date}</span>
              </div>
              <p className="text-indigo-600 italic mb-2">{project.technologies}</p>
              
              {/* Project Links */}
              {(project.deployedLink || project.githubLink || project.presentationLink) && (
                <div className="flex gap-4 mb-4 text-sm">
                  {project.deployedLink && (
                    <a 
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 hover:text-indigo-900 underline"
                    >
                      Published Work
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 hover:text-indigo-900 underline"
                    >
                      Research Data
                    </a>
                  )}
                  {project.presentationLink && (
                    <a 
                      href={project.presentationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 hover:text-indigo-900 underline"
                    >
                      Conference Materials
                    </a>
                  )}
                </div>
              )}

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-4">Technical Expertise</h2>
        <div className="grid gap-4">
          {skills.languages && (
            <div>
              <h3 className="font-medium text-indigo-800 mb-1">Research Tools & Languages</h3>
              <p className="text-gray-700">{skills.languages}</p>
            </div>
          )}
          {skills.frameworks && (
            <div>
              <h3 className="font-medium text-indigo-800 mb-1">Analysis Frameworks</h3>
              <p className="text-gray-700">{skills.frameworks}</p>
            </div>
          )}
          {skills.developerTools && (
            <div>
              <h3 className="font-medium text-indigo-800 mb-1">Laboratory & Development Tools</h3>
              <p className="text-gray-700">{skills.developerTools}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
