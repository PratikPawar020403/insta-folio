import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { EducationStory } from '../types';
import { X, Pause, Play, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { InstagramDirectIcon } from './InstagramDirectIcon';
import confetti from 'canvas-confetti';

interface StoryModalProps {
  stories: EducationStory[];
  initialStoryIndex: number;
  onClose: () => void;
  onMarkViewed: (storyId: string) => void;
}

const STORY_DURATION = 5000; // 5 seconds per slide

export const StoryModal: React.FC<StoryModalProps> = ({
  stories,
  initialStoryIndex,
  onClose,
  onMarkViewed,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(() =>
    Math.max(0, Math.min(initialStoryIndex, Math.max(0, stories.length - 1)))
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [hasLikedStory, setHasLikedStory] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeStory = stories[currentStoryIndex] || stories[0];
  const slides = activeStory?.slides || [];
  const totalSlides = slides.length || 1;
  const safeSlideIndex = Math.max(0, Math.min(currentSlideIndex, totalSlides - 1));
  const activeSlide = slides[safeSlideIndex] || slides[0];

  // Reset scroll position on every slide/story change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [safeSlideIndex, currentStoryIndex]);

  // Mark current story as viewed (only if not already marked to prevent loop)
  useEffect(() => {
    if (activeStory && !activeStory.viewed) {
      onMarkViewed(activeStory.id);
    }
  }, [activeStory, onMarkViewed]);

  // Navigate to Next Slide or Next Story
  const handleNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      // Go to next slide in same story
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    } else if (currentStoryIndex < stories.length - 1) {
      // Advance to next story
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    } else {
      // End of all stories -> close
      onClose();
    }
  }, [currentSlideIndex, totalSlides, currentStoryIndex, stories.length, onClose]);

  // Navigate to Previous Slide or Previous Story
  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      // Go to previous slide in same story
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    } else if (currentStoryIndex > 0) {
      // Go to previous story's last slide
      const prevStory = stories[currentStoryIndex - 1];
      setCurrentStoryIndex((prev) => prev - 1);
      setCurrentSlideIndex(Math.max(0, (prevStory?.slides.length || 1) - 1));
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    } else {
      // Already at first slide of first story -> reset progress
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    }
  }, [currentSlideIndex, currentStoryIndex, stories]);

  // Story Progress Timer using requestAnimationFrame
  useEffect(() => {
    if (isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp - (pausedProgressRef.current / 100) * STORY_DURATION;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentPct = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(currentPct);
      pausedProgressRef.current = currentPct;

      if (currentPct >= 100) {
        handleNext();
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, handleNext, currentSlideIndex, currentStoryIndex]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, onClose]);

  // Handle pointer down / up to pause and resume (Press & Hold feature)
  const handleHoldStart = () => {
    setIsPaused(true);
  };

  const handleHoldEnd = () => {
    setIsPaused(false);
  };

  // Quick reaction trigger
  const handleReaction = (_emoji: string) => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.85, x: 0.5 },
    });
    setHasLikedStory(true);
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 900);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.8 },
    });
    setReplyText('');
    alert(`Reply sent: "${replyText}" (Thanks for reaching out!)`);
  };

  if (!activeStory || !activeSlide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all">
      {/* Desktop Side Navigation Chevrons */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm z-50 active:scale-95"
        aria-label="Previous story slide"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm z-50 active:scale-95"
        aria-label="Next story slide"
      >
        <ChevronRight size={26} />
      </button>

      {/* Story Mobile/App Frame Container */}
      <div className="relative w-full h-full md:max-w-md md:h-[92vh] md:max-h-[850px] md:rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-neutral-900 border border-neutral-800">
        {/* Background Visual Texture */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${activeSlide.gradient || 'from-neutral-900 via-neutral-950 to-black'} opacity-90 transition-all duration-500`}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Floating Heart Animation when user reacts */}
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            <Heart size={100} className="fill-red-500 text-red-500 animate-heart-pop" />
          </div>
        )}

        {/* Top Progress Bars (Segmented by number of slides in story) */}
        <div className="relative z-30 pt-3 px-3 flex gap-1.5 w-full">
          {Array.from({ length: totalSlides }).map((_, index) => {
            let widthPct = 0;
            if (index < safeSlideIndex) {
              widthPct = 100;
            } else if (index === safeSlideIndex) {
              widthPct = progress;
            }
            return (
              <div
                key={index}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-75"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Header */}
        <div className="relative z-30 px-3 py-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={activeStory.avatar}
                alt={activeStory.username || 'Story user'}
                className="w-9 h-9 rounded-full object-cover border-2 border-white/80 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 text-xs">
                {activeSlide.emoji || '🎓'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm drop-shadow-sm">
                  {activeStory.username || 'pratik_pawar_0204'}
                </span>
                <span className="text-white/70 text-xs">•</span>
                <span className="text-white/80 text-xs font-light">
                  {activeStory.timestamp || 'Just now'}
                </span>
              </div>
              <p className="text-[11px] text-white/90 font-medium tracking-wide truncate max-w-[200px] sm:max-w-[260px]">
                {activeSlide.slideType === 'photo'
                  ? (activeSlide.degreeOrGrade || activeSlide.subtitle || activeStory.title)
                  : (activeStory.title || activeSlide.title)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title={isPaused ? 'Resume' : 'Pause'}
              aria-label={isPaused ? 'Resume story' : 'Pause story'}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Close story"
              aria-label="Close story"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Interactive Tap Zones & Press-to-Hold Area */}
        <div
          ref={scrollContainerRef}
          className={`relative z-20 flex-1 min-h-0 w-full flex flex-col text-white select-none ${
            activeSlide.slideType === 'photo'
              ? 'p-0 overflow-hidden justify-center'
              : 'p-5 overflow-y-auto justify-between no-scrollbar'
          }`}
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
        >
          {/* Transparent Tap Hotspots: Left 35% (Back), Right 65% (Next) */}
          <div className="absolute inset-0 flex z-10 pointer-events-auto">
            <div
              className="w-[35%] h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title="Tap left to go back"
            />
            <div
              className="w-[65%] h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title="Tap right to advance"
            />
          </div>

          {/* Story Content Presentation */}
          <div className="relative z-0 pointer-events-none flex flex-col h-full min-h-0 justify-between">
            {activeSlide.slideType === 'photo' && activeSlide.image ? (
              /* PHOTO SLIDE: Completely visible collage, 100% unobstructed, no boxes covering faces */
              <div className="relative w-full h-full min-h-0 flex-1 flex items-center justify-center bg-black overflow-hidden pointer-events-none p-1">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title || 'Story photo'}
                  className="max-h-full max-w-full w-auto h-auto object-contain select-none"
                />
              </div>
            ) : (
              /* TEXT / INFORMATION SLIDE: Clean text directly on screen, NO boxes */
              <div className="relative z-0 pointer-events-none flex flex-col h-full justify-between py-1 px-1">
                {/* Top Title & Context */}
                <div className="mb-1">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] leading-tight">
                    {activeSlide.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-white/85 mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                    {activeSlide.institution} • {activeSlide.period}
                  </p>
                </div>

                {/* Center Content: Pure Text directly on screen, NO bounding boxes */}
                <div className="my-auto py-1 space-y-2.5">
                  {activeSlide.paragraphs && activeSlide.paragraphs.length > 0 ? (
                    activeSlide.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-xs sm:text-[14px] text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] tracking-wide"
                      >
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs sm:text-[14px] text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] tracking-wide">
                      {activeSlide.description}
                    </p>
                  )}

                  {/* Clean Scores / Grades Stickers directly on screen (Slide 3) */}
                  {activeSlide.scores && activeSlide.scores.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] block mb-1.5">
                        {(activeSlide.badge || '').includes('10th')
                          ? 'SSC Board Examination Scores'
                          : (activeSlide.badge || '').includes('12th')
                          ? 'HSC Board Examination Scores'
                          : 'Academic Results & Subject Grades'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSlide.scores.map((sc, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                          >
                            <span className="text-[11px] text-white/80 font-normal">{sc?.subject}:</span>
                            <span className="text-[11px] font-bold text-white">{sc?.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Empty footer spacer */}
                <div className="h-0.5" />
              </div>
            )}
          </div>
        </div>

        {/* Story Bottom Reply Bar & Quick Reactions */}
        <div className="relative z-30 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          {/* Photo Slide Context Caption: Pure text, no box, positioned in bottom bar area so it NEVER overlaps collage */}
          {activeSlide.slideType === 'photo' && (
            <p className="text-center text-[11px] sm:text-xs font-semibold text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] mb-2 px-3 tracking-wide truncate">
              {activeSlide.degreeOrGrade || activeSlide.subtitle}
            </p>
          )}

          {/* Quick Reaction Pill Buttons */}
          <div className="flex items-center justify-around mb-2.5 px-2">
            {['❤️', '🔥', '👏', '🎓', '🚀'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="text-xl p-1.5 rounded-full hover:scale-125 active:scale-95 transition-transform"
                title={`React with ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${activeStory.username}...`}
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 text-xs rounded-full py-2.5 pl-4 pr-10 border border-white/20 focus:outline-none focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-30 transition-opacity"
              >
                <InstagramDirectIcon size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Like Heart Button */}
            <button
              type="button"
              onClick={() => handleReaction('❤️')}
              className={`p-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-90 ${
                hasLikedStory ? 'text-red-500 fill-red-500' : ''
              }`}
            >
              <Heart size={18} className={hasLikedStory ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
