import React from 'react';
import { Home, Search } from 'lucide-react';
import { InstagramDirectIcon } from './InstagramDirectIcon';
import { USER_PROFILE } from '../data/portfolioData';

export type TabType = 'home' | 'search' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.6)] transition-colors duration-200 select-none">
      <div className="max-w-xl mx-auto h-14 flex items-center justify-around px-3 text-neutral-800 dark:text-neutral-200 pb-[env(safe-area-inset-bottom,0px)]">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-transform active:scale-90 group focus:outline-none"
          aria-label="Home Feed"
        >
          <Home
            size={24}
            className={`transition-all ${
              activeTab === 'home'
                ? 'stroke-[2.5] text-neutral-900 dark:text-white scale-110'
                : 'stroke-[1.75] text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          />
          <span
            className={`text-[10px] mt-0.5 transition-colors ${
              activeTab === 'home'
                ? 'font-bold text-neutral-900 dark:text-white'
                : 'font-normal text-neutral-500'
            }`}
          >
            Home
          </span>
        </button>

        {/* Tab 2: Search */}
        <button
          onClick={() => onTabChange('search')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-transform active:scale-90 group focus:outline-none"
          aria-label="Search and Explore Projects"
        >
          <Search
            size={24}
            className={`transition-all ${
              activeTab === 'search'
                ? 'stroke-[2.8] text-neutral-900 dark:text-white scale-110'
                : 'stroke-[1.75] text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          />
          <span
            className={`text-[10px] mt-0.5 transition-colors ${
              activeTab === 'search'
                ? 'font-bold text-neutral-900 dark:text-white'
                : 'font-normal text-neutral-500'
            }`}
          >
            Search
          </span>
        </button>

        {/* Tab 3: Messages (With red badge '1') */}
        <button
          onClick={() => onTabChange('messages')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-transform active:scale-90 group focus:outline-none relative"
          aria-label="Messages and Contact Inbox"
        >
          <div className="relative">
            <InstagramDirectIcon
              size={24}
              strokeWidth={activeTab === 'messages' ? 2.5 : 1.9}
              className={`transition-all ${
                activeTab === 'messages'
                  ? 'text-neutral-900 dark:text-white scale-110'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            />
            {/* Red badge '1' */}
            <span className="absolute -top-1.5 -right-2 text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center ring-2 ring-white dark:ring-black">
              1
            </span>
          </div>
          <span
            className={`text-[10px] mt-0.5 transition-colors ${
              activeTab === 'messages'
                ? 'font-bold text-neutral-900 dark:text-white'
                : 'font-normal text-neutral-500'
            }`}
          >
            Messages
          </span>
        </button>

        {/* Tab 4: Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-transform active:scale-90 group focus:outline-none"
          aria-label="Personal Profile"
        >
          <div
            className={`w-6 h-6 rounded-full overflow-hidden transition-all p-[1.5px] ${
              activeTab === 'profile'
                ? 'story-gradient ring-2 ring-blue-500/50 scale-110'
                : 'border border-neutral-300 dark:border-neutral-700'
            }`}
          >
            <img
              src={USER_PROFILE.avatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span
            className={`text-[10px] mt-0.5 transition-colors ${
              activeTab === 'profile'
                ? 'font-bold text-neutral-900 dark:text-white'
                : 'font-normal text-neutral-500'
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
