import type { Product, ProductOptionGroup } from "@/types/product";

export type BurgerSubCategory = "CRISPY" | "GRILL" | "BEEF";

export interface BurgerItem extends Omit<Product, "category" | "calories"> {
  subCategory: BurgerSubCategory;
}

const BURGER_EXTRAS: ProductOptionGroup[] = [
  {
    id: "extras",
    label: "EXTRAS",
    required: false,
    choices: [
      { id: "cheese", label: "Cheese Slice", price: 100 },
      { id: "sauce", label: "Extra Dip Sauce", price: 100 },
    ],
  },
];

const CRISPY: BurgerItem[] = [
  {
    id: "original-patty",
    slug: "original-patty",
    name: "Original Patty",
    subCategory: "CRISPY",
    price: 370,
    image: "/images/burgers/orignal-paty.jpeg",
    imageAlt: "Crispy original patty burger served with golden fries",
    tagline: "The one that started it all.",
    description:
      "Classic crispy patty loaded with fresh lettuce, tomatoes and our signature sauce. All burgers served with fries.",
    badges: ["bestseller"],
    options: BURGER_EXTRAS,
  },
  {
    id: "zingo",
    slug: "zingo",
    name: "Zingo",
    subCategory: "CRISPY",
    price: 430,
    image: "/images/burgers/zingo.jpeg",
    imageAlt: "Crispy zingo chicken burger with spicy mayo and fries",
    tagline: "Crunch meets heat in every bite.",
    description:
      "Golden crispy zinger fillet with spicy mayo, fresh lettuce and pickles. All burgers served with fries.",
    badges: [],
    options: BURGER_EXTRAS,
  },
  {
    id: "zingo-max",
    slug: "zingo-max",
    name: "Zingo Max",
    subCategory: "CRISPY",
    price: 650,
    image: "/images/burgers/zingo-max.jpeg",
    imageAlt: "Double stacked zingo max burger with extra crispy fillets",
    tagline: "Double the crunch, double the chaos.",
    description:
      "Two crispy zinger fillets stacked with melted cheese, spicy mayo and crunchy slaw. All burgers served with fries.",
    badges: ["spicy"],
    options: BURGER_EXTRAS,
  },
  {
    id: "tower",
    slug: "tower",
    name: "Tower",
    subCategory: "CRISPY",
    price: 550,
    image: "/images/burgers/tower.jpeg",
    imageAlt: "Tower burger stacked high with crispy chicken and sauces",
    tagline: "Built tall. Devoured fast.",
    description:
      "A towering stack of crispy chicken, cheese, jalapeños and smoky sauce. All burgers served with fries.",
    badges: [],
    options: BURGER_EXTRAS,
  },
  {
    id: "fish-burger",
    slug: "fish-burger",
    name: "Fish Burger",
    subCategory: "CRISPY",
    price: 700,
    image: "/images/burgers/single-fish.jpeg",
    imageAlt: "Crispy battered fish burger with tartar sauce and lettuce",
    tagline: "Golden batter, flaky perfection.",
    description:
      "Beer-battered fish fillet with tartar sauce, fresh lettuce and a squeeze of lemon. All burgers served with fries.",
    badges: [],
    options: BURGER_EXTRAS,
  },
  {
    id: "double-fish-burger",
    slug: "double-fish-burger",
    name: "Double Fish Burger",
    subCategory: "CRISPY",
    price: 900,
    image: "/images/burgers/double-fish.jpeg",
    imageAlt: "Double crispy fish fillet burger with melted cheese",
    tagline: "Two fillets. One legend.",
    description:
      "Two golden beer-battered fish fillets with melted cheese, tartar sauce and fresh greens. All burgers served with fries.",
    badges: ["new"],
    options: BURGER_EXTRAS,
  },
  {
    id: "fish-and-chips",
    slug: "fish-and-chips",
    name: "Fish & Chips",
    subCategory: "CRISPY",
    price: 750,
    image: "/images/burgers/fish-and-chips.jpeg",
    imageAlt: "Classic fish and chips with golden battered fish and fries",
    tagline: "The OG combo, perfected.",
    description:
      "Beer-battered fish fillet with a generous portion of golden crispy fries and tartar sauce.",
    badges: [],
    options: BURGER_EXTRAS,
  },
];

