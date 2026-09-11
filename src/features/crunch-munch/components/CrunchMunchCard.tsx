"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { CrunchMunchItem } from "@/constants/crunch-munch";
import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";
import { formatPrice } from "@/constants/menu";

interface CrunchMunchCardProps {
  item: CrunchMunchItem;
  index?: number;
}

export function CrunchMunchCard({ item, index = 0 }: CrunchMunchCardProps) {
  const reduce = useReducedMotion();
  const { order } = useDrinkOrder();
  const [selectedSize, setSelectedSize] = useState(0);

  const currentSize = item.sizes[selectedSize];

  const handleAdd = () => {
    order({
      productId: item.id,
      name: `${item.name} (${currentSize.label})`,
      image: item.image,
      unitPrice: currentSize.price,
      quantity: 1,
      options: { size: [currentSize.label] },
      optionsSummary: [currentSize.label],
    });
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-surface-high bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(224,30,38,0.25)]"
    >
      <div className="relative block aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
            {item.name}
          </h3>
          <p className="shrink-0 font-display text-base text-amber sm:text-lg">
            {formatPrice(currentSize.price)}
          </p>
        </div>

        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
          {item.tagline}
        </p>

        <fieldset className="mt-4 border-t border-surface-high pt-4">
          <legend className="font-display text-[11px] uppercase tracking-[0.08em] text-white sm:text-xs">
            Choose size
          </legend>
          <div className="mt-2.5 flex gap-2">
            {item.sizes.map((size, i) => (
              <button
                key={size.label}
                type="button"
                onClick={() => setSelectedSize(i)}
                className={`flex-1 rounded-sm border px-3 py-2 font-display text-[11px] uppercase tracking-[0.06em] transition-all duration-200 active:scale-[0.97] sm:text-xs ${
                  selectedSize === i
                    ? "border-primary bg-primary/15 text-white shadow-[0_0_10px_rgba(224,30,38,0.2)]"
                    : "border-surface-high bg-surface text-muted hover:border-muted-deep hover:text-text-soft"
                }`}
              >
                {size.label}
                <span className="ml-1 text-amber">{formatPrice(size.price)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 border-t border-surface-high pt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-display text-sm uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02] active:scale-[0.98] sm:text-base"
          >
            <Plus size={16} weight="bold" aria-hidden="true" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}
