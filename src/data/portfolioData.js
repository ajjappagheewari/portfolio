export const personalInfo = {
  name: "Ajjappa Gheewari",
  initials: "AG",
  eyebrow: "WELCOME TO MY PORTFOLIO",
  degree: "Bachelor of Computer Applications (BCA)",
  roles: [
    "BCA Student",
    "Aspiring Web Developer",
    "Problem Solver",
    "Software Enthusiast"
  ],
  bio: "A Bachelor of Computer Applications scholar passionate about modern web engineering, clean software architecture, and solving real-world challenges through elegant, performant code.",
  aboutStory: {
    title: "Crafting Purposeful Code with Passion",
    paragraphs: [
      "Hello! I'm Ajjappa Gheewari, currently pursuing my Bachelor of Computer Applications (BCA). From the first time I compiled a simple C program to architecting interactive, responsive web applications, I have been captivated by the art of turning algorithmic logic into seamless user experiences.",
      "My academic journey has grounded me in core computing disciplines — object-oriented paradigms in Java, structured programming in C, efficient relational schemas in MySQL, and contemporary web standards with HTML, CSS, and modern JavaScript.",
      "I believe great software is where elegance meets performance. Whether collaborating on team projects or independently building full-stack applications, I approach every challenge with meticulous curiosity and continuous growth."
    ],
    attributes: [
      { icon: "🎯", label: "Focus Area", value: "Web Development & Software" },
      { icon: "📍", label: "Based In", value: "Karnataka, India" },
      { icon: "📚", label: "Degree", value: "Bachelor of Computer Applications" },
      { icon: "🚀", label: "Status", value: "Seeking Internship Opportunities" }
    ]
  },
  location: "Karnataka, India",
  email: "ajjappagheewari@gmail.com",
  availability: "Open for Summer & Fall Internships",
  availabilityHero: "Available for Internships & Tech Opportunities",
  resumePath: "assets/resume.pdf",
  resumeFileName: "Ajjappa_Gheewari_Resume.pdf",
  profileImage: "assets/profile-placeholder.svg",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:ajjappagheewari@gmail.com"
  }
};

export const stats = [
  {
    target: 14,
    suffix: "+",
    title: "Projects Completed",
    description: "Hands-on applications ranging from academic databases to interactive frontends."
  },
  {
    target: 10,
    suffix: "+",
    title: "Technologies Mastered",
    description: "Core languages, modern frontend tooling, databases, and version control."
  },
  {
    target: 6,
    suffix: "+",
    title: "Certifications Earned",
    description: "Verified credentials across programming, web design, and database systems."
  }
];

