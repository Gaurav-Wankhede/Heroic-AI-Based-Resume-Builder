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
  RightArrowIcon
} from './icons'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 24,
    fontFamily: 'Helvetica',
    backgroundColor: '#F9FAFB', // gray-50
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    marginBottom: 8,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 10,
    color: '#4B5563', // gray-600
  },
  link: {
    color: '#1D4ED8', // blue-700
    textDecoration: 'none',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    marginBottom: 8,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summarySection: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6', // gray-100
  },
  summaryText: {
    fontSize: 10,
    color: '#374151', // gray-700
    lineHeight: 1.3,
  },
  experienceCard: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6', // gray-100
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  experienceDate: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    fontWeight: 'medium',
  },
  experienceSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  experienceCompany: {
    fontSize: 10,
    color: '#1D4ED8', // blue-700
    fontWeight: 'bold',
  },
  experienceLocation: {
    fontSize: 10,
    color: '#4B5563', // gray-600
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 3,
  },
  bullet: {
    fontSize: 10,
    color: '#2563EB', // blue-600
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#374151', // gray-700
    lineHeight: 1.3,
  },
  projectCard: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6', // gray-100
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
  projectDate: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    backgroundColor: '#F9FAFB', // gray-50
    padding: '2 6',
    borderRadius: 12,
  },
  techTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 6,
  },
  techTag: {
    fontSize: 10,
    color: '#1D4ED8', // blue-700
    backgroundColor: '#EFF6FF', // blue-50
    padding: '2 6',
    borderRadius: 12,
    fontWeight: 'medium',
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1 solid #F3F4F6', // gray-100
  },
  educationCard: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6', // gray-100
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  schoolName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  degree: {
    fontSize: 10,
    color: '#1D4ED8', // blue-700
    fontWeight: 'medium',
  },
  educationLocation: {
    fontSize: 10,
    color: '#4B5563', // gray-600
  },
})

export function ExecutivePDF({ resume }: { resume: Resume }) {
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
              <Link src={`mailto:${contact.email}`}>
                <Text style={[styles.contactText, styles.link]}>{sanitizeText(contact.email)}</Text>
              </Link>
            )}
            {contact.mobile && (
              <Text style={styles.contactText}>{sanitizeText(contact.mobile)}</Text>
            )}
            {contact.linkedin && (
              <Link src={parseUrl(contact.linkedin)}>
                <Text style={[styles.contactText, styles.link]}>LinkedIn</Text>
              </Link>
            )}
            {contact.portfolio && (
              <Link src={parseUrl(contact.portfolio)}>
                <Text style={[styles.contactText, styles.link]}>Portfolio</Text>
              </Link>
            )}
          </View>
        </View>

        {/* Executive Summary */}
        {resume?.summary && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.summaryText}>{sanitizeText(resume.summary)}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <BriefcaseIcon width={12} height={12} color="#111827" />
              <Text style={styles.sectionTitle}>Executive Experience</Text>
            </View>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceCard}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                  <Text style={styles.experienceDate}>{sanitizeText(exp.date)}</Text>
                </View>
                <View style={styles.experienceSubHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <BuildingIcon width={10} height={10} color="#1D4ED8" />
                    <Text style={styles.experienceCompany}>{sanitizeText(exp.company)}</Text>
                  </View>
                  <Text style={styles.experienceLocation}>{sanitizeText(exp.location)}</Text>
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

        {/* Strategic Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <PresentationIcon width={12} height={12} color="#111827" />
              <Text style={styles.sectionTitle}>Strategic Projects</Text>
            </View>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <View>
                    <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                    <View style={styles.techTags}>
                      {project.technologies.split(',').map((tech, techIndex) => (
                        <Text key={techIndex} style={styles.techTag}>
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

                {(project.deployedLink || project.presentationLink) && (
                  <View style={styles.projectLinks}>
                    {project.deployedLink && (
                      <Link src={parseUrl(project.deployedLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Text style={[styles.contactText, styles.link]}>View Project</Text>
                          <RightArrowIcon width={10} height={10} color="#1D4ED8" />
                        </View>
                      </Link>
                    )}
                    {project.presentationLink && (
                      <Link src={parseUrl(project.presentationLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Text style={[styles.contactText, styles.link]}>View Presentation</Text>
                          <RightArrowIcon width={10} height={10} color="#1D4ED8" />
                        </View>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <GraduationIcon width={12} height={12} color="#111827" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationCard}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                    <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#1D4ED8" />
                      <Text style={styles.educationLocation}>{sanitizeText(edu.location)}</Text>
                    </View>
                  </View>
                  <Text style={styles.experienceDate}>{sanitizeText(edu.date)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {resume?.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <AwardIcon width={12} height={12} color="#111827" />
              <Text style={styles.sectionTitle}>Professional Certifications</Text>
            </View>
            {resume.certifications.map((cert, index) => (
              <View key={index} style={styles.educationCard}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.schoolName}>{sanitizeText(cert.name)}</Text>
                    <Text style={styles.degree}>{sanitizeText(cert.provider)}</Text>
                    {cert.url && (
                      <Link src={parseUrl(cert.url)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <ExternalLinkIcon width={10} height={10} color="#2563EB" />
                          <Text style={[styles.contactText, styles.link]}>View Certificate</Text>
                        </View>
                      </Link>
                    )}
                  </View>
                  <Text style={styles.experienceDate}>{formatDate(cert.issueDate)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
} 