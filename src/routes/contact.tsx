import { createFileRoute } from '@tanstack/react-router';
import { ContactSection } from '@/components/contact-cta';
import { pageHead } from '@/lib/portfolio';

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead(
      "Let's make something",
      'Connect with Amani Didier (Aidi) by email or WhatsApp. Start a conversation about ideas, collaboration, and building something together.'
    ),
  component: Contact,
});

function Contact() {
  return <ContactSection full />;
}
