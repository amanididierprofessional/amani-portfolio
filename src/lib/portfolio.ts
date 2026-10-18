export const github = 'https://github.com/amanididier';
export const youtube = 'https://www.youtube.com/@Aidi';
export const email = 'ishimweamanid@gmail.com';
export const phone = '0796919900';
export const phoneIntl = '+250796919900';
export const whatsapp = 'https://wa.me/250796919900';

export type Project = {
  slug: string;
  name: string;
  category: 'AI & tools' | 'Web apps' | 'Experiments';
  description: string;
  detail: string;
  repo?: string;
  live?: string;
  tags: string[];
  visual: string;
  created?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'stoke-yange',
    name: 'Stoke Yange',
    category: 'Web apps',
    description: 'Offline-first stock & credit manager for Rwandan retailers.',
    detail:
      'A production-ready PWA built for small and big shopkeepers in Musanze district and beyond. Sell in one tap, track stock and Amadeni (credit), work fully offline, and switch instantly between English and Kinyarwanda. Created October 2026 and already used by real shops to manage inventory efficiently.',
    repo: 'amanididierprofessional/stoke-Yange',
    live: 'https://stoke-yange.vercel.app/',
    tags: ['PWA', 'Offline-first', 'TypeScript', 'POS'],
    visual: 'stokeyange',
    created: '2026-10-12',
    featured: true,
  },
  {
    slug: 'bob',
    name: 'Bob',
    category: 'AI & tools',
    description: 'The friend that makes your research work easier.',
    detail:
      'An AI-powered research companion for following your curiosity, connecting ideas, and making sense of it all. Ask big questions, explore, connect the dots, and go deeper — Bob is built to be a friendly co-pilot for thinking.',
    repo: 'amanididier/build-bob-research-application',
    live: 'https://build-bob-research-application.vercel.app',
    tags: ['AI-powered', 'TypeScript'],
    visual: 'bob',
    created: '2026-09-02',
    featured: true,
  },
  {
    slug: 'urugendo',
    name: 'Urugendo',
    category: 'Web apps',
    description: 'A fresh take on the modern web experience.',
    detail:
      'A modern web application built with an eye for clean interfaces and thoughtful interactions. Discover your next adventure — a little adventure, a click away.',
    repo: 'urugendo-bolt',
    live: 'https://urugendo-v0.vercel.app',
    tags: ['Web application', 'TypeScript'],
    visual: 'urugendo',
    created: '2026-07-31',
    featured: true,
  },
  {
    slug: 'genie',
    name: 'Genie',
    category: 'AI & tools',
    description: 'Learn AI the fun way.',
    detail:
      'Genie is a playful AI learning companion that makes artificial intelligence approachable and enjoyable. Built to turn curiosity into hands-on understanding — no dry lectures, just magic that teaches.',
    live: 'https://gini-magic-maker.lovable.app/',
    tags: ['AI', 'Learning', 'Fun'],
    visual: 'genie',
    created: '2026-10',
    featured: true,
  },
  {
    slug: 'billy',
    name: 'Billy',
    category: 'AI & tools',
    description: 'Your YouTube assistant that watches with you.',
    detail:
      'A buddy that watches YouTube with you. Pause, draw a box, ask — Billy separates what it saw from what it guesses, and remembers it with the exact moment. Perfect for learning, research, or just never losing that important timestamp again.',
    repo: 'Billy-Your-Youtube-assistant',
    live: 'https://sync-my-shows.lovable.app',
    tags: ['AI', 'YouTube', 'Chrome extension'],
    visual: 'billy',
    created: '2026-10-03',
  },
  {
    slug: 'ict-chronicles',
    name: 'ICT Chronicles',
    category: 'Web apps',
    description: 'The official site of ESC Byimana ICT Club.',
    detail:
      'The club where curious students become builders. Web, Blender 3D, Video and AI tracks, weekly newspaper The New +, and a student-run community at Ecole des Sciences Byimana. Built and led by the club itself.',
    live: 'https://byimana-ict-chronicles.lovable.app',
    tags: ['Community', 'Education', 'Web'],
    visual: 'ict',
    created: '2026',
  },
  {
    slug: 'campus-checkin',
    name: 'Campus Check-in',
    category: 'Web apps',
    description: 'School gate visitor logbook that works offline.',
    detail:
      'Visit Byimana — a quick visitor check-in system for Ecole des Sciences Byimana. Works online and offline, syncs across devices, and gives guards and the office a shared real-time log of who is inside the campus.',
    live: 'https://campus-checkin-joy.lovable.app',
    tags: ['PWA', 'Offline', 'School'],
    visual: 'campus',
    created: '2026',
  },
  {
    slug: 'ai-agent-interview',
    name: 'AI Agent Interview',
    category: 'AI & tools',
    description: 'A little practice. A lot more confidence.',
    detail:
      'Practice technical and behavioral questions with an AI interview partner before your next tech interview. Build confidence by simulating real conversations.',
    repo: 'ai-agent-interview',
    live: '',
    tags: ['AI', 'Career tools'],
    visual: 'interview',
    created: '2025-08',
  },
  {
    slug: 'sanipads',
    name: 'Sanipads',
    category: 'Web apps',
    description: 'Better access. A healthier community.',
    detail:
      'A community and health platform focused on making sanitary pads more accessible.',
    repo: 'sanipads',
    live: '',
    tags: ['Community', 'TypeScript'],
    visual: 'sanipads',
    created: '2025-03',
  },
  {
    slug: 'hot-seat',
    name: 'Hot Seat',
    category: 'Experiments',
    description: 'Getting comfortable with the uncomfortable.',
    detail:
      'An experiment from my ongoing collection of ideas, prototypes, and things worth building.',
    repo: 'hot-seat',
    live: '',
    tags: ['Experiment', 'Open source'],
    visual: 'hotseat',
    created: '2025-12',
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export { pageHead } from '@/lib/seo';
