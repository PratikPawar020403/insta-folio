import { createClient } from '@supabase/supabase-js';
import type { ProjectItem, ProjectProgressTag, ProjectSlide } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';

// Sanitize URL: strip trailing slashes and redundant /rest/v1 if included
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseUrl = rawUrl.replace(/\/+$/, '').replace(/\/rest\/v1\/?$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-public-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function getCategoryIcon(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('machine learning') || c.includes('ml')) return '🧠';
  if (c.includes('cyber') || c.includes('security')) return '🛡️';
  if (c.includes('web')) return '🌐';
  if (c.includes('ai')) return '⚡';
  if (c.includes('cloud') || c.includes('devops')) return '☁️';
  if (c.includes('data')) return '📊';
  return '🚀';
}

function getCategoryGradient(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('machine learning') || c.includes('ml')) return 'from-purple-700 via-fuchsia-800 to-neutral-950';
  if (c.includes('cyber') || c.includes('security')) return 'from-rose-700 via-red-900 to-neutral-950';
  if (c.includes('web')) return 'from-blue-700 via-indigo-900 to-neutral-950';
  if (c.includes('ai')) return 'from-amber-600 via-orange-800 to-neutral-950';
  if (c.includes('cloud') || c.includes('devops')) return 'from-cyan-700 via-blue-900 to-neutral-950';
  return 'from-emerald-700 via-teal-900 to-neutral-950';
}

function parseBulletPoints(text: string): string[] {
  if (!text) return [];
  // Split on bullets (• or - or \n)
  const lines = text
    .split(/[•\n]/)
    .map((l) => l.trim().replace(/^[-*]\s*/, ''))
    .filter((l) => l.length > 5 && !l.toLowerCase().startsWith('key features') && !l.toLowerCase().startsWith('learnings'));
  return lines.slice(0, 4);
}

/**
 * Maps a Supabase row to ProjectItem
 */
export function mapDatabaseRowToProject(row: Record<string, unknown>): ProjectItem {
  const title = String(row.title || '').trim();
  const description = String(row.description || '').trim();
  const category = String(row.category || 'General').trim();
  const imageUrl = row.image_url ? String(row.image_url).trim() : undefined;
  const githubUrl = row.github_url ? String(row.github_url).trim() : '';
  const demoUrl = row.demo_url ? String(row.demo_url).trim() : '';
  const details = String(row.details || '').trim();

  // Tech stack skills array
  const skills: string[] = Array.isArray(row.tech_stack)
    ? (row.tech_stack as string[])
    : typeof row.tech_stack === 'string'
    ? (row.tech_stack as string).split(',').map((s) => s.trim())
    : [];

  // Determine span: if size is 'large' or undefined, alternate nicely
  const span: 'tall' | 'normal' = row.size === 'large' ? 'tall' : 'normal';

  // Determine progress tag
  let progressTag: ProjectProgressTag = 'Completed';
  let progressColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';

  if (demoUrl) {
    progressTag = 'Production';
    progressColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  } else if (category.toLowerCase().includes('in progress')) {
    progressTag = 'In Progress';
    progressColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  }

  // Extract features and learnings for carousel slides
  const parsedFeatures = parseBulletPoints(details);
  const featureList = parsedFeatures.length > 0 ? parsedFeatures : skills.map((s) => `Integrated ${s}`);

  // Multi-slide carousel construction
  const slides: ProjectSlide[] = [];

  // Slide 1: Cover Image & Summary
  slides.push({
    id: `${row.id}-1`,
    title: title,
    subtitle: category,
    description: description,
    features: featureList.slice(0, 3),
    gradient: getCategoryGradient(category),
    image: imageUrl,
  });

  // Slide 2: Key Features & Architecture
  if (details) {
    slides.push({
      id: `${row.id}-2`,
      title: 'Key Features & Learnings',
      subtitle: `${category} • Deep Dive`,
      description: details.slice(0, 260) + (details.length > 260 ? '...' : ''),
      features: featureList,
      gradient: 'from-neutral-900 via-indigo-950 to-neutral-900',
    });
  }

  // Slide 3: Tech Stack & Tools
  if (skills.length > 0) {
    slides.push({
      id: `${row.id}-3`,
      title: 'Technology & Stack',
      subtitle: 'Tooling & Libraries Used',
      description: `Engineered using ${skills.join(', ')} with high emphasis on performance, reliability, and clean code.`,
      features: skills.map((s) => `Core component: ${s}`),
      gradient: 'from-slate-900 via-purple-950 to-neutral-900',
    });
  }

  // Hashtags
  const hashtags = [
    `#${category.replace(/\s+/g, '')}`,
    ...skills.map((s) => `#${s.replace(/[\s.-]+/g, '')}`),
    '#Portfolio',
  ].slice(0, 6);

  // Deterministic likes & comments based on title hash so it looks lively
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash << 5) - hash + title.charCodeAt(i);
  const positiveHash = Math.abs(hash);
  const likesCount = Number(row.likes_count) || (150 + (positiveHash % 420));
  const commentsCount = Number(row.comments_count) || (8 + (positiveHash % 28));
  // Instagram Explore style view counter (e.g. 2.4M, 896K)
  const viewsCount = 150000 + (positiveHash % 26500000);

  // Date
  let dateStr = '2026';
  if (row.created_at) {
    try {
      const d = new Date(String(row.created_at));
      dateStr = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
    } catch {
      dateStr = '2026';
    }
  }

  return {
    id: String(row.id),
    title,
    tagline: description,
    progressTag,
    progressColor,
    skills,
    category,
    span,
    thumbnailGradient: getCategoryGradient(category),
    thumbnailIcon: getCategoryIcon(category),
    imageUrl,
    details,
    carouselSlides: slides,
    caption: `🚀 ${title}\n\n${description}\n\n${details ? `💡 Details:\n${details}` : ''}`,
    hashtags,
    liveUrl: demoUrl || '#',
    githubUrl: githubUrl || '#',
    likesCount,
    commentsCount,
    viewsCount,
    date: dateStr,
    featured: span === 'tall',
  };
}

export function formatViews(views: number): string {
  if (!views) return '254K';
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (views >= 1000) {
    return Math.floor(views / 1000) + 'K';
  }
  return views.toString();
}

/**
 * Fetches all live projects from Supabase table 'projects' (or fallback 'project').
 */
export async function getProjects(): Promise<{
  data: ProjectItem[];
  fromDatabase: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: PROJECTS_DATA,
      fromDatabase: false,
    };
  }

  try {
    // Try table 'projects' first (as verified in user database)
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    // Fallback to table 'project' if 'projects' returns error
    if (error && (error.code === '42P01' || error.message.includes('does not exist'))) {
      const fallback = await supabase
        .from('project')
        .select('*')
        .order('created_at', { ascending: false });
      data = fallback.data;
      error = fallback.error;
    }

    if (error) {
      console.warn('[Supabase] Query error:', error.message);
      return {
        data: PROJECTS_DATA,
        fromDatabase: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      console.info('[Supabase] Table returned 0 rows. Using default projects.');
      return {
        data: PROJECTS_DATA,
        fromDatabase: false,
      };
    }

    const transformed = data.map((row) => mapDatabaseRowToProject(row));
    return {
      data: transformed,
      fromDatabase: true,
    };
  } catch (err: unknown) {
    console.error('[Supabase] Exception during fetch:', err);
    return {
      data: PROJECTS_DATA,
      fromDatabase: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
