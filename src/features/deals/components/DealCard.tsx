"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Deal } from "@/constants/deals";
import { formatPrice } from "@/constants/menu";

interface DealCardProps {
  deal: Deal;
  onAdd: (deal: Deal) => void;
  index?: number;
}

export function DealCard({ deal, onAdd, index = 0 }: DealCardProps) {
  const reduce = useReducedMotion();

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
          src={deal.image}
          alt={deal.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-amber px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.08em] text-black">
            SAVE {formatPrice(0)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
            {deal.name}
          </h3>
          <p className="shrink-0 font-display text-base text-amber sm:text-lg">
            {formatPrice(deal.price)}
          </p>
        </div>

        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
          {deal.description}
        </p>

        <div className="mt-3 border-t border-surface-high pt-3 sm:mt-4 sm:pt-4">
          <button
            type="button"
            onClick={() => onAdd(deal)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 font-display text-sm uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} weight="bold" aria-hidden="true" />
            Add Deal
          </button>
        </div>
      </div>
    </motion.article>
  );
}
