import { useState, useCallback } from 'react';
import { Resume, Education, Experience, Project, Certification } from '../types/resume';

const initialResume: Resume = {
  name: 'John Developer',
  contact: {
    email: 'john.developer@email.com',
    mobile: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johndeveloper',
    github: 'https://github.com/johndeveloper',
    portfolio: 'https://johndeveloper.dev',
    location: 'San Francisco, CA'
  },
  summary: 'Full-stack developer with 4+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Proven track record of delivering high-performance solutions that drive business growth. Led teams in developing applications serving 100K+ users.',
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      location: 'San Francisco, CA',
      date: '2015 - 2019'
    },
    {
      school: 'Tech Institute',
      degree: 'Full-Stack Web Development Bootcamp',
      location: 'San Francisco, CA',
      date: '2019'
    }
  ],
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      date: '2021 - Present',
      details: [
        'Architected and implemented a microservices-based e-commerce platform using Next.js and Node.js, resulting in a 40% improvement in page load times',
        'Led a team of 5 developers in migrating legacy systems to modern React-based architecture, reducing technical debt by 60%',
        'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 70% and improving team productivity',
        'Optimized database queries and implemented caching strategies, reducing server response time by 50%'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations Co.',
      location: 'San Francisco, CA',
      date: '2019 - 2021',
      details: [
        'Developed and maintained multiple React-based web applications serving 50K+ daily active users',
        'Implemented responsive designs and accessibility features, achieving WCAG 2.1 compliance',
        'Created RESTful APIs using Express.js and integrated with various third-party services',
        'Reduced infrastructure costs by 30% through AWS optimization and implementation of serverless architecture'
      ]
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      technologies: 'Next.js, Node.js, PostgreSQL, Redis, AWS',
      date: '2023',
      details: [
        'Built a full-featured e-commerce platform with real-time inventory management and payment processing',
        'Implemented advanced caching strategies and optimized database queries, achieving sub-100ms response times',
        'Integrated with multiple payment gateways and shipping providers using microservices architecture'
      ],
      deployedLink: 'https://ecommerce-platform.demo',
      githubLink: 'https://github.com/johndeveloper/ecommerce-platform'
    },
    {
      name: 'Task Management System',
      technologies: 'React, TypeScript, Express.js, MongoDB, Docker',
      date: '2022',
      details: [
        'Developed a collaborative task management system with real-time updates using WebSocket',
        'Implemented drag-and-drop functionality and keyboard shortcuts for improved user experience',
        'Containerized the application using Docker and implemented automated testing with Jest'
      ],
      deployedLink: 'https://task-manager.demo',
      githubLink: 'https://github.com/johndeveloper/task-manager'
    }
  ],
  skills: {
    languages: 'JavaScript, TypeScript, Python, SQL, HTML5, CSS3',
    frameworks: 'React, Next.js, Node.js, Express.js, Django',
    developerTools: 'Git, Docker, AWS, GitHub Actions, Jest, Webpack',
    libraries: 'Redux, TailwindCSS, Material-UI, Mongoose, Prisma'
  },
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      provider: 'Amazon Web Services',
      issueDate: '2023-01-15',
      url: 'https://aws.amazon.com/certification/verify'
    },
    {
      name: 'Professional Scrum Master I',
      provider: 'Scrum.org',
      issueDate: '2022-06-30',
      url: 'https://www.scrum.org/certificates/verify'
    }
  ],
  resumeType: 'experienced'
};

export function useResume() {
  const [resume, setResume] = useState<Resume>(initialResume);

  const updateResume = useCallback((field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateNestedField = useCallback(<T extends keyof Resume>(
    section: T,
    index: number,
    field: T extends 'education' ? keyof Education :
           T extends 'experience' ? keyof Experience :
           T extends 'projects' ? keyof Project : never,
    value: any
  ) => {
    setResume(prev => {
      const sectionArray = prev[section];
      if (!Array.isArray(sectionArray)) {
        console.error(`Section ${section} is not an array`);
        return prev;
      }
      if (index < 0 || index >= sectionArray.length) {
        console.error(`Index ${index} is out of bounds for section ${section}`);
        return prev;
      }
      const newSection = [...sectionArray];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  }, []);

  const addEducation = useCallback((item: Education) => {
    setResume(prev => ({ ...prev, education: [...prev.education, item] }));
  }, []);

  const removeEducation = useCallback((index: number) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  const addExperience = useCallback((item: Experience) => {
    setResume(prev => ({ ...prev, experience: [...prev.experience, { ...item, details: [] }] }));
  }, []);

  const removeExperience = useCallback((index: number) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  const addExperienceDetail = useCallback((index: number) => {
    setResume(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = {
        ...newExperience[index],
        details: [...newExperience[index].details, ''],
      };
      return { ...prev, experience: newExperience };
    });
  }, []);

  const removeExperienceDetail = useCallback((expIndex: number, detailIndex: number) => {
    setResume(prev => {
      const newExperience = [...prev.experience];
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        details: newExperience[expIndex].details.filter((_, i) => i !== detailIndex),
      };
      return { ...prev, experience: newExperience };
    });
  }, []);

  const addProject = useCallback((item: Project) => {
    setResume(prev => ({ ...prev, projects: [...prev.projects, { ...item, details: [] }] }));
  }, []);

  const removeProject = useCallback((index: number) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }, []);

  const addProjectDetail = useCallback((index: number) => {
    setResume(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = {
        ...newProjects[index],
        details: [...newProjects[index].details, ''],
      };
      return { ...prev, projects: newProjects };
    });
  }, []);

  const removeProjectDetail = useCallback((projIndex: number, detailIndex: number) => {
    setResume(prev => {
      const newProjects = [...prev.projects];
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: newProjects[projIndex].details.filter((_, i) => i !== detailIndex),
      };
      return { ...prev, projects: newProjects };
    });
  }, []);

  const addCertification = useCallback((item: Certification) => {
    setResume(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), item],
    }));
  }, []);

  const removeCertification = useCallback((index: number) => {
    setResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  }, []);

  const updateCertification = useCallback((index: number, field: keyof Certification, value: string) => {
    setResume(prev => {
      const certifications = [...(prev.certifications || [])];
      if (index >= 0 && index < certifications.length) {
        certifications[index] = { ...certifications[index], [field]: value };
      }
      return { ...prev, certifications };
    });
  }, []);

  return {
    resume,
    updateResume,
    updateNestedField,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience,
    addExperienceDetail,
    removeExperienceDetail,
    addProject,
    removeProject,
    addProjectDetail,
    removeProjectDetail,
    addCertification,
    removeCertification,
    updateCertification,
  };
}
