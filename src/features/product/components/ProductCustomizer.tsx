"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag, Check, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Product } from "@/types/product";
import { useCart } from "@/features/cart/context/CartContext";
import { DrinkCompanion } from "@/features/drinks/components/DrinkCompanion";
import { ALL_DRINKS } from "@/constants/drinks";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/constants/menu";
import { ProductGrid } from "@/features/menu/components/ProductGrid";

interface ProductCustomizerProps {
  product: Product;
}

export function ProductCustomizer({ product }: ProductCustomizerProps) {
  const reduce = useReducedMotion();
  const { addItem, openTray } = useCart();

  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    for (const group of product.options) {
      initial[group.id] = group.choices
        .filter((c) => c.default)
        .map((c) => c.id);
    }
    return initial;
  });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pickedDrinks, setPickedDrinks] = useState<string[]>([]);

  const selectedSizeId = selected["size"]?.[0];

  const unitPrice = useMemo(() => {
    let total = product.price;
    for (const group of product.options) {
      for (const choice of group.choices) {
        if (selected[group.id]?.includes(choice.id)) {
          total += choice.priceBySize?.[selectedSizeId] ?? choice.price;
        }
      }
    }
    return total;
  }, [product, selected, selectedSizeId]);

  const toggleChoice = (groupId: string, choiceId: string, required: boolean) => {
    setSelected((prev) => {
      const current = prev[groupId] ?? [];
      if (required) {
        return { ...prev, [groupId]: [choiceId] };
      }
      return {
        ...prev,
        [groupId]: current.includes(choiceId)
          ? current.filter((id) => id !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  const buildSummary = (): string[] => {
    const parts: string[] = [];
    for (const group of product.options) {
      const picked = group.choices.filter((c) => selected[group.id]?.includes(c.id));
      if (picked.length > 0) {
        parts.push(picked.map((c) => c.label).join(" + "));
      }
    }
    return parts;
  };

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice,
      quantity: qty,
      options: selected,
      optionsSummary: buildSummary(),
    });
    for (const key of pickedDrinks) {
      const drink = ALL_DRINKS.find((d) => d.key === key);
      if (!drink) continue;
      addItem({
        productId: drink.key,
        name: drink.name,
        image: drink.image,
        unitPrice: drink.unitPrice,
        quantity: 1,
        options: drink.options,
        optionsSummary: drink.optionsSummary,
      });
    }
    setAdded(true);
    setTimeout(() => openTray(), 400);
  };

  return (
    <section className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back to the fuel line
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative self-start overflow-hidden rounded-md border border-surface-high bg-surface-2"
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={960}
              height={960}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} type={badge} />
              ))}
            </div>
            <div className="absolute right-4 top-4 rounded-sm bg-canvas/85 px-3 py-1.5 font-display text-xs uppercase tracking-[0.08em] text-text-soft backdrop-blur-md">
              {product.calories} CAL
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-xs uppercase tracking-[0.1em] text-muted-deep">
              {product.category} · {product.calories} cal
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-soft">{product.tagline}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{product.description}</p>

            <div className="mt-8 space-y-8">
              {product.options.map((group) => (
                <fieldset key={group.id}>
                  <legend className="font-display text-sm uppercase tracking-[0.08em] text-white">
                    {group.label}
                    {group.required && (
                      <span className="ml-2 text-muted-deep">· REQUIRED</span>
                    )}
                  </legend>
                  <div
                    role={group.required ? "radiogroup" : undefined}
                    className="mt-3 flex flex-wrap gap-2.5"
                  >
                    {group.choices.map((choice) => {
                      const isPicked = selected[group.id]?.includes(choice.id) ?? false;
                      const choicePrice = choice.priceBySize?.[selectedSizeId] ?? choice.price;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          role={group.required ? "radio" : undefined}
                          aria-checked={isPicked}
                          aria-label={`${choice.label}${choicePrice > 0 ? `, add ${formatPrice(choicePrice)}` : ""}`}
                          onClick={() => toggleChoice(group.id, choice.id, group.required)}
                          className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm transition-all duration-200 active:scale-[0.98] ${
                            isPicked
                              ? "border-primary bg-primary/15 text-white shadow-[0_0_12px_rgba(224,30,38,0.2)]"
                              : "border-surface-high bg-surface text-muted hover:border-muted-deep hover:text-text-soft"
                          }`}
                        >
                          {isPicked && (
                            <Check size={14} weight="bold" className="text-primary" aria-hidden="true" />
                          )}
                          {choice.label}
                          {choicePrice > 0 && (
                            <span className={isPicked ? "text-amber" : "text-muted-deep"}>
                              +{formatPrice(choicePrice)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}

              <div className="border-t border-surface-high pt-6">
                <p className="font-display text-[11px] uppercase tracking-[0.08em] text-amber sm:text-xs">
                  Quench it
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Add a soft drink or a chiller to your tray.
                </p>
                <div className="mt-4">
                  <DrinkCompanion picked={pickedDrinks} onChange={setPickedDrinks} />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-md border border-surface-high bg-surface p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Total</p>
                <p className="font-display text-3xl text-amber" aria-live="polite">
                  {formatPrice(unitPrice * qty)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-11 place-items-center rounded-sm border border-surface-high bg-surface-2 font-display text-lg text-text-soft transition-all hover:border-amber hover:text-amber active:scale-90"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center font-display text-xl text-white" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="grid size-11 place-items-center rounded-sm border border-surface-high bg-surface-2 font-display text-lg text-text-soft transition-all hover:border-amber hover:text-amber active:scale-90"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.4)] active:scale-[0.99]"
            >
              <ShoppingBag size={20} weight="bold" aria-hidden="true" />
              {added ? "Added to tray" : `Add to tray · ${formatPrice(unitPrice * qty)}`}
            </button>
          </motion.div>
        </div>

        <div className="mt-24 border-t border-surface-high pt-16">
          <h2 className="font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
            Keep the line moving
          </h2>
          <div className="mt-8">
            <ProductGrid />
          </div>
        </div>
      </div>
    </section>
  );
}