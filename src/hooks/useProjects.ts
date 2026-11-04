import { useState, useEffect, useCallback } from 'react';
import type { ProjectItem } from '../types';
import { getProjects, isSupabaseConfigured } from '../lib/supabase';
import { PROJECTS_DATA } from '../data/projectsData';

// Module-level cache to retain verified authentic data across tab navigation
let globalProjectsCache: ProjectItem[] | null = null;
let globalHasCompletedInitialLoad = false;

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>(() => globalProjectsCache || PROJECTS_DATA);
  const [loading, setLoading] = useState<boolean>(() => !globalHasCompletedInitialLoad);
  const [fromDatabase, setFromDatabase] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProjects();
      const authenticData = result.data && result.data.length > 0 ? result.data : PROJECTS_DATA;
      globalProjectsCache = authenticData;
      globalHasCompletedInitialLoad = true;
      setProjects(authenticData);
      setFromDatabase(result.fromDatabase);
      if (result.error) {
        setError(result.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If authentic projects are already cached from a previous visit in this session, nothing to do
    if (globalHasCompletedInitialLoad && globalProjectsCache) {
      return;
    }

    let isMounted = true;
    const MIN_LOADING_TIME = 950; // ~1 second subtle Instagram-inspired skeleton transition

    (async () => {
      try {
        setLoading(true);
        const [result] = await Promise.all([
          getProjects(),
          new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME)),
        ]);
        if (!isMounted) return;

        const authenticData = result.data && result.data.length > 0 ? result.data : PROJECTS_DATA;
        globalProjectsCache = authenticData;
        globalHasCompletedInitialLoad = true;
        setProjects(authenticData);
        setFromDatabase(result.fromDatabase);
        if (result.error) {
          setError(result.error);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        globalProjectsCache = PROJECTS_DATA;
        globalHasCompletedInitialLoad = true;
        setProjects(PROJECTS_DATA);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    projects,
    loading,
    fromDatabase,
    isConfigured: isSupabaseConfigured,
    error,
    refresh: fetchProjects,
  };
}
