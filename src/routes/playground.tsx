import { createFileRoute } from '@tanstack/react-router';
import { AdventuresSection, ContentSection } from '@/components/portfolio';
import { pageHead } from '@/lib/portfolio';
export const Route = createFileRoute('/playground')({ head: () => pageHead('The playground', 'Explore Aidi’s adventures, space-sized dreams, love of water, and stories from a curious creative life.'), component: Playground });
function Playground() { return <><AdventuresSection full /><ContentSection /></>; }