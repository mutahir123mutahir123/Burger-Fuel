"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Flame } from "@phosphor-icons/react/dist/ssr";

const TICK = [
  "Chalked onto the board every morning.",
  "Decided by one rule only: is it worth the grease?",
  "If a cook demoes it twice, it's on. Once — gone.",
  "Half of our best sellers started as a dare.",
];

export function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="scroll-mt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-md border border-surface-high bg-surface-2"
        >
          <Image
            src="/images/loaded-fries.jpg"
            alt="Loaded fries with chicken, peri sauce and molten cheese from the Burger Fuel pass"
            width={720}
            height={720}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-square w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-high bg-surface/60 px-3 py-1.5 font-display text-xs uppercase tracking-[0.1em] text-muted">
            <Flame size={14} weight="bold" className="text-amber" aria-hidden="true" />
            The fuel story
          </span>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white md:text-5xl">
            Born in a parking lot,
            <br />
            fed by a grill.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            We started with a single smash grill and a simple bet: that a neighbourhood
            deserves better than freezer-to-fryer. Every patty is smashed to order, every
            crust is wood-fired, every side is loaded to the edge.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-sm border border-surface-high bg-surface px-5 py-4">
              <p className="font-display text-3xl text-amber">2019</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">First grill lit</p>
            </div>
            <div className="rounded-sm border border-surface-high bg-surface px-5 py-4">
              <p className="font-display text-3xl text-amber">3 grill stations</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">Running today</p>
            </div>
            <div className="rounded-sm border border-surface-high bg-surface px-5 py-4">
              <p className="font-display text-3xl text-amber">300k+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">Smashes served</p>
            </div>
          </div>

          <ul className="mt-8 space-y-3">
            {TICK.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-text-soft">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}