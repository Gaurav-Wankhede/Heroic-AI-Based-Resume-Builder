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
    padding: 36,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 24,
  },
  experienceItem: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    color: '#111827', // gray-900
    marginBottom: 8,
    fontWeight: 'normal',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  contactText: {
    fontSize: 9,
    color: '#4B5563', // gray-600
  },
  contactDivider: {
    fontSize: 9,
    color: '#4B5563', // gray-600
    marginHorizontal: 4,
  },
  link: {
    color: '#4B5563', // gray-600
    textDecoration: 'none',
  },
  summary: {
    fontSize: 10,
    color: '#374151', // gray-700
    lineHeight: 1.4,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceGroup: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  experienceCompany: {
    fontSize: 9,
    color: '#4B5563', // gray-600
  },
  experienceDate: {
    fontSize: 9,
    color: '#6B7280', // gray-500
    textAlign: 'right',
  },
  experienceLocation: {
    fontSize: 9,
    color: '#6B7280', // gray-500
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 2,
    paddingLeft: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
  },
  projectGroup: {
    marginBottom: 16,
  },
  projectHeader: {
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  projectTech: {
    fontSize: 9,
    color: '#4B5563', // gray-600
    marginBottom: 4,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
  },
  skillGroup: {
    width: '45%',
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151', // gray-700
    marginBottom: 2,
  },
  skillText: {
    fontSize: 9,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
  },
  certificationGroup: {
    marginBottom: 8,
  },
  certificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  certificationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
  },
  certificationDate: {
    fontSize: 9,
    color: '#6B7280', // gray-500
  },
  certificationProvider: {
    fontSize: 9,
    color: '#4B5563', // gray-600
    marginBottom: 2,
  },
})

export function MinimalistPDF({ resume }: { resume: Resume }) {
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
  const education = resume?.education || []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{sanitizeText(resume?.name || '')}</Text>
          <View style={styles.contactRow}>
            {contact.email && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MailIcon width={10} height={10} color="#4B5563" />
                <Link src={`mailto:${contact.email}`}>
                  <Text style={[styles.contactText, styles.link]}>{sanitizeText(contact.email)}</Text>
                </Link>
              </View>
            )}
            {contact.mobile && (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PhoneIcon width={10} height={10} color="#4B5563" />
                  <Text style={styles.contactText}>{sanitizeText(contact.mobile)}</Text>
                </View>
              </>
            )}
            {contact.linkedin && (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <LinkedinIcon width={10} height={10} color="#4B5563" />
                  <Link src={parseUrl(contact.linkedin)}>
                    <Text style={[styles.contactText, styles.link]}>LinkedIn</Text>
                  </Link>
                </View>
              </>
            )}
            {contact.github && (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <GithubIcon width={10} height={10} color="#4B5563" />
                  <Link src={parseUrl(contact.github)}>
                    <Text style={[styles.contactText, styles.link]}>GitHub</Text>
                  </Link>
                </View>
              </>
            )}
            {contact.location && (
              <>
                <Text style={styles.contactDivider}>•</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <BuildingIcon width={10} height={10} color="#4B5563" />
                  <Text style={styles.contactText}>{sanitizeText(contact.location)}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Summary */}
        {resume?.summary && (
          <View style={styles.summary}>
            <Text>{sanitizeText(resume.summary)}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <BriefcaseIcon width={12} height={12} color="#1F2937" />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#4B5563" />
                      <Text style={styles.experienceCompany}>
                        {sanitizeText(exp.company)} • {sanitizeText(exp.location)}
                      </Text>
                    </View>
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

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <PresentationIcon width={12} height={12} color="#1F2937" />
              <Text style={styles.sectionTitle}>Projects</Text>
            </View>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectGroup}>
                <View style={styles.projectHeader}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                    <Text style={styles.experienceDate}>{sanitizeText(project.date)}</Text>
                  </View>
                  <Text style={styles.projectTech}>{sanitizeText(project.technologies)}</Text>
                </View>
                {project.details.map((detail, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                  </View>
                ))}
                {(project.deployedLink || project.githubLink) && (
                  <View style={styles.projectLinks}>
                    {project.deployedLink && (
                      <Link src={parseUrl(project.deployedLink)}>
                        <Text style={[styles.contactText, styles.link]}>View Project →</Text>
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link src={parseUrl(project.githubLink)}>
                        <Text style={[styles.contactText, styles.link]}>Source →</Text>
                      </Link>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <GraduationIcon width={12} height={12} color="#1F2937" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={[styles.experienceHeader, { marginBottom: 16 }]}>
                <View>
                  <Text style={styles.experienceTitle}>{sanitizeText(edu.school)}</Text>
                  <Text style={styles.experienceCompany}>{sanitizeText(edu.degree)}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <BuildingIcon width={10} height={10} color="#4B5563" />
                    <Text style={styles.experienceLocation}>{sanitizeText(edu.location)}</Text>
                  </View>
                </View>
                <Text style={styles.experienceDate}>{sanitizeText(edu.date)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills.languages || skills.frameworks || skills.developerTools) && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <GlobeIcon width={12} height={12} color="#1F2937" />
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.languages && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Languages</Text>
                  <Text style={styles.skillText}>{sanitizeText(skills.languages)}</Text>
                </View>
              )}
              {skills.frameworks && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Frameworks</Text>
                  <Text style={styles.skillText}>{sanitizeText(skills.frameworks)}</Text>
                </View>
              )}
              {skills.developerTools && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillTitle}>Tools</Text>
                  <Text style={styles.skillText}>{sanitizeText(skills.developerTools)}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Certifications */}
        {resume?.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <AwardIcon width={12} height={12} color="#1F2937" />
              <Text style={styles.sectionTitle}>Certifications</Text>
            </View>
            {resume.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationGroup}>
                <View style={styles.certificationHeader}>
                  <Text style={styles.certificationTitle}>{sanitizeText(cert.name)}</Text>
                  <Text style={styles.certificationDate}>{formatDate(cert.issueDate)}</Text>
                </View>
                <Text style={styles.certificationProvider}>{sanitizeText(cert.provider)}</Text>
                {cert.url && (
                  <Link src={parseUrl(cert.url)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <ExternalLinkIcon width={10} height={10} color="#2563EB" />
                      <Text style={[styles.contactText, styles.link]}>View Certificate</Text>
                    </View>
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
} 