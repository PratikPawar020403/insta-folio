import React, { useState } from 'react';
import { USER_PROFILE, INITIAL_STORIES, INITIAL_POSTS } from '../data/portfolioData';
import type { Post } from '../types';
import {
  CheckCircle2,
  Grid,
  Bookmark,
  ExternalLink,
  Mail,
  GraduationCap,
  Layers,
  ChevronLeft,
  Heart,
  MessageCircle,
  Sparkles,
  Check,
} from 'lucide-react';
import { PostCard } from './PostCard';

interface ProfileTabProps {
  onOpenStory: (index: number) => void;
  onOpenContact: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  onOpenStory,
  onOpenContact,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'grid' | 'saved'>('grid');
  // Selected post for full-view modal/detail view
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [copiedProfile, setCopiedProfile] = useState(false);

  const handleShareProfile = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedProfile(true);
    setTimeout(() => setCopiedProfile(false), 2000);
  };

  // Exactly post 3 and post 4 from the home feed
  const profilePosts: Post[] = [INITIAL_POSTS[2], INITIAL_POSTS[3]];

  // If a post is tapped in the grid, render its full interactive card
  if (selectedPost) {
    return (
      <div className="w-full bg-white dark:bg-black min-h-screen pb-16">
        {/* Sticky Header with Back Button */}
        <div className="sticky top-14 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPost(null)}
              className="p-1.5 -ml-1 rounded-full text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Back to profile grid"
            >
              <ChevronLeft size={22} />
            </button>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold tracking-wider block leading-none">
                Post
              </span>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                {selectedPost.author.username}
              </h3>
            </div>
          </div>
        </div>

        {/* Full Interactive Post Card */}
        <div className="max-w-xl mx-auto pt-2">
          <PostCard
            post={selectedPost}
            onSharePost={onOpenContact}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* Profile Header Details */}
      <div className="px-4 pt-4 pb-2">
        {/* Instagram Username Handle */}
        <div className="flex items-center gap-1.5 mb-3.5">
          <h2 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white tracking-tight">
            {USER_PROFILE.username}
          </h2>
          <CheckCircle2 size={16} className="text-blue-500 fill-blue-500" />
        </div>

        {/* Top Profile Bar (Avatar + Stats) */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Avatar with Story Gradient Ring */}
          <div
            onClick={() => onOpenStory(0)}
            className="relative cursor-pointer p-[2.5px] rounded-full story-gradient hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 rounded-full p-[2px] bg-white dark:bg-black">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.fullName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs shadow-md border-2 border-white dark:border-black">
              <GraduationCap size={12} />
            </span>
          </div>

          {/* Stats: Posts (2), Followers, Following */}
          <div className="flex-1 flex items-center justify-around text-center">
            <div>
              <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {profilePosts.length}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Posts</p>
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {USER_PROFILE.followersCount}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Followers</p>
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {typeof USER_PROFILE.followingCount === 'number'
                  ? USER_PROFILE.followingCount.toLocaleString()
                  : USER_PROFILE.followingCount}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Following</p>
            </div>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              {USER_PROFILE.fullName}
            </h3>
            <CheckCircle2 size={13} className="text-blue-500 fill-blue-500" />
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
            {USER_PROFILE.bio}
          </p>

          <div className="flex flex-col gap-1 pt-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={USER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink size={12} />
                <span>github.com/PratikPawar020403</span>
              </a>
              <a
                href={USER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink size={12} />
                <span>LinkedIn</span>
              </a>
            </div>
            <a
              href={USER_PROFILE.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <ExternalLink size={12} />
              <span>psp-02-portfolio.netlify.app</span>
            </a>
          </div>
        </div>

        {/* Profile Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={onOpenContact}
            className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Mail size={13} />
            <span>Contact / Hire Me</span>
          </button>
          <button
            onClick={handleShareProfile}
            className={`flex-1 py-1.5 rounded-lg font-semibold text-xs border transition-all active:scale-98 flex items-center justify-center gap-1.5 ${
              copiedProfile
                ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-600 dark:border-emerald-600 shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-700'
            }`}
          >
            {copiedProfile ? (
              <>
                <Check size={13} className="text-white" />
                <span>Link Copied</span>
              </>
            ) : (
              <span>Share Profile</span>
            )}
          </button>
        </div>

        {/* Story Highlights Bar (Education journey) */}
        <div className="mt-5 pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
            Education Story Highlights
          </span>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {INITIAL_STORIES.map((story, idx) => (
              <div
                key={story.id}
                onClick={() => onOpenStory(idx)}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full p-[2px] border-2 border-neutral-300 dark:border-neutral-700 group-hover:border-blue-500 transition-colors">
                  <div className="w-full h-full rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-lg overflow-hidden">
                    <img
                      src={story.avatar}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-neutral-700 dark:text-neutral-300 mt-1 max-w-[56px] truncate text-center">
                  {story.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Tabs: Posts Grid vs Saved */}
      <div className="mt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center">
        <button
          onClick={() => setActiveSubTab('grid')}
          className={`flex-1 py-3 flex items-center justify-center transition-colors border-t-2 ${
            activeSubTab === 'grid'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400'
          }`}
          aria-label="Grid view"
        >
          <Grid size={20} />
        </button>
        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex-1 py-3 flex items-center justify-center transition-colors border-t-2 ${
            activeSubTab === 'saved'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
              : 'border-transparent text-neutral-400'
          }`}
          aria-label="Saved view"
        >
          <Bookmark size={20} />
        </button>
      </div>

      {/* Profile Content */}
      {activeSubTab === 'grid' ? (
        /* Only Show Post 3 and Post 4 from Home Feed */
        <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
          {profilePosts.map((post, index) => {
            const isBreathless = post.id === 'post-wispr-breathless';

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`relative aspect-square cursor-pointer overflow-hidden group select-none flex flex-col justify-between p-2.5 sm:p-3 text-white transition-all active:scale-[0.98] ${
                  isBreathless
                    ? 'bg-[#0B3D3A] hover:bg-[#0e4844]'
                    : 'bg-[#3B0F6B] hover:bg-[#4a1386]'
                }`}
              >
                {/* Top Badge & Carousel Icon */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      isBreathless
                        ? 'text-[#FF6B4A] border-[#FF6B4A]/40 bg-[#FF6B4A]/10'
                        : 'text-[#FF7AB6] border-[#FF7AB6]/40 bg-[#FF7AB6]/10'
                    }`}
                  >
                    Wispr Flow
                  </span>
                  <div className="p-0.5 rounded bg-black/40 text-white">
                    <Layers size={11} />
                  </div>
                </div>

                {/* Center Content */}
                <div className="my-auto py-1 text-center">
                  {isBreathless ? (
                    <>
                      <div className="flex items-center justify-center gap-0.5 h-4 mb-1">
                        {[40, 70, 100, 60, 90, 50, 80].map((h, i) => (
                          <span
                            key={i}
                            className="w-0.5 sm:w-1 bg-[#FF6B4A] rounded-full"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <h4 className="text-[11px] sm:text-xs font-black leading-tight line-clamp-2">
                        Bolega India
                      </h4>
                      <p className="text-[9px] text-neutral-300 line-clamp-1 mt-0.5">
                        tabhi toh aage badhega India
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center mb-1 text-[#FF7AB6]">
                        <Sparkles size={14} />
                      </div>
                      <h4 className="text-[11px] sm:text-xs font-black leading-tight line-clamp-2">
                        Diwali With Flow
                      </h4>
                      <p className="text-[9px] text-neutral-300 line-clamp-1 mt-0.5">
                        Forward nahi, feel bhejo
                      </p>
                    </>
                  )}
                </div>

                {/* Bottom Tag */}
                <div className="text-[9px] text-neutral-300 font-medium truncate">
                  Post {index + 3} • {isBreathless ? 'Shankar Mahadevan' : 'Darshan Magdum'}
                </div>

                {/* Instagram Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 text-white z-20 pointer-events-none">
                  <div className="flex items-center gap-1 font-bold text-xs">
                    <Heart size={16} className="fill-white" />
                    <span>{post.likesCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-xs">
                    <MessageCircle size={16} className="fill-white" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Saved Sub-Tab Empty State */
        <div className="py-14 px-4 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex items-center justify-center mx-auto mb-3 text-neutral-400">
            <Bookmark size={22} />
          </div>
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
            Save posts
          </h4>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
            Save posts from the feed to view them quickly in your saved collection.
          </p>
        </div>
      )}
    </div>
  );
};
