import React, { useState, useMemo, useRef } from 'react';
import type { ProjectItem } from '../types';
import { Search, X, Heart, MessageCircle, ChevronLeft } from 'lucide-react';
import { ProjectPostCard } from './ProjectPostCard';
import { useProjects } from '../hooks/useProjects';

interface SearchExploreProps {
  onSelectProject?: (project: ProjectItem) => void;
  onShare?: () => void;
}

export const SearchExplore: React.FC<SearchExploreProps> = ({ onSelectProject, onShare }) => {
  const { projects, loading } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const scrollPosRef = useRef<number>(0);

  // Drag-to-scroll refs for category pills
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Extract unique categories dynamically from actual verified projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category.trim());
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
        project.category.trim().toLowerCase() === selectedCategoryFilter.trim().toLowerCase();

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
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  // When a post is tapped in the grid, open that single post with clean back navigation
  if (activeProject) {
    return (
      <div className="w-full bg-white dark:bg-black min-h-screen pb-16 animate-in fade-in duration-150">
        {/* Sticky Header with Back Button */}
        <div className="sticky top-14 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <button
            onClick={handleBackToGrid}
            className="flex items-center gap-1.5 p-1 -ml-1 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Back to explore grid"
          >
            <ChevronLeft size={22} />
            <span className="text-xs font-semibold">Explore</span>
          </button>
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            {activeProject.category}
          </span>
        </div>

        {/* Single Post View */}
        <div className="max-w-xl mx-auto pt-2">
          <ProjectPostCard
            project={activeProject}
            onShare={onShare}
          />
        </div>
      </div>
    );
  }

  // Pure Explore Grid View (Default & Only View)
  return (
    <div className="w-full bg-neutral-50 dark:bg-black min-h-screen pb-16 transition-colors">
      {/* Top Search Bar & Category Navigation (Sticky) */}
      <div className="sticky top-14 z-30 bg-neutral-50/95 dark:bg-black/95 backdrop-blur-md px-3 pt-2.5 pb-2 border-b border-neutral-200 dark:border-neutral-900 transition-colors">
        {/* Search Bar Input */}
        <div className="relative w-full mb-2.5">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            placeholder="Search projects, stack, categories..."
            className="w-full bg-neutral-200/70 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 text-xs rounded-xl py-2 pl-9 pr-9 border border-neutral-300/60 dark:border-neutral-800 focus:border-neutral-500 focus:outline-none transition-all disabled:opacity-75"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded-full"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Draggable Category Domains Filter Bar */}
        <div className="relative w-full">
          {loading ? (
            /* Subtle Instagram Skeleton Placeholder for Category Pills */
            <div className="flex items-center gap-1.5 overflow-hidden py-1 pr-4">
              {[58, 86, 110, 78, 92].map((width, i) => (
                <div
                  key={i}
                  style={{ width: `${width}px` }}
                  className="h-7 rounded-lg bg-neutral-200/70 dark:bg-neutral-800/80 animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div
              ref={categoryContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pr-4 cursor-grab active:cursor-grabbing select-none scroll-smooth touch-pan-x"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm font-bold'
                        : 'bg-neutral-200/60 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-800 border border-neutral-300/40 dark:border-neutral-800/80 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Blank Subtle Instagram Skeleton vs. Actual Project Grid */}
      {loading ? (
        /* Clean Instagram-Inspired Empty Placeholder Skeleton Grid (3:4 ratio, zero stale/demo content) */
        <div className="grid grid-cols-3 gap-[2px] bg-neutral-200/60 dark:bg-neutral-950">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] overflow-hidden bg-neutral-200/80 dark:bg-neutral-900 animate-pulse select-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-300/40 dark:from-neutral-800/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 px-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center mx-auto text-xl mb-3 border border-neutral-300 dark:border-neutral-800">
            🔍
          </div>
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
            No projects found
          </h4>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
            No projects matched "{searchQuery}". Try selecting "All" or a different keyword.
          </p>
          <button
            onClick={clearSearch}
            className="mt-4 px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[2px] bg-neutral-200 dark:bg-black animate-in fade-in duration-300">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleTileClick(project)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-950 select-none"
              >
                {/* Full-bleed Project Image / Gradient */}
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

                {/* Top Dark Gradient for Title Legibility */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Project Title */}
                <div className="absolute top-2 inset-x-2 z-10 pointer-events-none">
                  <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2">
                    {project.title}
                  </h4>
                </div>

                {/* Sleek Instagram Hover Overlay */}
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