const GRILL: BurgerItem[] = [
  {
    id: "tex-max",
    slug: "tex-max",
    name: "Tex Max",
    subCategory: "GRILL",
    price: 580,
    image: "/images/burgers/tex-max.jpeg",
    imageAlt: "Grilled Tex Max burger with smoky BBQ sauce and peppers",
    tagline: "Tex-Mex fire on a grill crown.",
    description:
      "Grilled chicken patty with smoky BBQ sauce, jalapeños, cheddar and grilled peppers. All burgers served with fries.",
    badges: ["spicy"],
    options: BURGER_EXTRAS,
  },
  {
    id: "salsa",
    slug: "salsa",
    name: "Salsa",
    subCategory: "GRILL",
    price: 580,
    image: "/images/burgers/salsa.jpeg",
    imageAlt: "Grilled salsa burger with fresh tomato salsa and herbs",
    tagline: "Fresh salsa, grilled to order.",
    description:
      "Grilled chicken patty loaded with fresh tomato salsa, herbs and a zesty lime drizzle. All burgers served with fries.",
    badges: [],
    options: BURGER_EXTRAS,
  },
  {
    id: "peri-peri-grill",
    slug: "peri-peri-grill",
    name: "Peri Peri",
    subCategory: "GRILL",
    price: 550,
    image: "/images/burgers/peri-peri-grill.jpeg",
    imageAlt: "Peri peri grilled burger with fiery peri sauce",
    tagline: "Fiery peri-peri, grilled hard.",
    description:
      "Grilled chicken fillet drenched in house-made peri-peri sauce with onion rings and fresh lettuce. All burgers served with fries.",
    badges: ["spicy"],
    options: BURGER_EXTRAS,
  },
  {
    id: "smokey-cheese",
    slug: "smokey-cheese",
    name: "Smokey Cheese",
    subCategory: "GRILL",
    price: 600,
    image: "/images/burgers/smocky-cheese.jpeg",
    imageAlt: "Grilled burger with molten smoky cheese and caramelized onions",
    tagline: "Smoked cheese, molten and merciless.",
    description:
      "Grilled patty smothered in smoked cheddar, caramelized onions and a smoky aioli. All burgers served with fries.",
    badges: ["bestseller"],
    options: BURGER_EXTRAS,
  },
  {
    id: "double-extreme",
    slug: "double-extreme",
    name: "Double Extreme",
    subCategory: "GRILL",
    price: 730,
    image: "/images/burgers/double-extreme.jpeg",
    imageAlt: "Double grilled patty burger with extreme toppings and sauces",
    tagline: "Two patties. Zero restraint.",
    description:
      "Double grilled patties with melted cheese, crispy bacon, smoky sauce and grilled mushrooms. All burgers served with fries.",
    badges: [],
    options: BURGER_EXTRAS,
  },
  {
    id: "meat-monster",
    slug: "meat-monster",
    name: "Meat Monster",
    subCategory: "GRILL",
    price: 780,
    image: "/images/burgers/meat-monster.jpeg",
    imageAlt: "Massive meat monster burger loaded with triple patties and cheese",
    tagline: "For when one patty is never enough.",
    description:
      "Triple-stacked grilled patties with layers of cheese, bacon, caramelized onions and our secret monster sauce. All burgers served with fries.",
    badges: ["limited"],
    options: BURGER_EXTRAS,
  },
];

const BEEF: BurgerItem[] = [
  {
    id: "smash-single",
    slug: "smash-single",
    name: "Smash Burger Single",
    subCategory: "BEEF",
    price: 700,
    image: "/images/burgers/smash-single.jpeg",
    imageAlt: "Single smashed beef patty burger with melted cheese",
    tagline: "Seared hard, served fast.",
    description:
      "Single smashed Angus beef patty with melted American cheese, pickles and special sauce on a toasted bun. All burgers served with fries.",
    badges: ["bestseller"],
    options: BURGER_EXTRAS,
  },
  {
    id: "smash-double",
    slug: "smash-double",
    name: "Smash Double",
    subCategory: "BEEF",
    price: 850,
    image: "/images/burgers/smash-double.jpeg",
    imageAlt: "Double smashed beef patty burger with double cheese",
    tagline: "Double smash. Double trouble.",
    description:
      "Two smashed Angus beef patties with melted cheese, pickles, onions and special sauce. All burgers served with fries.",
    badges: ["bestseller"],
    options: BURGER_EXTRAS,
  },
  {
    id: "lacha-paratha-smash",
    slug: "lacha-paratha-smash",
    name: "Lacha Paratha Smash",
    subCategory: "BEEF",
    price: 750,
    image: "/images/burgers/lacha-paratha-single.jpeg",
    imageAlt: "Smashed beef patty wrapped in flaky lacha paratha",
    tagline: "Flaky paratha meets smashed beef.",
    description:
      "Smashed Angus patty sandwiched between layers of flaky lacha paratha with green chutney and onions. All burgers served with fries.",
    badges: ["new"],
    options: BURGER_EXTRAS,
  },
  {
    id: "lacha-paratha-double-smash",
    slug: "lacha-paratha-double-smash",
    name: "Lacha Paratha Double Smash",
    subCategory: "BEEF",
    price: 950,
    image: "/images/burgers/lacha-paratha-double.jpeg",
    imageAlt: "Double smashed beef patty in flaky lacha paratha with sauces",
    tagline: "Double patty, paratha perfection.",
    description:
      "Two smashed Angus patties with melted cheese wrapped in buttery lacha paratha with green chutney. All burgers served with fries.",
    badges: ["new"],
    options: BURGER_EXTRAS,
  },
];

export const BURGER_SUB_CATEGORIES: { label: BurgerSubCategory; name: string }[] = [
  { label: "CRISPY", name: "Crispy" },
  { label: "GRILL", name: "Grill" },
  { label: "BEEF", name: "Beef" },
];

export const ALL_BURGERS: BurgerItem[] = [...CRISPY, ...GRILL, ...BEEF];

export const getBurgersBySubCategory = (sub: BurgerSubCategory): BurgerItem[] =>
  ALL_BURGERS.filter((b) => b.subCategory === sub);

export const toProduct = (item: BurgerItem): Product => ({
  ...item,
  category: "BEEF",
  calories: 0,
});
