"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Fire, ForkKnife, MapPin, Phone, Star } from "@phosphor-icons/react/dist/ssr";

const METRICS = [
  { value: "30 MIN", label: "Hot Delivery In Shad Bagh", valueClass: "text-mustard" },
  { value: "100%", label: "Prime Fresh Beef & Mozzarella", valueClass: "text-white" },
  { value: "2:00 AM", label: "Late-Night Fueling", valueClass: "text-amber" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const entrance = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative w-full overflow-hidden bg-surface-lowest pt-24 pb-16 md:pt-28 md:pb-[4.5rem]">
      {/* Ambient radial fire glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-neon-red-glow opacity-40 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-1/3 h-[450px] w-[450px] rounded-full bg-amber-glow opacity-30 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-6">
        {/* Live status capsule */}
        <motion.div
          {...entrance(0.05)}
          className="mb-8 flex flex-wrap items-center justify-between gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-3/90 px-4 py-2 shadow-lg backdrop-blur-md">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-green opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-success-green" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Open Now · Closes 2:00 AM
            </span>
            <span aria-hidden="true" className="text-surface-highest">
              |
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted">
              <MapPin size={16} weight="bold" className="text-primary" aria-hidden="true" />
              Tokey Wala Chowk, Shad Bagh, Lahore
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-3/70 px-4 py-2">
            <Fire size={18} weight="fill" className="text-mustard" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wider text-text-soft">
              Fresh Woodfire Oven Fired Up
            </span>
          </div>
        </motion.div>

        {/* Hero grid: brutalist type + hyper visual */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Hero text content */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <motion.div {...entrance(0.15)} className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-amber-deep px-2 py-1 font-display text-[13px] uppercase tracking-[0.08em] text-[#623a00]">
                Lahore&apos;s Midnight Legend
              </span>
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-mustard">
                <Star size={13} weight="fill" aria-hidden="true" />
                100% Halal Certified Smash Burgers
              </span>
            </motion.div>

            <motion.h1
              {...entrance(0.25)}
              className="font-display text-[44px] uppercase leading-[48px] tracking-[0.03em] text-white sm:text-5xl sm:leading-[56px] md:text-6xl md:leading-[64px] lg:text-[72px] lg:leading-[76px] lg:tracking-[0.04em]"
            >
              Fuel your{" "}
              <span className="text-primary drop-shadow-[0_0_25px_rgba(224,30,38,0.6)]">
                cravings
              </span>{" "}
              with smash burgers &amp;{" "}
              <span className="text-amber">woodfire</span> pizzas
            </motion.h1>

            <motion.p {...entrance(0.35)} className="max-w-xl text-base leading-6 text-muted">
              Lahore&apos;s premier fast food destination serving handcrafted smashed beef
              patties, gooey artisan cheese crust pizzas, crispy loaded fries, and unbeatable
              midnight meal combos right in the heart of Shad Bagh.
            </motion.p>

            {/* Order action triggers */}
            <motion.div {...entrance(0.45)} className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/#menu"
                className="inline-flex items-center justify-center gap-2 rounded bg-primary px-8 py-4 font-display text-base uppercase tracking-[0.06em] text-white shadow-[0_0_25px_rgba(224,30,38,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ForkKnife size={20} weight="fill" aria-hidden="true" />
                Order Online Now
              </Link>
              <Link
                href="tel:+923292833343"
                className="inline-flex items-center justify-center gap-2 rounded bg-surface-3 px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-amber shadow-md transition-all duration-300 hover:bg-surface-highest hover:text-white"
              >
                <Phone size={20} weight="fill" aria-hidden="true" />
                Call: +92 329 2833343
              </Link>
            </motion.div>

            {/* Micro proof metrics */}
            <motion.div {...entrance(0.55)} className="grid max-w-lg grid-cols-3 gap-3 pt-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col rounded bg-surface p-3">
                  <span className={`font-display text-2xl tracking-[0.02em] ${metric.valueClass}`}>
                    {metric.value}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero showcase photo card */}
          <motion.div
            {...entrance(0.3)}
            className="relative lg:col-span-5 lg:col-start-8"
          >
            <div className="group relative w-full overflow-hidden rounded-2xl bg-surface shadow-[0_0_35px_rgba(224,30,38,0.25)]">
              <Image
                src="/images/smash-burger.jpeg"
                alt="Close-up of a double smashed gourmet beef burger with melting cheddar cheese, caramelized onions and bacon, paired with golden fries in a wire basket"
                width={512}
                height={279}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-[460px] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/20"
              />

              {/* Overlay heat tag */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded bg-primary px-3 py-1 font-display text-[13px] uppercase tracking-[0.08em] text-white shadow-[0_0_15px_rgba(224,30,38,0.5)]">
                <Fire size={16} weight="fill" aria-hidden="true" />
                Double Smashed Beast
              </div>

              {/* Price chip */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-surface-3/95 px-4 py-2 shadow-lg backdrop-blur-md">
                <span className="text-xs uppercase tracking-wider text-muted">From</span>
                <span className="font-display text-2xl tracking-[0.02em] text-mustard">
                  Rs. 850
                </span>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}