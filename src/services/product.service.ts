import type { Product, Category } from "@/types/product";
import {
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  products,
} from "@/constants/menu";

/**
 * Product data source. Currently reads from local constants.
 * When adding a database, swap internals to fetch from real API endpoints
 * without touching any component that uses this service.
 */
export const productService = {
  async getProducts(category: Category | "ALL" = "ALL"): Promise<Product[]> {
    return getProductsByCategory(category);
  },

  async getProductById(id: string): Promise<Product | undefined> {
    return getProductById(id);
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return getProductBySlug(slug);
  },

  async getAll(): Promise<Product[]> {
    return products;
  },
};
