"use client";

import { CRUNCH_MUNCH } from "@/constants/crunch-munch";
import { CrunchMunchCard } from "./CrunchMunchCard";

export function CrunchMunchGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CRUNCH_MUNCH.map((item, index) => (
          <CrunchMunchCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
