export interface FriesItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export const FRIES: FriesItem[] = [
  {
    id: "masala-fries",
    slug: "masala-fries",
    name: "Masala Fries",
    price: 250,
    image: "/images/fries/masala-fries.jpeg",
    imageAlt: "Golden fries dusted with spicy masala seasoning",
    tagline: "Spice dusted, fork optional.",
    description:
      "Crispy golden fries tossed in a house-made masala blend with a punch of chaat masala and a squeeze of lime.",
  },
  {
    id: "mayo-garlic-fries",
    slug: "mayo-garlic-fries",
    name: "Mayo Garlic",
    price: 300,
    image: "/images/fries/garlic-mayo.jpeg",
    imageAlt: "Crispy fries drizzled with creamy garlic mayo sauce",
    tagline: "Garlic mayo makes everything better.",
    description:
      "Golden crispy fries generously drizzled with creamy garlic mayo and a sprinkle of fresh herbs.",
  },
  {
    id: "peri-peri-fries",
    slug: "peri-peri-fries",
    name: "Peri Peri",
    price: 300,
    image: "/images/fries/peri-peri.jpeg",
    imageAlt: "Fiery peri peri seasoned fries with red spice coating",
    tagline: "Peri heat, fully loaded.",
    description:
      "Crispy fries coated in a fiery peri peri spice rub with a smoky undertone and a slow-building burn.",
  },
  {
    id: "loaded-fries",
    slug: "loaded-fries",
    name: "Loaded Fries",
    price: 650,
    image: "/images/fries/loaded-fries.webp",
    imageAlt: "Loaded fries topped with cheese, sauces and fresh garnish",
    tagline: "A basket of chaos, fully loaded.",
    description:
      "Crispy golden fries loaded with molten cheese, garlic mayo, smoky sauces and fresh spring onions. Fork optional, commitment required.",
  },
];
