"use client";

import { FRIES } from "@/constants/fries";
import { FriesCard } from "./FriesCard";

export function FriesGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {FRIES.map((fries, index) => (
          <FriesCard key={fries.id} fries={fries} index={index} />
        ))}
      </div>
    </section>
  );
}
