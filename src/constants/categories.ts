export interface CategoryDef {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  href?: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "burgers",
    name: "Burgers",
    image: "/images/smash-burger.jpeg",
    blurb: "Smash patties & stacked beasts",
  },
  {
    slug: "wraps",
    name: "Wraps",
    image: "/images/paratha-rolls.jpg",
    blurb: "Crispy paratha rolls loaded up",
    href: "/wraps",
  },
  {
    slug: "pastas",
    name: "Pasta's",
    image: "/images/pasta.webp",
    blurb: "Creamy, saucy & fire-kissed",
    href: "/pastas",
  },
  {
    slug: "crunch-and-munch",
    name: "Crunch And Munch",
    image: "/images/loaded-fries.jpg",
    blurb: "Loaded fries & street sharables",
    href: "/crunch-and-munch",
  },
  {
    slug: "pizzas",
    name: "Pizza's",
    image: "/images/fajita-pizza.jpg",
    blurb: "Wood-fired, leopard-spotted crusts",
    href: "/category/pizzas",
  },
  {
    slug: "sandwiches",
    name: "Sandwiches",
    image: "/images/club-sandwich.jpg",
    blurb: "Triple-decker toasted stacks",
    href: "/sandwiches",
  },
  {
    slug: "drinks",
    name: "Drinks",
    image: "/images/drinks/electric-blue.jpeg",
    blurb: "Soft drinks & electric chillers",
    href: "/category/drinks",
  },
] as const;

export const getCategoryBySlug = (slug: string): CategoryDef | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
