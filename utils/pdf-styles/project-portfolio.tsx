import React from 'react'
import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'
import { baseStyles } from './base-styles'
import { formatDate, parseUrl, sanitizeText } from './utils'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 24,
    fontFamily: 'Helvetica',
    backgroundColor: '#F0FDFA', // teal-50
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#134E4A', // teal-900
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#0F766E', // teal-700
  },
  link: {
    color: '#0F766E', // teal-700
    textDecoration: 'none',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#134E4A', // teal-900
    marginBottom: 12,
  },
  skillsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  skillCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
  },
  skillTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#115E59', // teal-800
    marginBottom: 8,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    fontSize: 8,
    color: '#0F766E', // teal-700
    backgroundColor: '#CCFBF1', // teal-100
    padding: '2 8',
    borderRadius: 8,
  },
  frameworkTag: {
    fontSize: 8,
    color: '#0E7490', // cyan-700
    backgroundColor: '#CFFAFE', // cyan-100
    padding: '2 8',
    borderRadius: 8,
  },
  projectCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#115E59', // teal-800
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 8,
    color: '#0F766E', // teal-700
    backgroundColor: '#F0FDFA', // teal-50
    padding: '2 8',
    borderRadius: 8,
  },
  techTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  techTag: {
    fontSize: 8,
    color: '#0F766E', // teal-700
    backgroundColor: '#F0FDFA', // teal-50
    padding: '2 4',
    borderRadius: 4,
    fontWeight: 'medium',
  },
  projectLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  projectLink: {
    fontSize: 8,
    color: '#0D9488', // teal-600
    backgroundColor: '#F0FDFA', // teal-50
    padding: '4 8',
    borderRadius: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 10,
    color: '#14B8A6', // teal-500
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#374151', // gray-700
    lineHeight: 1.3,
  },
})

export function ProjectPortfolioPDF({ resume }: { resume: Resume }) {
  // Add null checks and default values
  const contact = resume?.contact || {}
  const skills = resume?.skills || {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  }
  const projects = resume?.projects || []

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
            {contact.github && (
              <Link src={parseUrl(contact.github)}>
                <Text style={[styles.contactText, styles.link]}>GitHub</Text>
              </Link>
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

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {skills.languages && (
              <View style={styles.skillCard}>
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
              <View style={styles.skillCard}>
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
          </View>
        </View>

        {/* Featured Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Projects</Text>
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

                {(project.deployedLink || project.githubLink || project.presentationLink) && (
                  <View style={styles.projectLinks}>
                    {project.deployedLink && (
                      <Link src={parseUrl(project.deployedLink)}>
                        <Text style={styles.projectLink}>Live Demo</Text>
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link src={parseUrl(project.githubLink)}>
                        <Text style={styles.projectLink}>Source Code</Text>
                      </Link>
                    )}
                    {project.presentationLink && (
                      <Link src={parseUrl(project.presentationLink)}>
                        <Text style={styles.projectLink}>Presentation</Text>
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
      </Page>
    </Document>
  )
} 