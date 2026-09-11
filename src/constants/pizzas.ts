import type { Product, ProductOptionGroup } from "@/types/product";

export type PizzaSubCategory = "CLASSIC" | "SPECIAL" | "SIGNATURE";

export interface PizzaItem extends Omit<Product, "category" | "calories"> {
  subCategory: PizzaSubCategory;
}

const CLASSIC_SIZES: ProductOptionGroup = {
  id: "size",
  label: "SIZE",
  required: true,
  choices: [
    { id: "small", label: "Small", price: 0, default: true },
    { id: "medium", label: "Medium", price: 550 },
    { id: "large", label: "Large", price: 1000 },
  ],
};

const specialSizes = (largeDelta: number): ProductOptionGroup => ({
  id: "size",
  label: "SIZE",
  required: true,
  choices: [
    { id: "medium", label: "Medium", price: 0, default: true },
    { id: "large", label: "Large", price: largeDelta },
  ],
});

const SIGNATURE_SIZES: ProductOptionGroup = {
  id: "size",
  label: "SIZE",
  required: true,
  choices: [
    { id: "medium", label: "Medium 11″", price: 0, default: true },
    { id: "large", label: "Large 13″", price: 640 },
  ],
};

const EXTRA_TOPPING_PRICES: Record<string, number> = {
  small: 150,
  medium: 250,
  large: 350,
};

const EXTRA_TOPPING: ProductOptionGroup = {
  id: "extra-topping",
  label: "EXTRA TOPPING",
  required: false,
  choices: [
    {
      id: "extra-topping",
      label: "Extra Cheese / Topping",
      price: EXTRA_TOPPING_PRICES.medium,
      priceBySize: EXTRA_TOPPING_PRICES,
    },
  ],
};

const CLASSIC: PizzaItem[] = [
  {
    id: "tikka",
    slug: "tikka",
    name: "Tikka",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/tikka.jpeg",
    imageAlt: "Tikka pizza loaded with charred tandoori chicken and melted cheese",
    tagline: "Charred tandoori chicken, leopard-spotted crust.",
    description:
      "Juicy tandoori chicken chunks, green peppers, onions and a molten mozzarella crown on our hand-stretched wood-fired base. Small, medium or large - all of it gone fast.",
    badges: ["bestseller"],
    options: [CLASSIC_SIZES],
  },
  {
    id: "fajita",
    slug: "fajita",
    name: "Fajita",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/fajita.jpeg",
    imageAlt: "Chicken fajita pizza with grilled peppers and onions",
    tagline: "Fajita-seared chicken, peppers, fire-kissed.",
    description:
      "Grilled fajita chicken, sautéed peppers and onions under a smoky three-cheese blend. The people's champion, in every size.",
    badges: ["bestseller"],
    options: [CLASSIC_SIZES],
  },
  {
    id: "supreme",
    slug: "supreme",
    name: "Supreme",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/supreme.jpeg",
    imageAlt: "Supreme pizza loaded with chicken, peppers, mushrooms and olives",
    tagline: "Everything but the kitchen sink. Literally.",
    description:
      "Loaded with chicken, peppers, mushrooms, olives and a heavy cheese crown. When nobody can decide, this is the answer.",
    badges: [],
    options: [CLASSIC_SIZES],
  },
  {
    id: "bbq-extreme",
    slug: "bbq-extreme",
    name: "BBQ Extreme",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/bbq-extreme.jpeg",
    imageAlt: "BBQ extreme pizza drizzled with smoky barbecue sauce",
    tagline: "Smoky BBQ, double fire.",
    description:
      "Double chicken, BBQ sauce drizzle and a molten cheese crown on our fire-blistered base. Bold, saucy and extreme in every direction.",
    badges: ["spicy"],
    options: [CLASSIC_SIZES],
  },
  {
    id: "spicy-tikka",
    slug: "spicy-tikka",
    name: "Spicy Tikka",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/spicy-tikka.jpeg",
    imageAlt: "Spicy tikka pizza with jalapeños and extra heat",
    tagline: "Tandoori heat, dialled to eleven.",
    description:
      "Charred spicy-tikka chicken, jalapeños, peppers and an extra layer of heat on a blistered crust. Not for the faint of heart.",
    badges: ["spicy"],
    options: [CLASSIC_SIZES],
  },
  {
    id: "lazania",
    slug: "lazania",
    name: "Lazania",
    subCategory: "CLASSIC",
    price: 600,
    image: "/images/pizzas/lazania.jpeg",
    imageAlt: "Lasagna-inspired pizza with rich meat sauce and bubbling cheese",
    tagline: "Your favourite pasta, pizza-fied.",
    description:
      "All the soul of lasagna - rich meat sauce, creamy layers and bubbling cheese - swirled onto a wood-fired pizza base.",
    badges: ["new"],
    options: [CLASSIC_SIZES],
  },
];

