export interface NewArrivalItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export const NEW_ARRIVALS: NewArrivalItem[] = [
  {
    id: "spin-roll",
    slug: "spin-roll",
    name: "Spin Roll",
    price: 650,
    image: "/images/new-arrivals/spin-roll.jpeg",
    imageAlt: "Crispy spinach roll with golden flaky crust",
    tagline: "Spin it to win it.",
    description:
      "A crispy golden roll packed with seasoned spinach and subtle spices, wrapped in flaky layers and fried to perfection.",
  },
  {
    id: "behari-roll",
    slug: "behari-roll",
    name: "Behari Roll",
    price: 700,
    image: "/images/new-arrivals/behari-roll.jpeg",
    imageAlt: "Tender behari roll with smoky grilled meat",
    tagline: "Behari heat, rolled tight.",
    description:
      "Smoky, tender behari-style meat wrapped in a warm paratha with tangy chutney, raw onions and a kick of green chili.",
  },
  {
    id: "cheese-stick",
    slug: "cheese-stick",
    name: "Cheese Stick",
    price: 750,
    image: "/images/new-arrivals/cheese-stick.jpeg",
    imageAlt: "Golden cheese stick oozing with melted cheese",
    tagline: "Stretch it. Bite it. Repeat.",
    description:
      "A golden-crusted stick loaded with molten mozzarella cheese, seasoned with herbs and served with a side of smoky dip.",
  },
  {
    id: "malai-cheese-roll",
    slug: "malai-cheese-roll",
    name: "Malai Cheese Roll",
    price: 750,
    image: "/images/new-arrivals/malai-cheese-roll.jpeg",
    imageAlt: "Creamy malai cheese roll with soft golden wrap",
    tagline: "Creamy, cheesy, gone in seconds.",
    description:
      "A soft paratha roll stuffed with marinated malai chicken and melted cheese, finished with a drizzle of white sauce.",
  },
];
