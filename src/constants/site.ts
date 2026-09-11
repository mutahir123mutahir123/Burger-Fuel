import type { Metadata } from "next";

export const SITE_NAME = "Burger Fuel";
export const SITE_TITLE = `${SITE_NAME} — Fast Food & Pizza`;
export const SITE_DESCRIPTION =
  "High-octane craft burgers, wood-fired pizzas and loaded street sides. Built to be eaten, not stared at.";

// Canonical, OG and sitemap URLs must be absolute, so the deploy origin is
// centralised here. NEXT_PUBLIC_SITE_URL must be set in production — until it
// is, metadata points at the placeholder fallback below.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://burgerfuel.example.com");

export const DEFAULT_OG_IMAGE = "/images/smash-burger.jpeg";

interface PageMetadataOptions {
  path: string;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}

export function pageMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_PK",
      type: "website",
      images: [image],
    },
  };
}