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
    <div className={cn('max-w-4xl mx-auto p-6 bg-slate-50 font-serif', className)}>
      {/* Primary Header */}
      <header className="mb-6 text-center border-b-4 border-double border-slate-800 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 font-serif">
          {resume?.name}
        </h1>
        {/* Primary Content - Contact Info */}
        <div className="flex justify-center flex-wrap gap-3 text-sm text-slate-700">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-slate-900 transition-colors">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span className="border-l border-slate-400 pl-3">{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="border-l border-slate-400 pl-3 hover:text-slate-900">
              Academic Profile
            </a>
          )}
        </div>
      </header>

      {/* Section with Section Header and Primary Content */}
      {resume?.summary && (
        <section className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            Research Focus
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            Academic Background
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  {/* Subsection Header */}
                  <h3 className="text-base font-medium text-slate-800">{edu.school}</h3>
                  {/* Primary Content */}
                  <p className="text-sm text-slate-700 italic">{edu.degree}</p>
                  {/* Secondary Information */}
                  <p className="text-xs text-slate-600">{edu.location}</p>
                </div>
                {/* Secondary Information */}
                <span className="text-xs text-slate-600 font-medium">{edu.date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Research Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            Research Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  {/* Subsection Header */}
                  <h3 className="text-base font-medium text-slate-800">{exp.title}</h3>
                  {/* Primary Content */}
                  <p className="text-sm text-slate-700 italic">{exp.company}</p>
                  {/* Secondary Information */}
                  <p className="text-xs text-slate-600">{exp.location}</p>
                </div>
                {/* Secondary Information */}
                <span className="text-xs text-slate-600 font-medium">{exp.date}</span>
              </div>
              {/* Primary Content - Details */}
              <ul className="list-disc list-inside space-y-0.5 text-sm text-slate-700 ml-3 mt-2">
                {exp.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Publications & Research Section */}
      {projects.length > 0 && (
        <section className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            Publications & Research
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 last:mb-0">
              {/* Subsection Header */}
              <h3 className="text-base font-medium text-slate-800 mb-1">{project.name}</h3>
              {/* Primary Content */}
              <p className="text-sm text-slate-700 italic mb-1">{project.technologies}</p>
              {/* Secondary Information */}
              <div className="text-xs text-slate-600 mb-1">{project.date}</div>
              {/* Secondary Information - Links */}
              <div className="flex gap-3 mb-2 text-xs">
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
                {project.presentationLink && (
                  <a 
                    href={project.presentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 underline"
                  >
                    Presentation
                  </a>
                )}
              </div>
              {/* Primary Content - Details */}
              <ul className="list-disc list-inside space-y-0.5 text-sm text-slate-700 ml-3">
                {project.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Areas of Expertise */}
      <section className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
          Areas of Expertise
        </h2>
        <div className="grid gap-3">
          {skills.languages && (
            <div>
              <h3 className="text-base font-medium text-slate-800 mb-1">Research Methods</h3>
              <p className="text-sm text-slate-700">{skills.languages}</p>
            </div>
          )}
          {skills.frameworks && (
            <div>
              <h3 className="text-base font-medium text-slate-800 mb-1">Analysis Tools</h3>
              <p className="text-sm text-slate-700">{skills.frameworks}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 