export const personal = {
  name: 'Your Name',
  role: 'Full-Stack Developer',
  location: 'Surabaya, East Java',
  email: 'yourname@email.com',
  whatsapp: '+62 8xx-xxxx-xxxx',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  instagram: 'https://instagram.com/',
  photo: '',
  bio: `I'm a full-stack developer based in Surabaya with 3 years of experience building
products that people actually enjoy using. I've shipped projects across e-commerce,
healthcare, and enterprise — ranging from internal dashboards to customer-facing platforms.

My approach is simple: understand the problem first, design the architecture carefully,
then build it well. I care about the whole stack — from database schemas and API contracts
to component design and micro-interactions.

Outside of code, I stay curious about design, food, and UI details that make everyday
software feel just a little more human.`,
  chips: ['Systems thinker', 'Detail-oriented', 'Clean code', 'Team player', 'Fast learner'],
  stats: [
    { label: 'Years of exp.', value: '3+' },
    { label: 'Projects shipped', value: '20+' },
    { label: 'Happy clients', value: '15+' },
  ],
}

export const skills = [
  {
    cat: 'Frontend',
    tags: ['React', 'Vue.js', 'TypeScript', 'Tailwind', 'Next.js'],
    level: 'Advanced',
  },
  {
    cat: 'Backend',
    tags: ['Laravel', 'Node.js', 'ASP.NET', 'Express', 'PHP'],
    level: 'Advanced',
  },
  {
    cat: 'Database',
    tags: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'],
    level: 'Proficient',
  },
  {
    cat: 'API & Infra',
    tags: ['REST', 'GraphQL', 'WebSocket', 'Docker', 'AWS'],
    level: 'Proficient',
  },
  {
    cat: 'Workflow',
    tags: ['Git', 'CI/CD', 'Figma', 'Linux', 'Agile'],
    level: 'Everyday',
  },
]

export const projects = [
  {
    num: '01',
    title: 'E-Commerce Platform',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    desc: 'Full-featured store with real-time inventory, payment gateway, and a clean admin dashboard.',
    year: '2025',
    color: 'ind',
    liveUrl: '#',
    githubUrl: '#',
    image: '',
  },
  {
    num: '02',
    title: 'Real-Time Chat App',
    stack: ['React', 'Node.js', 'WebSocket'],
    desc: 'Encrypted messaging with rooms, file sharing, and read receipts built for scale.',
    year: '2024',
    color: 'pch',
    liveUrl: '#',
    githubUrl: '#',
    image: '',
  },
  {
    num: '03',
    title: 'Analytics Dashboard',
    stack: ['ASP.NET', 'React TS', 'PostgreSQL'],
    desc: 'Enterprise BI with interactive charts, custom date ranges, and clean exportable reports.',
    year: '2024',
    color: 'lav',
    liveUrl: '#',
    githubUrl: '#',
    image: '',
  },
  {
    num: '04',
    title: 'Hospital Management System',
    stack: ['Laravel', 'Vue.js', 'Docker'],
    desc: 'Patient records, scheduling, billing, and role-based access across departments.',
    year: '2023',
    color: 'mint',
    liveUrl: '#',
    githubUrl: '#',
    image: '',
  },
]

export const experience = [
  {
    period: '2023 — Present',
    company: 'Tech Company, Surabaya',
    role: 'Senior Full-Stack Developer',
    desc: 'Led development of a microservices platform serving 50,000+ users. Architected REST APIs, mentored junior developers, and cut deployment time by 40%.',
    stack: ['Laravel', 'Vue.js', 'Docker', 'AWS', 'Redis'],
  },
  {
    period: '2021 — 2023',
    company: 'Digital Agency, Jakarta',
    role: 'Full-Stack Developer',
    desc: 'Built and maintained 10+ client apps across e-commerce, healthcare, and fintech. Shipped intentional, precise interfaces in close collaboration with designers.',
    stack: ['React', 'Node.js', 'MySQL', 'TypeScript'],
  },
  {
    period: '2020 — 2021',
    company: 'Startup, Surabaya',
    role: 'Junior Web Developer',
    desc: 'Built features for a growing SaaS product and deepened expertise in database optimization and API design within a fast-moving agile team.',
    stack: ['PHP', 'Laravel', 'JavaScript'],
  },
]
