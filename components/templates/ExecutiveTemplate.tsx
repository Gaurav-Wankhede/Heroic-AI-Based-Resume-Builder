'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { SectionHeader } from '../section-header';
import { Building2, GraduationCap, Briefcase, Award } from 'lucide-react';

interface ExecutiveTemplateProps {
  resume: Resume;
  className?: string;
}

export function ExecutiveTemplate({ resume, className }: ExecutiveTemplateProps) {
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
    <div className={cn('max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white', className)}>
      {/* Responsive header */}
      <header className="mb-6 lg:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {resume?.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-blue-700 transition-colors">
              {contact.email}
            </a>
          )}
          {contact.mobile && <span>{contact.mobile}</span>}
          {contact.linkedin && (
            <a href={contact.linkedin} className="hover:text-blue-700 transition-colors">
              LinkedIn
            </a>
          )}
          {contact.portfolio && (
            <a href={contact.portfolio} className="hover:text-blue-700 transition-colors">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {resume?.summary && (
        <section className="mb-6 lg:mb-10 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-blue-600" />
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          Professional Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                <span className="text-gray-600 font-medium">{exp.date}</span>
              </div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-blue-700 font-semibold">{exp.company}</span>
                <span className="text-gray-600">{exp.location}</span>
              </div>
              <ul className="space-y-2">
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 mt-1.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Projects */}
      {projects.length > 0 && (
        <section className="mb-6 lg:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            Strategic Projects
          </h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.split(',').map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-600 bg-gray-50 px-4 py-1 rounded-full text-sm">
                    {project.date}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-1.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {(project.deployedLink || project.githubLink || project.presentationLink) && (
                  <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                    {project.deployedLink && (
                      <a 
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Project →
                      </a>
                    )}
                    {project.presentationLink && (
                      <a 
                        href={project.presentationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Presentation →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            Education
          </h2>
          <div className="grid gap-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.school}</h3>
                    <p className="text-blue-700 font-medium">{edu.degree}</p>
                    <p className="text-gray-600">{edu.location}</p>
                  </div>
                  <span className="text-gray-600">{edu.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
