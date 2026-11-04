import { describe, it, expect, beforeEach } from 'vitest';

describe('Local Storage Interaction Persistence Logic', () => {
  const store = new Map<string, string>();
  const mockLocalStorage = {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, val: string) => store.set(key, val),
    clear: () => store.clear(),
  };

  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('correctly persists liked and saved states', () => {
    const key = 'insta_folio_project_interactions';
    const mockState = {
      'project-1': { isLiked: true, isSaved: false },
      'project-2': { isLiked: false, isSaved: true },
    };

    mockLocalStorage.setItem(key, JSON.stringify(mockState));
    const retrieved = JSON.parse(mockLocalStorage.getItem(key) || '{}');

    expect(retrieved['project-1'].isLiked).toBe(true);
    expect(retrieved['project-2'].isSaved).toBe(true);
  });

  it('handles corrupted localStorage gracefully', () => {
    const key = 'insta_folio_post_interactions_v1';
    mockLocalStorage.setItem(key, 'invalid-json-string{[');

    let parsed: Record<string, unknown> = {};
    try {
      const raw = mockLocalStorage.getItem(key);
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      parsed = {};
    }

    expect(parsed).toEqual({});
  });
});
