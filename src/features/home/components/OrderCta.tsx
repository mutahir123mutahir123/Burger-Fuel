"use client";

import Link from "next/link";
import { PhoneCall } from "@phosphor-icons/react/dist/ssr";

export function OrderCta() {
  return (
    <section
      className="relative overflow-hidden border-y border-primary/30"
      aria-labelledby="cta-heading"
    >
      <div
        className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-24"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 50%, rgba(224,30,38,0.18), rgba(18,18,20,0) 70%)",
        }}
      >
        <p className="font-display text-xs uppercase tracking-[0.12em] text-muted">
          Zero contact · Pay on arrival
        </p>
        <h2
          id="cta-heading"
          className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-5xl md:text-6xl"
        >
          Hungry at 1 a.m.?
          <br />
          <span className="text-primary">The grill won&rsquo;t sleep.</span>
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#menu"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] active:scale-[0.98]"
          >
            Order online
          </Link>
          <a
            href="tel:+923292833343"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-amber px-8 py-4 font-display text-base uppercase tracking-[0.06em] text-amber transition-all duration-300 hover:bg-amber hover:text-black active:scale-[0.98]"
          >
            <PhoneCall size={18} weight="bold" aria-hidden="true" />
            +92 329 2833343
          </a>
        </div>
      </div>
    </section>
  );
}