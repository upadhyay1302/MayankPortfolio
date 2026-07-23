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
      links: [{ label: "View Code", url: "https://github.com/upadhyay1302/raven" }],
    },
  },
  {
    title: "Arena",
    stack: "Go",
    award: "",
    image: "/arena1.png",
    link: "https://github.com/upadhyay1302/arena",
    linkLabel: "View Code",
    modal: {
      title: "Arena",
      subtitle: "",
      image: "/arena.png",
      body: "Arena is a real-time Go game server that hosts head-to-head AI competitions between multiple language models, streamed live through WebSocket rooms. It runs concurrent multi-game engines for both turn-based and simultaneous matches, with each game isolated in its own goroutine loop to keep matches independent and race-free. A custom LLM parser strips reasoning-model 'think' blocks from model outputs, backed by an automated 3x fallback retry loop to handle malformed or incomplete responses. The platform is fronted by a Next.js 15 dashboard that visualizes live match states in real time alongside a dynamic, automatically updating ELO leaderboard.",
      links: [{ label: "View Code", url: "https://github.com/upadhyay1302/arena" }],
    },
  },
  {
    title: "MoodSonic",
    stack: "Python",
    award: "",
    image: "/moodsonic.png",
    link: "https://github.com/upadhyay1302/Smart-and-Reactive-Speaker-System-",
    linkLabel: "View Code",
    modal: {
      title: "MoodSonic",
      subtitle: "",
      image: "/moodsonic.png",
      body: "The Smart and Reactive Speaker System is an embedded music player built on a Raspberry Pi that pairs a camera, display, and speaker to recommend music based on the user's facial expression. A camera feed is analyzed in real time using OpenCV and DeepFace to detect the user's dominant emotion, which drives song selection through the YouTube Music API, with playback handled by VLC for lightweight, low-latency streaming. The UI, built in Tkinter, displays the current song and mood while driving a dynamic lighting feature that shifts and pulses the screen's color to match the detected emotion, adding a layer of ambient feedback to the listening experience. A like/dislike system captures user feedback per song and logs it for future improvements to the emotion-to-song mapping. The system was architected around a modular, multi-process design, a main coordinating module manages independent backend, UI, and emotion-detection subprocesses over inter-process pipes, making each component easy to develop, debug, and extend in isolation.      ",
      links: [{ label: "View Code", url: "https://github.com/upadhyay1302/Smart-and-Reactive-Speaker-System-" }],
    },
  },
  {
    title: "Active Track",
    stack: "Python",
    award: "",
    image: "/activetrack.png",
    link: "https://github.com/upadhyay1302/ActiveTrack",
    linkLabel: "View Code",
    modal: {
      title: "Active Track",
      subtitle: "",
      image: "/activetrack.png",
      body: "Active Track is a machine learning project that classifies barbell exercises and automatically counts repetitions from raw accelerometer and gyroscope data, built on top of an instructional foundation from Dave Ebbelaar's course on quantified-self sensor analysis. Motion data was collected from a wristband-mounted Meta Motion sensor across five exercise types — bench press, deadlift, overhead press, rowing, and squats — performed by multiple participants in both medium (10-rep) and heavy (5-rep) sets, then exported and merged into a unified dataset. Before modeling, the pipeline handled outlier detection using Chauvenet's Criterion, gap-filling via interpolation, and noise reduction, followed by feature engineering that added numerical, temporal, frequency-domain, and cluster-based features to better capture movement patterns. For classification, I ran forward feature selection with a decision tree, then grid search across models and hyperparameters, comparing results visually and validating the best-performing model against participant-independent test splits to check for generalization. Rep-counting was handled separately with a tuned low-pass filter applied to the sensor signal, paired with a custom peak-detection function benchmarked against ground-truth rep counts.      ",
      links: [{ label: "View Code", url: "https://github.com/upadhyay1302/ActiveTrack" }],
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
      links: [{ label: "View Code", url: "https://github.com/upadhyay1302/http_server" }],
    },
  }
];