import {
  Project,
  SkillCategory,
  InternshipExperience,
  EducationData,
  Certification,
} from '../types/portfolio.js';

export const personalInfo = {
  name: 'Manish Kumar',
  displayName: 'Manish Kumar',
  role: 'Full-Stack Developer & AI/ML Engineer',
  tagline: 'Building digital experiences with code, creativity & curiosity.',
  summary:
    'Computer Science (AI & ML) undergraduate aspiring to be a full-stack developer, with hands-on experience building web applications using React, TypeScript, Node.js, Express, and MongoDB/PostgreSQL. Completed internships in full-stack web development and machine learning, and built projects spanning responsive frontends, REST APIs, and database design.',
  heroBio:
    "I'm a Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, passionate about building meaningful digital products and exploring modern technologies.",
  location: 'Samastipur, Bihar, India',
  email: 'manishkumar383904@gmail.com',
  phone: '+91-9939383904',
  github: 'https://github.com/mannish01',
  linkedin: 'https://www.linkedin.com/in/mannish01',
  status: 'Open to Opportunities',
  resumeUrl: '/resume.pdf',
};

export const projectsData: Project[] = [
  {
    id: 'applylens',
    title: 'ApplyLens',
    category: 'Full-Stack Web Platform',
    tagline: 'Job & Internship Discovery Platform for Students & Developers',
    description:
      'A full-stack platform where students can discover internships and job seekers can find relevant opportunities with streamlined filtering, clean job discovery cards, and an intuitive dashboard.',
    longDescription:
      'ApplyLens was designed and built to bridge the gap between ambitious students seeking early career opportunities and tech companies hiring talent. Featuring a high-performance React and TypeScript frontend styled with Tailwind CSS, the platform connects to a modular Express.js REST API and utilizes Prisma ORM with PostgreSQL for robust relational data modeling and fast querying.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Express.js',
      'Node.js',
      'Prisma',
      'PostgreSQL',
    ],
    features: [
      'Responsive React + TypeScript interface styled with Tailwind CSS',
      'RESTful Express.js backend architecture with structured controllers',
      'Type-safe database layer engineered with Prisma ORM and PostgreSQL',
      'Dynamic filtering by roles, job type, requirements, and tech stacks',
      'Clean cards for student internships and career opportunities',
    ],
    githubUrl: 'https://github.com/mannish01/ApplyLens',
    accentColor: '#7957FF',
    gradient: 'from-[#7957FF] via-[#9B80FF] to-[#D7FF64]',
    stats: [
      { label: 'Architecture', value: 'MERN + Prisma' },
      { label: 'Type Safety', value: 'End-to-End TS' },
      { label: 'Database', value: 'PostgreSQL' },
    ],
  },
  {
    id: 'travel-explorer',
    title: 'Travel Explorer',
    category: 'Web Application & Travel Booking',
    tagline: 'Interactive Travel Discovery & Ticket Reservation Portal',
    description:
      'A travel platform built with an engaging frontend and a PHP backend during a web development internship, enabling users to explore destinations and book journey tickets.',
    longDescription:
      'Developed during an intensive web development internship, Travel Explorer provides travelers with rich destination showcases, booking workflows, and dynamic travel information. Built with semantic HTML, modern responsive CSS, interactive vanilla JavaScript, and a server-side PHP backend managing database operations with MySQL.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Dynamic destination showcase with rich imagery and travel guides',
      'Travel itinerary booking workflows with input validation',
      'PHP server-side processing for reservation queries and data handling',
      'Relational MySQL database managing travel routes, tickets, and user bookings',
      'Mobile-responsive layout with intuitive search and navigation',
    ],
    githubUrl: 'https://github.com/mannish01/Travel-Explorer',
    accentColor: '#FF7058',
    gradient: 'from-[#FF7058] via-[#FFB6C8] to-[#7957FF]',
    stats: [
      { label: 'Backend', value: 'PHP & MySQL' },
      { label: 'Domain', value: 'Travel & Booking' },
      { label: 'Focus', value: 'Full-Stack Flow' },
    ],
  },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages for systems, algorithmic problem solving, and modern web applications.',
    icon: 'Code2',
    skills: [
      { name: 'JavaScript', iconName: 'FileCode2', category: 'languages', color: '#F7DF1E', highlight: true },
      { name: 'TypeScript', iconName: 'FileCode', category: 'languages', color: '#3178C6', highlight: true },
      { name: 'Python', iconName: 'Terminal', category: 'languages', color: '#3776AB', highlight: true },
      { name: 'Java', iconName: 'Cpu', category: 'languages', color: '#ED8B00' },
      { name: 'C', iconName: 'Binary', category: 'languages', color: '#A8B9CC' },
      { name: 'PHP', iconName: 'Server', category: 'languages', color: '#777BB4' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern user interfaces, state management, reactive components, and responsive styling.',
    icon: 'Layout',
    skills: [
      { name: 'React.js', iconName: 'Layers', category: 'frontend', color: '#61DAFB', highlight: true },
      { name: 'TypeScript', iconName: 'FileCode', category: 'frontend', color: '#3178C6', highlight: true },
      { name: 'HTML5', iconName: 'Globe', category: 'frontend', color: '#E34F26' },
      { name: 'CSS3', iconName: 'Palette', category: 'frontend', color: '#1572B6' },
      { name: 'Tailwind CSS', iconName: 'Sparkles', category: 'frontend', color: '#06B6D4', highlight: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Scalable server architectures, RESTful API design, database ORMs, and MVC frameworks.',
    icon: 'Server',
    skills: [
      { name: 'Node.js', iconName: 'TerminalSquare', category: 'backend', color: '#339933', highlight: true },
      { name: 'Express.js', iconName: 'Cpu', category: 'backend', color: '#FFFFFF', highlight: true },
      { name: 'REST APIs', iconName: 'Workflow', category: 'backend', color: '#7957FF', highlight: true },
      { name: 'Prisma ORM', iconName: 'Database', category: 'backend', color: '#2D3748', highlight: true },
      { name: 'PHP', iconName: 'Server', category: 'backend', color: '#777BB4' },
      { name: 'CodeIgniter', iconName: 'Flame', category: 'backend', color: '#EE4326' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    description: 'Relational and document-oriented databases for transactional reliability and flexible schemas.',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', iconName: 'Database', category: 'databases', color: '#4169E1', highlight: true },
      { name: 'MongoDB', iconName: 'Leaf', category: 'databases', color: '#47A248', highlight: true },
      { name: 'MySQL', iconName: 'DatabaseZap', category: 'databases', color: '#4479A1' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    description: 'Version control systems, developer toolchains, and collaborative deployment workflows.',
    icon: 'Wrench',
    skills: [
      { name: 'Git', iconName: 'GitBranch', category: 'tools', color: '#F05032', highlight: true },
      { name: 'GitHub', iconName: 'Github', category: 'tools', color: '#FFFFFF', highlight: true },
    ],
  },
];

export const experienceData: InternshipExperience[] = [
  {
    id: 'nielit-ml',
    role: 'Machine Learning Intern',
    company: 'NIELIT (National Institute of Electronics & Information Technology)',
    duration: '6 weeks',
    semester: '5th Semester',
    color: '#7957FF',
    highlights: [
      'Gained foundational knowledge and practical hands-on exposure to artificial intelligence and machine learning concepts and workflows.',
      'Explored data preprocessing, algorithmic pipelines, model evaluation techniques, and ML tooling.',
      'Strengthened analytical problem-solving and foundational mathematical intuition for AI-driven applications.',
    ],
    technologies: ['Machine Learning', 'Python', 'AI Workflows', 'Data Analysis'],
  },
  {
    id: 'androwebstech-fullstack',
    role: 'Full Stack Web Development Intern',
    company: 'Androwebstech Limited',
    duration: '1 month',
    semester: '3rd Semester',
    color: '#FF7058',
    highlights: [
      'Built the frontend of a travel ticket booking website as part of an intensive full-stack web development internship.',
      'Contributed to user interface design, form validation, and responsive mobile layouts.',
      'Worked on a backend project utilizing PHP with the CodeIgniter MVC framework, connecting routes to database transactions.',
    ],
    technologies: ['Frontend Development', 'PHP', 'CodeIgniter', 'JavaScript', 'HTML/CSS'],
  },
];

export const educationData: EducationData = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science & Engineering (AI & ML)',
  institution: 'Sitamarhi Institute of Technology',
  location: 'Sitamarhi, Bihar, India',
  period: '2023 – 2027',
  cgpa: '8.51',
  scale: '10',
  specialization: 'Artificial Intelligence & Machine Learning',
  coreSubjects: [
    'Artificial Intelligence & ML',
    'Data Structures & Algorithms',
    'Database Management Systems (DBMS)',
    'Full Stack Web Architecture',
    'Object-Oriented Programming',
    'Computer Networks',
  ],
};

export const certificationsData: Certification[] = [
  {
    id: 'nptel-iot',
    title: 'Internet of Things (IoT)',
    issuer: 'NPTEL',
    skills: ['IoT Architecture', 'Sensors & Actuators', 'Embedded Connectivity', 'Network Protocols'],
    icon: 'Radio',
    color: '#7957FF',
  },
  {
    id: 'nptel-cloud',
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    skills: ['Cloud Architecture', 'Distributed Systems', 'Virtualization', 'Scalability & Storage'],
    icon: 'Cloud',
    color: '#06B6D4',
  },
  {
    id: 'fcc-web',
    title: 'Responsive Web Design & JavaScript',
    issuer: 'freeCodeCamp',
    skills: ['HTML5 Semantic Structure', 'CSS3 Flexbox & Grid', 'Modern JavaScript (ES6+)', 'DOM Manipulation'],
    icon: 'Code',
    color: '#D7FF64',
  },
];

