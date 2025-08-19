// src/context/CartContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Product } from '../types/Product';
import { loadCart, addToCart, removeFromCart, updateQuantity } from '../database/cart';

// Cart item extends your Product with quantity
export type CartItem = Product & { quantity: number };

type Ctx = {
  items: CartItem[];
  add: (product: Product, qty?: number) => Promise<void>;
  increment: (id: string) => Promise<void>;
  decrement: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  // selectors
  isInCart: (id: string) => boolean;
  getQuantity: (id: string) => number;
  totalItems: number;     // unique items
  totalQuantity: number;  // sum of quantities
  subtotalValue: number;  // numeric subtotal parsed from price strings
};

const CartContext = createContext<Ctx | null>(null);

// Parse "S$9.90", "$4.00 USD", "12.50 SGD", etc.
const parsePriceValue = (price: string): number => {
  const match = price.replace(',', '').match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : 0;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = useCallback(async () => {
    const list = await loadCart();
    setItems(list);
  }, []);

  useEffect(() => {
    // initial load
    void refresh();
  }, [refresh]);

  // --- Selectors ---
  const isInCart = useCallback((id: string) => items.some(it => it.id === id), [items]);
  const getQuantity = useCallback(
    (id: string) => items.find(it => it.id === id)?.quantity ?? 0,
    [items]
  );

  // --- Actions (optimistic UI + persist to storage) ---
  const add = useCallback(
    async (product: Product, qty: number = 1) => {
      // optimistic update
      setItems(prev => {
        const idx = prev.findIndex(it => it.id === product.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          return next;
        }
        return [{ ...product, quantity: qty }, ...prev];
      });
      // persist
      await addToCart(product, qty);
    },
    []
  );

  const increment = useCallback(
    async (id: string) => {
      // compute the new qty from current state for persistence call
      const current = items.find(it => it.id === id)?.quantity ?? 0;
      const nextQty = current + 1;

      // optimistic update
      setItems(prev => prev.map(it => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)));

      // persist
      await updateQuantity(id, nextQty);
    },
    [items]
  );

  const decrement = useCallback(
    async (id: string) => {
      const current = items.find(it => it.id === id)?.quantity ?? 0;
      const nextQty = Math.max(0, current - 1);

      // optimistic update
      setItems(prev =>
        prev
          .map(it => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it))
          .filter(it => it.quantity > 0)
      );

      // persist
      await updateQuantity(id, nextQty);
    },
    [items]
  );

  const remove = useCallback(
    async (id: string) => {
      // optimistic
      setItems(prev => prev.filter(it => it.id !== id));
      // persist
      await removeFromCart(id);
    },
    []
  );

  // --- Derived values ---
  const { totalItems, totalQuantity, subtotalValue } = useMemo(() => {
    const tItems = items.length;
    const tQty = items.reduce((acc, it) => acc + it.quantity, 0);
    const sub = items.reduce((acc, it) => acc + parsePriceValue(it.price) * it.quantity, 0);
    return { totalItems: tItems, totalQuantity: tQty, subtotalValue: sub };
  }, [items]);

  const value: Ctx = {
    items,
    add,
    increment,
    decrement,
    remove,
    refresh,
    isInCart,
    getQuantity,
    totalItems,
    totalQuantity,
    subtotalValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
