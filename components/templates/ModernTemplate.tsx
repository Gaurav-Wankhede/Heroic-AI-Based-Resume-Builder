'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Code, Briefcase, GraduationCap, Mail, Phone, Globe, Github } from 'lucide-react';

interface ModernTemplateProps {
  resume: Resume;
  className?: string;
}

export function ModernTemplate({ resume, className }: ModernTemplateProps) {
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
    <div className={cn('max-w-4xl mx-auto bg-white', className)}>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 lg:p-8 lg:min-h-screen">
          <div className="mb-8 lg:mb-10">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{resume?.name}</h1>
            <div className="space-y-3 text-slate-300">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.mobile && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{contact.mobile}</span>
                </div>
              )}
              {contact.github && (
                <a href={contact.github} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {contact.portfolio && (
                <a href={contact.portfolio} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {skills.languages && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-300">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.split(',').map((lang, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-800 rounded-md text-xs">
                      {lang.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.frameworks && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-300">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.split(',').map((framework, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-800 rounded-md text-xs">
                      {framework.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.developerTools && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-slate-300">Developer Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.developerTools.split(',').map((tool, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-800 rounded-md text-xs">
                      {tool.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 p-6 lg:p-8 space-y-6">
          {resume?.summary && (
            <section className="mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resume.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-slate-700" />
                Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-900 rounded-full" />
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-slate-700">{exp.company} • {exp.location}</p>
                      <p className="text-slate-500 text-sm">{exp.date}</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="text-slate-400 mt-1.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="h-6 w-6 text-slate-700" />
                Projects
              </h2>
              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-6 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.split(',').map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-white text-slate-700 rounded-md text-xs font-medium border border-slate-200"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-slate-600 text-sm bg-white px-3 py-1 rounded-full border border-slate-200">
                        {project.date}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="text-slate-400 mt-1.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <div className="flex gap-4 pt-4 border-t border-slate-200">
                        {project.deployedLink && (
                          <a 
                            href={project.deployedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
                          >
                            View Live →
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
                          >
                            View Code →
                          </a>
                        )}
                      </div>
                    )}
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
