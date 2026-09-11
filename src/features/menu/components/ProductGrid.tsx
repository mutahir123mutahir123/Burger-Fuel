"use client";

import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";
import { useProducts } from "@/features/menu/hooks/useProducts";
import { ProductCard } from "@/features/menu/components/ProductCard";
import { MenuFilters } from "@/features/menu/components/MenuFilters";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

export function ProductGrid() {
  const { products, loading, error, activeCategory, setCategory, categories, refetch } =
    useProducts();
  const { order } = useDrinkOrder();

  const handleAdd = (product: (typeof products)[number]) => {
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
    <section id="menu" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
          The fuel line
        </h2>
        <p className="mt-3 max-w-xl text-base text-muted">
          Pick a lane. Every item is built to order, fired on demand.
        </p>

        <div className="mt-6">
          <MenuFilters
            active={activeCategory}
            onChange={setCategory}
            categories={categories}
            loading={loading}
          />
        </div>

        <div className="mt-8" aria-live="polite">
          {loading ? (
            <ProductGridSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center gap-4 rounded-md border border-primary/40 bg-surface p-10 text-center">
              <WarningCircle size={32} weight="bold" className="text-amber" aria-hidden="true" />
              <p className="text-text-soft">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center rounded-sm border-2 border-amber px-5 py-2.5 font-display text-sm uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber hover:text-black"
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-md border border-surface-high bg-surface p-10 text-center">
              <p className="font-display text-lg uppercase tracking-[0.04em] text-white">
                No items in this lane
              </p>
              <p className="max-w-sm text-sm text-muted">
                Nothing is cooked in that category yet — try another one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAdd}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}