"use client";

import { PASTAS } from "@/constants/pastas";
import { PastaCard } from "./PastaCard";

export function PastasGrid() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {PASTAS.map((pasta, index) => (
          <PastaCard key={pasta.id} pasta={pasta} index={index} />
        ))}
      </div>
    </section>
  );
}
