import React, { useState, useRef } from 'react';
import type { ProjectItem } from '../types';
import {
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

interface ProjectPostCardProps {
  project: ProjectItem;
  onShare?: () => void;
}

export const ProjectPostCard: React.FC<ProjectPostCardProps> = ({ project, onShare }) => {
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

  const saveInteraction = (liked: boolean, saved: boolean) => {
    try {
      const stored = localStorage.getItem('insta_folio_project_interactions');
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[project.id] = { isLiked: liked, isSaved: saved };
      localStorage.setItem('insta_folio_project_interactions', JSON.stringify(parsed));
    } catch {
      // ignore storage error
    }
  };

  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    {
      id: 'c1',
      user: 'dev_peer',
      text: `Impressive architecture for ${project.title}! 🚀`,
      time: '2h ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  const totalSlides = project.carouselSlides.length || 1;
  const activeSlide = project.carouselSlides[currentSlideIndex] || project.carouselSlides[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) handleNextSlide();
    if (distance < -50) handlePrevSlide();
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      e.preventDefault();
      setIsLiked(true);
      saveInteraction(true, isSaved);
      setShowHeartPop(true);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.65 },
      });
      setTimeout(() => setShowHeartPop(false), 800);
    }
    lastTapRef.current = now;
  };

  const handleToggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    saveInteraction(next, isSaved);
    if (next) {
      setShowHeartPop(true);
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 },
      });
      setTimeout(() => setShowHeartPop(false), 800);
    }
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    saveInteraction(isLiked, next);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        user: 'you',
        text: newComment.trim(),
        time: 'Just now',
      },
    ]);
    setNewComment('');
  };

  return (
    <article
      id={`project-${project.id}`}
      className="w-full bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 transition-colors pb-3"
    >
      {/* 1. Author Bar */}
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
              {project.date} • Featured Work
            </p>
          </div>
        </div>

        <button
          onClick={onShare}
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-full"
          aria-label="Options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 2. Interactive Multi-Slide Carousel Container */}
      <div
        className="relative w-full aspect-square bg-neutral-950 overflow-hidden select-none sm:rounded-xl border-y sm:border border-neutral-200 dark:border-neutral-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleDoubleTap}
      >
        {/* Top Badges */}
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

        {/* Slide Counter (e.g. 1/3) */}
        {totalSlides > 1 && (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider shadow-md pointer-events-none border border-white/10">
            {currentSlideIndex + 1}/{totalSlides}
          </div>
        )}

        {/* Double Tap Floating Heart */}
        {showHeartPop && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart size={90} className="fill-white text-white drop-shadow-2xl animate-heart-pop" />
          </div>
        )}

        {/* Slide Content */}
        <div
          className={`w-full h-full flex flex-col justify-between p-6 sm:p-7 text-white bg-gradient-to-br ${activeSlide.gradient} transition-all duration-300 relative`}
        >
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
                  <span>Cover Slide {currentSlideIndex + 1} of {totalSlides}</span>
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
                {totalSlides > 1 ? 'Swipe for feature breakdown & architecture 👉' : 'Project Cover'}
              </div>
            </>
          ) : (
            <>
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

              <div className="text-center text-[11px] text-white/60 tracking-wide font-medium">
                {totalSlides > 1 ? 'Swipe horizontally to view more slides' : 'System Overview'}
              </div>
            </>
          )}
        </div>

        {/* Navigation Chevrons */}
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

      {/* 3. Social Interaction Bar */}
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
              const el = document.getElementById(`comment-input-${project.id}`);
              el?.focus();
            }}
            className="hover:opacity-75 transition-transform active:scale-110"
            aria-label="Comment"
          >
            <MessageCircle size={25} />
          </button>
          <button
            onClick={onShare}
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

      {/* 4. Action Shortcuts: Live Demo & GitHub */}
      <div className="px-4 py-2 flex items-center gap-2">
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
          >
            <ExternalLink size={14} />
            <span>Open Live Demo</span>
          </a>
        )}
        {project.githubUrl && project.githubUrl !== '#' && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-300 dark:border-neutral-700 transition-all active:scale-98"
          >
            <Code2 size={14} />
            <span>View Source</span>
          </a>
        )}
      </div>

      {/* 5. Caption & Tech Stack */}
      <div className="px-4 py-1 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
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
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 ml-1 font-medium"
          >
            {isCaptionExpanded ? 'less' : 'more'}
          </button>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1 mt-2 mb-1">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono border border-neutral-200 dark:border-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 mt-1 text-blue-600 dark:text-blue-400 font-medium">
          {project.hashtags.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      {/* 6. Comments Preview */}
      <div className="px-4 py-1">
        {comments.length > 0 && (
          <div className="space-y-1 mt-1 text-xs">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-1.5">
                <span className="font-bold text-neutral-900 dark:text-white">{c.user}</span>
                <span className="text-neutral-700 dark:text-neutral-300 flex-1">{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Inline Add Comment */}
        <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900">
          <Smile size={16} className="text-neutral-400 flex-shrink-0" />
          <input
            id={`comment-input-${project.id}`}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          {newComment.trim() && (
            <button
              type="submit"
              className="text-blue-500 font-semibold text-xs hover:text-blue-600 active:scale-95 transition-transform"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </article>
  );
};
