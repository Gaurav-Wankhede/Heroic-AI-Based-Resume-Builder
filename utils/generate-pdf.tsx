import { Resume } from '@/types/resume'
import React from 'react'
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf,
  Font,
  Link
} from '@react-pdf/renderer'
import { templates } from '@/lib/templates'
import { PDFTemplates as PDFTemplateComponents } from './pdf-styles'

// Register fonts
Font.register({
  family: 'Times-Roman',
  src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/times-new-roman@1.0.4/Times New Roman.ttf'
})

Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 'bold'
    }
  ]
})

// Base styles that can be extended by template-specific styles
const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Helvetica',
    color: '#374151',
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  bullet: {
    width: 2,
    height: 2,
    marginRight: 6,
    backgroundColor: '#9CA3AF',
  },
  contentWrapper: {
    width: '100%',
    flexGrow: 1,
  }
})

// Template-specific PDF components
const PDFTemplates: Record<keyof typeof templates, React.FC<{ resume: Resume }>> = {
  'professional': ({ resume }) => {
    const styles = StyleSheet.create({
      ...baseStyles,
      page: {
        ...baseStyles.page,
        padding: 40,
      },
      header: {
        marginBottom: 20,
        width: '100%',
      },
      content: {
        gap: 15,
        width: '100%',
      },
      contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 5,
      },
      detailsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 4,
        paddingLeft: 10,
        marginTop: 2,
      },
      bulletText: {
        flex: 1,
        ...baseStyles.text,
      },
    })

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.contentWrapper}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.heading}>{resume?.name || ''}</Text>
              <View style={styles.contactRow}>
                {resume.contact?.email && (
                  <Link src={`mailto:${resume.contact.email}`}>
                    <Text style={[styles.text, styles.link]}>{resume.contact.email}</Text>
                  </Link>
                )}
                {resume.contact?.mobile && (
                  <Text style={styles.text}>{resume.contact.mobile}</Text>
                )}
                {resume.contact?.linkedin && (
                  <Link src={resume.contact.linkedin}>
                    <Text style={[styles.text, styles.link]}>LinkedIn</Text>
                  </Link>
                )}
                {resume.contact?.github && (
                  <Link src={resume.contact.github}>
                    <Text style={[styles.text, styles.link]}>GitHub</Text>
                  </Link>
                )}
                {resume.contact?.portfolio && (
                  <Link src={resume.contact.portfolio}>
                    <Text style={[styles.text, styles.link]}>Portfolio</Text>
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
                  <Text style={styles.text}>{resume.summary}</Text>
                </View>
              )}

              {/* Experience */}
              {resume.experience?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.subheading}>Professional Experience</Text>
                  {resume.experience.map((exp, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{exp.title}</Text>
                        <Text style={styles.text}>{exp.date}</Text>
                      </View>
                      <Text style={[styles.text, { marginBottom: 2 }]}>
                        {exp.company} • {exp.location}
                      </Text>
                      {exp.details.map((detail, idx) => (
                        <View key={idx} style={styles.detailsRow}>
                          <View style={styles.bullet} />
                          <Text style={styles.bulletText}>{detail}</Text>
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
                    <View key={index} style={{ marginBottom: 8 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{project.name}</Text>
                        <Text style={styles.text}>{project.date}</Text>
                      </View>
                      <Text style={[styles.text, { marginBottom: 2 }]}>
                        {project.technologies}
                      </Text>
                      {project.details.map((detail, idx) => (
                        <View key={idx} style={styles.detailsRow}>
                          <View style={styles.bullet} />
                          <Text style={styles.bulletText}>{detail}</Text>
                        </View>
                      ))}
                      {(project.deployedLink || project.githubLink) && (
                        <View style={[styles.row, { marginTop: 4, justifyContent: 'flex-start', gap: 16 }]}>
                          {project.deployedLink && (
                            <Link src={project.deployedLink}>
                              <Text style={[styles.text, styles.link]}>Live Demo →</Text>
                            </Link>
                          )}
                          {project.githubLink && (
                            <Link src={project.githubLink}>
                              <Text style={[styles.text, styles.link]}>View Code →</Text>
                            </Link>
                          )}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Skills */}
              {resume.skills && (
                <View style={styles.section}>
                  <Text style={styles.subheading}>Technical Skills</Text>
                  <View style={{ gap: 4 }}>
                    {resume.skills.languages && (
                      <Text style={styles.text}>
                        <Text style={{ fontWeight: 700 }}>Languages: </Text>
                        {resume.skills.languages}
                      </Text>
                    )}
                    {resume.skills.frameworks && (
                      <Text style={styles.text}>
                        <Text style={{ fontWeight: 700 }}>Frameworks: </Text>
                        {resume.skills.frameworks}
                      </Text>
                    )}
                    {resume.skills.developerTools && (
                      <Text style={styles.text}>
                        <Text style={{ fontWeight: 700 }}>Developer Tools: </Text>
                        {resume.skills.developerTools}
                      </Text>
                    )}
                    {resume.skills.libraries && (
                      <Text style={styles.text}>
                        <Text style={{ fontWeight: 700 }}>Libraries: </Text>
                        {resume.skills.libraries}
                      </Text>
                    )}
                  </View>
                </View>
              )}

              {/* Education */}
              {resume.education?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.subheading}>Education</Text>
                  {resume.education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 4 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{edu.school}</Text>
                        <Text style={styles.text}>{edu.date}</Text>
                      </View>
                      <Text style={styles.text}>{edu.degree}</Text>
                      <Text style={styles.text}>{edu.location}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.subheading}>Certifications</Text>
                  {resume.certifications.map((cert, index) => (
                    <View key={index} style={{ marginBottom: 4 }}>
                      <View style={styles.row}>
                        <Text style={[styles.text, { fontWeight: 700 }]}>{cert.name}</Text>
                        <Text style={styles.text}>
                          {new Date(cert.issueDate).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </Text>
                      </View>
                      <Text style={styles.text}>{cert.provider}</Text>
                      {cert.url && (
                        <Link src={cert.url}>
                          <Text style={[styles.text, styles.link]}>View Certificate →</Text>
                        </Link>
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
  },
  'modern': ({ resume }) => {
    // Modern template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'minimalist': ({ resume }) => {
    // Minimalist template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'executive': ({ resume }) => {
    // Executive template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'creative': ({ resume }) => {
    // Creative template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'project-portfolio': ({ resume }) => {
    // Project Portfolio template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'cantabrigian': ({ resume }) => {
    // Cantabrigian template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'oxford-standard': ({ resume }) => {
    // Oxford Standard template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'academic-scholar': ({ resume }) => {
    // Academic Scholar template implementation
    return <Document><Page size="A4"></Page></Document>
  },
  'tech-innovator': ({ resume }) => {
    // Tech Innovator template implementation
    return <Document><Page size="A4"></Page></Document>
  }
}

export async function generatePDF(resume: Resume, templateName: keyof typeof templates = 'professional'): Promise<void> {
  try {
    // Get the appropriate template component
    const PDFTemplate = PDFTemplateComponents[templateName]
    
    // Generate the PDF with error handling
    const doc = await pdf(<PDFTemplate resume={resume} />).toBlob()
    
    if (!doc) {
      throw new Error('Failed to generate PDF document')
    }
    
    // Create download link
    const url = URL.createObjectURL(doc)
    const link = document.createElement('a')
    link.href = url
    link.download = `${resume.name.replace(/\s+/g, '_')}_${templateName}_Resume.pdf`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
} 