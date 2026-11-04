export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  accentColor: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  iconName: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';
  highlight?: boolean;
  color: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface InternshipExperience {
  id: string;
  role: string;
  company: string;
  location?: string;
  duration: string;
  semester: string;
  color: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationData {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  scale: string;
  specialization: string;
  coreSubjects: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  icon: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  isConfigError?: boolean;
  data?: T;
  errors?: { field: string; message: string }[];
}

