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
    fontFamily: 'Times-Roman',
    backgroundColor: '#F8FAFC', // slate-50
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    paddingBottom: 16,
    borderBottom: '4 double #1E293B', // slate-800
  },
  name: {
    fontSize: 12 * 2, // 24pt - Most prominent element
    fontWeight: 'normal',
    color: '#0F172A', // slate-900
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  contactDivider: {
    borderLeft: '1 solid #94A3B8', // slate-400
    paddingLeft: 16,
  },
  contactText: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontFamily: 'Times-Roman',
  },
  link: {
    color: '#334155', // slate-700
    textDecoration: 'none',
    fontFamily: 'Times-Roman',
    fontSize: 10,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 12 * 1.5, // 18pt - Second level hierarchy
    fontWeight: 'normal',
    color: '#0F172A', // slate-900
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: '1 solid #E2E8F0', // slate-200
    fontFamily: 'Times-Roman',
  },
  summaryText: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
  },
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  schoolName: {
    fontSize: 12, // 12pt - Third level hierarchy
    fontWeight: 'normal',
    color: '#1E293B', // slate-800
    fontFamily: 'Times-Roman',
  },
  degree: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontStyle: 'italic',
    fontFamily: 'Times-Roman',
  },
  location: {
    fontSize: 10, // 10pt - Supporting information
    color: '#475569', // slate-600
    fontFamily: 'Times-Roman',
  },
  date: {
    fontSize: 10, // 10pt - Supporting information
    color: '#475569', // slate-600
    fontWeight: 'medium',
    fontFamily: 'Times-Roman',
  },
  projectItem: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 12, // 12pt - Third level hierarchy
    fontWeight: 'normal',
    color: '#1E293B', // slate-800
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  projectTech: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontStyle: 'italic',
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  projectDate: {
    fontSize: 10, // 10pt - Supporting information
    color: '#475569', // slate-600
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  projectLink: {
    fontSize: 10, // 10pt - Supporting information
    color: '#1D4ED8', // blue-700
    textDecoration: 'underline',
    fontFamily: 'Times-Roman',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 3,
    paddingLeft: 12,
  },
  bullet: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontFamily: 'Times-Roman',
  },
  expertiseSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  expertiseGroup: {
    marginBottom: 12,
  },
  expertiseTitle: {
    fontSize: 12, // 12pt - Third level hierarchy
    fontWeight: 'normal',
    color: '#1E293B', // slate-800
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  expertiseText: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontFamily: 'Times-Roman',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  experienceTitle: {
    fontSize: 12, // 12pt - Third level hierarchy
    fontWeight: 'normal',
    color: '#1E293B', // slate-800
    fontFamily: 'Times-Roman',
  },
  experienceCompany: {
    fontSize: 11, // 11pt - Main content text
    color: '#334155', // slate-700
    fontStyle: 'italic',
    fontFamily: 'Times-Roman',
  },
  experienceLocation: {
    fontSize: 10, // 10pt - Supporting information
    color: '#475569', // slate-600
    fontFamily: 'Times-Roman',
  },
})

export function OxfordStandardPDF({ resume }: { resume: Resume }) {
  // Add null checks and default values
  const contact = resume?.contact || {}
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }
  const projects = resume?.projects || []
  const education = resume?.education || []
  const experience = resume?.experience || []

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
              <Text style={[styles.contactText, styles.contactDivider]}>
                {sanitizeText(contact.mobile)}
              </Text>
            )}
            {contact.linkedin && (
              <Link src={parseUrl(contact.linkedin)}>
                <Text style={[styles.contactText, styles.link, styles.contactDivider]}>
                  Academic Profile
                </Text>
              </Link>
            )}
          </View>
        </View>

        {/* Research Focus */}
        {resume?.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Focus</Text>
            <Text style={styles.summaryText}>{sanitizeText(resume.summary)}</Text>
          </View>
        )}

        {/* Academic Background */}
        {education.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <GraduationIcon width={12} height={12} color="#1E293B" />
              <Text style={styles.sectionTitle}>Academic Background</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                    <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#475569" />
                      <Text style={styles.location}>{sanitizeText(edu.location)}</Text>
                    </View>
                  </View>
                  <Text style={styles.date}>{sanitizeText(edu.date)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Research Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <BriefcaseIcon width={12} height={12} color="#1E293B" />
              <Text style={styles.sectionTitle}>Research Experience</Text>
            </View>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                    <Text style={styles.experienceCompany}>{sanitizeText(exp.company)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#475569" />
                      <Text style={styles.experienceLocation}>{sanitizeText(exp.location)}</Text>
                    </View>
                  </View>
                  <Text style={styles.date}>{sanitizeText(exp.date)}</Text>
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

        {/* Publications & Research */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <GlobeIcon width={12} height={12} color="#1E293B" />
              <Text style={styles.sectionTitle}>Publications & Research</Text>
            </View>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                {project.details.map((detail, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                  </View>
                ))}
                {(project.deployedLink || project.githubLink || project.presentationLink) && (
                  <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
                    {project.deployedLink && (
                      <Link src={parseUrl(project.deployedLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <GlobeIcon width={10} height={10} color="#475569" />
                          <Text style={[styles.link]}>View Publication</Text>
                        </View>
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link src={parseUrl(project.githubLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <GithubIcon width={10} height={10} color="#475569" />
                          <Text style={[styles.link]}>View Repository</Text>
                        </View>
                      </Link>
                    )}
                    {project.presentationLink && (
                      <Link src={parseUrl(project.presentationLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <PresentationIcon width={10} height={10} color="#475569" />
                          <Text style={[styles.link]}>View Presentation</Text>
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
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <AwardIcon width={12} height={12} color="#1E293B" />
              <Text style={styles.sectionTitle}>Academic Certifications</Text>
            </View>
            {resume.certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.schoolName}>{sanitizeText(cert.name)}</Text>
                    <Text style={styles.degree}>{sanitizeText(cert.provider)}</Text>
                    {cert.url && (
                      <Link src={parseUrl(cert.url)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <ExternalLinkIcon width={10} height={10} color="#475569" />
                          <Text style={[styles.link]}>View Certificate</Text>
                        </View>
                      </Link>
                    )}
                  </View>
                  <Text style={styles.date}>{formatDate(cert.issueDate)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Areas of Expertise */}
        <View style={styles.expertiseSection}>
          <Text style={styles.sectionTitle}>Areas of Expertise</Text>
          <View>
            {skills.languages && (
              <View style={styles.expertiseGroup}>
                <Text style={styles.expertiseTitle}>Research Methods</Text>
                <Text style={styles.expertiseText}>{sanitizeText(skills.languages)}</Text>
              </View>
            )}
            {skills.frameworks && (
              <View style={styles.expertiseGroup}>
                <Text style={styles.expertiseTitle}>Analysis Tools</Text>
                <Text style={styles.expertiseText}>{sanitizeText(skills.frameworks)}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
} 