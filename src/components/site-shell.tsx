import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Youtube, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { github, youtube } from '@/lib/portfolio';
import avatar from '@/assets/aidi-avatar.png.asset.json';

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const saved = localStorage.getItem('aidi-theme');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => { const next = saved ? saved === 'dark' : media.matches; setDark(next); document.documentElement.classList.toggle('dark', next); };
    update();
    const sync = () => { if (!localStorage.getItem('aidi-theme')) { setDark(media.matches); document.documentElement.classList.toggle('dark', media.matches); } };
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('aidi-theme', next ? 'dark' : 'light'); }
  return <header className="site-header page-width"><Link to="/" className="wordmark" aria-label="Aidi home">aidi<span>✳</span></Link><nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">{[{ to: '/work', label: 'Work' }, { to: '/about', label: 'About' }, { to: '/playground', label: 'Playground' }].map(item => <Link key={item.to} to={item.to} className={pathname === item.to ? 'nav-active' : ''}>{item.label}</Link>)}</nav><div className="header-actions"><Button variant="ghost" size="icon" className="theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title={dark ? 'Light theme' : 'Dark theme'}>{dark ? <Sun /> : <Moon />}</Button><Button asChild variant="outline" className="header-contact"><Link to="/contact">Let’s talk <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</Button></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer page-width"><div className="footer-identity"><img src={avatar.url} alt="Aidi mascot" width="36" height="36" loading="lazy" /><span>Made with curiosity & a little chaos.</span></div><span className="footer-copyright">© {new Date().getFullYear()} Amani Didier</span><div className="footer-socials"><Button asChild variant="ghost" size="icon"><a href={github} target="_blank" rel="noreferrer" aria-label="Aidi on GitHub"><Github /></a></Button><Button asChild variant="ghost" size="icon"><a href={youtube} target="_blank" rel="noreferrer" aria-label="Aidi on YouTube"><Youtube /></a></Button></div></footer>;
}