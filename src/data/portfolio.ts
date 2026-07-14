export interface ExperienceModal {
  title: string;
  subtitle: string;
  image: string;
  body: string;
  links: { label: string; url: string }[];
  preloadImages?: string[]; 
}

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  image: string;
  modal: ExperienceModal;
}

export interface ResearchItem {
  role: string;
  company: string;
  date: string;
  image: string;
  modal: ExperienceModal;
}

export interface ProjectItem {
  title: string;
  stack: string;
  award: string;
  image: string;
  link: string;
  linkLabel: string;
  modal: ExperienceModal;
}

export const siteConfig = {
  name: "Mayank Upadhyay",
  navLogoText: "Mayank Upadhyay",
  location: "Waterloo, Ontario",
  university: "University of Waterloo",
  email: "m7upadhy@uwaterloo.ca",
  github: "https://github.com/upadhyay1302",
  linkedin: "https://linkedin.com/in/mayank-upadhyay-",
  resumePdf: "/resume.pdf",
  about: {
    paragraphs: [
     
    ],
    quote: { label: "April 2026", text: "Keep shipping. Keep learning." },
    polaroidSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    polaroidCaption: "Brampton, Ontario · 2024",
  },
};

export const experience: ExperienceItem[] = [

];

export const research: ResearchItem[] = [

];

export const projects: ProjectItem[] = [

];