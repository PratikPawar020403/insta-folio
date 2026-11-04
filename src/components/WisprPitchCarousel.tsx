import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WisprPitchCarouselProps {
  pitchId: 'wispr-breathless' | 'wispr-diwali';
  onDoubleTap?: () => void;
}

// Voice-wave SVG graphic
const VoiceWaveGraphic: React.FC<{ color: string }> = ({ color }) => {
  // 21 audio bars creating a dynamic speech waveform
  const bars = [25, 45, 65, 35, 75, 95, 60, 100, 85, 50, 90, 70, 40, 80, 95, 65, 45, 70, 50, 30, 20];

  return (
    <div className="flex items-center justify-center gap-1.5 h-14 my-3 px-4">
      {bars.map((height, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full transition-all duration-300"
          style={{
            height: `${height}%`,
            backgroundColor: color,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
};

export const WisprPitchCarousel: React.FC<WisprPitchCarouselProps> = ({
  pitchId,
  onDoubleTap,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  const isBreathless = pitchId === 'wispr-breathless';

  // POST 1: Navy #0B3D3A & Coral #FF6B4A
  // POST 2: Violet #3B0F6B & Pink #FF7AB6
  const colors = isBreathless
    ? {
        darkBg: '#0B3D3A',
        lightBg: '#FF6B4A',
        darkText: '#0B3D3A',
        lightText: '#FFFFFF',
        accentOnDark: '#FF6B4A',
        accentOnLight: '#0B3D3A',
      }
    : {
        darkBg: '#3B0F6B',
        lightBg: '#FF7AB6',
        darkText: '#3B0F6B',
        lightText: '#FFFFFF',
        accentOnDark: '#FF7AB6',
        accentOnLight: '#3B0F6B',
      };

  const slides = isBreathless
    ? [
        // Slide 1 (Cover) - Navy
        {
          id: 'p1-cover',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              {/* Top small label */}
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  If I ran growth at Wispr Flow India
                </span>
              </div>

              {/* Main Headline */}
              <div className="my-auto py-2">
                <h2
                  className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
                  style={{ color: colors.lightText }}
                >
                  My pitch: Bolega India, tabhi toh aage badhega India.
                </h2>

                {/* Voice-wave graphic on cover */}
                <VoiceWaveGraphic color={colors.accentOnDark} />

                <p
                  className="text-xs sm:text-sm font-medium tracking-wide opacity-90 max-w-xs mx-auto"
                  style={{ color: colors.lightText }}
                >
                  How I'd prove voice keeps up with real Indian speech speed
                </p>
              </div>

              {/* Bottom hint */}
              <div className="pb-2">
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase opacity-75"
                  style={{ color: colors.lightText }}
                >
                  Swipe to read pitch 👉
                </span>
              </div>
            </div>
          ),
        },
        // Slide 2 (The question) - Coral
        {
          id: 'p1-question',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  THE QUESTION
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.darkText }}
                >
                  Every new user wonders if voice can keep up with how fast they really talk.
                </h3>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.darkText }}
                >
                  The core hurdle to voice adoption
                </span>
              </div>
            </div>
          ),
        },
        // Slide 3 (The idea) - Navy
        {
          id: 'p1-idea',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  THE IDEA
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.lightText }}
                >
                  I'd ask Shankar Mahadevan to sing a short stretch of "Breathless" in one breath while Flow writes it live.
                </h3>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.accentOnDark }}
                >
                  The ultimate speed test
                </span>
              </div>
            </div>
          ),
        },
        // Slide 4 (Why him) - Coral
        {
          id: 'p1-why-him',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  WHY HIM
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-base sm:text-lg font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.darkText }}
                >
                  It's one of the best-known one-breath songs. If Flow keeps up with that, it keeps up with you.
                </h3>
                <div
                  className="mt-4 p-3 rounded-xl border border-black/10 bg-black/5 max-w-xs mx-auto"
                >
                  <p
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: colors.darkText }}
                  >
                    Voice on the left, Flow's live text on the right, no edits.
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.darkText }}
                >
                  Unfiltered proof in action
                </span>
              </div>
            </div>
          ),
        },
        // Slide 5 (The challenge) - Navy
        {
          id: 'p1-challenge',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  THE CHALLENGE
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-lg sm:text-xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.lightText }}
                >
                  Then the country joins. 30 seconds, one breath, your pitch, shared with #BolegaIndia.
                </h3>
                <div
                  className="mt-4 inline-block px-4 py-2 rounded-xl border"
                  style={{
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}20`,
                  }}
                >
                  <p
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: colors.accentOnDark }}
                  >
                    The best pitches win Pro scholarships.
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.lightText }}
                >
                  Viral community participation
                </span>
              </div>
            </div>
          ),
        },
        // Slide 6 (What I'd measure) - Coral
        {
          id: 'p1-measure',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-5 sm:p-7 text-center">
              <div className="pt-1">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  WHAT I'D MEASURE
                </span>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs my-auto">
                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    1M
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Reel views
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    5K
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Pitches
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    10%
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Try Flow
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    100
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Scholarships
                  </span>
                </div>
              </div>

              {/* Disclaimer at bottom */}
              <div className="pt-1">
                <p
                  className="text-[9.5px] sm:text-[10.5px] leading-snug opacity-75 max-w-xs mx-auto"
                  style={{ color: colors.darkText }}
                >
                  Pitch concept. I haven't contacted Shankar Mahadevan and no endorsement is implied. I'd test fast-singing accuracy and clear the lyric rights first.
                </p>
              </div>
            </div>
          ),
        },
      ]
    : [
        // POST 2: Violet #3B0F6B & Pink #FF7AB6
        // Slide 1 (Cover) - Violet
        {
          id: 'p2-cover',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  How I'd make Diwali the moment Flow gets personal
                </span>
              </div>

              <div className="my-auto py-2">
                <h2
                  className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
                  style={{ color: colors.lightText }}
                >
                  My pitch: Forward nahi, feel bhejo.
                </h2>

                {/* Voice-wave graphic on cover */}
                <VoiceWaveGraphic color={colors.accentOnDark} />

                <p
                  className="text-xs sm:text-sm font-medium tracking-wide opacity-90 max-w-xs mx-auto"
                  style={{ color: colors.lightText }}
                >
                  Replacing copied festival forwards with genuine voice-crafted notes
                </p>
              </div>

              <div className="pb-2">
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase opacity-75"
                  style={{ color: colors.lightText }}
                >
                  Swipe to read pitch 👉
                </span>
              </div>
            </div>
          ),
        },
        // Slide 2 (The insight) - Pink
        {
          id: 'p2-insight',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  THE INSIGHT
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.darkText }}
                >
                  Diwali wishes became forwards. Nobody remembers them. Everyone remembers a voice that meant it.
                </h3>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.darkText }}
                >
                  The emotional wedge for voice
                </span>
              </div>
            </div>
          ),
        },
        // Slide 3 (The idea) - Violet
        {
          id: 'p2-idea',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  THE IDEA
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-lg sm:text-xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.lightText }}
                >
                  I'd invite Darshan Magdum, the Indian Instagram singer known for his song covers, to sing 3 to 4 Diwali songs, each paired with a wish written by voice with Flow.
                </h3>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.accentOnDark }}
                >
                  Music meets heartfelt voice messaging
                </span>
              </div>
            </div>
          ),
        },
        // Slide 4 (The format) - Pink
        {
          id: 'p2-format',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  THE FORMAT
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.darkText }}
                >
                  4 songs, 4 people.
                </h3>
                <p
                  className="text-lg sm:text-xl font-extrabold mt-2 tracking-tight"
                  style={{ color: colors.darkText }}
                >
                  Maa/Papa, Dost, Bhai/Behen, Door ke apne.
                </p>

                {/* 4 Cards visual */}
                <div className="grid grid-cols-2 gap-2 mt-4 max-w-xs mx-auto">
                  {['Maa / Papa', 'Dost', 'Bhai / Behen', 'Door ke apne'].map((name) => (
                    <div
                      key={name}
                      className="p-2 rounded-lg bg-black/10 border border-black/10 text-xs font-bold"
                      style={{ color: colors.darkText }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.darkText }}
                >
                  Relatable to every single Indian family
                </span>
              </div>
            </div>
          ),
        },
        // Slide 5 (The pledge) - Violet
        {
          id: 'p2-pledge',
          bg: colors.darkBg,
          isDark: true,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 text-center">
              <div className="pt-2">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.accentOnDark,
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}15`,
                  }}
                >
                  THE PLEDGE
                </span>
              </div>

              <div className="my-auto py-2">
                <h3
                  className="text-lg sm:text-xl font-black tracking-tight leading-snug max-w-sm mx-auto"
                  style={{ color: colors.lightText }}
                >
                  Speak your wish in Hinglish, send it to one person on WhatsApp, share with #ForwardNahiFeelBhejo.
                </h3>
                <div
                  className="mt-4 inline-block px-4 py-2 rounded-xl border"
                  style={{
                    borderColor: `${colors.accentOnDark}40`,
                    backgroundColor: `${colors.accentOnDark}20`,
                  }}
                >
                  <p
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: colors.accentOnDark }}
                  >
                    No forwards this Diwali.
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider opacity-75"
                  style={{ color: colors.lightText }}
                >
                  Viral behavioral pledge
                </span>
              </div>
            </div>
          ),
        },
        // Slide 6 (What I'd measure) - Pink
        {
          id: 'p2-measure',
          bg: colors.lightBg,
          isDark: false,
          content: (
            <div className="flex flex-col items-center justify-between h-full p-5 sm:p-7 text-center">
              <div className="pt-1">
                <span
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: colors.darkText,
                    borderColor: `${colors.darkText}30`,
                    backgroundColor: `${colors.darkText}10`,
                  }}
                >
                  WHAT I'D MEASURE
                </span>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs my-auto">
                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    20K
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Wishes shared
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    4
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Songs
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    25%
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Senders install
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/10 border border-black/10 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: colors.darkText }}>
                    1 in 5
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.darkText }}>
                    Back next fest
                  </span>
                </div>
              </div>

              {/* Disclaimer at bottom */}
              <div className="pt-1">
                <p
                  className="text-[9.5px] sm:text-[10.5px] leading-snug opacity-75 max-w-xs mx-auto"
                  style={{ color: colors.darkText }}
                >
                  Pitch concept. I haven't contacted Darshan Magdum and no endorsement is implied. Song rights to be cleared.
                </p>
              </div>
            </div>
          ),
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
    const threshold = 40;

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Double tap to like
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (onDoubleTap) onDoubleTap();
    }
    lastTapRef.current = now;
  };

  return (
    <div className="relative w-full aspect-square overflow-hidden select-none group">
      {/* 1/6 Slide Counter Badge (Top Right, Instagram Style) */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold shadow-md pointer-events-none">
        {currentSlide + 1}/{totalSlides}
      </div>

      {/* Swipeable Slides Track */}
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
            className="w-full h-full flex-shrink-0 relative flex flex-col justify-center"
            style={{ backgroundColor: slide.bg }}
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
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md shadow-lg flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 transition-all"
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
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md shadow-lg flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 transition-all"
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
                ? 'w-2 h-2 bg-white scale-110 shadow-sm'
                : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
