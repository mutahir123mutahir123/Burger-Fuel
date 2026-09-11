export interface ShowcaseCategory {
  slug: string;
  name: string;
  image: string;
  blurb: string;
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    slug: "fries",
    name: "Fries",
    image: "/images/fries/loaded-fries.webp",
    blurb: "Golden, crispy & loaded",
  },
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    image: "/images/new-arrivals.webp",
    blurb: "Fresh drops just hit the menu",
  },
  {
    slug: "deals",
    name: "Deals",
    image: "/images/deals.webp",
    blurb: "Stack more, spend less",
  },
] as const;
