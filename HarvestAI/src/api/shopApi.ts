// src/api/shopApi.ts
import { BASE_URL } from '@env';
import type { Product } from '../types/Product';

// Match backend fields → Product type
type RawProduct = {
  ID: string;
  Title: string;
  Description: string;
  ImageURL?: string | null;
  Images?: string[];
  PriceAmount: number | string;
  Currency: string;
};

const toProduct = (p: RawProduct): Product => {
  const gallery = (p.Images && p.Images.length ? p.Images : []).filter(Boolean) as string[];
  const primary = p.ImageURL ?? gallery[0] ?? '';
  return {
    id: p.ID,
    title: p.Title,
    description: p.Description,
    price: `${p.PriceAmount} ${p.Currency}`,
    imageUrl: primary,
    imageUrls: gallery.length ? gallery : undefined,
  };
};

export const fetchProducts = async (signal?: AbortSignal): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/shop/products`, { signal });
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = (await res.json()) as RawProduct[];
  return data.map(toProduct);
};

export const searchProducts = async (query: string, signal?: AbortSignal): Promise<Product[]> => {
  const url = `${BASE_URL}/shop/products?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Search failed');
  const data = (await res.json()) as RawProduct[];
  return data.map(toProduct);
};