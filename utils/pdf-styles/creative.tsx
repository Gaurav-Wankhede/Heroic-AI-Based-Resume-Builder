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
  CircleIcon 
} from './icons'

const styles = StyleSheet.create({
  ...baseStyles,
  page: {
    ...baseStyles.page,
    padding: 24,
    fontFamily: 'Helvetica',
    backgroundColor: '#F5F3FF',
  },
  header: {
    position: 'relative',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottom: '2 solid #E9D5FF',
  },
  headerCircle: {
    position: 'absolute',
    top: -12,
    left: -12,
    width: 72,
    height: 72,
    backgroundColor: '#9333EA',
    borderRadius: 36,
    opacity: 0.1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#581C87',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  contactText: {
    fontSize: 9,
    color: '#7E22CE',
  },
  contactDivider: {
    fontSize: 9,
    color: '#7E22CE',
  },
  link: {
    color: '#7E22CE',
    textDecoration: 'none',
  },
  summarySection: {
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#581C87',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    color: '#7E22CE',
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  columns: {
    flexDirection: 'row',
    gap: 12,
  },
  leftColumn: {
    width: '33%',
  },
  rightColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#581C87',
    marginBottom: 8,
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6B21A8',
    marginBottom: 2,
  },
  skillText: {
    fontSize: 9,
    color: '#7E22CE',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 8,
    lastChild: {
      marginBottom: 0,
    },
  },
  schoolName: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#6B21A8',
  },
  degree: {
    fontSize: 9,
    color: '#7E22CE',
  },
  date: {
    fontSize: 9,
    color: '#9333EA',
  },
  experienceItem: {
    marginBottom: 12,
    lastChild: {
      marginBottom: 0,
    },
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
    color: '#6B21A8',
  },
  experienceCompany: {
    fontSize: 9,
    color: '#7E22CE',
    marginBottom: 2,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 1,
    paddingLeft: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#7E22CE',
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  projectsSection: {
    marginBottom: 12,
  },
  projectsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B21A8',
    marginBottom: 8,
  },
  projectCard: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  projectHeader: {
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#581C87',
    marginBottom: 2,
  },
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 9,
    fontWeight: 'medium',
    color: '#7E22CE',
  },
  projectDate: {
    fontSize: 8,
    color: '#9333EA',
    backgroundColor: '#F3E8FF',
    padding: '1 6',
    borderRadius: 8,
  },
  projectLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 8,
    color: '#7E22CE',
    backgroundColor: '#F3E8FF',
    padding: '1 6',
    borderRadius: 8,
  },
  projectBulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 1,
  },
  projectBulletText: {
    flex: 1,
    fontSize: 8,
    color: '#7E22CE',
    textAlign: 'justify',
    lineHeight: 1.4,
  },
})

export function CreativePDF({ resume }: { resume: Resume }) {
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
          <View style={styles.headerCircle} />
          <Text style={styles.name}>{sanitizeText(resume?.name || '')}</Text>
          <View style={styles.contactRow}>
            {contact.email && (
              <Link src={`mailto:${contact.email}`}>
                <Text style={[styles.contactText, styles.link]}>{sanitizeText(contact.email)}</Text>
              </Link>
            )}
            {contact.mobile && (
              <>
                <Text style={styles.contactDivider}>|</Text>
                <Text style={styles.contactText}>{sanitizeText(contact.mobile)}</Text>
              </>
            )}
            {contact.linkedin && (
              <>
                <Text style={styles.contactDivider}>|</Text>
                <Link src={parseUrl(contact.linkedin)}>
                  <Text style={[styles.contactText, styles.link]}>LinkedIn</Text>
                </Link>
              </>
            )}
            {contact.github && (
              <>
                <Text style={styles.contactDivider}>|</Text>
                <Link src={parseUrl(contact.github)}>
                  <Text style={[styles.contactText, styles.link]}>GitHub</Text>
                </Link>
              </>
            )}
            {contact.portfolio && (
              <>
                <Text style={styles.contactDivider}>|</Text>
                <Link src={parseUrl(contact.portfolio)}>
                  <Text style={[styles.contactText, styles.link]}>Portfolio</Text>
                </Link>
              </>
            )}
          </View>
        </View>

        {/* Summary */}
        {resume?.summary && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Creative Summary</Text>
            <Text style={styles.summaryText}>{sanitizeText(resume.summary)}</Text>
          </View>
        )}

        {/* Two Column Layout */}
        <View style={styles.columns}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Technical Arsenal</Text>
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
                    <Text style={styles.skillTitle}>Developer Tools</Text>
                    <Text style={styles.skillText}>{sanitizeText(skills.developerTools)}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Education Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                  <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                  <Text style={styles.date}>{sanitizeText(edu.date)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Professional Journey</Text>
              {experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                    <Text style={styles.date}>{sanitizeText(exp.date)}</Text>
                  </View>
                  <Text style={styles.experienceCompany}>
                    {sanitizeText(exp.company)} • {sanitizeText(exp.location)}
                  </Text>
                  {exp.details.map((detail, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <CircleIcon />
                      <Text style={styles.bulletText}>{sanitizeText(detail)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Projects Section */}
            {projects.length > 0 && (
              <View style={styles.projectsSection}>
                <Text style={styles.projectsTitle}>Creative Projects</Text>
                {projects.map((project, index) => (
                  <View key={index} style={styles.projectCard}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectTitle}>{sanitizeText(project.name)}</Text>
                      <View style={styles.projectMeta}>
                        <Text style={styles.projectTech}>{sanitizeText(project.technologies)}</Text>
                        <Text style={styles.projectDate}>{sanitizeText(project.date)}</Text>
                      </View>
                    </View>

                    {/* Project Links */}
                    {(project.deployedLink || project.githubLink || project.presentationLink) && (
                      <View style={styles.projectLinks}>
                        {project.deployedLink && (
                          <Link src={parseUrl(project.deployedLink)}>
                            <Text style={styles.projectLink}>Live Demo</Text>
                          </Link>
                        )}
                        {project.githubLink && (
                          <Link src={parseUrl(project.githubLink)}>
                            <Text style={styles.projectLink}>Repository</Text>
                          </Link>
                        )}
                        {project.presentationLink && (
                          <Link src={parseUrl(project.presentationLink)}>
                            <Text style={styles.projectLink}>Slides</Text>
                          </Link>
                        )}
                      </View>
                    )}

                    {/* Project Details */}
                    {project.details.map((detail, idx) => (
                      <View key={idx} style={styles.projectBulletPoint}>
                        <CircleIcon />
                        <Text style={styles.projectBulletText}>{sanitizeText(detail)}</Text>
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