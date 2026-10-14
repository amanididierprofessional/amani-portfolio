export const github = 'https://github.com/amanididier';
export const youtube = 'https://www.youtube.com/@Aidi';
export const projects = [
  { name: 'Bob', category: 'AI & tools', description: 'The friend that makes your research work easier.', detail: 'An AI-powered research companion for following your curiosity, connecting ideas, and making sense of it all.', repo: 'build-bob-research-application', live: '', tags: ['AI-powered', 'TypeScript'], visual: 'bob' },
  { name: 'Urugendo', category: 'Web apps', description: 'A fresh take on the modern web experience.', detail: 'A modern web application, built with an eye for clean interfaces and thoughtful interactions.', repo: 'urugendo-bolt', live: 'https://urugendo-v0.vercel.app', tags: ['Web application', 'TypeScript'], visual: 'urugendo' },
  { name: 'AI Agent Interview', category: 'AI & tools', description: 'A little practice. A lot more confidence.', detail: 'Practice technical and behavioral questions with an AI interview partner before your next tech interview.', repo: 'ai-agent-interview', live: '', tags: ['AI', 'Career tools'], visual: 'interview' },
  { name: 'Sanipads', category: 'Web apps', description: 'Better access. A healthier community.', detail: 'A community and health platform focused on making sanitary pads more accessible.', repo: 'sanipads', live: '', tags: ['Community', 'TypeScript'], visual: 'sanipads' },
  { name: 'Hot Seat', category: 'Experiments', description: 'Getting comfortable with the uncomfortable.', detail: 'An experiment from my ongoing collection of ideas, prototypes, and things worth building.', repo: 'hot-seat', live: '', tags: ['Experiment', 'Open source'], visual: 'hotseat' },
  { name: 'Let’s Build Together', category: 'Experiments', description: 'Good things start with building together.', detail: 'A space for trying ideas and sharing the joy of making something together.', repo: 'let-s-build-together', live: '', tags: ['Collaboration', 'Open source'], visual: 'together' },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} — Aidi · Amani Didier` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Aidi` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}