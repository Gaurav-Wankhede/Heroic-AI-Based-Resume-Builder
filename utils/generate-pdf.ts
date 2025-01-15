import { Resume } from '../types/resume'
import jsPDF from 'jspdf'

export async function generatePDF(resume: Resume): Promise<void> {
  const doc = new jsPDF()
  const margin = 20
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let y = margin

  const setFontStyle = (style: 'normal' | 'bold' | 'italic') => {
    doc.setFont('times', style)
  }

  const checkPageBreak = (height: number = 10) => {
    if (y + height > pageHeight - margin) {
      doc.addPage()
      y = margin
      return true
    }
    return false
  }

  // Add name (centered)
  doc.setFontSize(20)
  setFontStyle('bold')
  doc.text(resume.name, pageWidth / 2, y, { align: 'center' })
  y += 8

  // Add contact information (centered)
  doc.setFontSize(10)
  setFontStyle('normal')

  // Create contact info array with proper spacing
  const contactParts = []
  if (resume.contact.mobile) contactParts.push(resume.contact.mobile)
  if (resume.contact.email) contactParts.push(resume.contact.email)

  // Calculate total width for centered positioning
  let totalWidth = 0
  let xStart = 0
  
  // First pass: calculate widths
  if (resume.contact.mobile) totalWidth += doc.getTextWidth(resume.contact.mobile + ' | ')
  if (resume.contact.email) totalWidth += doc.getTextWidth(resume.contact.email + ' | ')
  if (resume.contact.linkedin) totalWidth += doc.getTextWidth('LinkedIn | ')
  if (resume.contact.github) totalWidth += doc.getTextWidth('GitHub | ')
  if (resume.contact.portfolio) totalWidth += doc.getTextWidth('Portfolio')
  
  // Remove width of last separator
  totalWidth -= doc.getTextWidth(' | ')
  
  // Calculate starting x position for center alignment
  xStart = (pageWidth - totalWidth) / 2

  // Second pass: draw text and links
  let x = xStart
  
  // Add mobile
  if (resume.contact.mobile) {
    doc.text(resume.contact.mobile, x, y)
    x += doc.getTextWidth(resume.contact.mobile + ' | ')
    if (x < pageWidth - margin) doc.text('|', x - 2, y)
  }

  // Add email
  if (resume.contact.email) {
    doc.text(resume.contact.email, x, y)
    x += doc.getTextWidth(resume.contact.email + ' | ')
    if (x < pageWidth - margin) doc.text('|', x - 2, y)
  }

  // Add LinkedIn with link
  if (resume.contact.linkedin) {
    doc.setTextColor(0, 0, 255) // Blue color for links
    doc.textWithLink('LinkedIn', x, y, { url: resume.contact.linkedin })
    x += doc.getTextWidth('LinkedIn' + ' | ')
    doc.setTextColor(0) // Reset to black
    if (x < pageWidth - margin) doc.text('|', x - 2, y)
  }

  // Add GitHub with link
  if (resume.contact.github) {
    doc.setTextColor(0, 0, 255)
    doc.textWithLink('GitHub', x, y, { url: resume.contact.github })
    x += doc.getTextWidth('GitHub' + ' | ')
    doc.setTextColor(0)
    if (x < pageWidth - margin) doc.text('|', x - 2, y)
  }

  // Add Portfolio with link
  if (resume.contact.portfolio) {
    doc.setTextColor(0, 0, 255)
    doc.textWithLink('Portfolio', x, y, { url: resume.contact.portfolio })
    doc.setTextColor(0)
  }

  y += 12

  // Add summary if exists
  if (resume.summary) {
    checkPageBreak(20)
    doc.setFontSize(14)
    setFontStyle('bold')
    doc.text('PROFESSIONAL SUMMARY', margin, y)
    doc.setLineWidth(0.2)
    doc.line(margin, y + 1, pageWidth - margin, y + 1)
    y += 8
    doc.setFontSize(10)
    setFontStyle('normal')
    const summaryLines = doc.splitTextToSize(resume.summary, pageWidth - 2 * margin)
    doc.text(summaryLines, margin, y)
    y += summaryLines.length * 5 + 5
  }

  // Add education
  checkPageBreak(20)
  doc.setFontSize(14)
  setFontStyle('bold')
  doc.text('EDUCATION', margin, y)
  doc.setLineWidth(0.2)
  doc.line(margin, y + 1, pageWidth - margin, y + 1)
  y += 8
  doc.setFontSize(10)

  resume.education.forEach(edu => {
    checkPageBreak(20)
    // School and location on same line, justified
    setFontStyle('bold')
    doc.text(edu.school, margin, y)
    setFontStyle('normal')
    if (edu.location) {
      doc.text(edu.location, pageWidth - margin, y, { align: 'right' })
    }
    y += 5

    // Degree and date on same line, justified
    setFontStyle('italic')
    doc.text(edu.degree, margin, y)
    setFontStyle('normal')
    doc.text(edu.date, pageWidth - margin, y, { align: 'right' })
    y += 8
  })

  // Add experience
  checkPageBreak(20)
  doc.setFontSize(14)
  setFontStyle('bold')
  doc.text('EXPERIENCE', margin, y)
  doc.setLineWidth(0.2)
  doc.line(margin, y + 1, pageWidth - margin, y + 1)
  y += 8
  doc.setFontSize(10)

  resume.experience.forEach(exp => {
    checkPageBreak(20)
    // Title and date on same line, justified
    setFontStyle('bold')
    doc.text(exp.title, margin, y)
    setFontStyle('normal')
    doc.text(exp.date, pageWidth - margin, y, { align: 'right' })
    y += 5

    // Company and location on same line, justified
    setFontStyle('italic')
    doc.text(exp.company, margin, y)
    setFontStyle('normal')
    if (exp.location) {
      doc.text(exp.location, pageWidth - margin, y, { align: 'right' })
    }
    y += 5

    // Details with bullets
    setFontStyle('normal')
    exp.details.forEach(detail => {
      checkPageBreak(12)
      const bulletPoint = '•'
      const bulletWidth = doc.getTextWidth(bulletPoint + ' ')
      doc.text(bulletPoint, margin + 2, y)
      const detailLines = doc.splitTextToSize(detail, pageWidth - (margin * 2 + bulletWidth + 6))
      doc.text(detailLines, margin + bulletWidth + 4, y)
      y += detailLines.length * 5
    })
    y += 5
  })

  // Add projects
  checkPageBreak(20)
  doc.setFontSize(14)
  setFontStyle('bold')
  doc.text('PROJECTS', margin, y)
  doc.setLineWidth(0.2)
  doc.line(margin, y + 1, pageWidth - margin, y + 1)
  y += 8
  doc.setFontSize(10)

  resume.projects.forEach(project => {
    checkPageBreak(20)
    // Project name, technologies, and date on same line
    setFontStyle('bold')
    const projectHeader = `${project.name} | ${project.technologies}`
    doc.text(projectHeader, margin, y)
    setFontStyle('normal')
    if (project.date) {
      doc.text(project.date, pageWidth - margin, y, { align: 'right' })
    }
    y += 5

    // Details with bullets
    project.details.forEach(detail => {
      checkPageBreak(12)
      const bulletPoint = '•'
      const bulletWidth = doc.getTextWidth(bulletPoint + ' ')
      doc.text(bulletPoint, margin + 2, y)
      const detailLines = doc.splitTextToSize(detail, pageWidth - (margin * 2 + bulletWidth + 6))
      doc.text(detailLines, margin + bulletWidth + 4, y)
      y += detailLines.length * 5
    })
    y += 5
  })

  // Add technical skills
  checkPageBreak(20)
  doc.setFontSize(14)
  setFontStyle('bold')
  doc.text('TECHNICAL SKILLS', margin, y)
  doc.setLineWidth(0.2)
  doc.line(margin, y + 1, pageWidth - margin, y + 1)
  y += 8
  doc.setFontSize(10)

  const addSkillLine = (label: string, skills: string) => {
    if (skills) {
      checkPageBreak(12)
      setFontStyle('bold')
      const labelText = `${label}: `
      doc.text(labelText, margin, y)
      setFontStyle('normal')
      const labelWidth = doc.getTextWidth(labelText)
      const skillsText = doc.splitTextToSize(skills, pageWidth - margin * 2 - labelWidth)
      doc.text(skillsText, margin + labelWidth, y)
      y += skillsText.length * 5
    }
  }

  addSkillLine('Languages', resume.skills.languages)
  addSkillLine('Frameworks', resume.skills.frameworks)
  addSkillLine('Developer Tools', resume.skills.developerTools)
  addSkillLine('Libraries', resume.skills.libraries)

  doc.save(`${resume.name.replace(/\s+/g, '_')}_Resume_HeroicBuilder.pdf`)
}
