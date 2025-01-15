export const API_ROUTES = {
    GENERATE_AI_CONTENT: '/api/generate-ai-content',
  };

  
  export const RESUME_SECTIONS = {
    EDUCATION: 'education',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects',
    SKILLS: 'skills',
  };
  
  export const AI_GENERATION_PROMPTS = {
    EXPERIENCE: (title: string, company: string, date: string) => `
      Generate a concise, impactful bullet point for a resume experience section.
      Role: ${title}
      Company: ${company}
      Date: ${date}
      
      Guidelines:
      1. Start with a strong action verb
      2. Quantify achievements where possible
      3. Highlight specific skills or technologies used
      4. Focus on results and impact
      5. Keep it concise (preferably under 20 words)
      
      Generate only the bullet point text, without any additional explanation.
    `,
    PROJECT: (name: string, technologies: string, date: string) => `
      Generate a concise, impactful bullet point for a resume project section.
      Project: ${name}
      Technologies: ${technologies}
      Date: ${date}
      
      Guidelines:
      1. Start with a strong action verb
      2. Highlight specific technologies or methodologies used
      3. Focus on the project's impact or results
      4. Keep it concise (preferably under 20 words)
      
      Generate only the bullet point text, without any additional explanation.
    `,
  };
  
  