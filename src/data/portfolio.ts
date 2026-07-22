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

// export interface ResearchItem {
//   role: string;
//   company: string;
//   date: string;
//   image: string;
//   modal: ExperienceModal;
// }

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
      "My journey has taken me across different places, cultures, and experiences that have shaped who I am today. I was born in Rajasthan, India, and later moved to the United Arab Emirates, where I spent my childhood and completed my schooling. Growing up in different environments taught me the value of curiosity, adaptability, and always being open to learning from the world around me.",
      "<br /> That journey eventually brought me to Canada, where I am currently completing my undergraduate degree in Software Engineering at University Of Waterloo. Throughout my time here, I have discovered a deep passion for research, innovation, and exploring how technology can be used to understand and solve meaningful problems.",
    ],
    quote: { label: "April 2026", text: "Keep shipping. Keep learning." },
    polaroidSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    polaroidCaption: "Brampton, Ontario · 2024",
  },
};

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer Co-op",
    company: "Borrowell",
    date: "May 2026 — August 2026",
    image: "",
    modal: {
      title: "Borrowell",
      subtitle: "Full Stack Developer Co-op : Marketplace Team",
      image: "/BorrowellLogo.jpg",
      body: "",
      links: [],
    },
  },
  {
    role: "Software Developer Co-op",
    company: "AutoTrader",
    date: "September 2025 — December 2025",
    image: "",
    modal: {
      title: "AutoTrader",
      subtitle: "Software Developer Co-op",
      image: "/autoTraderLogo2.png",
      body: "",
      links: [],
    },
  },
  {
    role: "Software Developer Co-op",
    company: "AutoTrader",
    date: "January 2025 — April 2025",
    image: "",
    modal: {
      title: "AutoTrader",
      subtitle: "Software Developer Co-op",
      image: "autoTraderLogo2.png",
      body: "",
      links: [],
    },
  },
  {
    role: "Systems Engineer Co-op",
    company: "VCNA",
    date: "May 2024 — August 2025",
    image: "",
    modal: {
      title: "Systems Engineer Co-op",
      subtitle: "VCNA",
      image: "/VCNA.jpeg",
      body: "",
      links: [],
    },
  }
];

// export const research: ResearchItem[] = [

// ];

export const projects: ProjectItem[] = [
  {
    title: "Raven",
    stack: "Go",
    award: "",
    image: "/raven.png",
    link: "https://github.com/upadhyay1302/raven",
    linkLabel: "View Code",
    modal: {
      title: "Raven",
      subtitle: "",
      image: "/raven.png",
      body: "Raven is a structured logging library built in Go, supporting colored output, JSON formatting, and live progress bars for a cleaner developer experience. It's engineered to be thread-safe across concurrent goroutines, using channels and atomic operations to coordinate writes without contention. Performance was a core focus: filtered log calls run in under 8 nanoseconds with zero memory allocations, verified through benchmarks and Go's race detector.",
      links: [{ label: "View Code", url: "https://github.com/haaaarsh4/http_server" }],
    },
  },
  {
    title: "Arena",
    stack: "Go",
    award: "",
    image: "/arena.png",
    link: "https://github.com/upadhyay1302/arena",
    linkLabel: "View Code",
    modal: {
      title: "Arena",
      subtitle: "",
      image: "/arena.png",
      body: "Raven is a structured logging library built in Go, supporting colored output, JSON formatting, and live progress bars for a cleaner developer experience. It's engineered to be thread-safe across concurrent goroutines, using channels and atomic operations to coordinate writes without contention. Performance was a core focus: filtered log calls run in under 8 nanoseconds with zero memory allocations, verified through benchmarks and Go's race detector.",
      links: [{ label: "View Code", url: "https://github.com/haaaarsh4/http_server" }],
    },
  },
  {
    title: "Arena",
    stack: "Go",
    award: "",
    image: "/arena.png",
    link: "https://github.com/upadhyay1302/arena",
    linkLabel: "View Code",
    modal: {
      title: "Arena",
      subtitle: "",
      image: "/arena.png",
      body: "Raven is a structured logging library built in Go, supporting colored output, JSON formatting, and live progress bars for a cleaner developer experience. It's engineered to be thread-safe across concurrent goroutines, using channels and atomic operations to coordinate writes without contention. Performance was a core focus: filtered log calls run in under 8 nanoseconds with zero memory allocations, verified through benchmarks and Go's race detector.",
      links: [{ label: "View Code", url: "https://github.com/haaaarsh4/http_server" }],
    },
  },
  {
    title: "Arena",
    stack: "Go",
    award: "",
    image: "/arena.png",
    link: "https://github.com/upadhyay1302/arena",
    linkLabel: "View Code",
    modal: {
      title: "Arena",
      subtitle: "",
      image: "/arena.png",
      body: "Raven is a structured logging library built in Go, supporting colored output, JSON formatting, and live progress bars for a cleaner developer experience. It's engineered to be thread-safe across concurrent goroutines, using channels and atomic operations to coordinate writes without contention. Performance was a core focus: filtered log calls run in under 8 nanoseconds with zero memory allocations, verified through benchmarks and Go's race detector.",
      links: [{ label: "View Code", url: "https://github.com/haaaarsh4/http_server" }],
    },
  },
  {
    title: "HTTP Server (C++)",
    stack: "C++ · Sockets · Epoll · Thread Pool · Benchmarking",
    award: "Systems Programming",
    image: "/server.jpeg",
    link: "https://github.com/upadhyay1302/http_server",
    linkLabel: "View Code",
    modal: {
      title: "HTTP Server (C++)",
      subtitle: "Systems Programming",
      image: "/server2.jpeg",
      body: "A custom HTTP server written in C++ using raw sockets, epoll for event-driven I/O, and a thread pool for concurrency, with benchmarking tools to evaluate throughput and latency.",
      links: [{ label: "View Code", url: "https://github.com/haaaarsh4/http_server" }],
    },
  }
];