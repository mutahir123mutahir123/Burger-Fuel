export type DrinkGroup = "soft-drink" | "chiller";

export interface DrinkEntry {
  key: string;
  group: DrinkGroup;
  name: string;
  detail: string;
  image: string;
  imageAlt: string;
  unitPrice: number;
  options: Record<string, string[]>;
  optionsSummary: string[];
}

const SOFT_DRINKS: DrinkEntry[] = [
  {
    key: "soft-drink:345ml",
    group: "soft-drink",
    name: "Soft Drink",
    detail: "345ml",
    image: "/images/drinks/345ml-drink.jpeg",
    imageAlt: "345ml soft drink",
    unitPrice: 90,
    options: { size: ["345ml"] },
    optionsSummary: ["345ml"],
  },
  {
    key: "soft-drink:0.5-litre",
    group: "soft-drink",
    name: "Soft Drink",
    detail: "0.5 Liter",
    image: "/images/drinks/0.5 litre-drink.jpeg",
    imageAlt: "0.5 Liter soft drink",
    unitPrice: 130,
    options: { size: ["0.5 Liter"] },
    optionsSummary: ["0.5 Liter"],
  },
  {
    key: "soft-drink:1-litre",
    group: "soft-drink",
    name: "Soft Drink",
    detail: "1 Liter",
    image: "/images/drinks/1 liter-drink.jpeg",
    imageAlt: "1 Liter soft drink",
    unitPrice: 160,
    options: { size: ["1 Liter"] },
    optionsSummary: ["1 Liter"],
  },
  {
    key: "soft-drink:1.5-litre",
    group: "soft-drink",
    name: "Soft Drink",
    detail: "1.5 Liter",
    image: "/images/drinks/1.5 litre-drink.jpeg",
    imageAlt: "1.5 Liter soft drink",
    unitPrice: 220,
    options: { size: ["1.5 Liter"] },
    optionsSummary: ["1.5 Liter"],
  },
];

const CHILLERS: DrinkEntry[] = [
  {
    key: "chiller:electric-blue",
    group: "chiller",
    name: "Electric Blue",
    detail: "Chiller",
    image: "/images/drinks/electric-blue.jpeg",
    imageAlt: "Electric Blue chiller",
    unitPrice: 400,
    options: {},
    optionsSummary: ["Chiller"],
  },
  {
    key: "chiller:strawberry",
    group: "chiller",
    name: "Strawberry",
    detail: "Chiller",
    image: "/images/drinks/strawberry.jpeg",
    imageAlt: "Strawberry chiller",
    unitPrice: 400,
    options: {},
    optionsSummary: ["Chiller"],
  },
  {
    key: "chiller:blue-berry",
    group: "chiller",
    name: "Blue Berry",
    detail: "Chiller",
    image: "/images/drinks/blue-berry.jpeg",
    imageAlt: "Blue Berry chiller",
    unitPrice: 400,
    options: {},
    optionsSummary: ["Chiller"],
  },
];

export const ALL_DRINKS: DrinkEntry[] = [...SOFT_DRINKS, ...CHILLERS];

export const getDrinkByKey = (key: string): DrinkEntry | undefined =>
  ALL_DRINKS.find((d) => d.key === key);