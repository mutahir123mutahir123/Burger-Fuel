"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Plus, Check } from "@phosphor-icons/react/dist/ssr";
import type { WrapItem } from "@/constants/wraps";
import { WRAP_SAUCES, MAX_SAUCE_SELECTIONS } from "@/constants/wraps";
import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";
import { formatPrice } from "@/constants/menu";

interface WrapCardProps {
  wrap: WrapItem;
  index?: number;
}

export function WrapCard({ wrap, index = 0 }: WrapCardProps) {
  const reduce = useReducedMotion();
  const { order } = useDrinkOrder();
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);

  const toggleSauce = (sauceId: string) => {
    setSelectedSauces((prev) => {
      if (prev.includes(sauceId)) return prev.filter((id) => id !== sauceId);
      if (prev.length >= MAX_SAUCE_SELECTIONS) return prev;
      return [...prev, sauceId];
    });
  };

  const handleAdd = () => {
    const selectedLabels = WRAP_SAUCES.filter((s) => selectedSauces.includes(s.id)).map(
      (s) => s.label,
    );
    order({
      productId: wrap.id,
      name: wrap.name,
      image: wrap.image,
      unitPrice: wrap.price,
      quantity: 1,
      options: { sauce: selectedSauces },
      optionsSummary: selectedLabels.length > 0 ? [`Sauces: ${selectedLabels.join(" + ")}`] : [],
    });
    setSelectedSauces([]);
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
          src={wrap.image}
          alt={wrap.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
            {wrap.name}
          </h3>
          <p className="shrink-0 font-display text-base text-amber sm:text-lg">
            {formatPrice(wrap.price)}
          </p>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{wrap.tagline}</p>

        <fieldset className="mt-4 border-t border-surface-high pt-4">
          <legend className="font-display text-[11px] uppercase tracking-[0.08em] text-white sm:text-xs">
            Choose 2 sauces ·{" "}
            <span className="text-amber">{selectedSauces.length}/{MAX_SAUCE_SELECTIONS}</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {WRAP_SAUCES.map((sauce) => {
              const isPicked = selectedSauces.includes(sauce.id);
              const isDisabled = !isPicked && selectedSauces.length >= MAX_SAUCE_SELECTIONS;
              return (
                <button
                  key={sauce.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => toggleSauce(sauce.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.06em] transition-all duration-200 active:scale-[0.97] sm:text-[11px] ${
                    isPicked
                      ? "border-primary bg-primary/15 text-white shadow-[0_0_10px_rgba(224,30,38,0.2)]"
                      : isDisabled
                        ? "cursor-not-allowed border-surface-high bg-surface text-muted-deep opacity-50"
                        : "border-surface-high bg-surface text-muted hover:border-muted-deep hover:text-text-soft"
                  }`}
                >
                  {isPicked && <Check size={10} weight="bold" className="text-primary" aria-hidden="true" />}
                  {sauce.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 border-t border-surface-high pt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={selectedSauces.length !== MAX_SAUCE_SELECTIONS}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-2.5 font-display text-sm uppercase tracking-[0.06em] text-white transition-all duration-300 active:scale-[0.98] sm:text-base ${
              selectedSauces.length === MAX_SAUCE_SELECTIONS
                ? "bg-primary hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02]"
                : "cursor-not-allowed bg-surface-3 text-muted-deep"
            }`}
          >
            <Plus size={16} weight="bold" aria-hidden="true" />
            {selectedSauces.length === MAX_SAUCE_SELECTIONS ? "Add Wrap" : "Pick 2 sauces first"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
