import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days — optimized images cached long-term
    formats: ["image/avif", "image/webp"], // AVIF preferred (20% smaller), WebP fallback
    qualities: [60, 75, 85, 100], // flexible quality tiers for size/fidelity tradeoffs
  },
  async headers() {
    return [
      {
        // Static images served directly (not via _next/image) — cache forever
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static documents (menu-items.txt etc.) — cache for 1 day
        source: "/:all*(txt|pdf|doc)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
