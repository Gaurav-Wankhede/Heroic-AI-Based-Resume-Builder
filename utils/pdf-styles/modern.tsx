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
    padding: 32,
    fontFamily: 'Helvetica',
  },
  container: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    width: '30%',
    backgroundColor: '#1F2937', // gray-800
    padding: 24,
    color: 'white',
    borderRadius: 8,
  },
  rightColumn: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  contactRow: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 10,
    color: '#E5E7EB', // gray-200
    marginBottom: 4,
  },
  link: {
    color: '#E5E7EB', // gray-200
    textDecoration: 'none',
  },
  skillsContainer: {
    gap: 24,
  },
  skillGroup: {
    marginBottom: 24,
  },
  skillTitle: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#CBD5E1', // slate-300
    marginBottom: 8,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    fontSize: 10,
    color: '#E5E7EB', // gray-200
    backgroundColor: '#374151', // gray-700
    padding: '4 8',
    borderRadius: 4,
    marginBottom: 4,
  },
  summary: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leftSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 16,
  },
  timelineDot: {
    position: 'absolute',
    left: -5,
    top: 0,
    width: 8,
    height: 8,
    backgroundColor: '#0F172A', // slate-900
    borderRadius: 9999,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  experienceCompany: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: '#6B7280', // gray-500
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
    paddingLeft: 2,
  },
  bullet: {
    fontSize: 12,
    color: '#9CA3AF', // gray-400
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
  },
  projectCard: {
    backgroundColor: '#F3F4F6', // gray-100
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    marginBottom: 4,
  },
  projectTechTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  projectTechTag: {
    fontSize: 10,
    color: '#475569', // slate-600
    backgroundColor: 'white',
    padding: '4 8',
    borderRadius: 4,
    borderColor: '#E2E8F0', // slate-200
    borderWidth: 1,
  },
  projectDate: {
    fontSize: 11,
    color: '#475569', // slate-600
    backgroundColor: 'white',
    padding: '4 12',
    borderRadius: 12,
    borderColor: '#E2E8F0', // slate-200
    borderWidth: 1,
  },
  projectLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  projectLink: {
    fontSize: 10,
    color: '#2563EB', // blue-600
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  certificationCard: {
    padding: 12,
    backgroundColor: '#F8FAFC', // slate-50
    marginBottom: 12,
    borderRadius: 8,
  },
  certificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  certificationTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  certificationProvider: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    marginBottom: 6,
  },
  certificationDate: {
    fontSize: 10,
    color: '#6B7280', // gray-500
  },
  certificationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  certificationLinkText: {
    fontSize: 10,
    color: '#2563EB', // blue-600
    textDecoration: 'none',
  },
})

