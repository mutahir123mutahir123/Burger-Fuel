"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartContextValue, CartItem } from "@/types/product";

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "burgerfuel:cart";

interface StoredItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  options: Record<string, string[]>;
  optionsSummary: string[];
}

function isStoredItem(value: unknown): value is StoredItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.key === "string" &&
    typeof v.productId === "string" &&
    typeof v.quantity === "number"
  );
}

function mergeWithDefaults(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(isStoredItem)
    .filter((i) => i.quantity > 0)
    .map((i) => ({
      key: i.key,
      productId: i.productId,
      name: i.name,
      image: i.image,
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      options: Object.fromEntries(
        Object.entries(i.options ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v : [v]]),
      ),
      optionsSummary: Array.isArray(i.optionsSummary) ? [...i.optionsSummary] : [],
    }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw && active) {
          const parsed = mergeWithDefaults(JSON.parse(raw));
          setItems(parsed);
        }
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setHydrated(true);
      }
    };
    void hydrate();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / private mode — non-fatal */
    }
  }, [items, hydrated]);

  const openTray = useCallback(() => setIsOpen(true), []);
  const closeTray = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    const optionsKey = item.optionsSummary.join(" · ");
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.optionsSummary.join(" · ") === optionsKey,
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, { ...item, key: `${item.productId}:${optionsKey}:${Date.now()}` }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const delivery = items.length > 0 && subtotal < 800 ? 99 : 0;
    return {
      items,
      isOpen,
      openTray,
      closeTray,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      total: subtotal + delivery,
      itemCount,
    };
  }, [items, isOpen, openTray, closeTray, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}