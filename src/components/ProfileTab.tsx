import React, { useState } from 'react';
import { USER_PROFILE, INITIAL_STORIES } from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { useProjects } from '../hooks/useProjects';
import {
  CheckCircle2,
  Grid,
  Bookmark,
  ExternalLink,
  Mail,
  GraduationCap,
  Layers,
} from 'lucide-react';
import { ProjectDetailPage } from './ProjectDetailPage';

interface ProfileTabProps {
  onOpenStory: (index: number) => void;
  onOpenContact: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  onOpenStory,
  onOpenContact,
}) => {
  const { projects } = useProjects();
  const [activeSubTab, setActiveSubTab] = useState<'grid' | 'saved'>('grid');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  if (activeProject) {
    return (
      <ProjectDetailPage
        project={activeProject}
        onBack={() => setActiveProject(null)}
      />
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

          {/* Stats: Posts, Followers, Following */}
          <div className="flex-1 flex items-center justify-around text-center">
            <div>
              <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {projects.length + 2}
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
                {USER_PROFILE.followingCount}
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
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Profile URL copied to clipboard!');
            }}
            className="flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold text-xs border border-neutral-200 dark:border-neutral-700 transition-colors active:scale-98"
          >
            Share Profile
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

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className={`relative aspect-square cursor-pointer overflow-hidden group bg-gradient-to-br ${project.thumbnailGradient}`}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white">
              <span className="text-xl sm:text-2xl mb-1">{project.thumbnailIcon}</span>
              <p className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-2">
                {project.title}
              </p>
            </div>

            <div className="absolute top-1.5 right-1.5 p-0.5 rounded bg-black/60 text-white">
              <Layers size={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
