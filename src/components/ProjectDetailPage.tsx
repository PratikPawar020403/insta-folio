import React, { useState, useRef, useEffect } from 'react';
import type { ProjectItem } from '../types';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
  ExternalLink,
  Code2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Smile,
  Layers,
} from 'lucide-react';
import { InstagramDirectIcon } from './InstagramDirectIcon';
import confetti from 'canvas-confetti';
import { USER_PROFILE } from '../data/portfolioData';

function getContextualComments(project: ProjectItem) {
  const cat = (project.category || '').toLowerCase();
  if (cat.includes('machine learning') || cat.includes('ml')) {
    return [
      {
        id: 'c1',
        user: 'ml_reviewer',
        text: 'Great work on the model pipeline and feature evaluation! 🎯',
        time: '1d ago',
      },
      {
        id: 'c2',
        user: 'data_enthusiast',
        text: 'How did the model handle edge cases in the test split?',
        time: '4h ago',
      },
    ];
  }
  if (cat.includes('cyber') || cat.includes('security')) {
    return [
      {
        id: 'c1',
        user: 'sec_researcher',
        text: 'Clean implementation adhering to ethical security research guidelines 🛡️',
        time: '2d ago',
      },
      {
        id: 'c2',
        user: 'appsec_dan',
        text: 'The automated logging and reporting logic is super well structured.',
        time: '6h ago',
      },
    ];
  }
  if (cat.includes('ai') || cat.includes('automation')) {
    return [
      {
        id: 'c1',
        user: 'automation_builder',
        text: 'The orchestration with AI APIs and pipelines is super practical ⚡',
        time: '1d ago',
      },
      {
        id: 'c2',
        user: 'workflow_dev',
        text: 'Automating these repetitive steps must save hours of manual effort.',
        time: '5h ago',
      },
    ];
  }
  if (cat.includes('web')) {
    return [
      {
        id: 'c1',
        user: 'frontend_craft',
        text: 'The interactive visualizations and responsive layout look super smooth! 💻',
        time: '1d ago',
      },
      {
        id: 'c2',
        user: 'fullstack_alex',
        text: 'Love the intuitive filtering and overall user experience.',
        time: '8h ago',
      },
    ];
  }
  return [
    {
      id: 'c1',
      user: 'reviewer_lead',
      text: 'Clean architecture and well-structured implementation! 🚀',
      time: '1d ago',
    },
    {
      id: 'c2',
      user: 'fellow_dev',
      text: 'Bookmarking this project for reference 👏',
      time: '3h ago',
    },
  ];
}

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [isLiked, setIsLiked] = useState(() => {
    try {
      const stored = localStorage.getItem('insta_folio_project_interactions');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Boolean(parsed[project.id]?.isLiked);
      }
    } catch {
      // ignore storage error
    }
    return false;
  });

  const [isSaved, setIsSaved] = useState(() => {
    try {
      const stored = localStorage.getItem('insta_folio_project_interactions');
      if (stored) {
        const parsed = JSON.parse(stored);
        return Boolean(parsed[project.id]?.isSaved);
      }
    } catch {
      // ignore storage error
    }
    return false;
  });

  const saveProjectInteraction = (liked: boolean, saved: boolean) => {
    try {
      const stored = localStorage.getItem('insta_folio_project_interactions');
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[project.id] = { isLiked: liked, isSaved: saved };
      localStorage.setItem('insta_folio_project_interactions', JSON.stringify(parsed));
    } catch {
      // ignore storage error
    }
  };

  const [comments, setComments] = useState(() => getContextualComments(project));
  const [newComment, setNewComment] = useState('');
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  // Scroll to top of project detail page on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  const totalSlides = project.carouselSlides.length;

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) handleNextSlide();
    if (diff < -45) handlePrevSlide();
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Double Tap anywhere on media to trigger Like + Floating Heart
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!isLiked) {
        setIsLiked(true);
        saveProjectInteraction(true, isSaved);
      }
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
    lastTapRef.current = now;
  };

  const handleToggleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    saveProjectInteraction(nextLiked, isSaved);
    if (nextLiked) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
  };

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    saveProjectInteraction(isLiked, nextSaved);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id: 'c_' + Date.now(),
      user: 'you',
      text: newComment.trim(),
      time: 'Just now',
    };
    setComments((prev) => [...prev, newEntry]);
    setNewComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      confetti({ particleCount: 25, spread: 60, origin: { y: 0.8 } });
      alert(`Link to ${project.title} copied!`);
    }
  };

  const activeSlide = project.carouselSlides[currentSlideIndex];

  return (
    <div className="w-full bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 min-h-screen pb-24 animate-in fade-in duration-200">
      {/* Top Header Bar: Back Arrow & Post Title */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-95 text-neutral-800 dark:text-neutral-100"
            aria-label="Back to search grid"
          >
            <ArrowLeft size={22} className="stroke-[2.2]" />
            <span className="font-semibold text-sm truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${project.progressColor}`}
            >
              ● {project.progressTag}
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              aria-label="Share post"
            >
              <InstagramDirectIcon size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Post Author Bar */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full p-[1.5px] story-gradient flex-shrink-0">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.username}
                className="w-full h-full rounded-full object-cover border border-white dark:border-black"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {USER_PROFILE.username}
                </span>
                <CheckCircle2 size={12} className="text-blue-500 fill-blue-500" />
                <span className="text-neutral-400 text-xs">•</span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                  {project.category}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal">
                {project.date} • Featured Engineering Work
              </p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-full"
            aria-label="Options"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Swipeable Carousel Container */}
        <div
          className="relative w-full aspect-square bg-neutral-950 overflow-hidden select-none sm:rounded-xl border-y sm:border border-neutral-200 dark:border-neutral-800"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleDoubleTap}
        >
          {/* Top Left: Category Tag & Progress */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
              {project.category}
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-md ${project.progressColor}`}
            >
              ● {project.progressTag}
            </span>
          </div>

          {/* Top Right: One-Third Counter (e.g. 1/3) */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider shadow-md pointer-events-none border border-white/10">
            {currentSlideIndex + 1}/{totalSlides}
          </div>

          {/* Double Tap Floating Heart Animation */}
          {showHeartPop && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <Heart size={90} className="fill-white text-white drop-shadow-2xl animate-heart-pop" />
            </div>
          )}

          {/* Slide Visual Presentation */}
          <div
            className={`w-full h-full flex flex-col justify-between p-6 sm:p-7 text-white bg-gradient-to-br ${activeSlide.gradient} transition-all duration-300 relative`}
          >
            {/* If slide has an image (Supabase Storage cover image) */}
            {activeSlide.image ? (
              <>
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                <div className="relative z-10 pt-8">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/60 text-white/95 text-[10px] font-mono tracking-wider uppercase mb-2 backdrop-blur-md border border-white/20">
                    <Layers size={11} />
                    <span>Project Cover Slide {currentSlideIndex + 1} of {totalSlides}</span>
                  </div>
                </div>

                <div className="relative z-10 my-auto p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-xl max-w-sm">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs text-blue-300 font-semibold mt-0.5">
                    {activeSlide.subtitle}
                  </p>
                  <p className="text-xs text-white/90 leading-relaxed mt-2 line-clamp-3">
                    {activeSlide.description}
                  </p>
                </div>

                <div className="relative z-10 text-center text-[11px] text-white/70 tracking-wide font-medium">
                  {totalSlides > 1 ? 'Swipe for feature breakdown & architecture' : 'Project Cover'}
                </div>
              </>
            ) : (
              <>
                {/* Standard Feature / Architecture Slide */}
                <div className="pt-8">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/15 text-white/95 text-[10px] font-mono tracking-wider uppercase mb-2 backdrop-blur-sm border border-white/15">
                    <Layers size={11} />
                    <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium mt-1">
                    {activeSlide.subtitle}
                  </p>
                </div>

                {/* Feature Highlights Card */}
                <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 shadow-xl my-auto">
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed mb-3">
                    {activeSlide.description}
                  </p>
                  <div className="space-y-1.5">
                    {activeSlide.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                        <span className="text-blue-400 mt-0.5 font-bold">▹</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Swipe Hint */}
                <div className="text-center text-[11px] text-white/60 tracking-wide font-medium">
                  {totalSlides > 1 ? 'Swipe horizontally to view more slides' : 'System Overview'}
                </div>
              </>
            )}
          </div>

          {/* Desktop Left/Right Navigation Chevrons */}
          {currentSlideIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {currentSlideIndex < totalSlides - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Dot Pagination */}
          {totalSlides > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
              {project.carouselSlides.map((_, idx) => (
                <span
                  key={idx}
                  className={`rounded-full transition-all duration-200 ${
                    idx === currentSlideIndex
                      ? 'w-2 h-2 bg-blue-500 scale-110 shadow-sm'
                      : 'w-1.5 h-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Bar: Like, Comment, Share, Save */}
        <div className="px-4 pt-3.5 pb-1 flex items-center justify-between text-neutral-800 dark:text-neutral-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleLike}
              className="hover:opacity-75 transition-transform active:scale-125"
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart
                size={25}
                className={`transition-colors ${
                  isLiked ? 'fill-red-500 text-red-500' : 'hover:text-neutral-500'
                }`}
              />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('fullpage-comment-input');
                el?.focus();
              }}
              className="hover:opacity-75 transition-transform active:scale-110"
              aria-label="Comment"
            >
              <MessageCircle size={25} />
            </button>
            <button
              onClick={handleShare}
              className="hover:opacity-75 transition-transform active:scale-110"
              aria-label="Share"
            >
              <InstagramDirectIcon size={24} strokeWidth={2} />
            </button>
          </div>

          <button
            onClick={handleToggleSave}
            className="hover:opacity-75 transition-transform active:scale-110"
            aria-label={isSaved ? 'Remove from Saved' : 'Save'}
          >
            <Bookmark
              size={25}
              className={isSaved ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' : ''}
            />
          </button>
        </div>

        {/* Likes Count */}
        <div className="px-4 py-1">
          <p className="text-xs font-semibold text-neutral-900 dark:text-white">
            {isLiked ? 'Liked by you and others' : 'Liked by fellow engineers and recruiters'}
          </p>
        </div>

        {/* Direct Action Links: Live Project & GitHub Repo */}
        {(Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl !== 'null') ||
          Boolean(project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== 'null')) && (
          <div className="px-4 py-2.5 flex items-center gap-2.5">
            {project.liveUrl && project.liveUrl !== '#' && project.liveUrl !== 'null' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <ExternalLink size={15} />
                <span>View Live Project</span>
              </a>
            )}

            {project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== 'null' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-700 active:scale-98 transition-all"
              >
                <Code2 size={15} />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        )}

        {/* Caption & Hashtags */}
        <div className="px-4 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
          <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
            {USER_PROFILE.username}
          </span>
          <span className="whitespace-pre-line">
            {isCaptionExpanded
              ? project.caption
              : project.caption.slice(0, 130) + (project.caption.length > 130 ? '...' : '')}
          </span>
          {project.caption.length > 130 && (
            <button
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className="text-neutral-500 dark:text-neutral-400 text-xs ml-1 hover:underline font-medium"
            >
              {isCaptionExpanded ? 'less' : 'more'}
            </button>
          )}

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {project.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Skills Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-4 py-3 mt-2 border-t border-neutral-100 dark:border-neutral-800/80">
          <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2.5">
            Comments
          </h4>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start justify-between text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-0.5">
                    {c.user[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
                      {c.user}
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {c.text}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-1">
                      <span>{c.time}</span>
                      <button className="font-semibold hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
                <button
                  className="text-neutral-400 hover:text-red-500 pt-1"
                  aria-label="Like comment"
                >
                  <Heart size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Input Bar */}
        <form
          onSubmit={handleAddComment}
          className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2 bg-white dark:bg-black"
        >
          <button
            type="button"
            onClick={() => setNewComment((prev) => prev + ' 🚀')}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
          <input
            id="fullpage-comment-input"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment on this project..."
            className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="text-xs font-bold text-blue-500 hover:text-blue-600 disabled:opacity-0 transition-opacity"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
