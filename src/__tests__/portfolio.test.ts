import { describe, it, expect } from 'vitest';
import { USER_PROFILE, INITIAL_STORIES, INITIAL_POSTS } from '../data/portfolioData';
import { formatViews, mapDatabaseRowToProject } from '../lib/supabase';
import { PROJECTS_DATA } from '../data/projectsData';

describe('USER_PROFILE Data Integrity', () => {
  it('has valid username matching pratik_pawar_0204', () => {
    expect(USER_PROFILE.username).toBe('pratik_pawar_0204');
  });

  it('has verified status and valid contact channels', () => {
    expect(USER_PROFILE.isVerified).toBe(true);
    expect(USER_PROFILE.avatar).toBe('/profile.png');
    expect(USER_PROFILE.email).toBe('pratikpawar0222@gmail.com');
    expect(USER_PROFILE.phone).toBe('+91-8928260115');
    expect(USER_PROFILE.github).toContain('PratikPawar020403');
    expect(USER_PROFILE.linkedin).toContain('pratik-s-pawar');
    expect(USER_PROFILE.portfolioUrl).toContain('psp-02-portfolio.netlify.app');
    expect(USER_PROFILE.postsCount).toBe(2);
  });
});

describe('INITIAL_STORIES Education Data Integrity', () => {
  it('contains all 4 educational milestones in chronological sequence', () => {
    expect(INITIAL_STORIES).toHaveLength(4);
    const ids = INITIAL_STORIES.map((s) => s.id);
    expect(ids).toEqual(['school', 'class12', 'bsc_cs', 'msc_it']);
  });

  it('all stories have author username matching pratik_pawar_0204', () => {
    for (const story of INITIAL_STORIES) {
      expect(story.username).toBe('pratik_pawar_0204');
      expect(story.slides.length).toBeGreaterThan(0);
    }
  });

  it('all slides contain valid IDs, titles, and non-empty text content', () => {
    for (const story of INITIAL_STORIES) {
      for (const slide of story.slides) {
        expect(slide.id).toBeTruthy();
        expect(slide.title).toBeTruthy();
        if (slide.slideType === 'photo') {
          expect(slide.image).toBeTruthy();
        } else {
          expect(slide.description).toBeTruthy();
        }
      }
    }
  });
});

describe('INITIAL_POSTS Feed Content Integrity', () => {
  it('has 4 feed posts with author pratik_pawar_0204', () => {
    expect(INITIAL_POSTS).toHaveLength(4);
    for (const post of INITIAL_POSTS) {
      expect(post.author.username).toBe('pratik_pawar_0204');
      expect(post.caption).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
      expect(Array.isArray(post.comments)).toBe(true);
    }
  });

  it('Post 1 and Post 2 have carousel photo assets', () => {
    const post1 = INITIAL_POSTS[0];
    const post2 = INITIAL_POSTS[1];
    expect(post1.images).toBeDefined();
    expect(post1.images?.length).toBe(3);
    expect(post2.images).toBeDefined();
    expect(post2.images?.length).toBe(3);
  });
});

describe('Supabase Formatting and Row Mapping', () => {
  it('formatViews formats numbers into compact social notation', () => {
    expect(formatViews(2500000)).toBe('2.5M');
    expect(formatViews(1000000)).toBe('1M');
    expect(formatViews(450000)).toBe('450K');
    expect(formatViews(850)).toBe('850');
  });

  it('mapDatabaseRowToProject converts raw DB row into typed ProjectItem', () => {
    const mockRow = {
      id: 'test-123',
      title: 'Neural Engine',
      description: 'AI model deployment engine',
      category: 'Machine Learning',
      tech_stack: ['Python', 'FastAPI', 'PyTorch'],
      demo_url: 'https://demo.neural.io',
      github_url: 'https://github.com/PratikPawar020403/neural',
      details: 'Built distributed serving infrastructure with low-latency endpoints.',
    };

    const project = mapDatabaseRowToProject(mockRow);
    expect(project.id).toBe('test-123');
    expect(project.title).toBe('Neural Engine');
    expect(project.progressTag).toBe('Production');
    expect(project.skills).toEqual(['Python', 'FastAPI', 'PyTorch']);
    expect(project.carouselSlides.length).toBeGreaterThanOrEqual(1);
  });

  it('PROJECTS_DATA has at least 5 default featured projects with valid carouselSlides for feed rendering', () => {
    expect(PROJECTS_DATA.length).toBeGreaterThanOrEqual(5);
    for (const p of PROJECTS_DATA) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.skills.length).toBeGreaterThan(0);
      expect(p.carouselSlides.length).toBeGreaterThanOrEqual(1);
    }
  });
});
