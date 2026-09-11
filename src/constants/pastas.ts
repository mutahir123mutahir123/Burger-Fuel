export interface PastaItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
}

export const PASTAS: PastaItem[] = [
  {
    id: "smokey-bbq-pasta",
    slug: "smokey-bbq-pasta",
    name: "Smokey BBQ",
    price: 650,
    image: "/images/pasta/smockey-bbq.jpeg",
    imageAlt: "Smokey BBQ pasta with rich smoky sauce and grilled chicken",
    tagline: "Smoky, saucy, unapologetic.",
    description:
      "Al dente penne tossed in a rich smoky BBQ sauce with grilled chicken strips, caramelized onions and a melted cheese crown.",
  },
  {
    id: "spicy-garlic-pasta",
    slug: "spicy-garlic-pasta",
    name: "Spicy Garlic",
    price: 650,
    image: "/images/pasta/spicy-garlic.jpeg",
    imageAlt: "Spicy garlic pasta with fiery chili flakes and golden garlic butter",
    tagline: "Garlic hit, chili kick.",
    description:
      "Penne kissed with fiery garlic butter, red chili flakes, cherry tomatoes and a punch of parmesan. Not for the faint-hearted.",
  },
  {
    id: "alfredo-pasta",
    slug: "alfredo-pasta",
    name: "Alfredo",
    price: 650,
    image: "/images/pasta/alfredo.jpeg",
    imageAlt: "Creamy alfredo pasta with rich white sauce and tender chicken",
    tagline: "Cream-draped perfection.",
    description:
      "Silky penne blanketed in a decadent creamy alfredo sauce with tender grilled chicken, mushrooms and a parmesan finish.",
  },
  {
    id: "crunchy-pasta",
    slug: "crunchy-pasta",
    name: "Crunchy Pasta",
    price: 850,
    image: "/images/pasta/cruncy-pasta.jpeg",
    imageAlt: "Crunchy pasta topped with crispy chicken and golden breadcrumbs",
    tagline: "Crunch on crunch on crunch.",
    description:
      "Penne in a velvety sauce loaded with crispy chicken chunks, golden breadcrumbs, melted cheese and a drizzle of smoky aioli.",
  },
];
