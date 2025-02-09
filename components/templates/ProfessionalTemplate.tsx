'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface ProfessionalTemplateProps {
  resume: Resume;
  className?: string;
}

export function ProfessionalTemplate({ resume, className }: ProfessionalTemplateProps) {
  // Add null checks and default values
  const education = resume?.education || [];
  const experience = resume?.experience || [];
  const projects = resume?.projects || [];
  const contact = resume?.contact || {};
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  };

  return (
    <div className={cn('max-w-4xl mx-auto p-8 bg-white font-sans', className)}>
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">{resume?.name || ''}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span>{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-blue-600">
              LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} className="hover:text-blue-600">
              GitHub
            </a>
          )}
          {contact.portfolio && (
            <a href={contact.portfolio} className="hover:text-blue-600">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resume?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{exp.title || ''}</h3>
                <span className="text-gray-600">{exp.date || ''}</span>
              </div>
              <p className="text-gray-700">{exp.company || ''} - {exp.location || ''}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {(exp.details || []).map((detail, idx) => (
                  <li key={idx} className="mb-1">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-800">{project.name}</h3>
                <span className="text-gray-600">{project.date}</span>
              </div>
              <p className="text-gray-700 mb-1">{project.technologies}</p>
              <div className="flex gap-4 mb-2 text-sm">
                {project.deployedLink && (
                  <a href={project.deployedLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.presentationLink && (
                  <a href={project.presentationLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Presentation
                  </a>
                )}
              </div>
              <ul className="list-disc list-inside text-gray-700">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.school || ''}</h3>
                  <p className="text-gray-700">{edu.degree || ''}</p>
                  <p className="text-gray-600">{edu.location || ''}</p>
                </div>
                <span className="text-gray-600">{edu.date || ''}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-black mb-3">Technical Skills</h2>
        <div className="space-y-2">
          {skills.languages && (
            <div>
              <h3 className="font-semibold">Programming Languages</h3>
              <p>{skills.languages}</p>
            </div>
          )}
          {skills.frameworks && (
            <div>
              <h3 className="font-semibold">Frameworks</h3>
              <p>{skills.frameworks}</p>
            </div>
          )}
          {skills.developerTools && (
            <div>
              <h3 className="font-semibold">Developer Tools</h3>
              <p>{skills.developerTools}</p>
            </div>
          )}
          {skills.libraries && (
            <div>
              <h3 className="font-semibold">Libraries</h3>
              <p>{skills.libraries}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
