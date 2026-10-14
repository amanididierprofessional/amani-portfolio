import { createFileRoute } from '@tanstack/react-router';
import { AboutSection, ContentSection, ContactSection } from '@/components/portfolio';
import { pageHead } from '@/lib/portfolio';
export const Route = createFileRoute('/about')({ head: () => pageHead('A little about me', 'Meet Amani Didier: a curious builder exploring vibe coding, design, video editing, Blender, and storytelling.'), component: About });
function About() { return <><AboutSection full /><ContentSection /><ContactSection /></>; }