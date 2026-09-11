"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { productService } from "@/services/product.service";

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(slug: string) {
  const [state, setState] = useState<UseProductState>({
    product: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ product: null, loading: true, error: null });
      try {
        const data = await productService.getProductBySlug(slug);
        if (cancelled) return;
        if (!data) {
          setState({ product: null, loading: false, error: "That item has left the kitchen." });
          return;
        }
        setState({ product: data, loading: false, error: null });
      } catch {
        if (cancelled) return;
        setState({ product: null, loading: false, error: "Unable to load this item. Please try again." });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}