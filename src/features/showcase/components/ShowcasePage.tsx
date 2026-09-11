"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretRight, MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import type { ShowcaseCategory } from "@/constants/showcase";
import { SHOWCASE_CATEGORIES } from "@/constants/showcase";
import { ShowcaseCard } from "@/features/home/components/ShowcaseCard";

interface ShowcasePageProps {
  category: ShowcaseCategory;
}

export function ShowcasePage({ category }: ShowcasePageProps) {
  const otherCategories = SHOWCASE_CATEGORIES.filter((c) => c.slug !== category.slug);

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

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-md border border-surface-high bg-surface p-4">
          <MapPin size={18} weight="bold" className="text-primary" aria-hidden="true" />
          <div>
            <p className="font-display text-sm uppercase tracking-[0.06em] text-white">Location</p>
            <p className="text-xs text-muted">Tokey Wala Chowk, Shad Bagh, Lahore</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-surface-high bg-surface p-4">
          <Clock size={18} weight="bold" className="text-amber" aria-hidden="true" />
          <div>
            <p className="font-display text-sm uppercase tracking-[0.06em] text-white">Open</p>
            <p className="text-xs text-muted">12:00 PM – 2:00 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-surface-high bg-surface p-4">
          <Phone size={18} weight="bold" className="text-mustard" aria-hidden="true" />
          <div>
            <p className="font-display text-sm uppercase tracking-[0.06em] text-white">Order</p>
            <p className="text-xs text-muted">
              <a href="tel:+923292833343" className="transition-colors hover:text-amber">
                +92 329 2833343
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="font-display text-xs uppercase tracking-[0.1em] text-muted-deep">
          Menu coming soon
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
          This lineup is being cooked up
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We are frying, grilling and saucing the full {category.name} lineup. Check back soon
          for the complete menu.
        </p>
        <Link
          href="/#conquests"
          className="mt-8 inline-flex items-center gap-2 rounded bg-primary px-8 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
        >
          Back to conquests
        </Link>
      </div>

      <div className="mt-24 border-t border-surface-high pt-16">
        <h3 className="font-display text-2xl uppercase tracking-[0.03em] text-white md:text-3xl">
          Other lanes to explore
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherCategories.map((cat, i) => (
            <ShowcaseCard
              key={cat.slug}
              name={cat.name}
              image={cat.image}
              href={`/${cat.slug}`}
              blurb={cat.blurb}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
