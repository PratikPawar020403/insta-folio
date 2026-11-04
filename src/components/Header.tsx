import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onReplayIntro,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Instafolio Wordmark Logo */}
        <div
          onClick={onReplayIntro}
          className="flex items-center cursor-pointer group select-none"
          title="Click to replay voice intro"
        >
          <span className="font-serif italic text-2xl sm:text-[26px] tracking-tight font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent group-hover:opacity-90">
            instafolio
          </span>
        </div>

        {/* Right Action: Theme Toggle */}
        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
