// src/api/shopApi.ts
import { BASE_URL } from '@env';
import type { Product } from '../types/Product';

// Match backend fields → Product type
type RawProduct = {
  ID: string;
  Title: string;
  Description: string;
  ImageURL: string | null;
  PriceAmount: number | string;
  Currency: string;
};

const toProduct = (p: RawProduct): Product => ({
  id: p.ID,
  title: p.Title,
  description: p.Description,
  imageUrl: p.ImageURL ?? '',
  price: `${p.PriceAmount} ${p.Currency}`,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/shop/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = (await res.json()) as RawProduct[];
  return data.map(toProduct);
};
