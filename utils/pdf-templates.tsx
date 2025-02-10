import React from 'react'
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'

// Create styles for PDF templates
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 5,
    color: '#374151',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#4B5563',
  },
  bold: {
    fontWeight: 700,
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  bullet: {
    width: 3,
    height: 3,
    marginRight: 6,
    backgroundColor: '#9CA3AF',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
})

export const ResumePDF: React.FC<{ resume: Resume }> = ({ resume }) => {
  const {
    name = '',
    contact = {},
    summary,
    experience = [],
    projects = [],
    skills: {
      languages = '',
      frameworks = '',
      developerTools = '',
      libraries = ''
    } = {},
    education = [],
    certifications = [],
  } = resume

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>{name}</Text>
        <View style={styles.contactRow}>
          {contact.email && (
            <Link src={`mailto:${contact.email}`}>
              <Text style={[styles.text, styles.link]}>{contact.email}</Text>
            </Link>
          )}
          {contact.mobile && (
            <Text style={styles.text}>{contact.mobile}</Text>
          )}
          {contact.linkedin && (
            <Link src={contact.linkedin}>
              <Text style={[styles.text, styles.link]}>LinkedIn</Text>
            </Link>
          )}
          {contact.github && (
            <Link src={contact.github}>
              <Text style={[styles.text, styles.link]}>GitHub</Text>
            </Link>
          )}
        </View>
      </View>

      {/* Summary */}
      {summary && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Professional Summary</Text>
          <Text style={styles.text}>{summary}</Text>
        </View>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={[styles.row, { marginBottom: 2 }]}>
                <Text style={[styles.text, styles.bold]}>{exp.title}</Text>
                <Text style={styles.text}>{exp.date}</Text>
              </View>
              <Text style={[styles.text, { marginBottom: 4 }]}>
                {exp.company} • {exp.location}
              </Text>
              {exp.details.map((detail, idx) => (
                <View key={idx} style={[styles.row, { marginBottom: 2 }]}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{detail}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={[styles.row, { marginBottom: 2 }]}>
                <Text style={[styles.text, styles.bold]}>{project.name}</Text>
                <Text style={styles.text}>{project.date}</Text>
              </View>
              <Text style={[styles.text, { marginBottom: 4 }]}>
                {project.technologies}
              </Text>
              {project.details.map((detail, idx) => (
                <View key={idx} style={[styles.row, { marginBottom: 2 }]}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{detail}</Text>
                </View>
              ))}
              {(project.deployedLink || project.githubLink) && (
                <View style={[styles.row, { marginTop: 4 }]}>
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
      {(languages || frameworks || developerTools || libraries) && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Technical Skills</Text>
          {languages && (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.text, styles.bold]}>Languages: </Text>
              <Text style={styles.text}>{languages}</Text>
            </View>
          )}
          {frameworks && (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.text, styles.bold]}>Frameworks: </Text>
              <Text style={styles.text}>{frameworks}</Text>
            </View>
          )}
          {developerTools && (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.text, styles.bold]}>Developer Tools: </Text>
              <Text style={styles.text}>{developerTools}</Text>
            </View>
          )}
          {libraries && (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.text, styles.bold]}>Libraries: </Text>
              <Text style={styles.text}>{libraries}</Text>
            </View>
          )}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <View style={[styles.row, { marginBottom: 2 }]}>
                <Text style={[styles.text, styles.bold]}>{edu.school}</Text>
                <Text style={styles.text}>{edu.date}</Text>
              </View>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>{edu.location}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subheading}>Certifications</Text>
          {certifications.map((cert, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={[styles.text, styles.bold]}>{cert.name}</Text>
              <Text style={styles.text}>{cert.provider}</Text>
              <Text style={styles.text}>
                {new Date(cert.issueDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
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
  )
}

export const PDFTemplates = {
  professional: ({ resume }: { resume: Resume }) => {
    const {
      name = '',
      contact = {},
      summary,
      experience = [],
      projects = [],
      skills: {
        languages = '',
        frameworks = '',
        developerTools = '',
        libraries = ''
      } = {},
      education = [],
      certifications = [],
    } = resume

    return (
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>{name}</Text>
          <View style={styles.contactRow}>
            {contact.email && (
              <Link src={`mailto:${contact.email}`}>
                <Text style={[styles.text, styles.link]}>{contact.email}</Text>
              </Link>
            )}
            {contact.mobile && (
              <Text style={styles.text}>{contact.mobile}</Text>
            )}
            {contact.linkedin && (
              <Link src={contact.linkedin}>
                <Text style={[styles.text, styles.link]}>LinkedIn</Text>
              </Link>
            )}
            {contact.github && (
              <Link src={contact.github}>
                <Text style={[styles.text, styles.link]}>GitHub</Text>
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Professional Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={[styles.row, { marginBottom: 2 }]}>
                  <Text style={[styles.text, styles.bold]}>{exp.title}</Text>
                  <Text style={styles.text}>{exp.date}</Text>
                </View>
                <Text style={[styles.text, { marginBottom: 4 }]}>
                  {exp.company} • {exp.location}
                </Text>
                {exp.details.map((detail, idx) => (
                  <View key={idx} style={[styles.row, { marginBottom: 2 }]}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{detail}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={[styles.row, { marginBottom: 2 }]}>
                  <Text style={[styles.text, styles.bold]}>{project.name}</Text>
                  <Text style={styles.text}>{project.date}</Text>
                </View>
                <Text style={[styles.text, { marginBottom: 4 }]}>
                  {project.technologies}
                </Text>
                {project.details.map((detail, idx) => (
                  <View key={idx} style={[styles.row, { marginBottom: 2 }]}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{detail}</Text>
                  </View>
                ))}
                {(project.deployedLink || project.githubLink) && (
                  <View style={[styles.row, { marginTop: 4 }]}>
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
        {(languages || frameworks || developerTools || libraries) && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Technical Skills</Text>
            {languages && (
              <View style={{ marginBottom: 4 }}>
                <Text style={[styles.text, styles.bold]}>Languages: </Text>
                <Text style={styles.text}>{languages}</Text>
              </View>
            )}
            {frameworks && (
              <View style={{ marginBottom: 4 }}>
                <Text style={[styles.text, styles.bold]}>Frameworks: </Text>
                <Text style={styles.text}>{frameworks}</Text>
              </View>
            )}
            {developerTools && (
              <View style={{ marginBottom: 4 }}>
                <Text style={[styles.text, styles.bold]}>Developer Tools: </Text>
                <Text style={styles.text}>{developerTools}</Text>
              </View>
            )}
            {libraries && (
              <View style={{ marginBottom: 4 }}>
                <Text style={[styles.text, styles.bold]}>Libraries: </Text>
                <Text style={styles.text}>{libraries}</Text>
              </View>
            )}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <View style={[styles.row, { marginBottom: 2 }]}>
                  <Text style={[styles.text, styles.bold]}>{edu.school}</Text>
                  <Text style={styles.text}>{edu.date}</Text>
                </View>
                <Text style={styles.text}>{edu.degree}</Text>
                <Text style={styles.text}>{edu.location}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Certifications</Text>
            {certifications.map((cert, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={[styles.text, styles.bold]}>{cert.name}</Text>
                <Text style={styles.text}>{cert.provider}</Text>
                <Text style={styles.text}>
                  {new Date(cert.issueDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
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
    )
  },
  // Add other templates here...
} 