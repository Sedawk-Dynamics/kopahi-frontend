"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "kopahi_cart";

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback<CartState["add"]>((item) => {
    const qty = Math.max(1, item.quantity || 1);
    setItems((cur) => {
      const existing = cur.find((c) => c.productId === item.productId);
      if (existing) {
        return cur.map((c) =>
          c.productId === item.productId
            ? { ...c, quantity: Math.min(50, c.quantity + qty) }
            : c
        );
      }
      return [
        ...cur,
        {
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          category: item.category,
          quantity: qty,
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((cur) => cur.filter((c) => c.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, qty: number) => {
    setItems((cur) =>
      cur
        .map((c) =>
          c.productId === productId ? { ...c, quantity: Math.max(1, Math.min(50, qty)) } : c
        )
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return { items, count, subtotal, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
