export interface StoryScore {
  subject: string;
  score: string;
}

export interface StorySlide {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  institution: string;
  location: string;
  degreeOrGrade: string;
  description: string;
  highlights: string[];
  skillsLearned: string[];
  gradient: string;
  badge: string;
  emoji: string;
  image?: string;
  paragraphs?: string[];
  scores?: StoryScore[];
  slideType?: 'info' | 'photo';
}

export interface EducationStory {
  id: string;
  title: string;
  label: string;
  username: string;
  avatar: string;
  category: 'school' | 'class12' | 'bsc_cs' | 'msc_it';
  slides: StorySlide[];
  viewed: boolean;
  timestamp: string;
}

export interface CommentItem {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface Post {
  id: string;
  author: {
    username: string;
    name: string;
    avatar: string;
    isVerified?: boolean;
    location?: string;
  };
  subtitle?: string;
  type: 'about_carousel' | 'open_to_work' | 'pitch_carousel' | 'image_carousel';
  images?: string[];
  pitchId?: 'wispr-breathless' | 'wispr-diwali';
  timestamp: string;
  caption: string;
  tags: string[];
  likesCount: number;
  comments: CommentItem[];
  isLiked: boolean;
  isSaved: boolean;
}

export type ProjectProgressTag = 'Production' | 'Completed' | 'In Progress' | 'Beta' | 'MVP';

export interface ProjectSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  gradient: string;
  image?: string;
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  progressTag: ProjectProgressTag;
  progressColor: string;
  skills: string[];
  category: string;
  span: 'tall' | 'normal';
  thumbnailGradient: string;
  thumbnailIcon: string;
  imageUrl?: string;
  details?: string;
  carouselSlides: ProjectSlide[];
  caption: string;
  hashtags: string[];
  liveUrl: string;
  githubUrl: string;
  likesCount: number;
  commentsCount: number;
  viewsCount?: number;
  date: string;
  featured?: boolean;
}
