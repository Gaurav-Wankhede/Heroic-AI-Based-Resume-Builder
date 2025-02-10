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
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: '2 solid #C7D2FE',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#312E81',
    marginBottom: 4,
    fontFamily: 'Times-Roman',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 11, // Standard text size
    color: '#4338CA',
    fontFamily: 'Times-Roman',
  },
  link: {
    color: '#4338CA',
    textDecoration: 'none',
    fontFamily: 'Times-Roman',
    fontSize: 10,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#312E81',
    marginTop: 6,
    borderBottom: '1 solid #C7D2FE',
    fontFamily: 'Times-Roman',
  },
  summaryText: {
    fontSize: 11, // Standard text size
    color: '#374151',
    fontFamily: 'Times-Roman',
    textAlign: 'justify',
  },
  educationItem: {
    marginTop: 0,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  schoolName: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#3730A3',
    fontFamily: 'Times-Roman',
  },
  degree: {
    fontSize: 11, // Standard text size
    color: '#4338CA',
    fontFamily: 'Times-Roman',
  },
  location: {
    fontSize: 10, // Smallest size for supporting info
    color: '#4F46E5',
    fontFamily: 'Times-Roman',
  },
  date: {
    fontSize: 10, // Smallest size for supporting info
    color: '#4F46E5',
    fontFamily: 'Times-Roman',
    fontWeight: 'medium',
  },
  experienceItem: {
    marginTop: 0,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 12, // Match schoolName
    fontWeight: 'medium',
    color: '#3730A3',
    fontFamily: 'Times-Roman',
  },
  experienceCompany: {
    fontSize: 11, // Standard text size
    color: '#4338CA',
    fontFamily: 'Times-Roman',
  },
  experienceLocation: {
    fontSize: 10,
    color: '#4F46E5',
    fontFamily: 'Times-Roman',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 10, // Smallest size for bullets
    color: '#374151',
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 11, // Standard text size
    color: '#374151',
    fontFamily: 'Times-Roman',
    textAlign: 'justify',
  },
  projectCard: {
    backgroundColor: '#EEF2FF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
    borderLeft: '4 solid #C7D2FE',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 12, // Match other headers
    fontWeight: 'medium',
    color: '#3730A3',
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
  },
  projectTech: {
    fontSize: 11, // Standard text size
    color: '#4F46E5',
    marginBottom: 8,
    fontFamily: 'Times-Roman',
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 8,
  },
  projectLink: {
    fontSize: 10, // Smallest size for supporting info
    color: '#4338CA',
    textDecoration: 'underline',
    fontFamily: 'Times-Roman',
  },
  skillsGrid: {
    gap: 0,
  },
  skillGroup: {
    marginTop: 0,
  },
  skillTitle: {
    fontSize: 12, // Match other headers
    fontWeight: 'medium',
    color: '#3730A3',
    marginBottom: 4,
    fontFamily: 'Times-Roman',
  },
  skillText: {
    fontSize: 11, // Standard text size
    color: '#374151',
    fontFamily: 'Times-Roman',
  },
  projectItem: {
    marginTop: 0,
  },
})

export function AcademicScholarPDF({ resume }: { resume: Resume }) {
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
          </View>
        </View>

        {/* Research Interests */}
        {resume?.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Interests</Text>
            <Text style={styles.summaryText}>{sanitizeText(resume.summary)}</Text>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GraduationIcon width={12} height={12} color="#3730A3" />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.schoolName}>{sanitizeText(edu.school)}</Text>
                    <Text style={styles.degree}>{sanitizeText(edu.degree)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#4338CA" />
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
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <BriefcaseIcon width={12} height={12} color="#3730A3" />
              <Text style={styles.sectionTitle}>Research Experience</Text>
            </View>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{sanitizeText(exp.title)}</Text>
                    <Text style={styles.experienceCompany}>{sanitizeText(exp.company)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <BuildingIcon width={10} height={10} color="#4338CA" />
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GlobeIcon width={12} height={12} color="#3730A3" />
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
                          <GlobeIcon width={10} height={10} color="#4338CA" />
                          <Text style={[styles.link]}>View Publication</Text>
                        </View>
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link src={parseUrl(project.githubLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <GithubIcon width={10} height={10} color="#4338CA" />
                          <Text style={[styles.link]}>View Repository</Text>
                        </View>
                      </Link>
                    )}
                    {project.presentationLink && (
                      <Link src={parseUrl(project.presentationLink)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <PresentationIcon width={10} height={10} color="#4338CA" />
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AwardIcon width={12} height={12} color="#3730A3" />
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
                          <ExternalLinkIcon width={10} height={10} color="#4338CA" />
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

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Expertise</Text>
          <View style={styles.skillsGrid}>
            {skills.languages && (
              <View style={styles.skillGroup}>
                <Text style={styles.skillTitle}>Research Tools & Languages</Text>
                <Text style={styles.skillText}>{sanitizeText(skills.languages)}</Text>
              </View>
            )}
            {skills.frameworks && (
              <View style={styles.skillGroup}>
                <Text style={styles.skillTitle}>Analysis Frameworks</Text>
                <Text style={styles.skillText}>{sanitizeText(skills.frameworks)}</Text>
              </View>
            )}
            {skills.developerTools && (
              <View style={styles.skillGroup}>
                <Text style={styles.skillTitle}>Laboratory & Development Tools</Text>
                <Text style={styles.skillText}>{sanitizeText(skills.developerTools)}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
} 