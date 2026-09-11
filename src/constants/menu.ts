import type { Product, Category } from "@/types/product";
import { ALL_BURGERS, toProduct } from "@/constants/burgers";
import { ALL_PIZZAS, toPizzaProduct } from "@/constants/pizzas";

export const CATEGORIES: { label: Category; icon: string; blurb: string }[] = [
  { label: "BEEF", icon: "Hamburger", blurb: "Smash patties & brisket-built stacks" },
  { label: "CHICKEN", icon: "Flame", blurb: "Zinger-crisp fillets & grilled loads" },
  { label: "PIZZA", icon: "Pizza", blurb: "Wood-fired, leopard-spotted crusts" },
  { label: "SIDES", icon: "BowlFood", blurb: "Loaded fries & street sharables" },
];

export const ORDER = {
  LIMITED: "LIMITED DROP",
  BESTSELLER: "BESTSELLER",
  FIRE: "FIRE LEVEL 3",
} as const;

export const CURRENCY = "Rs";

export const products: Product[] = [
  {
    id: "double-smashed-beast",
    slug: "double-smashed-beast",
    name: "Double Smashed Beast",
    category: "BEEF",
    price: 1490,
    image: "/images/smash-burger.jpeg",
    imageAlt:
      "Double smashed beef patties with melted cheddar, bacon and special sauce on a brioche bun",
    tagline: "Two patties, seared hard. No apologies.",
    description:
      "Double-smash Angus patties, molten cheddar, crispy bacon, caramelized onions and our secret nitro sauce on a toasted brioche crown. Built like a machine, eaten like a meal.",
    calories: 980,
    badges: ["bestseller"],
    options: [
      {
        id: "patty",
        label: "PATTY",
        required: true,
        choices: [
          { id: "double", label: "Double Smash", price: 0, default: true },
          { id: "triple", label: "Triple Smash", price: 450 },
          { id: "beast", label: "Quad Beast", price: 900 },
        ],
      },
      {
        id: "cheese",
        label: "CHEESE",
        required: true,
        choices: [
          { id: "cheddar", label: "Cheddar", price: 0, default: true },
          { id: "american", label: "American", price: 0 },
          { id: "smoked", label: "Smoked Gouda", price: 120 },
        ],
      },
      {
        id: "sauce",
        label: "SAUCE",
        required: false,
        choices: [
          { id: "nitro", label: "Nitro Sauce", price: 0, default: true },
          { id: "chipotle", label: "Chipotle Fire", price: 0 },
          { id: "garlic-mayo", label: "Garlic Mayo", price: 0 },
        ],
      },
      {
        id: "extra",
        label: "EXTRAS",
        required: false,
        choices: [
          { id: "bacon", label: "Extra Bacon", price: 250 },
          { id: "jalapeno", label: "Jalapeños", price: 90 },
          { id: "egg", label: "Fried Egg", price: 150 },
        ],
      },
    ],
  },
  {
    id: "fire-zinger-stack",
    slug: "fire-zinger-stack",
    name: "Fire Zinger Stack",
    category: "CHICKEN",
    price: 1190,
    image: "/images/zinger-burger.jpg",
    imageAlt:
      "Crispy fried zinger fillet with iceberg lettuce and spicy sauce in a toasted brioche bun",
    tagline: "Crackling-crisp fillet, dripping with heat.",
    description:
      "Ultra-crispy buttermilk-spiked zinger fillet, shredded iceberg, molten cheddar and creamy fire sauce in a glossy brioche crown. Three levels of burn, one very good idea.",
    calories: 840,
    badges: ["spicy"],
    options: [
      {
        id: "heat",
        label: "HEAT LEVEL",
        required: true,
        choices: [
          { id: "mild", label: "Level 1 · Mild", price: 0 },
          { id: "hot", label: "Level 2 · Hot", price: 0, default: true },
          { id: "inferno", label: "Level 3 · Inferno", price: 150 },
        ],
      },
      {
        id: "extra",
        label: "EXTRAS",
        required: false,
        choices: [
          { id: "double-fillet", label: "Double Fillet", price: 400 },
          { id: "cheese", label: "Cheese Slice", price: 120 },
        ],
      },
    ],
  },
  {
    id: "chicken-fajita-pizza",
    slug: "chicken-fajita-pizza",
    name: "Chicken Fajita Pizza",
    category: "PIZZA",
    price: 1790,
    image: "/images/fajita-pizza.jpg",
    imageAlt: "Wood-fired chicken fajita pizza with peppers and molten cheese pull",
    tagline: "Grilled fajita chicken, blistered crust.",
    description:
      "Wood-fired leopard-spotted crust, fajita-seared chicken, roasted bell peppers, sautéed onions and a molten three-cheese crown. Cut, pulled, gone.",
    calories: 1120,
    badges: ["bestseller"],
    options: [
      {
        id: "size",
        label: "SIZE",
        required: true,
        choices: [
          { id: "medium", label: "Medium 12″", price: 0, default: true },
          { id: "large", label: "Large 16″", price: 500 },
        ],
      },
      {
        id: "extras",
        label: "EXTRAS",
        required: false,
        choices: [
          { id: "extra-cheese", label: "Extra Cheese", price: 250 },
          { id: "jalapeno", label: "Jalapeños", price: 100 },
          { id: "olives", label: "Black Olives", price: 120 },
        ],
      },
    ],
  },
  {
    id: "tikka-pizza",
    slug: "tikka-pizza",
    name: "Chicken Tikka Pizza",
    category: "PIZZA",
    price: 1850,
    image: "/images/tikka-pizza.jpg",
    imageAlt: "Charred chicken tikka pizza with tandoori chicken and blistered crust",
    tagline: "Tandoori char, straight off the fire.",
    description:
      "Juicy charred tandoori tikka chunks, smoky shawarma spices, melted mozzarella strings and fresh peppers on a blistered hand-stretched base.",
    calories: 1180,
    badges: ["spicy"],
    options: [
      {
        id: "size",
        label: "SIZE",
        required: true,
        choices: [
          { id: "medium", label: "Medium 12″", price: 0, default: true },
          { id: "large", label: "Large 16″", price: 500 },
        ],
      },
    ],
  },
  {
    id: "malai-boti-pizza",
    slug: "malai-boti-pizza",
    name: "Malai Boti Pizza",
    category: "PIZZA",
    price: 1990,
    image: "/images/malai-boti-pizza.jpg",
    imageAlt: "Creamy malai chicken boti pizza drizzled with decadent white sauce",
    tagline: "Velvety malai boti, cream-drizzled.",
    description:
      "Tender malai chicken boti cubes, a decadent cream drizzle, fresh herbs and cracked pepper over a wood-fired bubbly crust. Rich, rare and resented when shared.",
    calories: 1240,
    badges: ["new"],
    options: [
      {
        id: "size",
        label: "SIZE",
        required: true,
        choices: [
          { id: "medium", label: "Medium 12″", price: 0, default: true },
          { id: "large", label: "Large 16″", price: 500 },
        ],
      },
    ],
  },
  {
    id: "cheese-crust-pizza",
    slug: "cheese-crust-pizza",
    name: "Malikan Cheese Crust",
    category: "PIZZA",
    price: 2090,
    image: "/images/cheese-crust-pizza.jpg",
    imageAlt: "Gourmet stuffed-crust pizza with bubbling cream cheese crown",
    tagline: "A crown of cream cheese. Handling optional.",
    description:
      "A thick stuffed crown edge oozing molten cream cheese, rich creamy base, golden bubbled mozzarella and succulent spiced chicken. Close the lid when you eat it.",
    calories: 1360,
    badges: ["bestseller"],
    options: [
      {
        id: "size",
        label: "SIZE",
        required: true,
        choices: [
          { id: "medium", label: "Medium 12″", price: 0, default: true },
          { id: "large", label: "Large 16″", price: 550 },
        ],
      },
      {
        id: "stuffing",
        label: "STUFFING",
        required: true,
        choices: [
          { id: "cream-cheese", label: "Cream Cheese", price: 0, default: true },
          { id: "cheddar", label: "Cheddar Crown", price: 150 },
          { id: "mixed", label: "Mixed Crown", price: 250 },
        ],
      },
    ],
  },
  {
    id: "peri-loaded-fries",
    slug: "peri-loaded-fries",
    name: "Peri Loaded Fries",
    category: "SIDES",
    price: 690,
    image: "/images/loaded-fries.jpg",
    imageAlt: "Golden fries loaded with peri masala, garlic mayo and cheese sauce",
    tagline: "A basket of chaos, fully loaded.",
    description:
      "Crispy golden fries dusted with fiery peri masala, drowned in garlic mayo and molten cheese sauce, finished with spring onions. Fork optional, commitment required.",
    calories: 760,
    badges: ["spicy"],
    options: [
      {
        id: "add",
        label: "ADD-ONS",
        required: false,
        choices: [
          { id: "chicken", label: "Charred Chicken", price: 350 },
          { id: "chilli", label: "Extra Peri Rub", price: 80 },
          { id: "cheese", label: "Double Cheese", price: 150 },
        ],
      },
    ],
  },
  {
    id: "paratha-rolls",
    slug: "paratha-rolls",
    name: "Crispy Paratha Rolls",
    category: "SIDES",
    price: 790,
    image: "/images/paratha-rolls.jpg",
    imageAlt: "Crispy fried chicken paratha rolls loaded with mozzarella and jalapeños",
    tagline: "Fried, stuffed, loaded.",
    description:
      "Layers of golden fried paratha wrapped around spiced fried chicken, molten mozzarella and a jalapeño-spiked drizzle. A whole street food cart in one roll.",
    calories: 890,
    badges: ["new"],
    options: [
      {
        id: "pack",
        label: "PACK",
        required: true,
        choices: [
          { id: "single", label: "Single Roll", price: 0, default: true },
          { id: "double", label: "Double Roll", price: 500 },
          { id: "basket", label: "Basket of 4", price: 1700 },
        ],
      },
    ],
  },
  {
    id: "triple-club-stack",
    slug: "triple-club-stack",
    name: "Triple Club Stack",
    category: "CHICKEN",
    price: 1350,
    image: "/images/club-sandwich.jpg",
    imageAlt: "Triple-decker toasted club sandwich with golden cheese grilled halves",
    tagline: "Three decks of toasted, grilled goodness.",
    description:
      "A triple-decker of grilled chicken, toasted sourdough, molten cheese and crisp salad, cut diagonal with olives on sticks. Served with golden fries and zero regrets.",
    calories: 1050,
    badges: ["bestseller"],
    options: [
      {
        id: "bread",
        label: "BREAD",
        required: true,
        choices: [
          { id: "sourdough", label: "Toasted Sourdough", price: 0, default: true },
          { id: "brioche", label: "Brioche Loaf", price: 150 },
        ],
      },
    ],
  },
];

export const ALL_PRODUCTS: Product[] = [
  ...products,
  ...ALL_BURGERS.map(toProduct),
  ...ALL_PIZZAS.map(toPizzaProduct),
];

const catalog = ALL_PRODUCTS;

export const getProductById = (id: string): Product | undefined =>
  catalog.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  catalog.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category | "ALL"): Product[] =>
  category === "ALL"
    ? products
    : products.filter((p) => p.category === category);

export const formatPrice = (value: number): string =>
  `${CURRENCY} ${value.toLocaleString("en-IN")}`;