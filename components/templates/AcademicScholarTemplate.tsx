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
    <div className={cn('max-w-4xl mx-auto p-6 bg-white', className)}>
      {/* Header - Academic style */}
      <header className="mb-6 border-b-2 border-indigo-200 pb-3 text-center">
        <h1 className="text-2xl font-serif text-indigo-900 mb-2">{resume?.name}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-indigo-700 justify-center">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-indigo-500 font-serif">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span className="font-serif">{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-indigo-500 font-serif">
              Academic Profile
            </a>
          )}
        </div>
      </header>

      {/* Research Interests - Academic focus */}
      {resume?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-3 pb-1 border-b border-indigo-200">
            Research Interests
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed text-justify font-serif">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-base font-medium text-indigo-800">{edu.school}</h3>
                  <p className="text-sm text-indigo-700">{edu.degree}</p>
                  <p className="text-xs text-indigo-600">{edu.location}</p>
                </div>
                <span className="text-xs text-indigo-600">{edu.date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Research Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-3">Research Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-base font-medium text-indigo-800">{exp.title}</h3>
                  <p className="text-sm text-indigo-700">{exp.company}</p>
                  <p className="text-xs text-indigo-600">{exp.location}</p>
                </div>
                <span className="text-xs text-indigo-600">{exp.date}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {exp.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Publications & Projects - Academic emphasis */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-3 pb-1 border-b border-indigo-200">
            Publications & Research
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 last:mb-0 bg-indigo-50 p-4 rounded border-l-4 border-indigo-200">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-medium text-indigo-800 italic font-serif">{project.name}</h3>
                <span className="text-xs text-indigo-600 font-serif">{project.date}</span>
              </div>
              <p className="text-xs text-indigo-600 mb-2 font-serif">{project.technologies}</p>
              
              {/* Academic links */}
              {(project.deployedLink || project.githubLink || project.presentationLink) && (
                <div className="flex gap-3 mb-3 text-xs font-serif">
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

              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 text-justify font-serif">
                {project.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      <section>
        <h2 className="text-xl font-serif font-semibold text-indigo-900 mb-3">Technical Expertise</h2>
        <div className="grid gap-3">
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
