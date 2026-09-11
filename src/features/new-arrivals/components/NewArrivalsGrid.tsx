"use client";

import { NEW_ARRIVALS } from "@/constants/new-arrivals";
import { NewArrivalCard } from "./NewArrivalCard";

export function NewArrivalsGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {NEW_ARRIVALS.map((item, index) => (
          <NewArrivalCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
