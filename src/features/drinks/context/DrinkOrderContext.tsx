"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Image from "next/image";
import type { CartItem } from "@/types/product";
import { useCart } from "@/features/cart/context/CartContext";
import { Drawer } from "@/components/ui/Drawer";
import { DrinkCompanion } from "@/features/drinks/components/DrinkCompanion";
import { ALL_DRINKS } from "@/constants/drinks";
import { formatPrice } from "@/constants/menu";

type FoodItem = Omit<CartItem, "key">;

interface DrinkOrderContextValue {
  order: (item: FoodItem) => void;
}

const DrinkOrderContext = createContext<DrinkOrderContextValue | null>(null);

export function DrinkOrderProvider({ children }: { children: React.ReactNode }) {
  const { addItem, openTray } = useCart();
  const [pending, setPending] = useState<FoodItem | null>(null);
  const [picked, setPicked] = useState<string[]>([]);

  const order = useCallback((item: FoodItem) => {
    setPending(item);
    setPicked([]);
  }, []);

  const confirm = () => {
    if (!pending) return;
    addItem(pending);
    for (const key of picked) {
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
    setPending(null);
    setPicked([]);
    openTray();
  };

  const drinksTotal = picked.reduce((sum, key) => {
    const drink = ALL_DRINKS.find((d) => d.key === key);
    return sum + (drink?.unitPrice ?? 0);
  }, 0);

  const value = useMemo<DrinkOrderContextValue>(() => ({ order }), [order]);

  return (
    <DrinkOrderContext.Provider value={value}>
      {children}

      <Drawer
        open={pending !== null}
        onClose={() => setPending(null)}
        title="Quench it"
        side="bottom"
        footer={
          pending
            ? (
                <div className="p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={confirm}
                    className="flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.4)] active:scale-[0.99]"
                  >
                    {picked.length === 0
                      ? `Add to tray · ${formatPrice(pending.unitPrice)}`
                      : `Add order · ${formatPrice(pending.unitPrice + drinksTotal)}`}
                  </button>
                  {picked.length > 0 ? (
                    <p role="status" className="mt-2 text-center text-xs text-muted">
                      {picked.length} drink{picked.length > 1 ? "s" : ""} · {formatPrice(drinksTotal)}
                    </p>
                  ) : (
                    <p className="mt-2 text-center text-xs text-muted-deep">
                      No drink? Add yours later — this adds just the item.
                    </p>
                  )}
                </div>
              )
            : undefined
        }
      >
        {pending && (
          <div className="flex flex-col">
            <div className="flex items-center gap-4 border-b border-surface-high px-5 py-4">
              <Image
                src={pending.image}
                alt={pending.name}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-sm border border-surface-high object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate font-display text-sm uppercase tracking-[0.03em] text-white">
                  {pending.name}
                </h3>
                {pending.optionsSummary.length > 0 && (
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                    {pending.optionsSummary.join(" · ")}
                  </p>
                )}
                <p className="mt-1 font-display text-sm text-amber">{formatPrice(pending.unitPrice)}</p>
              </div>
            </div>

            <div className="px-5 py-5">
              <p className="font-display text-sm uppercase tracking-[0.08em] text-white">
                Add a drink
              </p>
              <p className="mt-1 text-sm text-muted">
                Pair it with your order — or skip and order food only.
              </p>
              <div className="mt-4">
                <DrinkCompanion picked={picked} onChange={setPicked} />
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </DrinkOrderContext.Provider>
  );
}

export function useDrinkOrder(): DrinkOrderContextValue {
  const ctx = useContext(DrinkOrderContext);
  if (!ctx) throw new Error("useDrinkOrder must be used within DrinkOrderProvider");
  return ctx;
}