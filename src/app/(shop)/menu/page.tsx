import type { Metadata } from "next";
import { FullMenuPage } from "@/features/menu/components/FullMenuPage";
import { pageMetadata } from "@/constants/site";

export const metadata: Metadata = pageMetadata({
  path: "/menu",
  title: "Full Menu",
  description:
    "Browse the complete Burger Fuel menu — burgers, deals, fries, new arrivals, wraps, pastas, sandwiches, crunch & munch. Every item, one page.",
});

export default function MenuRoute() {
  return <FullMenuPage />;
}
