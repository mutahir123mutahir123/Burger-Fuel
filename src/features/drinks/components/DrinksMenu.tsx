"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { DrinkEntry } from "@/constants/drinks";
import { ALL_DRINKS } from "@/constants/drinks";
import { formatPrice } from "@/constants/menu";
import { useCart } from "@/features/cart/context/CartContext";
import { Chip } from "@/components/ui/Chip";

interface DrinkGroupOption {
  label: string;
  name: string;
}

const DRINK_SUB_CATEGORIES: readonly DrinkGroupOption[] = [
  { label: "soft-drink", name: "Soft Drinks" },
  { label: "chiller", name: "Chillers" },
] as const;

const SOFT_DRINKS = ALL_DRINKS.filter((d) => d.group === "soft-drink");
const CHILLERS = ALL_DRINKS.filter((d) => d.group === "chiller");

export function DrinksMenu() {
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const [activeSub, setActiveSub] = useState<string>("ALL");

  const items =
    activeSub === "ALL" ? ALL_DRINKS : activeSub === "soft-drink" ? SOFT_DRINKS : CHILLERS;

  const handleAdd = (drink: DrinkEntry) => {
    addItem({
      productId: drink.key,
      name: drink.name,
      image: drink.image,
      unitPrice: drink.unitPrice,
      quantity: 1,
      options: drink.options,
      optionsSummary: drink.optionsSummary,
    });
  };

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
            Pick your thirst
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
            Drinks
          </h2>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Drinks sub-categories">
        <Chip
          active={activeSub === "ALL"}
          onClick={() => setActiveSub("ALL")}
          role="tab"
          aria-selected={activeSub === "ALL"}
        >
          ALL
        </Chip>
        {DRINK_SUB_CATEGORIES.map((sub) => (
          <Chip
            key={sub.label}
            active={activeSub === sub.label}
            onClick={() => setActiveSub(sub.label)}
            role="tab"
            aria-selected={activeSub === sub.label}
          >
            {sub.name}
          </Chip>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3" aria-live="polite">
        {items.map((drink, index) => (
          <motion.article
            key={drink.key}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-md border border-surface-high bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(224,30,38,0.25)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
              <Image
                src={drink.image}
                alt={drink.imageAlt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
              />
            </div>

            <div className="flex flex-1 flex-col p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-display text-sm uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
                    {drink.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted sm:text-sm">{drink.detail}</p>
                </div>
                <p className="shrink-0 font-display text-sm text-amber sm:text-lg">
                  {formatPrice(drink.unitPrice)}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-surface-high pt-3 sm:mt-4 sm:pt-4">
                <span className="font-display text-[11px] uppercase tracking-[0.08em] text-muted-deep sm:text-xs">
                  {drink.group === "chiller" ? "Chiller" : "Soft Drink"}
                </span>
                <button
                  type="button"
                  onClick={() => handleAdd(drink)}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 font-display text-xs uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02] active:scale-[0.98] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <Plus size={14} weight="bold" aria-hidden="true" className="sm:hidden" />
                  <Plus size={16} weight="bold" aria-hidden="true" className="hidden sm:block" />
                  Add to tray
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}