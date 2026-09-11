export interface Deal {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
}

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    slug: "deal-1",
    name: "Deal 1",
    description: "1 Zingo Burger, Regular Fries, Soft Drink (345ml)",
    price: 570,
    image: "/images/deals/deal-1.jpeg",
    imageAlt: "Deal 1: Zingo burger with fries and soft drink",
  },
  {
    id: "deal-2",
    slug: "deal-2",
    name: "Deal 2",
    description: "2 Zingo Burgers, 2 Regular Fries, 2 Soft Drinks (345ml)",
    price: 1140,
    image: "/images/deals/deal-2.jpeg",
    imageAlt: "Deal 2: Two zingo burgers with fries and drinks",
  },
  {
    id: "deal-3",
    slug: "deal-3",
    name: "Deal 3",
    description: "1 Grill Burger, Regular Fries, Soft Drink (345ml)",
    price: 670,
    image: "/images/deals/deal-3.jpeg",
    imageAlt: "Deal 3: Grill burger with fries and soft drink",
  },
  {
    id: "deal-4",
    slug: "deal-4",
    name: "Deal 4",
    description: "2 Grill Burgers, 2 Regular Fries, 2 Soft Drinks (345ml)",
    price: 1340,
    image: "/images/deals/deal-4.jpeg",
    imageAlt: "Deal 4: Two grill burgers with fries and drinks",
  },
  {
    id: "deal-5",
    slug: "deal-5",
    name: "Deal 5",
    description: "1 Smash Burger, Regular Fries, Soft Drink (345ml)",
    price: 750,
    image: "/images/deals/deal-5.jpeg",
    imageAlt: "Deal 5: Smash burger with fries and soft drink",
  },
  {
    id: "deal-6",
    slug: "deal-6",
    name: "Deal 6",
    description: "2 Smash Burgers, 2 Regular Fries, 2 Soft Drinks (345ml)",
    price: 1500,
    image: "/images/deals/deal-6.jpeg",
    imageAlt: "Deal 6: Two smash burgers with fries and drinks",
  },
  {
    id: "deal-7",
    slug: "deal-7",
    name: "Deal 7",
    description: "Small Pizza, 345ml Soft Drink",
    price: 500,
    image: "/images/deals/deal-7.jpeg",
    imageAlt: "Deal 7: Small pizza with soft drink",
  },
  {
    id: "deal-8",
    slug: "deal-8",
    name: "Deal 8",
    description: "Medium Pizza, 2 Soft Drinks (345ml)",
    price: 1050,
    image: "/images/deals/deal-8.jpeg",
    imageAlt: "Deal 8: Medium pizza with two soft drinks",
  },
  {
    id: "deal-9",
    slug: "deal-9",
    name: "Deal 9",
    description: "Large Pizza, 1.5L Soft Drink",
    price: 1550,
    image: "/images/deals/deal-9.jpeg",
    imageAlt: "Deal 9: Large pizza with 1.5L soft drink",
  },
  {
    id: "deal-10",
    slug: "deal-10",
    name: "Deal 10",
    description: "Medium Pizza, 1 Zingo Burger, Regular Fries, 1.5L Soft Drink",
    price: 1500,
    image: "/images/deals/deal-10.jpeg",
    imageAlt: "Deal 10: Medium pizza with zingo burger, fries and drink",
  },
  {
    id: "deal-11",
    slug: "deal-11",
    name: "Deal 11",
    description: "Large Pizza, 2 Zingo Burgers, Regular Fries, 1.5L Soft Drink",
    price: 2200,
    image: "/images/deals/deal-11.jpeg",
    imageAlt: "Deal 11: Large pizza with two zingo burgers, fries and drink",
  },
  {
    id: "deal-12",
    slug: "deal-12",
    name: "Deal 12",
    description:
      "Large Pizza, 1 Medium Pizza, 2 Zingo Burgers, Regular Fries, 1.5L Soft Drink",
    price: 3100,
    image: "/images/deals/deal-12.jpeg",
    imageAlt: "Deal 12: Large and medium pizza with burgers, fries and drink",
  },
];

export const getDealBySlug = (slug: string): Deal | undefined =>
  DEALS.find((d) => d.slug === slug);
