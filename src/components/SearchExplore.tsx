import React, { useState, useMemo, useRef } from 'react';
import type { ProjectItem } from '../types';
import { Search, X, Heart, MessageCircle } from 'lucide-react';
import { ProjectDetailPage } from './ProjectDetailPage';
import { useProjects } from '../hooks/useProjects';

interface SearchExploreProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const SearchExplore: React.FC<SearchExploreProps> = ({ onSelectProject }) => {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const scrollPosRef = useRef<number>(0);

  // Drag-to-scroll refs for category pills
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Extract unique categories dynamically from actual projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [projects]);

  // Filter projects based on title, skills, or category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.skills.some((s) => s.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategoryFilter === 'All' ||
        project.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategoryFilter]);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('All');
  };

  const handleTileClick = (project: ProjectItem) => {
    scrollPosRef.current = window.scrollY;
    setActiveProject(project);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const handleBackToGrid = () => {
    setActiveProject(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
    });
  };

  // Draggable category pills handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoryContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - categoryContainerRef.current.offsetLeft;
    scrollLeftRef.current = categoryContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !categoryContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    categoryContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // If a project is selected, render full-page Instagram post view
  if (activeProject) {
    return (
      <ProjectDetailPage
        project={activeProject}
        onBack={handleBackToGrid}
      />
    );
  }

  return (
    <div className="w-full bg-black min-h-screen pb-16">
      {/* Top Search Bar & Category Navigation */}
      <div className="sticky top-14 z-30 bg-black/95 backdrop-blur-md px-3 pt-2.5 pb-2 border-b border-neutral-900 transition-colors">
        {/* Search Bar Input */}
        <div className="relative flex items-center mb-2.5">
          <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, categories, tech stack..."
            className="w-full bg-neutral-900 text-white placeholder-neutral-500 text-xs rounded-xl py-2 pl-9 pr-9 border border-neutral-800 focus:border-neutral-600 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-neutral-400 hover:text-white p-0.5 rounded-full"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Draggable Category Domains Filter Bar */}
        <div className="relative w-full">
          <div
            ref={categoryContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pr-12 cursor-grab active:cursor-grabbing select-none scroll-smooth touch-pan-x"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-neutral-100 text-black shadow-sm font-bold'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explore Grid: Dynamic "Some Big, Some Small" Masonry Bento Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto text-xl mb-3 border border-neutral-800">
            🔍
          </div>
          <h4 className="font-bold text-sm text-neutral-200">
            No projects found
          </h4>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
            No projects matched "{searchQuery}". Try selecting "All" or a different category.
          </p>
          <button
            onClick={clearSearch}
            className="mt-4 px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 auto-rows-[140px] sm:auto-rows-[170px] gap-[2px] bg-black [grid-auto-flow:dense]">
          {filteredProjects.map((project, index) => {
            // Some big (row-span-2), some small (row-span-1) with clean cadence
            // Uses project.span === 'tall' or a balanced Instagram explore pattern
            const isBig = project.span === 'tall' || index % 5 === 0;

            return (
              <div
                key={project.id}
                onClick={() => handleTileClick(project)}
                className={`group relative overflow-hidden cursor-pointer bg-neutral-950 select-none ${
                  isBig ? 'row-span-2' : 'row-span-1'
                }`}
              >
                {/* 1. Full-bleed Project Image */}
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${project.thumbnailGradient} flex items-center justify-center`}
                  >
                    <span className="text-3xl opacity-80">{project.thumbnailIcon}</span>
                  </div>
                )}

                {/* 2. Top Dark Gradient for Title Legibility */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* 3. Title Only (Directly over image with drop-shadow, no background box) */}
                <div className="absolute top-2 inset-x-2 z-10 pointer-events-none">
                  <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2">
                    {project.title}
                  </h4>
                </div>

                {/* 4. Sleek Hover Overlay (Clean icons only, NO fake numbers) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 text-white z-20 pointer-events-none">
                  <Heart size={18} className="fill-white" />
                  <MessageCircle size={18} className="fill-white" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
