import { createFileRoute } from '@tanstack/react-router';
import { WorkSection, ContactSection } from '@/components/portfolio';
import { pageHead } from '@/lib/portfolio';
export const Route = createFileRoute('/work')({ head: () => pageHead('Selected work', 'Explore Aidi’s AI research tools, modern web applications, interview practice, and community projects.'), component: Work });
function Work() { return <><WorkSection full /><ContactSection /></>; }