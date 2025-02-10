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
  ExternalLinkIcon,
  TechStackIcon
} from './icons'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 24,
    fontFamily: 'Helvetica',
    backgroundColor: '#F8FAFC', // slate-50
  },
  header: {
    backgroundColor: '#0F172A', // slate-900
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#CBD5E1', // slate-300
  },
  link: {
    color: '#CBD5E1', // slate-300
    textDecoration: 'none',
  },
  columns: {
    flexDirection: 'row',
    gap: 16,
  },
  leftColumn: {
    width: '28%',
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B', // slate-800
    marginBottom: 12,
  },
  skillGroup: {
    marginBottom: 12,
  },
  skillTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155', // slate-700
    marginBottom: 8,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  languageTag: {
    fontSize: 8,
    color: '#1D4ED8', // blue-700
    backgroundColor: '#DBEAFE', // blue-100
    padding: '3 8',
    borderRadius: 8,
  },
  frameworkTag: {
    fontSize: 8,
    color: '#0E7490', // cyan-700
    backgroundColor: '#CFFAFE', // cyan-100
    padding: '3 8',
    borderRadius: 8,
  },
  toolTag: {
    fontSize: 8,
    color: '#334155', // slate-700
    backgroundColor: '#F1F5F9', // slate-100
    padding: '3 8',
    borderRadius: 8,
  },
  projectCard: {
    backgroundColor: '#F8FAFC', // slate-50
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B', // slate-800
    marginBottom: 4,
  },
  projectTechTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 6,
  },
  projectTechTag: {
    fontSize: 7,
    color: '#475569', // slate-600
    backgroundColor: 'white',
    padding: '2 6',
    borderRadius: 4,
    borderWidth: 1,
  },
  projectDate: {
    fontSize: 8,
    color: '#475569', // slate-600
    backgroundColor: 'white',
    padding: '2 8',
    borderRadius: 8,
    borderColor: '#E2E8F0', // slate-200
    borderWidth: 1,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  projectLink: {
    fontSize: 10,
    color: '#2563EB', // blue-600
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectLinkSymbol: {
    fontSize: 10,
    color: '#475569', // slate-600
    marginRight: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 2,
  },
  bullet: {
    fontSize: 12,
    color: '#2563EB', // blue-500
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#475569', // slate-600
    lineHeight: 1.3,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155', // slate-700
  },
  experienceCompany: {
    fontSize: 9,
    color: '#475569', // slate-600
  },
  experienceDate: {
    fontSize: 10,
    color: '#475569', // slate-500
  },
})

export function TechInnovatorPDF({ resume }: { resume: Resume }) {
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
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{sanitizeText(resume?.name || '')}</Text>
            <View style={styles.contactRow}>
              {contact.email && (
                <Link src={`mailto:${contact.email}`}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <MailIcon width={10} height={10} color="#CBD5E1" />
                    <Text style={[styles.contactText, styles.link]}>{sanitizeText(contact.email)}</Text>
                  </View>
                </Link>
              )}
              {contact.mobile && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PhoneIcon width={10} height={10} color="#CBD5E1" />
                  <Text style={styles.contactText}>{sanitizeText(contact.mobile)}</Text>
                </View>
              )}
              {contact.linkedin && (
                <Link src={parseUrl(contact.linkedin)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <LinkedinIcon width={10} height={10} color="#CBD5E1" />
                    <Text style={[styles.contactText, styles.link]}>LinkedIn</Text>
                  </View>
                </Link>
              )}
              {contact.github && (
                <Link src={parseUrl(contact.github)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <GithubIcon width={10} height={10} color="#CBD5E1" />
                    <Text style={[styles.contactText, styles.link]}>GitHub</Text>
                  </View>
                </Link>
              )}
              {contact.portfolio && (
                <Link src={parseUrl(contact.portfolio)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <GlobeIcon width={10} height={10} color="#CBD5E1" />
                    <Text style={[styles.contactText, styles.link]}>Portfolio</Text>
                  </View>
                </Link>
              )}
            </View>
          </View>

          {/* Two Column Layout */}
          <View style={styles.columns}>
            {/* Left Column - Tech Stack */}
            <View style={styles.leftColumn}>
              <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ 
                    backgroundColor: '#3B82F6', 
                    padding: 6,
                    borderRadius: 6,
                    marginRight: 6 
                  }}>
                    <TechStackIcon width={12} height={12} color="#FFFFFF" />
                  </View>
                  <Text style={styles.sectionTitle}>Tech Stack</Text>
                </View>
                <View>
                  {skills.languages && (
                    <View style={styles.skillGroup}>
                      <Text style={styles.skillTitle}>Languages</Text>
                      <View style={styles.skillTags}>
                        {skills.languages.split(',').map((lang, index) => (
                          <Text key={index} style={styles.languageTag}>
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
                          <Text key={index} style={styles.frameworkTag}>
                            {sanitizeText(framework.trim())}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                  {skills.developerTools && (
                    <View style={styles.skillGroup}>
                      <Text style={styles.skillTitle}>Dev Tools</Text>
                      <View style={styles.skillTags}>
                        {skills.developerTools.split(',').map((tool, index) => (
                          <Text key={index} style={styles.toolTag}>
                            {sanitizeText(tool.trim())}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Featured Projects */}
              {projects.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Featured Projects</Text>
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

                      {(project.deployedLink || project.githubLink || project.presentationLink) && (
                        <View style={styles.projectLinks}>
                          {project.deployedLink && (
                            <Link src={parseUrl(project.deployedLink)}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <GlobeIcon width={10} height={10} color="#2563EB" />
                                <Text style={styles.projectLink}>Live Demo</Text>
                              </View>
                            </Link>
                          )}
                          {project.githubLink && (
                            <Link src={parseUrl(project.githubLink)}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <GithubIcon width={10} height={10} color="#2563EB" />
                                <Text style={styles.projectLink}>Source Code</Text>
                              </View>
                            </Link>
                          )}
                          {project.presentationLink && (
                            <Link src={parseUrl(project.presentationLink)}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <PresentationIcon width={10} height={10} color="#2563EB" />
                                <Text style={styles.projectLink}>Presentation</Text>
                              </View>
                            </Link>
                          )}
                        </View>
                      )}

                      {project.details.map((detail, idx) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Professional Experience</Text>
                  {experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <View>
                          <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                          <Text style={styles.experienceCompany}>
                            {sanitizeText(exp.company)} • {sanitizeText(exp.location)}
                          </Text>
                        </View>
                        <Text style={styles.experienceDate}>{sanitizeText(exp.date)}</Text>
                      </View>
                      {exp.details.map((detail, idx) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* Education */}
              {resume.education?.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {resume.education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{sanitizeText(edu.school)}</Text>
                        <Text style={styles.text}>{sanitizeText(edu.date)}</Text>
                      </View>
                      <Text style={styles.text}>{sanitizeText(edu.degree)}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <BuildingIcon width={10} height={10} color="#CBD5E1" />
                        <Text style={styles.text}>{sanitizeText(edu.location)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  {resume.certifications.map((cert, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{sanitizeText(cert.name)}</Text>
                        <Text style={styles.text}>{formatDate(cert.issueDate)}</Text>
                      </View>
                      <Text style={styles.text}>{sanitizeText(cert.provider)}</Text>
                      {cert.url && (
                        <Link src={parseUrl(cert.url)}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <ExternalLinkIcon width={10} height={10} color="#3B82F6" />
                            <Text style={[styles.text, { color: '#3B82F6' }]}>View Certificate</Text>
                          </View>
                        </Link>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
} 