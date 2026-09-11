import { z } from "zod";

const FULFILMENTS = ["delivery", "pickup"] as const;
const PAYMENT_METHODS = ["cod", "card"] as const;

export const createOrderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  customerPhone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Phone number contains invalid characters"),
  fulfilment: z.enum(FULFILMENTS),
  paymentMethod: z.enum(PAYMENT_METHODS),
  deliveryArea: z.string().trim().max(150).optional().nullable(),
  deliveryStreet: z.string().trim().max(150).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1).max(100),
        name: z.string().min(1).max(200),
        image: z.string().min(1).max(500),
        unitPrice: z.number().int().nonnegative().max(100000),
        quantity: z.number().int().positive().max(100),
        options: z.record(z.string(), z.array(z.string())),
        optionsSummary: z.array(z.string()),
      })
    )
    .min(1, "Order must contain at least one item")
    .max(50, "Too many items in one order"),
});