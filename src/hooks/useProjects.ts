import { useState, useEffect, useCallback } from 'react';
import type { ProjectItem } from '../types';
import { getProjects, isSupabaseConfigured } from '../lib/supabase';
import { PROJECTS_DATA } from '../data/projectsData';

export function useProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [loading, setLoading] = useState(false);
  const [fromDatabase, setFromDatabase] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProjects();
      setProjects(result.data);
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
    let isMounted = true;
    (async () => {
      try {
        const result = await getProjects();
        if (!isMounted) return;
        setProjects(result.data);
        setFromDatabase(result.fromDatabase);
        if (result.error) {
          setError(result.error);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
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
