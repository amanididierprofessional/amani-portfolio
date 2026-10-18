import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Github, Youtube, Play, Sparkles, Code2, Mic, Heart, Waves, Plane, Footprints, Mountain, Rocket, ExternalLink, Palette, Film, Box, Search, Store, GraduationCap, Users, Youtube as YtIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { github, youtube, projects } from '@/lib/portfolio';
import { portraitUrl, avatarUrl, projectPreviews, adventureImages } from '@/lib/images';

export function Star({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 3 35 23 54 14 41 30 56 42 36 37 30 57 25 37 5 44 19 30 5 15 25 23Z" fill="currentColor" /></svg>;
}

export function Hero() {
  return <section className="hero page-width">
    <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> A BUILDER. A CREATOR. A CURIOUS HUMAN.</div>
      <h1>Hey, I'm <span className="name-highlight">Aidi<svg viewBox="0 0 220 17" aria-hidden="true"><path d="M5 12Q108 0 212 8M22 16Q115 7 193 13" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg></span><span className="hello-period">.</span></h1>
      <h2>I turn "what if"<br />into <span className="serif-word">something real.</span></h2>
      <p>I'm Amani Ishimwe Didier. I build things for the web, tell stories,<br className="desktop-break" /> and follow my curiosity wherever it takes me.</p>
      <div className="hero-actions"><Button asChild className="primary-action"><Link to="/work">Explore my work <ArrowUpRight /></Link></Button><Button asChild variant="outline" className="secondary-action"><Link to="/contact">Let's talk <span aria-hidden="true">↗</span></Link></Button></div>
      <div className="hero-footnote"><span className="mini-spark">✳</span> A little code. A little creativity. A lot of heart.</div>
    </div>
    <div className="portrait-composition"><span className="handwritten portrait-note">yep, that's me <span>↴</span></span><div className="portrait-frame"><img src={portraitUrl} alt="Amani Didier wearing green headphones, glasses, and a green jacket" width="600" height="600" /></div><Star className="portrait-star" /><div className="builder-sticker"><Code2 /><span>made of<br /><strong>curiosity.</strong></span></div><div className="hello-sticker">hello, world <span>☺</span></div><span className="portrait-caption">AMANI ISHIMWE DIDIER / MOST PEOPLE CALL ME AIDI</span></div>
  </section>;
}

export function ProjectVisual({ visual, large = false }: { visual: string; large?: boolean }) {
  const cls = large ? 'project-art project-art-large' : 'project-art';

  if (visual === 'bob') {
    return (
      <div className={`${cls} art-bob art-live-preview`}>
        <img className="art-bob-char" src={projectPreviews.bob} alt="Bob — friendly AI research companion website preview" loading="lazy" />
        <span className="live-preview-caption">BOB · YOUR FRIENDLY AI RESEARCH COMPANION</span>
      </div>
    );
  }

  if (visual === 'stokeyange') {
    return (
      <div className={`${cls} art-stokeyange`}>
        <div className="stokeyange-card">
          <img src={projectPreviews.stokeyange} alt="Stoke Yange app icon" loading="lazy" />
          <div className="stokeyange-brand">Stoke Yange</div>
          <div className="stokeyange-tagline">Stock · Sell · Amadeni</div>
          <div className="stokeyange-pills">
            <span>Offline-first</span>
            <span>Kinyarwanda</span>
            <span>POS</span>
          </div>
        </div>
        <span className="art-note stokeyange-note">For shops in Musanze & beyond.</span>
        <Star className="bob-star" style={{ color: '#fff' }} />
      </div>
    );
  }

  if (visual === 'genie') {
    return (
      <div className={`${cls} art-genie art-preview`}>
        <img className="art-preview-img" src={projectPreviews.genie} alt="Genie — Learn AI the fun way" loading="lazy" />
        <div className="art-preview-fade" />
        <span className="art-preview-label">Genie · learn AI the fun way</span>
      </div>
    );
  }

  if (visual === 'urugendo') {
    return (
      <div className={`${cls} art-urugendo`}>
        <div className="urugendo-copy">
          <span className="urugendo-eyebrow">RWANDA, ONE RIDE AT A TIME</span>
          <strong>Urugendo<span>.</span></strong>
          <p>Find your next journey.</p>
          <span className="urugendo-sticker"><Waves size={12} /> Made for the road</span>
        </div>
        <div className="urugendo-frame">
          <img src={projectPreviews.urugendoIcon} alt="Urugendo bus-booking app shown on a phone screen" loading="lazy" />
        </div>
      </div>
    );
  }

  if (visual === 'billy') {
    return (
      <div className={`${cls} art-billy`}>
        <div className="project-icon"><YtIcon size={32} /></div>
        <strong>Watch · Point · Ask</strong>
        <span className="mini-project-label">BILLY</span>
        <Star className="small-art-star" />
      </div>
    );
  }

  if (visual === 'ict') {
    return (
      <div className={`${cls} art-ict`}>
        <div className="project-icon"><GraduationCap size={32} /></div>
        <strong>Curious students<br />become builders.</strong>
        <span className="mini-project-label">ICT CLUB · BYIMANA</span>
        <Star className="small-art-star" />
      </div>
    );
  }

  if (visual === 'campus') {
    return (
      <div className={`${cls} art-campus`}>
        <div className="project-icon"><Users size={32} /></div>
        <strong>Welcome to the gate.</strong>
        <span className="mini-project-label">CAMPUS CHECK-IN</span>
        <Star className="small-art-star" />
      </div>
    );
  }

  return (
    <div className={`${cls} art-${visual}`}>
      <span className="mini-project-label">AIDI / LAB</span>
      <div className="project-icon">
        {visual === 'interview' ? <Mic /> : visual === 'sanipads' ? <Heart /> : visual === 'hotseat' ? <span>🔥</span> : <Code2 />}
      </div>
      <strong>
        {visual === 'interview' ? 'Your next chapter.' : visual === 'sanipads' ? 'Care, without barriers.' : visual === 'hotseat' ? 'Take the hot seat.' : 'Better, together.'}
      </strong>
      <Star className="small-art-star" />
    </div>
  );
}

export function WorkSection({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('All');
  const visible = (full ? projects : projects.slice(0, 4)).filter((p) => filter === 'All' || p.category === filter);
  return (
    <section className={`work-section page-width ${full ? 'inner-page' : ''}`}>
      <div className="section-heading">
        <div>
          <div className="eyebrow muted-eyebrow">01 / MADE WITH CURIOSITY</div>
          <h2>{full ? "Things I've built" : 'Selected work'}<span className="heading-dot">.</span></h2>
          <p>Ideas that escaped my notes app and became real things.</p>
        </div>
        {!full && (
          <Button asChild variant="ghost" className="text-link">
            <Link to="/work">All projects <ArrowUpRight /></Link>
          </Button>
        )}
      </div>
      {full && (
        <div className="filters" aria-label="Filter projects">
          {['All', 'AI & tools', 'Web apps', 'Experiments'].map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'ghost'} onClick={() => setFilter(f)}>{f}</Button>
          ))}
        </div>
      )}
      <div className="project-grid">
        {visible.map((project) => {
          const repoUrl = project.repo
            ? project.repo.includes('/')
              ? `https://github.com/${project.repo}`
              : `${github}/${project.repo}`
            : null;
          return (
            <article className="project-card" key={project.slug}>
              <Link to="/project/$slug" params={{ slug: project.slug }} className="project-cover-button" aria-label={`View ${project.name} details`}>
                <ProjectVisual visual={project.visual} />
              </Link>
              <div className="project-info">
                <div className="project-title-row">
                  <h3>{project.name}<span className="project-number">0{projects.findIndex((p) => p.slug === project.slug) + 1}</span></h3>
                  <Button asChild variant="ghost" size="icon" aria-label={`Open ${project.name}`}>
                    <Link to="/project/$slug" params={{ slug: project.slug }}><ArrowUpRight /></Link>
                  </Button>
                </div>
                <p>{project.description}</p>
                <div className="project-bottom">
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="repo-links">
                    {repoUrl && (
                      <Button asChild variant="ghost" size="icon">
                        <a href={repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}><Github /></a>
                      </Button>
                    )}
                    {project.live && (
                      <Button asChild variant="ghost" size="icon">
                        <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}><ExternalLink /></a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ContentSection() {
  return (
    <section className="content-section page-width">
      <div className="section-heading">
        <div>
          <div className="eyebrow muted-eyebrow">02 / BUILDING IN PUBLIC</div>
          <h2>The story behind the screen<span className="heading-dot">.</span></h2>
          <p>The experiments, the little wins, and the "well, that didn't work."</p>
        </div>
        <Button asChild variant="ghost" className="text-link">
          <a href={youtube} target="_blank" rel="noreferrer">Find me on YouTube <ArrowUpRight /></a>
        </Button>
      </div>
      <div className="youtube-feature">
        <a href={`${youtube}/videos`} target="_blank" rel="noreferrer" className="video-art" aria-label="Explore Aidi's videos on YouTube">
          <div className="video-kicker">THE AIDI EXPERIMENT</div>
          <div className="video-headline">ONE MONTH.<br />ONE <span>BIG IDEA.</span></div>
          <img src={avatarUrl} alt="Aidi chipmunk mascot" loading="lazy" width="260" height="260" />
          <span className="play-button"><Play fill="currentColor" /></span>
          <Star className="video-star" />
        </a>
        <div className="video-copy">
          <span className="youtube-label"><Youtube size={17} /> @Aidi</span>
          <h3>Can I build a billion dollar company in one month?</h3>
          <p>Big ideas. Real experiments. An honest look at what happens when curiosity meets a deadline.</p>
          <div className="tags"><span>Tech experiments</span><span>Builder journey</span></div>
          <Button asChild variant="ghost" className="text-link">
            <a href={`${youtube}/videos`} target="_blank" rel="noreferrer">Explore the channel <ArrowUpRight /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const skills = [
  { icon: Code2, title: 'Vibe coding', note: 'Ideas → things that work', tone: 'yellow' },
  { icon: Palette, title: 'Design & doodles', note: 'Logos, interfaces & happy accidents', tone: 'blue' },
  { icon: Film, title: 'Video editing', note: 'Making stories move in CapCut', tone: 'green' },
  { icon: Box, title: '3D & animation', note: 'Another dimension with Blender', tone: 'neutral' },
];

export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <section className={`about-section page-width ${full ? 'inner-page' : ''}`}>
      <div className="section-heading">
        <div>
          <div className="eyebrow muted-eyebrow">03 / MORE THAN A JOB TITLE</div>
          <h2>Curiosity is my favorite skill<span className="heading-dot">.</span></h2>
        </div>
        <Star className="about-star" />
      </div>
      <div className="about-copy">
        <p>I'm Amani Didier, but you can call me Aidi. I'm happiest when I'm making something — a web app, a new logo, a video, or an idea that probably sounded a little crazy at first.</p>
        <p>I like technology that feels human, design that makes you smile, and learning by doing. Usually with headphones on. Always with a little room for a laugh.</p>
      </div>
      <div className="skill-grid">
        {skills.map((s) => (
          <div className="skill-item" key={s.title}>
            <span className={`skill-icon ${s.tone}`}><s.icon /></span>
            <h3>{s.title}</h3>
            <p>{s.note}</p>
          </div>
        ))}
      </div>
      {!full && (
        <Button asChild variant="ghost" className="text-link">
          <Link to="/about">A little more about me <ArrowUpRight /></Link>
        </Button>
      )}
      {full && (
        <div className="about-extra">
          <img src={portraitUrl} alt="Aidi with headphones" loading="lazy" width="300" height="300" />
          <div>
            <span className="handwritten">forever a work in progress.</span>
            <h3>Build. Learn. Share. Repeat.</h3>
            <p>Tech exploration, sharing stories, and sharing laughs. The best part of building is finding people who are just as curious as you are.</p>
            <Button asChild variant="outline">
              <a href={github} target="_blank" rel="noreferrer"><Github /> Follow the experiments</a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

const adventures = [
  { title: 'By the water', icon: Waves, image: adventureImages.water, note: "A lake, an ocean, a quiet shore. There's something about water that makes everything feel a little lighter.", label: 'MY HAPPY PLACE', type: 'Earth' },
  { title: 'To the moon & Mars', icon: Rocket, image: adventureImages.moon, note: 'Still on the dream list. One day, a different kind of adventure — a little further from home.', label: 'ON THE DREAM LIST', type: 'Dreams' },
  { title: 'Musanze mountains', icon: Mountain, image: adventureImages.mountains, note: "Rwanda's mountains and the incredible mountain gorillas of Musanze. Nature at its most extraordinary.", label: 'RWANDA, WITH LOVE', type: 'Earth' },
  { title: 'Above the clouds', icon: Plane, image: adventureImages.airplane, note: 'Window seat, always. I love that moment when the world turns into a patchwork far below.', label: 'A DIFFERENT PERSPECTIVE', type: 'Dreams' },
  { title: 'One more kilometer', icon: Footprints, image: adventureImages.running, note: 'A run, a clear head, and a little more energy for whatever comes next.', label: 'KEEP MOVING', type: 'Little joys' },
  { title: 'Life has a soundtrack', icon: Mic, image: adventureImages.music, note: 'Singing, headphones on, and sharing a laugh. Some of the best moments need no big plan.', label: 'THE LITTLE THINGS', type: 'Little joys' },
];

export function AdventuresSection({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(0);
  const visible = adventures.filter((a) => filter === 'All' || a.type === filter);
  const current = visible[active] ?? visible[0];
  if (!current) return null;
  return (
    <section className={`adventure-section page-width ${full ? 'inner-page' : ''}`}>
      <div className="section-heading">
        <div>
          <div className="eyebrow muted-eyebrow">04 / AWAY FROM THE KEYBOARD</div>
          <h2>There's a whole world out there<span className="heading-dot">.</span></h2>
          <p>Earth adventures, space-sized dreams, and the little things in between.</p>
        </div>
        {!full && (
          <Button asChild variant="ghost" className="text-link">
            <Link to="/playground">My playground <ArrowUpRight /></Link>
          </Button>
        )}
      </div>
      {full && (
        <div className="filters">
          {['All', 'Earth', 'Dreams', 'Little joys'].map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'ghost'} onClick={() => { setFilter(f); setActive(0); }}>{f}</Button>
          ))}
        </div>
      )}
      <div className="adventure-layout">
        <div className="adventure-image">
          <img src={current.image} alt={current.title} loading="lazy" width="1200" height="800" />
          {current.title === 'Musanze mountains' && <img className="gorilla-inset" src={adventureImages.gorilla} alt="Mountain gorilla in Volcanoes National Park, Rwanda" loading="lazy" width="320" height="240" />}
          <span className="image-caption">{current.label}</span>
        </div>
        <div className="adventure-details">
          <div className="adventure-tabs">
            {visible.map((a, i) => (
              <Button key={a.title} variant={i === active ? 'default' : 'ghost'} size="icon" title={a.title} aria-label={a.title} aria-pressed={i === active} onClick={() => setActive(i)}>
                <a.icon />
              </Button>
            ))}
          </div>
          <span className="handwritten">a life beyond the tabs.</span>
          <h3>{current.title}</h3>
          <p>{current.note}</p>
          <span className="illustration-note">A visual mood for each adventure — not a personal travel photo.</span>
        </div>
      </div>
    </section>
  );
}

export { ContactSection } from '@/components/contact-cta';
