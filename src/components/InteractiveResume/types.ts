/**
 * Types for the Interactive Resume component
 */

export interface ResumeSection {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface ResumeConfig {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: Project[];
}
