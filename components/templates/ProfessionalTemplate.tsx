'use client';

import React from 'react';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Mail, Phone, Globe, Github, Linkedin } from 'lucide-react';
import { templateStyles as styles } from '@/lib/template-styles';

interface ProfessionalTemplateProps {
  resume: Resume;
  className?: string;
}

export function ProfessionalTemplate({ resume, className }: ProfessionalTemplateProps) {
  const { education = [], experience = [], projects = [], contact = {}, skills = {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }} = resume;

  return (
    <div className={cn('max-w-4xl mx-auto p-8 bg-white font-sans', className)}>
      {/* Header */}
      <header className={styles.spacing.section}>
        <h1 className={cn(styles.text.name, 'mb-4')}>{resume?.name || ''}</h1>
        <div className={cn(styles.layout.row, 'flex-wrap gap-4')}>
          {contact.email && (
            <a href={`mailto:${contact.email}`} 
               className={cn(styles.text.normal, 'flex items-center gap-2 hover:text-blue-600')}>
              <Mail className="h-3 w-3" />
              {contact.email}
            </a>
          )}
          {contact.mobile && (
            <span className={cn(styles.text.normal, 'flex items-center gap-2')}>
              <Phone className="h-3 w-3" />
              {contact.mobile}
            </span>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} 
               className={cn(styles.text.normal, 'flex items-center gap-2 hover:text-blue-600')}>
              <Linkedin className="h-3 w-3" />
              LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} 
               className={cn(styles.text.normal, 'flex items-center gap-2 hover:text-blue-600')}>
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
          {contact.portfolio && (
            <a href={contact.portfolio} 
               className={cn(styles.text.normal, 'flex items-center gap-2 hover:text-blue-600')}>
              <Globe className="h-3 w-3" />
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resume?.summary && (
        <section className={styles.spacing.section}>
          <h2 className={styles.elements.sectionTitle}>Professional Summary</h2>
          <p className={styles.text.normal}>{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className={styles.spacing.section}>
          <h2 className={styles.elements.sectionTitle}>Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className={cn(styles.spacing.item, 'group')}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className={cn(styles.text.normal, 'font-semibold')}>{exp.title}</h3>
                    <div className={styles.text.small}>
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && <span> • {exp.location}</span>}
                    </div>
                  </div>
                  <span className={styles.text.small}>{exp.date}</span>
                </div>
                <ul className="space-y-1">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className={cn(styles.text.details, 'flex gap-2')}>
                      <span className={styles.elements.bullet}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={styles.spacing.section}>
          <h2 className={styles.elements.sectionTitle}>Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className={styles.spacing.item}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className={cn(styles.text.normal, 'font-semibold')}>{project.name}</h3>
                    <p className={styles.text.small}>{project.technologies}</p>
                  </div>
                  <span className={styles.text.small}>{project.date}</span>
                </div>
                <ul className="space-y-1 mb-2">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className={cn(styles.text.details, 'flex gap-2')}>
                      <span className={styles.elements.bullet}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {(project.deployedLink || project.githubLink) && (
                  <div className={cn(styles.layout.row, 'mt-1')}>
                    {project.deployedLink && (
                      <a href={project.deployedLink} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className={cn(styles.text.small, styles.elements.link)}>
                        Live Demo →
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className={cn(styles.text.small, styles.elements.link)}>
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

      {/* Education */}
      {education.length > 0 && (
        <section className={styles.spacing.section}>
          <h2 className={styles.elements.sectionTitle}>Education</h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className={cn(styles.spacing.item, 'flex justify-between items-baseline')}>
                <div>
                  <h3 className={cn(styles.text.normal, 'font-semibold')}>{edu.school}</h3>
                  <p className={styles.text.normal}>{edu.degree}</p>
                  <p className={styles.text.small}>{edu.location}</p>
                </div>
                <span className={cn(styles.text.small, 'font-medium')}>{edu.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className={styles.elements.sectionTitle}>Technical Skills</h2>
        <div className="grid gap-2">
          {skills.languages && (
            <div>
              <h3 className={cn(styles.text.normal, 'font-semibold mb-1')}>Languages</h3>
              <p className={styles.text.normal}>{skills.languages}</p>
            </div>
          )}
          {skills.frameworks && (
            <div>
              <h3 className={cn(styles.text.normal, 'font-semibold mb-1')}>Frameworks</h3>
              <p className={styles.text.normal}>{skills.frameworks}</p>
            </div>
          )}
          {skills.developerTools && (
            <div>
              <h3 className={cn(styles.text.normal, 'font-semibold mb-1')}>Developer Tools</h3>
              <p className={styles.text.normal}>{skills.developerTools}</p>
            </div>
          )}
          {skills.libraries && (
            <div>
              <h3 className={cn(styles.text.normal, 'font-semibold mb-1')}>Libraries</h3>
              <p className={styles.text.normal}>{skills.libraries}</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      {resume?.certifications && resume.certifications.length > 0 && (
        <section className={styles.spacing.section}>
          <h2 className={styles.elements.sectionTitle}>Certifications</h2>
          <div className="space-y-2">
            {resume.certifications.map((cert, index) => (
              <div key={index} className={cn(styles.spacing.item, 'flex justify-between items-baseline')}>
                <div>
                  <h3 className={cn(styles.text.normal, 'font-semibold')}>{cert.name}</h3>
                  <p className={styles.text.normal}>{cert.provider}</p>
                  {cert.url && (
                    <a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(styles.text.small, styles.elements.link, 'inline-flex items-center gap-1')}
                    >
                      View Certificate <span className="text-xs">→</span>
                    </a>
                  )}
                </div>
                <span className={cn(styles.text.small, 'font-medium')}>
                  {new Date(cert.issueDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
