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
  const [showComments, setShowComments] = useState(false);

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
      className="w-full bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 transition-colors pb-2 max-w-xl mx-auto"
    >
      {/* 1. Author Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] story-gradient flex-shrink-0">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.username}
              className="w-full h-full rounded-full object-cover border border-white dark:border-black"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                {USER_PROFILE.username}
              </span>
              <CheckCircle2 size={11} className="text-blue-500 fill-blue-500" />
              <span className="text-neutral-400 text-xs">•</span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                {project.category}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-normal mt-0.5">
              {project.date} • Featured Work
            </p>
          </div>
        </div>

        <button
          onClick={onShare}
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-full"
          aria-label="Options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* 2. Interactive Multi-Slide Carousel Container */}
      <div
        className="relative w-full aspect-[4/5] max-h-[60dvh] bg-neutral-950 overflow-hidden select-none sm:rounded-xl border-y sm:border border-neutral-200 dark:border-neutral-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleDoubleTap}
      >
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
            {project.category}
          </span>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md shadow-md ${project.progressColor}`}
          >
            ● {project.progressTag}
          </span>
        </div>

        {/* Slide Counter (e.g. 1/3) */}
        {totalSlides > 1 && (
          <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider shadow-md pointer-events-none border border-white/10">
            {currentSlideIndex + 1}/{totalSlides}
          </div>
        )}

        {/* Double Tap Floating Heart */}
        {showHeartPop && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart size={80} className="fill-white text-white drop-shadow-2xl animate-heart-pop" />
          </div>
        )}

        {/* Slide Content */}
        <div
          className={`w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-white bg-gradient-to-br ${activeSlide.gradient} transition-all duration-300 relative`}
        >
          {activeSlide.image ? (
            <>
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
              <div className="relative z-10 pt-4">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 text-white/95 text-[9px] font-mono tracking-wider uppercase mb-1 backdrop-blur-md border border-white/20">
                  <Layers size={10} />
                  <span>Cover Slide {currentSlideIndex + 1} of {totalSlides}</span>
                </div>
              </div>

              <div className="relative z-10 my-auto p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-xl max-w-sm">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {activeSlide.title}
                </h3>
                <p className="text-[11px] text-blue-300 font-semibold mt-0.5">
                  {activeSlide.subtitle}
                </p>
                <p className="text-[11px] text-white/90 leading-relaxed mt-1.5 line-clamp-2 sm:line-clamp-3">
                  {activeSlide.description}
                </p>
              </div>

              <div className="relative z-10 text-center text-[10px] text-white/70 tracking-wide font-medium">
                {totalSlides > 1 ? 'Swipe for feature breakdown 👉' : 'Project Cover'}
              </div>
            </>
          ) : (
            <>
              <div className="pt-4">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/15 text-white/95 text-[9px] font-mono tracking-wider uppercase mb-1 backdrop-blur-sm border border-white/15">
                  <Layers size={10} />
                  <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {activeSlide.title}
                </h3>
                <p className="text-[11px] text-white/90 font-medium mt-0.5">
                  {activeSlide.subtitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 shadow-xl my-auto">
                <p className="text-xs text-white/95 leading-relaxed mb-2 line-clamp-2">
                  {activeSlide.description}
                </p>
                <div className="space-y-1">
                  {activeSlide.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-white/90">
                      <span className="text-blue-400 font-bold">▹</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-[10px] text-white/60 tracking-wide font-medium">
                {totalSlides > 1 ? 'Swipe to explore architecture' : 'System Overview'}
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
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {currentSlideIndex < totalSlides - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextSlide();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Dot Pagination */}
        {totalSlides > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
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

      {/* 3. Social Interaction Bar with inline counts matching Instagram */}
      <div className="px-3.5 pt-2 pb-1.5 flex items-center justify-between text-neutral-800 dark:text-neutral-200">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1.5 hover:opacity-75 transition-transform active:scale-110"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              size={22}
              className={`transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'hover:text-neutral-500'
              }`}
            />
            <span className={`text-xs font-semibold ${isLiked ? 'text-red-500' : 'text-neutral-800 dark:text-neutral-200'}`}>
              {(project.likesCount + (isLiked ? 1 : 0)).toLocaleString()}
            </span>
          </button>
          <button
            onClick={() => {
              setShowComments(true);
              setTimeout(() => {
                const el = document.getElementById(`comment-input-${project.id}`);
                el?.focus();
              }, 100);
            }}
            className="flex items-center gap-1.5 hover:opacity-75 transition-transform active:scale-110"
            aria-label="Comment"
          >
            <MessageCircle size={22} />
            {comments.length > 0 && (
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {comments.length}
              </span>
            )}
          </button>
          <button
            onClick={onShare}
            className="hover:opacity-75 transition-transform active:scale-110"
            aria-label="Share"
          >
            <InstagramDirectIcon size={21} strokeWidth={2} />
          </button>
        </div>

        <button
          onClick={handleToggleSave}
          className="hover:opacity-75 transition-transform active:scale-110"
          aria-label={isSaved ? 'Remove from Saved' : 'Save'}
        >
          <Bookmark
            size={21}
            className={isSaved ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' : ''}
          />
        </button>
      </div>

      {/* 4. Action Shortcuts: Live Demo & GitHub */}
      <div className="px-3.5 py-1.5 flex items-center gap-2">
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-98"
          >
            <ExternalLink size={12} />
            <span>Live Demo</span>
          </a>
        )}
        {project.githubUrl && project.githubUrl !== '#' && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1 px-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-[11px] font-semibold flex items-center justify-center gap-1 border border-neutral-300 dark:border-neutral-700 transition-all active:scale-98"
          >
            <Code2 size={12} />
            <span>GitHub</span>
          </a>
        )}
      </div>

      {/* 5. Caption & Tech Stack */}
      <div className="px-3.5 py-0.5 text-xs text-neutral-800 dark:text-neutral-200 leading-snug">
        <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
          {USER_PROFILE.username}
        </span>
        <span className="whitespace-pre-line">
          {isCaptionExpanded
            ? project.caption
            : project.caption.slice(0, 95) + (project.caption.length > 95 ? '...' : '')}
        </span>
        {project.caption.length > 95 && (
          <button
            onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 ml-1 font-medium"
          >
            {isCaptionExpanded ? 'less' : 'more'}
          </button>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1 mt-1 mb-1">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-[9px] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono border border-neutral-200 dark:border-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 6. Comments Preview & Input */}
      <div className="px-3.5 py-0.5">
        {!showComments && comments.length > 0 && (
          <button
            onClick={() => setShowComments(true)}
            className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:underline block py-0.5"
          >
            View all {comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="space-y-1 mt-1 text-xs border-t border-neutral-100 dark:border-neutral-900 pt-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                Comments
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="text-[10px] text-neutral-500 hover:underline"
              >
                Hide
              </button>
            </div>
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-1.5 py-0.5">
                <span className="font-bold text-neutral-900 dark:text-white">{c.user}</span>
                <span className="text-neutral-700 dark:text-neutral-300 flex-1">{c.text}</span>
              </div>
            ))}

            {/* Inline Add Comment */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-900">
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
        )}
      </div>
    </article>
  );
};
