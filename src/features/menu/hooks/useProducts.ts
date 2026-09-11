"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product, Category } from "@/types/product";
import { productService } from "@/services/product.service";
import { CATEGORIES } from "@/constants/menu";

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  activeCategory: Category | "ALL";
}

export function useProducts() {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
    activeCategory: "ALL",
  });

  const abort = useRef(false);

  const fetchProducts = useCallback(async (category: Category | "ALL") => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await productService.getProducts(category);
      if (abort.current) return;
      setState({
        products: data,
        loading: false,
        error: null,
        activeCategory: category,
      });
    } catch {
      if (abort.current) return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Unable to load the menu. Please try again.",
      }));
    }
  }, []);

  useEffect(() => {
    abort.current = false;
    const initial = async () => {
      await fetchProducts("ALL");
    };
    void initial();
    return () => {
      abort.current = true;
    };
  }, [fetchProducts]);

  const setCategory = useCallback(
    (category: Category | "ALL") => {
      if (category === state.activeCategory) return;
      void fetchProducts(category);
    },
    [fetchProducts, state.activeCategory],
  );

  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    activeCategory: state.activeCategory,
    setCategory,
    categories: CATEGORIES,
    refetch: () => fetchProducts(state.activeCategory),
  };
}