export function ModernPDF({ resume }: { resume: Resume }) {
  // Add null checks and default values
  const contact = resume?.contact || {}
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }
  const projects = resume?.projects || []
  const experience = resume?.experience || []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column - Dark Sidebar */}
          <View style={styles.leftColumn}>
            <View style={styles.header}>
              <Text style={styles.name}>{sanitizeText(resume?.name || '')}</Text>
              <View style={styles.contactRow}>
                {contact.email && (
                  <Link src={`mailto:${contact.email}`}>
                    <View style={styles.contactItem}>
                      <MailIcon width={10} height={10} color="#CBD5E1" />
                      <Text style={[styles.contactText, styles.link]}>{sanitizeText(contact.email)}</Text>
                    </View>
                  </Link>
                )}
                {contact.mobile && (
                  <View style={styles.contactItem}>
                    <PhoneIcon width={12} height={12} color="#CBD5E1" />
                    <Text style={styles.contactText}>{sanitizeText(contact.mobile)}</Text>
                  </View>
                )}
                {contact.github && (
                  <Link src={parseUrl(contact.github)}>
                    <View style={styles.contactItem}>
                      <GithubIcon width={12} height={12} color="#CBD5E1" />
                      <Text style={[styles.contactText, styles.link]}>GitHub</Text>
                    </View>
                  </Link>
                )}
                {contact.portfolio && (
                  <Link src={parseUrl(contact.portfolio)}>
                    <View style={styles.contactItem}>
                      <GlobeIcon width={12} height={12} color="#CBD5E1" />
                      <Text style={[styles.contactText, styles.link]}>Portfolio</Text>
                    </View>
                  </Link>
                )}
              </View>
            </View>

            <View style={styles.skillsContainer}>
              {skills.languages && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Languages</Text>
                  <View style={styles.skillTags}>
                    {skills.languages.split(',').map((lang, index) => (
                      <Text key={index} style={styles.skillTag}>
                        {sanitizeText(lang.trim())}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {skills.frameworks && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Frameworks</Text>
                  <View style={styles.skillTags}>
                    {skills.frameworks.split(',').map((framework, index) => (
                      <Text key={index} style={styles.skillTag}>
                        {sanitizeText(framework.trim())}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {skills.developerTools && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Developer Tools</Text>
                  <View style={styles.skillTags}>
                    {skills.developerTools.split(',').map((tool, index) => (
                      <Text key={index} style={styles.skillTag}>
                        {sanitizeText(tool.trim())}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Right Column - Main Content */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            {resume?.summary && (
              <Text style={styles.summary}>{sanitizeText(resume.summary)}</Text>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={{ marginBottom: 40 }}>
                <View style={styles.sectionTitle}>
                  <BriefcaseIcon width={14} height={14} color="#334155" />
                  <Text>Experience</Text>
                </View>
                <View>
                  {experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                      <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                      <Text style={styles.experienceCompany}>
                        {sanitizeText(exp.company)} • {sanitizeText(exp.location)}
                      </Text>
                      <Text style={styles.date}>{sanitizeText(exp.date)}</Text>
                      {exp.details.map((detail, idx) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <View style={{ marginBottom: 40 }}>
                <View style={styles.sectionTitle}>
                  <PresentationIcon width={14} height={14} color="#334155" />
                  <Text>Projects</Text>
                </View>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectCard}>
                    <View style={styles.projectHeader}>
                      <View>
                        <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                        <View style={styles.projectTechTags}>
                          {project.technologies.split(',').map((tech, techIndex) => (
                            <Text key={techIndex} style={styles.projectTechTag}>
                              {sanitizeText(tech.trim())}
                            </Text>
                          ))}
                        </View>
                      </View>
                      <Text style={styles.projectDate}>{sanitizeText(project.date)}</Text>
                    </View>

                    {project.details.map((detail, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                      </View>
                    ))}

                    {(project.deployedLink || project.githubLink) && (
                      <View style={styles.projectLinks}>
                        {project.deployedLink && (
                          <Link src={parseUrl(project.deployedLink)}>
                            <View style={styles.projectLink}>
                              <GlobeIcon width={10} height={10} color="#2563EB" />
                              <Text style={styles.projectLink}>View Live</Text>
                            </View>
                          </Link>
                        )}
                        {project.githubLink && (
                          <Link src={parseUrl(project.githubLink)}>
                            <View style={styles.projectLink}>
                              <GithubIcon width={10} height={10} color="#2563EB" />
                              <Text style={styles.projectLink}>View Code</Text>
                            </View>
                          </Link>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {resume?.certifications && resume.certifications.length > 0 && (
              <View style={{ marginTop: 40 }}>
                <View style={styles.sectionTitle}>
                  <AwardIcon width={14} height={14} color="#334155" />
                  <Text>Certifications</Text>
                </View>
                {resume.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationCard}>
                    <View style={styles.certificationHeader}>
                      <View>
                        <Text style={styles.certificationTitle}>{sanitizeText(cert.name)}</Text>
                        <Text style={styles.certificationProvider}>{sanitizeText(cert.provider)}</Text>
                        {cert.url && (
                          <Link src={parseUrl(cert.url)}>
                            <View style={styles.certificationLink}>
                              <ExternalLinkIcon width={10} height={10} color="#2563EB" />
                              <Text style={styles.certificationLinkText}>View Certificate</Text>
                            </View>
                          </Link>
                        )}
                      </View>
                      <Text style={styles.certificationDate}>{formatDate(cert.issueDate)}</Text>
                    </View>
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