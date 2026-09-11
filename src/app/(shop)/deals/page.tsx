import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { SHOWCASE_CATEGORIES } from "@/constants/showcase";
import { pageMetadata } from "@/constants/site";
import { DealsGrid } from "@/features/deals/components/DealsGrid";
import { OtherLanes } from "@/components/shared/OtherLanes";

const SLUG = "deals";

const category = SHOWCASE_CATEGORIES.find((c) => c.slug === SLUG);

export const metadata: Metadata = pageMetadata({
  path: "/deals",
  title: category?.name ?? "Deals",
  description: `${category?.blurb ?? ""}. Explore the ${category?.name ?? "Deals"} menu at Burger Fuel, Shad Bagh, Lahore.`,
  image: category?.image,
});

export default function DealsRoute() {
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-28">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          href="/"
          className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
        >
          Home
        </Link>
        <CaretRight size={12} weight="bold" className="text-muted-deep" aria-hidden="true" />
        <span className="font-display text-xs uppercase tracking-[0.08em] text-white">
          {category.name}
        </span>
      </nav>

      <div className="mt-8 overflow-hidden rounded-md border border-surface-high bg-surface-2">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
          <Image
            src={category.image}
            alt={`${category.name} category`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <h1 className="font-display text-4xl uppercase tracking-[0.03em] text-white md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted md:text-base">{category.blurb}</p>
          </div>
        </div>
      </div>

      <DealsGrid />

      <OtherLanes currentSlug={SLUG} />
    </div>
  );
}
