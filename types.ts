
export type ProjectCategory = 'UX' | 'AI' | 'Product' | 'Engineering';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  imageUrl?: string;
  logoUrl?: string; // Optional logo for branding
  link?: string;
  caseStudyLink?: string; // If it's a UX case study
  featured: boolean;
  date: string;
  // Rich content fields for detailed project pages
  overview?: string[];
  objectives?: string[];
  keyFeatures?: string[];
  challenges?: string[];
  outcomes?: string[];
  role?: string;
  platform?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  contentFile: string; // Path to the .md file
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface SiteConfig {
  profile: {
    name: string;
    role: string;
    location: string;
    bio: string;
    avatar: string;
    email: string;
    phone?: string;
    socials: SocialLink[];
  };
  resume: {
    summary: string;
    experience: ExperienceItem[];
    skills: SkillCategory[];
    education: EducationItem[];
  };
  projects: Project[];
  posts: BlogPost[];
}
