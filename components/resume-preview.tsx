import { Resume } from "@/types/resume"

interface ResumePreviewProps {
  resume: Resume
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="font-['Arial'] text-sm">
      {/* Contact Information */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">{resume.name}</h1>
        <div className="flex justify-center gap-4 text-gray-600">
          {resume.contact.email && (
            <a href={`mailto:${resume.contact.email}`} className="hover:text-primary">
              {resume.contact.email}
            </a>
          )}
          {resume.contact.mobile && <span>|</span>}
          {resume.contact.mobile && <span>{resume.contact.mobile}</span>}
          {resume.contact.linkedin && <span>|</span>}
          {resume.contact.linkedin && (
            <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
          )}
          {resume.contact.github && <span>|</span>}
          {resume.contact.github && (
            <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              GitHub
            </a>
          )}
          {resume.contact.portfolio && <span>|</span>}
          {resume.contact.portfolio && (
            <a href={resume.contact.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="whitespace-pre-wrap">{resume.summary}</p>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold">{edu.school}</h3>
                  <div className="text-gray-600">{edu.degree}</div>
                </div>
                <div className="text-gray-600 text-right">
                  {edu.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold">{exp.title}</h3>
                  <div className="text-gray-600">{exp.company}</div>
                </div>
                <div className="text-gray-600 text-right">
                  {exp.date}
                </div>
              </div>
              <ul className="list-disc list-inside mt-1">
                {exp.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm text-gray-700 ml-4">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold mb-1">{project.name}</h3>
              <div className="text-gray-600">{project.technologies}</div>
              <ul className="list-disc list-inside mt-1">
                {project.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm text-gray-700 ml-4">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && (
        <div>
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Technical Skills</h2>
          <div className="space-y-2 text-sm">
            {resume.skills.languages && (
              <div>
                <span className="font-medium">Languages:</span> {resume.skills.languages}
              </div>
            )}
            {resume.skills.frameworks && (
              <div>
                <span className="font-medium">Frameworks:</span> {resume.skills.frameworks}
              </div>
            )}
            {resume.skills.developerTools && (
              <div>
                <span className="font-medium">Developer Tools:</span> {resume.skills.developerTools}
              </div>
            )}
            {resume.skills.libraries && (
              <div>
                <span className="font-medium">Libraries:</span> {resume.skills.libraries}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
