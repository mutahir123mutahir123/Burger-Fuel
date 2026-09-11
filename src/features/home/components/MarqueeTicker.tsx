"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { Lightning, Moped, CreditCard, Gift } from "@phosphor-icons/react/dist/ssr";

const PERKS = [
  { icon: Lightning, text: "Fired in 15 minutes flat" },
  { icon: Moped, text: "Free delivery over Rs 3,000" },
  { icon: CreditCard, text: "Pay on arrival, always" },
  { icon: Gift, text: "Loyalty fuel points on every order" },
];

function PerkRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={ariaHidden || undefined}>
      {PERKS.map(({ icon: Icon, text }) => (
        <div key={text} className="flex shrink-0 items-center gap-3 px-8 py-4">
          <Icon size={18} weight="bold" className="text-primary" aria-hidden="true" />
          <span className="whitespace-nowrap font-display text-sm uppercase tracking-[0.1em] text-text-soft">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    if (reduce || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      className="relative overflow-hidden border-y border-surface-high bg-surface"
      aria-label="Delivery perks"
    >
      <div ref={trackRef} className="flex w-max">
        <PerkRow />
        <PerkRow ariaHidden />
      </div>
    </section>
  );
}