"use client";

import { SANDWICHES } from "@/constants/sandwiches";
import { SandwichCard } from "./SandwichCard";

export function SandwichesGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SANDWICHES.map((sandwich, index) => (
          <SandwichCard key={sandwich.id} sandwich={sandwich} index={index} />
        ))}
      </div>
    </section>
  );
}
