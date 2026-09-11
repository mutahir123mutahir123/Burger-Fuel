export type Category = "BEEF" | "CHICKEN" | "PIZZA" | "SIDES";

export type BadgeType = "bestseller" | "limited" | "spicy" | "new";

export interface ProductOptionChoice {
  id: string;
  label: string;
  price: number;
  default?: boolean;
  /** Surcharge that varies by selected size; keyed by size choice id. */
  priceBySize?: Record<string, number>;
}

export interface ProductOptionGroup {
  id: string;
  label: string;
  required: boolean;
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  calories: number;
  badges: BadgeType[];
  options: ProductOptionGroup[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  options: Record<string, string[]>;
  optionsSummary: string[];
}

export interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openTray: () => void;
  closeTray: () => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  itemCount: number;
}