import { useState, useEffect, useCallback } from 'react';
import type { Post, CommentItem } from '../types';

const STORAGE_KEY = 'insta_folio_post_interactions_v1';

interface StoredPostData {
  isLiked?: boolean;
  likesCount?: number;
  isSaved?: boolean;
  comments?: CommentItem[];
}

type StoredInteractionsMap = Record<string, StoredPostData>;

const getStoredMap = (): StoredInteractionsMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse localStorage interactions:', err);
    return {};
  }
};

const saveToStoredMap = (postId: string, update: Partial<StoredPostData>) => {
  try {
    const currentMap = getStoredMap();
    currentMap[postId] = {
      ...currentMap[postId],
      ...update,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMap));
    window.dispatchEvent(new Event('insta_folio_interactions_changed'));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
};

export const usePostInteractions = (post: Post) => {
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    const stored = getStoredMap()[post.id];
    return typeof stored?.isLiked === 'boolean' ? stored.isLiked : Boolean(post.isLiked);
  });

  const [likesCount, setLikesCount] = useState<number>(() => {
    const stored = getStoredMap()[post.id];
    if (typeof stored?.likesCount === 'number') {
      return stored.likesCount;
    }
    // Default to post.likesCount or 0
    return Number(post.likesCount) || 0;
  });

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    const stored = getStoredMap()[post.id];
    return typeof stored?.isSaved === 'boolean' ? stored.isSaved : Boolean(post.isSaved);
  });

  const [comments, setComments] = useState<CommentItem[]>(() => {
    const stored = getStoredMap()[post.id];
    if (stored?.comments && Array.isArray(stored.comments)) {
      return stored.comments;
    }
    return post.comments || [];
  });

  // Sync across tabs and custom events
  useEffect(() => {
    const syncFromStorage = () => {
      const stored = getStoredMap()[post.id];
      if (stored) {
        if (typeof stored.isLiked === 'boolean') setIsLiked(stored.isLiked);
        if (typeof stored.likesCount === 'number') setLikesCount(stored.likesCount);
        if (typeof stored.isSaved === 'boolean') setIsSaved(stored.isSaved);
        if (stored.comments) setComments(stored.comments);
      }
    };

    window.addEventListener('storage', syncFromStorage);
    window.addEventListener('insta_folio_interactions_changed', syncFromStorage);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener('insta_folio_interactions_changed', syncFromStorage);
    };
  }, [post.id]);

  const toggleLike = useCallback(() => {
    setIsLiked((prevLiked) => {
      const nextLiked = !prevLiked;
      setLikesCount((prevCount) => {
        const nextCount = nextLiked ? prevCount + 1 : Math.max(0, prevCount - 1);
        saveToStoredMap(post.id, { isLiked: nextLiked, likesCount: nextCount });
        return nextCount;
      });
      return nextLiked;
    });
  }, [post.id]);

  const setLikedDirectly = useCallback(() => {
    setIsLiked((prevLiked) => {
      if (prevLiked) return prevLiked; // already liked
      setLikesCount((prevCount) => {
        const nextCount = prevCount + 1;
        saveToStoredMap(post.id, { isLiked: true, likesCount: nextCount });
        return nextCount;
      });
      return true;
    });
  }, [post.id]);

  const toggleSave = useCallback(() => {
    setIsSaved((prevSaved) => {
      const nextSaved = !prevSaved;
      saveToStoredMap(post.id, { isSaved: nextSaved });
      return nextSaved;
    });
  }, [post.id]);

  const addComment = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newEntry: CommentItem = {
      id: 'c_' + Date.now(),
      username: 'you',
      text: trimmed,
      timestamp: 'Just now',
      likes: 0,
    };
    setComments((prev) => {
      const updated = [...prev, newEntry];
      saveToStoredMap(post.id, { comments: updated });
      return updated;
    });
  }, [post.id]);

  const toggleCommentLike = useCallback((commentId: string) => {
    setComments((prev) => {
      const updated = prev.map((c) => {
        if (c.id === commentId) {
          const userLiked = !c.userLiked;
          return {
            ...c,
            userLiked,
            likes: userLiked ? c.likes + 1 : Math.max(0, c.likes - 1),
          };
        }
        return c;
      });
      saveToStoredMap(post.id, { comments: updated });
      return updated;
    });
  }, [post.id]);

  return {
    isLiked,
    likesCount,
    isSaved,
    comments,
    toggleLike,
    setLikedDirectly,
    toggleSave,
    addComment,
    toggleCommentLike,
  };
};
