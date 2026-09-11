"use client";

import { CATEGORIES } from "@/constants/categories";
import { CategoryCard } from "@/features/home/components/CategoryCard";

interface OtherLanesProps {
  currentSlug: string;
}

export function OtherLanes({ currentSlug }: OtherLanesProps) {
  const otherCategories = CATEGORIES.filter((c) => c.slug !== currentSlug);

  return (
    <div className="mt-24 border-t border-surface-high pt-16">
      <h3 className="font-display text-2xl uppercase tracking-[0.03em] text-white md:text-3xl">
        Other lanes to explore
      </h3>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherCategories.map((cat, i) => (
          <CategoryCard
            key={cat.slug}
            name={cat.name}
            image={cat.image}
            href={cat.href ?? `/category/${cat.slug}`}
            blurb={cat.blurb}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
