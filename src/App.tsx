import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StoryBar } from './components/StoryBar';
import { StoryModal } from './components/StoryModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PostCard } from './components/PostCard';
import { BottomNav, type TabType } from './components/BottomNav';
import { SearchExplore } from './components/SearchExplore';
import { ProfileTab } from './components/ProfileTab';
import { MessagesPage } from './components/MessagesPage';
import { VoiceIntroOverlay } from './components/VoiceIntroOverlay';
import { INITIAL_STORIES, INITIAL_POSTS } from './data/portfolioData';
import type { EducationStory, Post } from './types';

export function App() {
  const [stories, setStories] = useState<EducationStory[]>(INITIAL_STORIES);
  const [posts] = useState<Post[]>(INITIAL_POSTS);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [prevTab, setPrevTab] = useState<TabType>('home');
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#intro') return true;
      return sessionStorage.getItem('has_seen_intro') !== 'true';
    }
    return true;
  });

  // Listen for #intro in hash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#intro') {
        setShowIntro(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('has_seen_intro', 'true');
    setShowIntro(false);
    if (window.location.hash === '#intro') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Handle Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Mark story as viewed safely without triggering cascading re-renders
  const handleMarkViewed = useCallback((storyId: string) => {
    setStories((prev) => {
      const target = prev.find((s) => s.id === storyId);
      if (target?.viewed) return prev; // No-op if already marked viewed
      return prev.map((s) => (s.id === storyId ? { ...s, viewed: true } : s));
    });
  }, []);

  const handleTabChange = (tab: TabType) => {
    if (activeTab !== tab && tab !== 'messages') {
      setPrevTab(activeTab);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenMessages = () => {
    setPrevTab(activeTab);
    setActiveTab('messages');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromMessages = () => {
    setActiveTab(prevTab === 'messages' ? 'home' : prevTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {showIntro && <VoiceIntroOverlay onComplete={handleIntroComplete} />}

      <div className="portfolio-app-root min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200 pb-20">
        {/* Instagram Header (Hidden on full-page Messages screen as it has its own DM header) */}
        {activeTab !== 'messages' && (
          <Header
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onReplayIntro={handleReplayIntro}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-xl mx-auto">
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="animate-in fade-in duration-200">
              {/* Story Bar: School -> Class 12 -> BSc CS -> MSc IT */}
              <StoryBar
                stories={stories}
                onSelectStory={(idx) => setActiveStoryIndex(idx)}
                onOpenMyStory={() => setActiveStoryIndex(0)}
              />

              {/* Feed Posts */}
              <div className="w-full">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onSharePost={handleOpenMessages}
                  />
                ))}
              </div>

              {/* Feed End Suffix */}
              <div className="py-8 text-center text-xs text-neutral-400 dark:text-neutral-600 flex flex-col items-center justify-center gap-1.5">
                <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-sm">
                  ✨
                </div>
                <p className="font-semibold text-neutral-600 dark:text-neutral-400">
                  You're all caught up!
                </p>
                <p className="text-[11px] text-neutral-400">
                  Explore my projects in the Search tab or tap education stories above.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SEARCH (SEAMLESS PROJECT FEED & EXPLORE) */}
          {activeTab === 'search' && (
            <div className="animate-in fade-in duration-200">
              <SearchExplore onShare={handleOpenMessages} />
            </div>
          )}

          {/* TAB 3: FULL-PAGE MESSAGES (INSTAGRAM DM INBOX) */}
          {activeTab === 'messages' && (
            <div className="animate-in fade-in duration-200">
              <MessagesPage onBack={handleBackFromMessages} />
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-200">
              <ProfileTab
                onOpenStory={(idx) => setActiveStoryIndex(idx)}
                onOpenContact={handleOpenMessages}
              />
            </div>
          )}
        </main>

        {/* Full-Screen Education Story Viewer Modal */}
        {activeStoryIndex !== null && (
          <ErrorBoundary
            fallback={
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white p-6">
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold">Unable to load story</p>
                  <button
                    onClick={() => setActiveStoryIndex(null)}
                    className="px-4 py-2 bg-white text-black font-medium rounded-full text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            }
          >
            <StoryModal
              key={activeStoryIndex}
              stories={stories}
              initialStoryIndex={activeStoryIndex}
              onClose={() => setActiveStoryIndex(null)}
              onMarkViewed={handleMarkViewed}
            />
          </ErrorBoundary>
        )}
      </div>

      {/* 4-Tab Bottom Navigation Bar: Hidden during full-screen story viewing */}
      {activeStoryIndex === null && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </>
  );
}

export default App;
