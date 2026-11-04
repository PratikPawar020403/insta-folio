import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Code2, Sparkles, Terminal, Rocket } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';

interface AboutMeCarouselProps {
  onDoubleTap?: () => void;
}

export const AboutMeCarousel: React.FC<AboutMeCarouselProps> = ({ onDoubleTap }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  const slides = [
    {
      id: 'intro',
      tag: 'INTRO SLIDE',
      title: "Hi, I'm Pratik 👋",
      subtitle: 'MSc IT Graduate & Full-Stack Developer',
      icon: Terminal,
      content: (
        <div className="flex flex-col items-center text-center p-6 justify-center h-full">
          {/* Avatar with glowing ring */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-xl animate-pulse">
              <img
                src={USER_PROFILE.avatar}
                alt="Pratik"
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-900"
              />
            </div>
            <span className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full text-xs shadow-md">
              <Sparkles size={14} />
            </span>
          </div>

          <span className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/20 mb-2">
            Placeholder • Intro Slide
          </span>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Pratik
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-medium mt-1">
            MSc IT • Computer Science Graduate • Full-Stack Builder
          </p>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mt-3 leading-relaxed">
            Welcome to my instafolio developer portfolio! Passionate about architecting scalable systems, clean UI/UX, and robust engineering.
          </p>

          {/* Quick tech pill previews */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-xs">
            {['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 flex items-center gap-1 animate-bounce">
            <span>Swipe for more</span>
            <ChevronRight size={14} />
          </div>
        </div>
      ),
      bgGradient: 'from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900',
    },
    {
      id: 'tech-stack',
      tag: 'TECH & SKILLS',
      title: 'What I Build With ⚡',
      subtitle: 'Modern Engineering Stack',
      icon: Code2,
      content: (
        <div className="flex flex-col p-6 justify-center h-full">
          <div className="text-center mb-4">
            <span className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
              Slide 2 of 3 • Craft & Tooling
            </span>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white mt-2">
              Engineering Expertise
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              End-to-end development with high standards for security & UX
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full text-left">
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 shadow-sm">
              <span className="text-lg">🎨</span>
              <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">Frontend</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                React, Next.js, TypeScript, Tailwind, Responsive UI, Micro-interactions
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 shadow-sm">
              <span className="text-lg">⚙️</span>
              <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">Backend & APIs</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                Node.js, Express, REST, GraphQL, Auth, Security best practices
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 shadow-sm">
              <span className="text-lg">🗄️</span>
              <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">Databases</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                PostgreSQL, MongoDB, MySQL, Redis, Schema Design
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 shadow-sm">
              <span className="text-lg">☁️</span>
              <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">DevOps & Tools</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                Docker, Git, CI/CD, Cloud Hosting, Testing, Linux
              </p>
            </div>
          </div>
        </div>
      ),
      bgGradient: 'from-purple-500/5 via-neutral-100 to-pink-500/5 dark:from-neutral-950 dark:to-neutral-900',
    },
    {
      id: 'journey-values',
      tag: 'PHILOSOPHY & VALUES',
      title: 'How I Work 💡',
      subtitle: 'Principles that guide my code',
      icon: Rocket,
      content: (
        <div className="flex flex-col p-6 justify-center h-full text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 mx-auto mb-2">
            Slide 3 of 3 • Core Principles
          </span>
          <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
            Quality Over Shortcuts
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            Security, performance, and delightful user experience at every turn
          </p>

          <div className="space-y-2.5 max-w-sm mx-auto w-full text-left">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-base mt-0.5">🛡️</span>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Security-First</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Input validation, sanitization, token hygiene, and defense against OWASP top 10.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-base mt-0.5">⚡</span>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Performance-Obsessed</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Sub-second interactions, optimized assets, smooth animations, and lean bundles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60">
              <span className="text-base mt-0.5">🤝</span>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">Team Player</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Clear documentation, proactive communication, and thorough code reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      bgGradient: 'from-emerald-500/5 via-neutral-100 to-teal-500/5 dark:from-neutral-950 dark:to-neutral-900',
    },
  ];

  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40; // minimum swipe distance

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Double tap to like on mobile/desktop
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (onDoubleTap) onDoubleTap();
    }
    lastTapRef.current = now;
  };

  return (
    <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[370px] max-h-[44dvh] bg-neutral-100 dark:bg-neutral-900 overflow-hidden select-none group">
      {/* Slide Counter Badge (Top Right, Instagram Style) */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold shadow-md pointer-events-none">
        {currentSlide + 1}/{totalSlides}
      </div>

      {/* Swipeable Container */}
      <div
        className="w-full h-full flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 bg-gradient-to-b ${slide.bgGradient} relative flex flex-col justify-center`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Navigation Arrows for Desktop */}
      {currentSlide > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-100 opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {currentSlide < totalSlides - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-100 opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Instagram Dot Pagination Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`transition-all duration-200 rounded-full ${
              idx === currentSlide
                ? 'w-2 h-2 bg-blue-500 scale-110'
                : 'w-1.5 h-1.5 bg-neutral-400/60 dark:bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
