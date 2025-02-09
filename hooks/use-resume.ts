import { useState, useCallback } from 'react';
import { Resume, Education, Experience, Project } from '../types/resume';

const initialResume: Resume = {
  name: '',
  contact: {
    mobile: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    languages: '',
    frameworks: '',
    developerTools: '',
    libraries: ''
  },
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
  };
}
