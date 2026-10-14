import { describe, expect, it } from 'vitest';
import { github, youtube, projects } from '@/lib/portfolio';

describe('Portfolio destinations', () => {
  it('uses Amani Didier’s supplied GitHub profile', () => {
    expect(github).toBe('https://github.com/amanididier');
  });
  it('uses the supplied Aidi YouTube handle', () => {
    expect(youtube).toBe('https://www.youtube.com/@Aidi');
  });
  it('links Urugendo to the live destination supplied by Aidi', () => {
    expect(projects.find(p => p.name === 'Urugendo')?.live).toBe('https://urugendo-v0.vercel.app');
  });
});