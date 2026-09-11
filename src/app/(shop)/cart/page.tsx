import type { Metadata } from "next";
import { CartPage } from "@/features/cart/components/CartPage";
import { pageMetadata } from "@/constants/site";

export const metadata: Metadata = pageMetadata({
  path: "/cart",
  title: "Your Tray",
  description: "Review your Burger Fuel tray before checkout.",
});

export default function Page() {
  return <CartPage />;
}