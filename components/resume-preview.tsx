import { Resume } from '../types/resume'

interface ResumePreviewProps {
  resume: Resume
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white p-6 shadow-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{resume.name}</h1>
        {resume.contact && (
          <p className="text-gray-600">
            {[
              resume.contact.mobile,
              resume.contact.email,
              resume.contact.linkedin && (
                <a key="linkedin" href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  LinkedIn
                </a>
              ),
              resume.contact.github && (
                <a key="github" href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  GitHub
                </a>
              ),
              resume.contact.portfolio && (
                <a key="portfolio" href={resume.contact.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Portfolio
                </a>
              )
            ].filter(Boolean).join(' | ')}
          </p>
        )}
      </div>

      {resume.summary && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mt-4 mb-2 border-b border-gray-400">PROFESSORAL SUMMARY</h2>
          <p>{resume.summary}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold mt-4 mb-2 border-b border-gray-400">EDUCATION</h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <span className="font-bold">{edu.school}</span>
              <span>{edu.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="italic">{edu.degree}</span>
              <span>{edu.date}</span>
            </div>
          </div>
        ))}
        
        <h2 className="text-xl font-bold mt-4 mb-2 border-b border-gray-400">EXPERIENCE</h2>
        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <span className="font-bold">{exp.title}</span>
              <span>{exp.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="italic">{exp.company}</span>
              <span>{exp.location}</span>
            </div>
            <ul className="list-disc list-inside">
              {exp.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
        
        <h2 className="text-xl font-bold mt-4 mb-2 border-b border-gray-400">PROJECTS</h2>
        {resume.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <span className="font-bold">{project.name} | {project.technologies}</span>
              <span>{project.date}</span>
            </div>
            <ul className="list-disc list-inside">
              {project.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
        
        <h2 className="text-xl font-bold mt-4 mb-2 border-b border-gray-400">TECHNICAL SKILLS</h2>
        <p><span className="font-bold">Languages:</span> {resume.skills.languages}</p>
        <p><span className="font-bold">Frameworks:</span> {resume.skills.frameworks}</p>
        <p><span className="font-bold">Developer Tools:</span> {resume.skills.developerTools}</p>
        <p><span className="font-bold">Libraries:</span> {resume.skills.libraries}</p>
      </div>
    </div>
  )
}
