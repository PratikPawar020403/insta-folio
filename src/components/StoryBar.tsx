import React from 'react';
import type { EducationStory } from '../types';
import { Plus } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';

interface StoryBarProps {
  stories: EducationStory[];
  onSelectStory: (index: number) => void;
  onOpenMyStory?: () => void;
}

export const StoryBar: React.FC<StoryBarProps> = ({
  stories,
  onSelectStory,
  onOpenMyStory,
}) => {
  return (
    <div className="w-full bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800/80 py-3 transition-colors duration-200">
      <div className="max-w-xl mx-auto px-4 overflow-x-auto no-scrollbar flex items-center gap-4 scroll-smooth">
        {/* "Your Story" Item */}
        <button
          type="button"
          onClick={onOpenMyStory || (() => onSelectStory(0))}
          className="flex flex-col items-center flex-shrink-0 cursor-pointer group focus:outline-none"
          aria-label="Open your story"
        >
          <div className="relative p-[2px] rounded-full active:scale-95 transition-transform">
            <div className="w-[66px] h-[66px] rounded-full p-[2px] bg-neutral-200 dark:bg-neutral-800">
              <img
                src={USER_PROFILE.avatar}
                alt="Your Story"
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-white dark:border-black shadow-sm group-hover:bg-blue-600 transition-colors">
              <Plus size={12} strokeWidth={3} />
            </div>
          </div>
          <span className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400 mt-1 max-w-[72px] truncate text-center">
            Your story
          </span>
        </button>

        {/* Education Stories: School -> Class 12 -> BSc CS -> MSc IT */}
        {stories.map((story, index) => {
          const isViewed = story.viewed;
          return (
            <button
              key={story.id}
              onClick={() => onSelectStory(index)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group focus:outline-none"
              aria-label={`Open story: ${story.title}`}
            >
              <div className="relative active:scale-95 transition-transform duration-150">
                {/* Gradient Ring (Unviewed) or Muted Ring (Viewed) */}
                <div
                  className={`w-[68px] h-[68px] rounded-full p-[2.5px] transition-all duration-300 ${
                    isViewed
                      ? 'bg-neutral-300 dark:bg-neutral-700'
                      : 'story-gradient hover:rotate-6'
                  }`}
                >
                  <div className="w-full h-full rounded-full p-[2px] bg-white dark:bg-black">
                    <img
                      src={story.avatar}
                      alt={story.title}
                      className="w-full h-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Educational Emoji Tag */}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[10px] shadow-sm">
                  {story.slides[0]?.emoji || '🎓'}
                </div>
              </div>

              {/* Story Label */}
              <span className="text-[11px] font-normal text-neutral-800 dark:text-neutral-200 mt-1 max-w-[74px] truncate text-center group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                {story.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
