import React from 'react'
import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'
import { baseStyles } from './base-styles'
import { formatDate, parseUrl, sanitizeText } from './utils'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 32,
    fontFamily: 'Helvetica',
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 16,
    borderBottom: '1 solid #A7F3D0',
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 10,
    color: '#047857',
  },
  link: {
    color: '#047857',
    textDecoration: 'none',
  },
  columns: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    width: '35%',
  },
  rightColumn: {
    width: '65%',
  },
  section: {
    marginBottom: 14,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 4,
    width: '100%',
  },
  summarySection: {
    marginBottom: 14,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 4,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 8,
    borderBottom: '1 solid #A7F3D0',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 10,
    color: '#065F46',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  educationItem: {
    marginBottom: 10,
  },
  schoolName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 2,
  },
  degree: {
    fontSize: 10,
    color: '#047857',
    marginBottom: 1,
  },
  locationDate: {
    fontSize: 9,
    color: '#059669',
  },
  skillGroup: {
    marginBottom: 10,
  },
  skillTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 2,
  },
  skillText: {
    fontSize: 10,
    color: '#047857',
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065F46',
  },
  date: {
    fontSize: 9,
    color: '#059669',
  },
  company: {
    fontSize: 10,
    color: '#047857',
    marginBottom: 4,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 2,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 8,
    color: '#047857',
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#065F46',
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 2,
  },
  technologies: {
    fontSize: 10,
    color: '#047857',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  projectLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 9,
    color: '#047857',
    textDecoration: 'none',
  },
})

export function CantabrigianPDF({ resume }: { resume: Resume }) {
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
            {contact.github && (
              <Link src={parseUrl(contact.github)}>
                <Text style={[styles.contactText, styles.link]}>GitHub</Text>
              </Link>
            )}
            {contact.portfolio && (
              <Link src={parseUrl(contact.portfolio)}>
                <Text style={[styles.contactText, styles.link]}>Portfolio</Text>
              </Link>
            )}
          </View>
        </View>

        {/* Two Column Layout */}
        <View style={styles.columns}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education */}
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                    <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                    <Text style={styles.locationDate}>{sanitizeText(edu.location)}</Text>
                    <Text style={styles.date}>{sanitizeText(edu.date)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Expertise */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expertise</Text>
              <View>
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
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {resume?.summary && (
              <View style={styles.summarySection}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.summaryText}>{sanitizeText(resume.summary)}</Text>
              </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{sanitizeText(exp.title)}</Text>
                      <Text style={styles.date}>{sanitizeText(exp.date)}</Text>
                    </View>
                    <Text style={styles.company}>
                      {sanitizeText(exp.company)} • {sanitizeText(exp.location)}
                    </Text>
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

            {/* Notable Projects */}
            {projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notable Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.projectHeader}>
                      <View>
                        <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                        <Text style={styles.technologies}>{sanitizeText(project.technologies)}</Text>
                      </View>
                      <Text style={styles.date}>{sanitizeText(project.date)}</Text>
                    </View>

                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <View style={styles.projectLinks}>
                        {project.deployedLink && (
                          <Link src={parseUrl(project.deployedLink)}>
                            <Text style={[styles.projectLink, styles.link]}>View Project</Text>
                          </Link>
                        )}
                        {project.githubLink && (
                          <Link src={parseUrl(project.githubLink)}>
                            <Text style={[styles.projectLink, styles.link]}>Source Code</Text>
                          </Link>
                        )}
                        {project.presentationLink && (
                          <Link src={parseUrl(project.presentationLink)}>
                            <Text style={[styles.projectLink, styles.link]}>Presentation</Text>
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
          </View>
        </View>
      </Page>
    </Document>
  )
} 