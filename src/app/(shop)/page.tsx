import type { Metadata } from "next";
import { Hero } from "@/features/home/components/Hero";
import { MarqueeTicker } from "@/features/home/components/MarqueeTicker";
import { CategoryCarousel } from "@/features/home/components/CategoryCarousel";
import { Showcase } from "@/features/home/components/Showcase";
import { Story } from "@/features/home/components/Story";
import { Reviews } from "@/features/home/components/Reviews";
import { FindUs } from "@/features/home/components/FindUs";
import { OrderCta } from "@/features/home/components/OrderCta";
import { pageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/constants/site";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <div className="py-20 md:py-24">
        <CategoryCarousel />
      </div>
      <div className="py-20 md:py-24">
        <Showcase />
      </div>
      <div className="py-20 md:py-24">
        <Story />
      </div>
      <div className="py-20 md:py-24">
        <Reviews />
      </div>
      <div className="py-20 md:py-24">
        <FindUs />
      </div>
      <OrderCta />
    </>
  );
}