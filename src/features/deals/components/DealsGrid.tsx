"use client";

import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";
import { DEALS } from "@/constants/deals";
import { DealCard } from "./DealCard";

export function DealsGrid() {
  const { order } = useDrinkOrder();

  const handleAdd = (deal: (typeof DEALS)[number]) => {
    order({
      productId: deal.id,
      name: deal.name,
      image: deal.image,
      unitPrice: deal.price,
      quantity: 1,
      options: {},
      optionsSummary: [deal.description],
    });
  };

  return (
    <section className="mt-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {DEALS.map((deal, index) => (
          <DealCard key={deal.id} deal={deal} onAdd={handleAdd} index={index} />
        ))}
      </div>
    </section>
  );
}
