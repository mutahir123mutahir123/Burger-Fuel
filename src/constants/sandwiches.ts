export interface SandwichItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export const SANDWICHES: SandwichItem[] = [
  {
    id: "club-sandwich",
    slug: "club-sandwich",
    name: "Club Sandwich",
    price: 550,
    image: "/images/sandwich/club-sandwich.jpeg",
    imageAlt: "Triple-decker club sandwich with toasted bread, chicken and fresh salad",
    tagline: "Three decks of toasted goodness.",
    description:
      "A triple-decker of grilled chicken, toasted bread, molten cheese, crisp lettuce and tomatoes with our signature sauce. Served with golden fries.",
  },
  {
    id: "cheese-grilled-sandwich",
    slug: "cheese-grilled-sandwich",
    name: "Cheese Grilled Sandwich",
    price: 500,
    image: "/images/sandwich/grill-sandwich.jpeg",
    imageAlt: "Golden grilled cheese sandwich with melted cheese and crispy edges",
    tagline: "Grilled, golden, gone.",
    description:
      "Buttery grilled sandwich loaded with melted cheddar, grilled chicken and a hint of herbs. Pressed to golden perfection and served with fries.",
  },
];
