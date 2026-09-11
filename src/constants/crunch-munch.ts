export interface CrunchMunchSize {
  label: string;
  price: number;
}

export interface CrunchMunchItem {
  id: string;
  slug: string;
  name: string;
  sizes: [CrunchMunchSize, CrunchMunchSize];
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export const CRUNCH_MUNCH: CrunchMunchItem[] = [
  {
    id: "wings",
    slug: "wings",
    name: "Wings",
    sizes: [
      { label: "5 pcs", price: 460 },
      { label: "10 pcs", price: 650 },
    ],
    image: "/images/crunch-munch/wings.jpeg",
    imageAlt: "Crispy golden chicken wings with dipping sauce",
    tagline: "Classic crunch, no cap.",
    description:
      "Crispy fried chicken wings tossed in a light seasoning, served golden with your choice of dip.",
  },
  {
    id: "bbq-wings",
    slug: "bbq-wings",
    name: "BBQ Wings",
    sizes: [
      { label: "5 pcs", price: 500 },
      { label: "10 pcs", price: 650 },
    ],
    image: "/images/crunch-munch/bbq-wings.jpeg",
    imageAlt: "Smoky BBQ glazed chicken wings with charred edges",
    tagline: "Smoky glaze, sticky fingers.",
    description:
      "Saucy BBQ-glazed wings with a smoky char, sticky caramelized coating and a punch of tang.",
  },
  {
    id: "buffalo-wings",
    slug: "buffalo-wings",
    name: "Buffalo Wings",
    sizes: [
      { label: "5 pcs", price: 550 },
      { label: "10 pcs", price: 700 },
    ],
    image: "/images/crunch-munch/buffalo-wings.jpeg",
    imageAlt: "Fiery buffalo wings coated in spicy red sauce",
    tagline: "Heat level: committed.",
    description:
      "Fiery buffalo wings drenched in a buttery hot sauce with a slow-building kick that keeps you coming back.",
  },
  {
    id: "sweet-chilli-wings",
    slug: "sweet-chilli-wings",
    name: "Sweet Chilli Wings",
    sizes: [
      { label: "5 pcs", price: 550 },
      { label: "10 pcs", price: 700 },
    ],
    image: "/images/crunch-munch/sweet-chilli.jpeg",
    imageAlt: "Sweet chilli glazed wings with sticky glossy coating",
    tagline: "Sweet heat, sticky repeat.",
    description:
      "Crispy wings glazed in a sticky sweet chilli sauce with a balanced kick of heat and honey-like sweetness.",
  },
  {
    id: "nuggets",
    slug: "nuggets",
    name: "Nuggets",
    sizes: [
      { label: "5 pcs", price: 400 },
      { label: "10 pcs", price: 550 },
    ],
    image: "/images/crunch-munch/nuggets.jpeg",
    imageAlt: "Golden crispy chicken nuggets with a crunchy coating",
    tagline: "Bite-sized, sauce-dipped perfection.",
    description:
      "Golden breaded chicken nuggets with a crispy shell and juicy center, perfect for dipping.",
  },
  {
    id: "strips-in-chips",
    slug: "strips-in-chips",
    name: "Strips in Chips",
    sizes: [
      { label: "5 pcs", price: 500 },
      { label: "10 pcs", price: 950 },
    ],
    image: "/images/crunch-munch/strips-chips.jpeg",
    imageAlt: "Crispy chicken strips served over a bed of golden fries",
    tagline: "Strips on chips, no rules.",
    description:
      "Crispy chicken strips laid over a bed of golden fries, drizzled with sauce and finished with a crunch.",
  },
];
