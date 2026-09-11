"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, MapPinArea } from "@phosphor-icons/react/dist/ssr";
import { FindUsMap } from "./FindUsMap";
import { FindUsInfoCard } from "./FindUsInfoCard";

export function FindUs() {
  const reduce = useReducedMotion();

  const mobileEntrance = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 } as const,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="location" className="scroll-mt-28" aria-labelledby="find-us-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-display text-xs uppercase tracking-[0.1em] text-primary">
            <MapPinArea size={14} weight="bold" aria-hidden="true" />
            Find our kitchen
          </span>
          <h2
            id="find-us-heading"
            className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white md:text-5xl"
          >
            Drop in or <span className="text-amber">pick up</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-6 text-muted">
            Craving fresh smash burgers or woodfire slices? Visit our takeout counter at
            Tokey Wala Chowk or order delivery straight to your doorstep in Lahore.
          </p>
        </motion.div>

        {/* ── Mobile layout ── */}
        <div className="mt-10 flex flex-col gap-4 lg:hidden">
          <motion.div
            {...mobileEntrance(0.05)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line shadow-[0_0_35px_rgba(224,30,38,0.15)]"
          >
            <FindUsMap />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 to-transparent"
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded bg-surface-3/90 px-3 py-1.5 font-display text-xs uppercase tracking-[0.08em] text-white backdrop-blur-md">
              <MapPin size={13} weight="fill" className="text-primary" aria-hidden="true" />
              Burger Fuel · Shad Bagh
            </div>
          </motion.div>
          <motion.div {...mobileEntrance(0.1)}>
            <FindUsInfoCard />
          </motion.div>
        </div>

        {/* ── Desktop layout ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative mt-12 hidden h-[540px] overflow-hidden rounded-2xl border border-line shadow-[0_0_35px_rgba(224,30,38,0.15)] lg:block"
        >
          <FindUsMap />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-1/2 h-24 bg-gradient-to-t from-black/40 to-transparent"
          />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-lg bg-surface-3/90 px-4 py-2 font-display text-sm uppercase tracking-[0.08em] text-white backdrop-blur-md">
            <MapPin size={16} weight="fill" className="text-primary" aria-hidden="true" />
            Burger Fuel · Tokey Wala Chowk
          </div>
          <div className="absolute bottom-6 right-6 top-6 w-[340px]">
            <FindUsInfoCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}