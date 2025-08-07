import { BASE_URL } from '@env';

export const fetchRecipeInfo = async (id: number) => {
  const res = await fetch(`${BASE_URL}/info?id=${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe info');
  return res.json();
};

export const fetchRecipeSummary = async (id: number) => {
  const res = await fetch(`${BASE_URL}/summary?id=${id}`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
};

export const fetchRecipeNutrition = async (id: number) => {
  const res = await fetch(`${BASE_URL}/nutrition?id=${id}`);
  if (!res.ok) throw new Error('Failed to fetch nutrition');
  return res.json();
};

export const searchRecipes = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

export const fetchPopularRecipes = async (meal: string) => {
  const res = await fetch(`${BASE_URL}/popular?meal=${meal}`);
  if (!res.ok) throw new Error('Failed to fetch popular recipes');
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