export const skillCategories = [
  {
    id: "core-programming",
    title: "Core Programming",
    subtitle: "Algorithmic & OOP Foundations",
    iconType: "code",
    skills: [
      {
        name: "C Programming",
        badge: "C",
        percent: 88,
        detail: "Pointers, memory management, data structures"
      },
      {
        name: "Java (Core & OOP)",
        badge: "☕",
        percent: 82,
        detail: "Polymorphism, inheritance, collections, JDBC"
      },
      {
        name: "Python",
        badge: "🐍",
        percent: 76,
        detail: "Scripting, file handling, automation, basic data analysis"
      }
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    subtitle: "Modern Responsive Interfaces",
    iconType: "globe",
    skills: [
      {
        name: "HTML5 (Semantic)",
        badge: "5",
        percent: 95,
        detail: "Accessibility (a11y), clean DOM structure, SEO best practices"
      },
      {
        name: "CSS3 & Modern Layouts",
        badge: "🎨",
        percent: 90,
        detail: "Flexbox, Grid, CSS variables, glassmorphism, keyframes"
      },
      {
        name: "JavaScript (ES6+)",
        badge: "JS",
        percent: 84,
        detail: "DOM manipulation, fetch API, asynchronous JS, event loop"
      }
    ]
  },
  {
    id: "database-data",
    title: "Database & Data",
    subtitle: "Relational Storage & Schemas",
    iconType: "database",
    skills: [
      {
        name: "MySQL",
        badge: "🐬",
        percent: 85,
        detail: "Complex queries, joins, foreign keys, stored routines"
      },
      {
        name: "Schema Design & Normalization",
        badge: "📊",
        percent: 82,
        detail: "1NF to 3NF, ER diagrams, data integrity constraints"
      },
      {
        name: "Data Query Optimization",
        badge: "⚡",
        percent: 78,
        detail: "Indexing strategies, execution plans, transaction management"
      }
    ]
  },
  {
    id: "tools-workflow",
    title: "Tools & Workflow",
    subtitle: "Engineering Productivity",
    iconType: "tool",
    skills: [
      {
        name: "Git & GitHub",
        badge: "🐙",
        percent: 88,
        detail: "Branching, merge workflows, pull requests, version control"
      },
      {
        name: "VS Code & Extensions",
        badge: "💻",
        percent: 92,
        detail: "Debugger integration, snippets, terminal automation, linters"
      },
      {
        name: "Problem Solving & Logic",
        badge: "🧠",
        percent: 86,
        detail: "Data structures, recursive thinking, debugging methodologies"
      }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "CampusCore — Academic & Student Portal",
    badge: "Full-Stack Capstone",
    image: "assets/project-1.svg",
    alt: "CampusCore Academic and Student Management Portal preview",
    description: "A comprehensive academic management system engineered for BCA coursework. Handles student enrollments, course registrations, semester grade calculation, and attendance reporting with robust MySQL schema architecture and role-based security.",
    tags: ["Java", "MySQL", "HTML5", "CSS3", "JavaScript"],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Aura — Luxury Editorial Portfolio",
    badge: "Creative UI / UX",
    image: "assets/project-2.svg",
    alt: "Aura Luxury Portfolio preview",
    description: "An editorial-grade portfolio built using pure HTML5, CSS3, and modern React. Features glassmorphism navigation, dynamic canvas gold particles, smooth scroll reveals, custom typography, and zero third-party framework overhead.",
    tags: ["React", "HTML5", "CSS Variables", "Canvas API", "IntersectionObserver"],
    demoUrl: "#hero",
    githubUrl: "https://github.com"
  },
  {
    id: 3,
    title: "Aura Cart — Responsive Storefront",
    badge: "Web Application",
    image: "assets/project-3.svg",
    alt: "Aura Cart e-commerce preview",
    description: "An intuitive mini e-commerce web application featuring live product filtering, dynamic cart calculation, responsive checkout drawer, and local storage state persistence. Built completely dependency-free with modern JavaScript.",
    tags: ["JavaScript (ES6+)", "CSS Grid", "LocalStorage", "Responsive UI"],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "AlgoLens — Sorting & DSA Visualizer",
    badge: "Algorithm Tool",
    image: "assets/project-4.svg",
    alt: "Algorithm and DSA visualizer preview",
    description: "An interactive educational web platform demonstrating classic sorting algorithms (QuickSort, MergeSort, BubbleSort) and pathfinding routines. Includes step controls, speed adjustments, and real-time comparison analytics.",
    tags: ["Algorithms", "Data Structures", "JavaScript", "HTML5 Canvas", "C Logic"],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  }
];

export const educationHistory = [
  {
    id: "bca",
    period: "2024 — Present",
    badge: "Current Degree",
    isCurrent: true,
    heading: "Bachelor of Computer Applications (BCA)",
    institution: "Karnatak University / Affiliated Institution",
    description: "Engaged in deep coursework across computer architecture, database management systems (DBMS), data structures & algorithms in C/Java, software engineering principles, and full-stack web development. Consistently demonstrating academic dedication and practical project execution.",
    highlights: [
      "Data Structures & Algorithms",
      "Relational Database Systems",
      "OOP with Java",
      "Web Technologies"
    ]
  },
  {
    id: "puc",
    period: "2022 — 2024",
    badge: "Higher Secondary",
    isCurrent: false,
    heading: "Pre-University Education (12th Grade)",
    institution: "State Pre-University Board",
    description: "Specialized in Science / Computer Science stream with core focus on Mathematics, Physics, and fundamental programming concepts. Developed analytical problem-solving skills that paved the way for higher computer science studies.",
    highlights: [
      "Mathematics & Logic",
      "Computer Science Fundamentals",
      "Physics"
    ]
  },
  {
    id: "sslc",
    period: "2022",
    badge: "Secondary School",
    isCurrent: false,
    heading: "Secondary School Leaving Certificate (SSLC / 10th)",
    institution: "State Secondary Education Board",
    description: "Completed secondary schooling with distinction honors. Participated in inter-school science exhibitions and mathematics quizzes, nurturing a keen curiosity for modern computing technology.",
    highlights: [
      "Academic Distinction",
      "Science & Mathematics"
    ]
  }
];

export const certifications = [
  {
    id: "web-dev",
    name: "Modern Full-Stack Web Development Mastery",
    issuer: "Online Learning Platform • HTML, CSS, JavaScript ES6+"
  },
  {
    id: "java-oop",
    name: "Object-Oriented Programming with Java",
    issuer: "Technical Certification Institute • Core Java & JDBC"
  },
  {
    id: "mysql-db",
    name: "Relational Databases & SQL Query Design",
    issuer: "Database Specialist Academy • MySQL & Normalization"
  },
  {
    id: "git-github",
    name: "Git & GitHub Version Control for Developers",
    issuer: "Open Source Education • Collaborative Workflows"
  }
];

export const navLinks = [
  { id: "hero", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "education", label: "Education", num: "05" },
  { id: "contact", label: "Contact", num: "06" }
];
