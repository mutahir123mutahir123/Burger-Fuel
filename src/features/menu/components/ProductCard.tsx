"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/constants/menu";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onAdd, index = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-surface-high bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(224,30,38,0.25)]"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-surface-2"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
        {product.badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
            {product.badges.map((badge) => (
              <Badge key={badge} type={badge} />
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-sm uppercase leading-tight tracking-[0.02em] text-white sm:text-xl">
              <Link href={`/product/${product.slug}`} className="transition-colors hover:text-amber">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 font-display text-sm text-amber sm:text-lg">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="mt-1 hidden flex-1 text-sm leading-relaxed text-muted sm:block">
          {product.tagline}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-surface-high pt-3 sm:mt-4 sm:pt-4">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-white sm:text-xs"
          >
            Customize
          </Link>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 font-display text-xs uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02] active:scale-[0.98] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Plus size={14} weight="bold" aria-hidden="true" className="sm:hidden" />
            <Plus size={16} weight="bold" aria-hidden="true" className="hidden sm:block" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}