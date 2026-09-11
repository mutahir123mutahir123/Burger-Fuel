"use client";

import { WRAPS } from "@/constants/wraps";
import { WrapCard } from "./WrapCard";

export function WrapsGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {WRAPS.map((wrap, index) => (
          <WrapCard key={wrap.id} wrap={wrap} index={index} />
        ))}
      </div>
    </section>
  );
}
