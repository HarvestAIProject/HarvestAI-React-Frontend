// src/database/cart.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Product } from '../types/Product';

// Extend Product with quantity
export type CartItem = Product & { quantity: number };

const CART_KEY = 'cart.v1';

export async function loadCart(): Promise<CartItem[]> {
  const raw = await AsyncStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

async function persistCart(list: CartItem[]) {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(list));
}

export async function addToCart(product: Product, qty: number = 1) {
  const list = await loadCart();
  const existing = list.find(r => r.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    list.unshift({ ...product, quantity: qty });
  }
  await persistCart(list);
}

export async function removeFromCart(id: string) {
  const list = await loadCart();
  const next = list.filter(r => r.id !== id);
  await persistCart(next);
}

export async function updateQuantity(id: string, qty: number) {
  const list = await loadCart();
  const next = list.map(r =>
    r.id === id ? { ...r, quantity: Math.max(0, qty) } : r
  ).filter(r => r.quantity > 0);
  await persistCart(next);
}

export async function clearCart() {
  await persistCart([]);
}

export async function isInCart(id: string) {
  const list = await loadCart();
  return list.some(r => r.id === id);
}
