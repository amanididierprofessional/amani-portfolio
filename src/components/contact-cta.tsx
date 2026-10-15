import { ArrowUpRight, Github, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { github, youtube, email, phone, whatsapp } from '@/lib/portfolio';
import { Star } from '@/components/portfolio';

export function ContactSection({ full = false }: { full?: boolean }) {
  return (
    <section className={`contact-section ${full ? 'contact-full' : ''}`}>
      <div className="page-width contact-inner">
        <div className="eyebrow">GOOD THINGS START WITH A HELLO</div>
        <h2>
          Got a <span className="serif-word">"what if"?</span>
          <br />
          Let's build something.
        </h2>
        <p>
          An idea, a collaboration, or just a really good conversation.
          <br />
          I'd love to hear from you.
        </p>

        <div className="contact-details">
          <a className="contact-pill" href={`mailto:${email}`}>
            <Mail size={16} />
            <span>{email}</span>
          </a>
          <a className="contact-pill" href={whatsapp} target="_blank" rel="noreferrer">
            <Phone size={16} />
            <span>{phone} · WhatsApp</span>
          </a>
        </div>

        <div className="hero-actions">
          <Button asChild className="primary-action">
            <a href={whatsapp} target="_blank" rel="noreferrer">
              Message on WhatsApp <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="outline" className="secondary-action">
            <a href={`mailto:${email}`}>
              <Mail size={15} /> Email me
            </a>
          </Button>
        </div>

        <div className="hero-actions" style={{ marginTop: 12 }}>
          <Button asChild variant="ghost" className="text-link">
            <a href={github} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
          <Button asChild variant="ghost" className="text-link">
            <a href={youtube} target="_blank" rel="noreferrer">
              <Youtube /> YouTube
            </a>
          </Button>
        </div>

        <Star className="contact-star" />
        <span className="handwritten contact-note">let's make it happen ↗</span>
      </div>
    </section>
  );
}
