import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { FavoriteItem } from '../types/FavoriteItem';
import { loadFavorites as _load, toggleFavorite as _toggle } from '../database/favorites';

type Ctx = {
  favorites: FavoriteItem[];
  isFavorite: (id: number) => boolean;
  toggle: (item: FavoriteItem) => Promise<boolean>; // returns new liked state
  refresh: () => Promise<void>;
};

const FavoritesContext = createContext<Ctx | null>(null);

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const refresh = useCallback(async () => {
    const list = await _load();
    setFavorites(list);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const isFavorite = useCallback((id: number) => favorites.some(r => r.id === id), [favorites]);

  const toggle = useCallback(async (item: FavoriteItem) => {
    const next = await _toggle(item);
    // optimistically update local state to keep UI snappy
    setFavorites(prev => {
      const exists = prev.some(r => r.id === item.id);
      return exists ? prev.filter(r => r.id !== item.id) : [{...item}, ...prev];
    });
    return next;
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggle, refresh }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
