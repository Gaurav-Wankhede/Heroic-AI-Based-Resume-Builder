import React from 'react'
import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'
import { baseStyles } from './base-styles'
import { formatDate, parseUrl, sanitizeText } from './utils'
import { 
  MailIcon, 
  PhoneIcon, 
  LinkedinIcon, 
  GithubIcon, 
  GlobeIcon, 
  PresentationIcon,
  BuildingIcon,
  BriefcaseIcon,
  GraduationIcon,
  AwardIcon,
  ExternalLinkIcon 
} from './icons'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 24,
  },
  header: {
    marginBottom: 12,
    width: '100%',
  },
  content: {
    gap: 8,
    width: '100%',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  subheading: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginBottom: 2,
    color: '#374151',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    paddingLeft: 8,
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 6,
    width: '100%',
  },
  contactSymbol: {
    fontSize: 11,
    color: '#475569', // slate-600
    marginRight: 4,
  },
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 'medium',
  },
  experienceCompany: {
    fontSize: 9,
    marginBottom: 2,
  },
  date: {
    fontSize: 8,
    color: '#6B7280',
  },
  projectCard: {
    marginBottom: 8,
  },
  projectHeader: {
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'medium',
    marginBottom: 2,
  },
  projectTechStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  techItem: {
    fontSize: 8,
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    padding: '1 4',
    borderRadius: 4,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 8,
    color: '#2563EB',
    textDecoration: 'none',
  },
  skillsSection: {
    marginBottom: 8,
  },
  skillGroup: {
    marginBottom: 6,
  },
  skillTitle: {
    fontSize: 9,
    fontWeight: 'medium',
    marginBottom: 2,
  },
  skillList: {
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.3,
  },
  educationItem: {
    marginBottom: 6,
  },
  schoolName: {
    fontSize: 9,
    fontWeight: 'medium',
    marginBottom: 1,
  },
  degree: {
    fontSize: 9,
    marginBottom: 1,
  }
})

export function ProfessionalPDF({ resume }: { resume: Resume }) {
  const contact = resume?.contact || {}

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>{sanitizeText(resume?.name || '')}</Text>
            <View style={styles.contactRow}>
              {contact.email && (
                <Link src={`mailto:${contact.email}`}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <MailIcon width={10} height={10} color="#2563EB" />
                    <Text style={[styles.text, styles.link]}>{sanitizeText(contact.email)}</Text>
                  </View>
                </Link>
              )}
              {contact.mobile && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PhoneIcon width={10} height={10} color="#374151" />
                  <Text style={styles.text}>{sanitizeText(contact.mobile)}</Text>
                </View>
              )}
              {contact.linkedin && (
                <Link src={parseUrl(contact.linkedin)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <LinkedinIcon width={10} height={10} color="#2563EB" />
                    <Text style={[styles.text, styles.link]}>LinkedIn</Text>
                  </View>
                </Link>
              )}
              {contact.github && (
                <Link src={parseUrl(contact.github)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <GithubIcon width={10} height={10} color="#2563EB" />
                    <Text style={[styles.text, styles.link]}>GitHub</Text>
                  </View>
                </Link>
              )}
              {contact.portfolio && (
                <Link src={parseUrl(contact.portfolio)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <GlobeIcon width={10} height={10} color="#2563EB" />
                    <Text style={[styles.text, styles.link]}>Portfolio</Text>
                  </View>
                </Link>
              )}
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Summary */}
            {resume?.summary && (
              <View style={styles.section}>
                <Text style={styles.subheading}>Professional Summary</Text>
                <Text style={styles.text}>{sanitizeText(resume.summary)}</Text>
              </View>
            )}

            {/* Experience */}
            {resume.experience?.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.subheading}>Professional Experience</Text>
                </View>
                {resume.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                      <Text style={styles.date}>{sanitizeText(exp.date)}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{sanitizeText(exp.company)} • {sanitizeText(exp.location)}</Text>
                    </View>
                    {exp.details.map((detail, idx) => (
                      <View key={idx} style={styles.detailsRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {resume.projects?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.subheading}>Projects</Text>
                {resume.projects.map((project, index) => (
                  <View key={index} style={styles.projectCard}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                      <Text style={styles.date}>{sanitizeText(project.date)}</Text>
                    </View>
                    <View style={styles.projectTechStack}>
                      <Text style={styles.techItem}>{sanitizeText(project.technologies)}</Text>
                    </View>
                    {project.details.map((detail, idx) => (
                      <View key={idx} style={styles.detailsRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                      </View>
                    ))}
                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <View style={styles.projectLinks}>
                        {project.deployedLink && (
                          <Link src={parseUrl(project.deployedLink)} style={styles.projectLink}>Live Demo</Link>
                        )}
                        {project.githubLink && (
                          <Link src={parseUrl(project.githubLink)} style={styles.projectLink}>Source Code</Link>
                        )}
                        {project.presentationLink && (
                          <Link src={parseUrl(project.presentationLink)} style={styles.projectLink}>Presentation</Link>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {resume.skills && (
              <View style={styles.skillsSection}>
                <Text style={styles.subheading}>Technical Skills</Text>
                <View style={styles.skillGroup}>
                  {resume.skills.languages && (
                    <Text style={styles.skillTitle}>Languages:</Text>
                  )}
                  <Text style={styles.skillList}>{sanitizeText(resume.skills.languages)}</Text>
                </View>
                <View style={styles.skillGroup}>
                  {resume.skills.frameworks && (
                    <Text style={styles.skillTitle}>Frameworks:</Text>
                  )}
                  <Text style={styles.skillList}>{sanitizeText(resume.skills.frameworks)}</Text>
                </View>
                <View style={styles.skillGroup}>
                  {resume.skills.developerTools && (
                    <Text style={styles.skillTitle}>Developer Tools:</Text>
                  )}
                  <Text style={styles.skillList}>{sanitizeText(resume.skills.developerTools)}</Text>
                </View>
                <View style={styles.skillGroup}>
                  {resume.skills.libraries && (
                    <Text style={styles.skillTitle}>Libraries:</Text>
                  )}
                  <Text style={styles.skillList}>{sanitizeText(resume.skills.libraries)}</Text>
                </View>
              </View>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.subheading}>Education</Text>
                </View>
                {resume.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <View style={styles.row}>
                      <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                      <Text style={styles.date}>{sanitizeText(edu.date)}</Text>
                    </View>
                    <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                    <View style={styles.detailsRow}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{sanitizeText(edu.location)}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.subheading}>Certifications</Text>
                </View>
                {resume.certifications.map((cert, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitle}>{sanitizeText(cert.name)}</Text>
                      <Text style={styles.date}>{formatDate(cert.issueDate)}</Text>
                    </View>
                    <Text style={styles.experienceCompany}>{sanitizeText(cert.provider)}</Text>
                    {cert.url && (
                      <View style={styles.detailsRow}>
                        <View style={styles.bullet} />
                        <Link src={parseUrl(cert.url)} style={styles.projectLink}>View Certificate</Link>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
} 