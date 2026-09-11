import type { Metadata } from "next";
import { CheckoutPage } from "@/features/checkout/components/CheckoutPage";
import { pageMetadata } from "@/constants/site";

export const metadata: Metadata = pageMetadata({
  path: "/checkout",
  title: "Checkout",
  description: "Place your Burger Fuel order — delivery or pickup, pay on arrival.",
});

export default function Page() {
  return <CheckoutPage />;
}