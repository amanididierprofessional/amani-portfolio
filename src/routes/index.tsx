import { createFileRoute } from "@tanstack/react-router";
import { Hero, WorkSection, ContentSection, AboutSection, AdventuresSection, ContactSection } from '@/components/portfolio';
import { pageHead } from '@/lib/portfolio';
export const Route = createFileRoute("/")({
  head: () => pageHead('Builder, creator & curious human', 'Meet Amani Didier, also known as Aidi. Explore web projects, tech experiments, creative stories, and a world of curiosity.'),
  component: Index,
});
function Index() {
  return <><Hero /><div className="interest-band"><div className="page-width"><span>BUILDING COOL THINGS</span><span>✳</span><span>FOLLOWING CURIOSITY</span><span>✳</span><span>SHARING THE JOURNEY</span><span>✳</span><span>HAVING A LITTLE FUN</span></div></div><WorkSection /><ContentSection /><AboutSection /><AdventuresSection /><ContactSection /></>;
}
