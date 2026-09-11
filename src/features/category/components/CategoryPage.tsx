"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { CategoryDef } from "@/constants/categories";
import { CATEGORIES } from "@/constants/categories";
import { CategoryCard } from "@/features/home/components/CategoryCard";
import {
  ALL_BURGERS,
  BURGER_SUB_CATEGORIES,
  toProduct,
  getBurgersBySubCategory,
  type BurgerSubCategory,
} from "@/constants/burgers";
import {
  ALL_PIZZAS,
  PIZZA_SUB_CATEGORIES,
  toPizzaProduct,
  getPizzasBySubCategory,
  type PizzaSubCategory,
} from "@/constants/pizzas";
import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";
import type { Product } from "@/types/product";
import { CategoryMenu } from "./CategoryMenu";

interface CategoryPageProps {
  category: CategoryDef;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);
  const isBurgers = category.slug === "burgers";
  const isPizzas = category.slug === "pizzas";
  const hasMenu = isBurgers || isPizzas;
  const { order } = useDrinkOrder();

  const [activeBurgerSub, setActiveBurgerSub] = useState<BurgerSubCategory | "ALL">("ALL");
  const [activePizzaSub, setActivePizzaSub] = useState<PizzaSubCategory | "ALL">("ALL");

  const visibleBurgers = useMemo(
    () => (activeBurgerSub === "ALL" ? ALL_BURGERS : getBurgersBySubCategory(activeBurgerSub)),
    [activeBurgerSub],
  );

  const visiblePizzas = useMemo(
    () => (activePizzaSub === "ALL" ? ALL_PIZZAS : getPizzasBySubCategory(activePizzaSub)),
    [activePizzaSub],
  );

  const handleAdd = (product: Product) => {
    order({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      quantity: 1,
      options: {},
      optionsSummary: [],
    });
  };

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
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Explore Our Kitchen
            </p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted md:text-base">{category.blurb}</p>
          </div>
        </div>
      </div>

      {hasMenu ? (
        <>
          {isBurgers && (
            <CategoryMenu
              eyebrow="Pick your lane"
              title={category.name}
              subCategories={BURGER_SUB_CATEGORIES}
              activeSub={activeBurgerSub}
              onSubChange={(sub) => setActiveBurgerSub(sub as BurgerSubCategory | "ALL")}
              items={visibleBurgers.map(toProduct)}
              onAdd={handleAdd}
            />
          )}
          {isPizzas && (
            <CategoryMenu
              eyebrow="Pick your pie"
              title={category.name}
              subCategories={PIZZA_SUB_CATEGORIES}
              activeSub={activePizzaSub}
              onSubChange={(sub) => setActivePizzaSub(sub as PizzaSubCategory | "ALL")}
              items={visiblePizzas.map(toPizzaProduct)}
              onAdd={handleAdd}
            />
          )}
        </>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-display text-xs uppercase tracking-[0.1em] text-muted-deep">
            Menu coming soon
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
            This category is being cooked up
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            We are frying, grilling and saucing the full {category.name} lineup. Check back soon
            for the complete menu.
          </p>
          <Link
            href="/#menu"
            className="mt-8 inline-flex items-center gap-2 rounded bg-primary px-8 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            Back to the fuel line
          </Link>
        </div>
      )}

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
    </div>
  );
}
