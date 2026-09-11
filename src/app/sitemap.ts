import type { MetadataRoute } from "next";
import { ALL_PRODUCTS } from "@/constants/menu";
import { CATEGORIES } from "@/constants/categories";
import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/menu`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/deals`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/new-arrivals`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/fries`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/crunch-and-munch`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/wraps`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/pastas`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/sandwiches`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const categories: MetadataRoute.Sitemap = CATEGORIES.flatMap((category) =>
    category.href
      ? [
          {
            url: `${SITE_URL}${category.href}`,
            changeFrequency: "weekly",
            priority: 0.7,
          },
        ]
      : [],
  );

  const products: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...pages, ...categories, ...products];
}