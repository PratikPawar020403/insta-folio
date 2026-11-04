import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PostImageCarouselProps {
  images: string[];
  onDoubleTap?: () => void;
}

export const PostImageCarousel: React.FC<PostImageCarouselProps> = ({
  images,
  onDoubleTap,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  const totalSlides = images.length;

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;

    if (diff > threshold) {
      // Swiped left -> next
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (diff < -threshold) {
      // Swiped right -> prev
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Double tap detection
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      if (onDoubleTap) onDoubleTap();
    }
    lastTapRef.current = now;
  };

  return (
    <div
      className="relative w-full aspect-[3/4] bg-neutral-950 overflow-hidden select-none group"
      onClick={handleTap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full h-full relative flex items-center justify-center bg-neutral-950"
          >
            <img
              src={imgSrc}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-contain"
              loading={idx === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Top Right Counter Pill (1/3) */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm border border-white/10 tracking-wide">
          {currentSlide + 1}/{totalSlides}
        </span>
      </div>

      {/* Left Chevron Button */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Right Chevron Button */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all shadow-md backdrop-blur-sm border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Bottom Pagination Dots */}
      {totalSlides > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
          {images.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`transition-all duration-200 rounded-full ${
                dotIdx === currentSlide
                  ? 'w-2 h-2 bg-blue-500 shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
