"use client";

import type { Product } from "@/types/product";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "@/features/menu/components/ProductCard";

interface SubCategoryOption {
  label: string;
  name: string;
}

interface CategoryMenuProps {
  eyebrow: string;
  title: string;
  subCategories: readonly SubCategoryOption[];
  activeSub: string;
  onSubChange: (sub: string) => void;
  items: Product[];
  onAdd: (product: Product) => void;
}

export function CategoryMenu({
  eyebrow,
  title,
  subCategories,
  activeSub,
  onSubChange,
  items,
  onAdd,
}: CategoryMenuProps) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label={`${title} sub-categories`}>
        <Chip
          active={activeSub === "ALL"}
          onClick={() => onSubChange("ALL")}
          role="tab"
          aria-selected={activeSub === "ALL"}
        >
          ALL
        </Chip>
        {subCategories.map((sub) => (
          <Chip
            key={sub.label}
            active={activeSub === sub.label}
            onClick={() => onSubChange(sub.label)}
            role="tab"
            aria-selected={activeSub === sub.label}
          >
            {sub.name}
          </Chip>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3" aria-live="polite">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} index={index} />
        ))}
      </div>
    </section>
  );
}