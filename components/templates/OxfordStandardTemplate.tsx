'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface OxfordStandardTemplateProps {
  resume: Resume;
  className?: string;
}

export function OxfordStandardTemplate({ resume, className }: OxfordStandardTemplateProps) {
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
    <div className={cn('max-w-4xl mx-auto p-8 bg-slate-50 font-serif', className)}>
      {/* Header with Oxford-style design */}
      <header className="mb-8 text-center border-b-4 border-double border-slate-800 pb-6">
        <h1 className="text-4xl font-semibold text-slate-900 mb-3 font-serif">{resume?.name}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-slate-700">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-slate-900 transition-colors">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span className="border-l border-slate-400 pl-4">{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="border-l border-slate-400 pl-4 hover:text-slate-900">
              Academic Profile
            </a>
          )}
        </div>
      </header>

      {/* Research Focus */}
      {resume?.summary && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
            Research Focus
          </h2>
          <p className="text-slate-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
            Academic Background
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-xl font-medium text-slate-800">{edu.school}</h3>
                  <p className="text-slate-700 italic">{edu.degree}</p>
                  <p className="text-slate-600">{edu.location}</p>
                </div>
                <span className="text-slate-600 font-medium">{edu.date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Publications & Research */}
      {projects.length > 0 && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
            Publications & Research
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-lg font-medium text-slate-800 mb-2">{project.name}</h3>
              <p className="text-slate-700 italic mb-2">{project.technologies}</p>
              <div className="text-sm text-slate-600 mb-2">{project.date}</div>

              {/* Publication Links */}
              {(project.deployedLink || project.githubLink || project.presentationLink) && (
                <div className="flex gap-4 mb-3 text-sm">
                  {project.deployedLink && (
                    <a 
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 underline"
                    >
                      View Publication
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 underline"
                    >
                      Research Data
                    </a>
                  )}
                </div>
              )}

              <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                {project.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Areas of Expertise */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
          Areas of Expertise
        </h2>
        <div className="grid gap-4">
          {skills.languages && (
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Research Methods</h3>
              <p className="text-slate-700">{skills.languages}</p>
            </div>
          )}
          {skills.frameworks && (
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Analysis Tools</h3>
              <p className="text-slate-700">{skills.frameworks}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 