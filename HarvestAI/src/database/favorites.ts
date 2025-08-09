import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FavoriteItem } from '../types/FavoriteItem';

const FAVORITES_KEY = 'favorites.v1';

export async function loadFavorites(): Promise<FavoriteItem[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as FavoriteItem[]; }
  catch { return []; }
}

async function persistFavorites(list: FavoriteItem[]) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export async function addFavorite(item: FavoriteItem) {
  const list = await loadFavorites();
  if (list.find(r => r.id === item.id)) return; // no dupes
  list.unshift(item);
  await persistFavorites(list);
}

export async function removeFavorite(id: number) {
  const list = await loadFavorites();
  const next = list.filter(r => r.id !== id);
  await persistFavorites(next);
}

export async function isFavorite(id: number) {
  const list = await loadFavorites();
  return list.some(r => r.id === id);
}

export async function toggleFavorite(item: FavoriteItem) {
  const list = await loadFavorites();
  const exists = list.some(r => r.id === item.id);
  if (exists) {
    const next = list.filter(r => r.id !== item.id);
    await persistFavorites(next);
    return false;
  } else {
    list.unshift(item);
    await persistFavorites(list);
    return true;
  }
}
