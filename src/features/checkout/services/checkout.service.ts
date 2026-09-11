import { z } from "zod";
import { createOrderSchema } from "@/lib/validations";

const STORAGE_KEY = "bf_orders";
const DELIVERY_FEE = 99;
const FREE_DELIVERY_THRESHOLD = 800;

export type PlaceOrderInput = z.infer<typeof createOrderSchema>;

export interface PlacedOrder {
  id: number;
  orderRef: string;
  total: number;
  createdAt: string;
  items: {
    id: number;
    name: string;
    image: string;
    quantity: number;
    unitPrice: number;
  }[];
}

interface StoredOrder {
  id: number;
  orderRef: string;
  customerName: string;
  customerPhone: string;
  fulfilment: "delivery" | "pickup";
  paymentMethod: "cod" | "card";
  deliveryArea: string | null;
  deliveryStreet: string | null;
  note: string | null;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "pending";
  createdAt: string;
  items: {
    id: number;
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    options: Record<string, string[]>;
    optionsSummary: string[];
    lineTotal: number;
  }[];
}

function readOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: StoredOrder[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Storage full or unavailable — order still confirmed for this session.
  }
}

export const checkoutService = {
  placeOrder(input: PlaceOrderInput): Promise<PlacedOrder> {
    const parsed = createOrderSchema.safeParse(input);
    if (!parsed.success) {
      return Promise.reject(new Error("Your order details are incomplete."));
    }

    const data = parsed.data;

    const subtotal = data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const deliveryFee =
      data.fulfilment === "delivery" && subtotal < FREE_DELIVERY_THRESHOLD
        ? DELIVERY_FEE
        : 0;
    const total = subtotal + deliveryFee;

    const orderRef = `FUEL-${Date.now().toString().slice(-6)}${Math.floor(
      Math.random() * 90 + 10
    )}`;
    const createdAt = new Date().toISOString();

    const orders = readOrders();
    const id = orders.reduce((max, order) => Math.max(max, order.id), 0) + 1;

    const storedOrder: StoredOrder = {
      id,
      orderRef,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      fulfilment: data.fulfilment,
      paymentMethod: data.paymentMethod,
      deliveryArea: data.deliveryArea ?? null,
      deliveryStreet: data.deliveryStreet ?? null,
      note: data.note ?? null,
      subtotal,
      deliveryFee,
      total,
      status: "pending",
      createdAt,
      items: data.items.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        name: item.name,
        image: item.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        options: item.options,
        optionsSummary: item.optionsSummary,
        lineTotal: item.unitPrice * item.quantity,
      })),
    };

    writeOrders([...orders, storedOrder]);

    return Promise.resolve({
      id: storedOrder.id,
      orderRef: storedOrder.orderRef,
      total: storedOrder.total,
      createdAt: storedOrder.createdAt,
      items: storedOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });
  },
};