export interface WrapItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export interface SauceOption {
  id: string;
  label: string;
}

export const MAX_SAUCE_SELECTIONS = 2;

export const WRAP_SAUCES: SauceOption[] = [
  { id: "chipotle", label: "Chipotle" },
  { id: "honey-mustard", label: "Honey Mustard" },
  { id: "salsa", label: "Salsa" },
  { id: "bbq", label: "B.B.Q" },
  { id: "chilli-lava", label: "Chilli Lava" },
  { id: "peri-peri", label: "Peri Peri" },
  { id: "garlic", label: "Garlic" },
];

export const WRAPS: WrapItem[] = [
  {
    id: "crispy-wrap",
    slug: "crispy-wrap",
    name: "Crispy Wrap",
    price: 700,
    image: "/images/wraps/crispy-wrap.jpeg",
    imageAlt: "Crispy chicken wrap loaded with fresh sauces and crunchy fillet",
    tagline: "Crunch wrapped tight.",
    description:
      "Golden crispy chicken fillet wrapped in a warm paratha with crisp lettuce, pickles and your choice of two sauces.",
  },
  {
    id: "grill-wrap",
    slug: "grill-wrap",
    name: "Grill Wrap",
    price: 700,
    image: "/images/wraps/grill-wrap.jpeg",
    imageAlt: "Grilled chicken wrap with smoky sauces and fresh veggies",
    tagline: "Grilled to order, wrapped with fire.",
    description:
      "Smoky grilled chicken fillet wrapped in a warm paratha with fresh veggies and your choice of two sauces.",
  },
];