const SPECIAL: PizzaItem[] = [
  {
    id: "kebab-crust",
    slug: "kebab-crust",
    name: "Kebab Crust",
    subCategory: "SPECIAL",
    price: 1270,
    image: "/images/pizzas/kebab-crust.jpeg",
    imageAlt: "Special pizza with a kebab-stuffed crust edge",
    tagline: "A crust ringed with kebab.",
    description:
      "Our classic base crowned with a stuffed edge of juicy minced kebab. Peak pizza engineering, from the middle out.",
    badges: ["limited"],
    options: [specialSizes(520)],
  },
  {
    id: "cheese-crust",
    slug: "cheese-crust",
    name: "Cheese Crust",
    subCategory: "SPECIAL",
    price: 1270,
    image: "/images/pizzas/cheese-crust.jpeg",
    imageAlt: "Special pizza with a cheese-stuffed crust edge",
    tagline: "Stuffed edge, molten heart.",
    description:
      "A thick crust ring packed with molten cheese, loaded with your favourite topping and baked till the edge bubbles over.",
    badges: ["bestseller"],
    options: [specialSizes(520)],
  },
  {
    id: "crown-crust",
    slug: "crown-crust",
    name: "Crown Crust",
    subCategory: "SPECIAL",
    price: 1270,
    image: "/images/pizzas/crown-crust.jpeg",
    imageAlt: "Special pizza with a towering crown-stuffed crust",
    tagline: "Wear it like a crown.",
    description:
      "A towering stuffed crust edge that looks like a crown and tastes like a cheese festival.",
    badges: [],
    options: [specialSizes(520)],
  },
  {
    id: "burger-fuel-special",
    slug: "burger-fuel-special",
    name: "BurgerFuel Special",
    subCategory: "SPECIAL",
    price: 1270,
    image: "/images/pizzas/burger-fuel-special.jpeg",
    imageAlt: "BurgerFuel house special pizza with a loaded crust",
    tagline: "The house favourite, no debate.",
    description:
      "Our signature loaded pie - everything Burger Fuel does best stacked on one base. Order it large and watch it vanish.",
    badges: ["bestseller"],
    options: [specialSizes(480)],
  },
  {
    id: "malai-boti",
    slug: "malai-boti",
    name: "Malai Boti",
    subCategory: "SPECIAL",
    price: 1270,
    image: "/images/pizzas/malai-boti.jpeg",
    imageAlt: "Special pizza topped with creamy malai boti cubes",
    tagline: "Creamy malai boti, properly spoiled.",
    description:
      "Tender cream-marinated malai boti cubes with a silky cream drizzle over a bubbly wood-fired base. Rich and vaguely addictive.",
    badges: ["new"],
    options: [specialSizes(520)],
  },
];

const SIGNATURE: PizzaItem[] = [
  {
    id: "malai-cheese-crust",
    slug: "malai-cheese-crust",
    name: "Malai Cheese Crust",
    subCategory: "SIGNATURE",
    price: 1350,
    image: "/images/pizzas/malai-cheese-crust.jpeg",
    imageAlt: "Signature pizza with malai boti and a cream cheese stuffed crust",
    tagline: "Malai boti wrapped in a cheese crown.",
    description:
      "Our signature stuffed crust - creamy malai boti on top, molten cheese baked into the edge. Medium 11-inch or Large 13-inch.",
    badges: ["bestseller"],
    options: [SIGNATURE_SIZES],
  },
  {
    id: "royal-crust",
    slug: "royal-crust",
    name: "Royal Crust",
    subCategory: "SIGNATURE",
    price: 1350,
    image: "/images/pizzas/royal-crust.jpeg",
    imageAlt: "Signature royal crust pizza with a grand cheese-stuffed edge",
    tagline: "The crown jewel of the oven.",
    description:
      "A grand stuffed crust loaded with a royal spread of toppings and cheese. Reserve your throne, this one is for the table.",
    badges: [],
    options: [SIGNATURE_SIZES],
  },
];

export const PIZZA_SUB_CATEGORIES: { label: PizzaSubCategory; name: string }[] = [
  { label: "CLASSIC", name: "Pizza" },
  { label: "SPECIAL", name: "Special Pizza" },
  { label: "SIGNATURE", name: "Signature Pizza" },
];

export const ALL_PIZZAS: PizzaItem[] = [...CLASSIC, ...SPECIAL, ...SIGNATURE];

export const getPizzasBySubCategory = (sub: PizzaSubCategory): PizzaItem[] =>
  ALL_PIZZAS.filter((p) => p.subCategory === sub);

export const toPizzaProduct = (item: PizzaItem): Product => ({
  ...item,
  category: "PIZZA",
  calories: 0,
  options: [...item.options, EXTRA_TOPPING],
});