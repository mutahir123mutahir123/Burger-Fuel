"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { SHOWCASE_CATEGORIES } from "@/constants/showcase";
import { ShowcaseCard } from "./ShowcaseCard";

const AUTO_SLIDE_INTERVAL_MS = 3000;

export function Showcase() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const getCardWidth = useCallback(() => {
    if (!scrollRef.current) return 0;
    const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 16;
  }, []);

  const slideNext = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (scrollLeft >= maxScroll - 1) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, [getCardWidth]);

  const slidePrev = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const { scrollLeft } = scrollRef.current;

    if (scrollLeft <= 1) {
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  }, [getCardWidth]);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(slideNext, AUTO_SLIDE_INTERVAL_MS);
  }, [slideNext]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isMobile || reduce || isPaused) {
      stopAutoSlide();
      return;
    }
    startAutoSlide();
    return stopAutoSlide;
  }, [isMobile, reduce, isPaused, startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = getCardWidth();
      if (cardWidth > 0) {
        setActiveIndex(Math.round(el.scrollLeft / cardWidth));
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [getCardWidth]);

  return (
    <section id="conquests" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
              Today&rsquo;s conquests
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted">
              The lineup that keeps the line long. Pick your lane and order up.
            </p>
          </div>

          {/* Arrow controls — mobile only */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={slidePrev}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 text-text-soft transition-colors hover:bg-primary hover:text-white"
              aria-label="Previous category"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={slideNext}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 text-text-soft transition-colors hover:bg-primary hover:text-white"
              aria-label="Next category"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Desktop: static 3-col grid */}
        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3">
          {SHOWCASE_CATEGORIES.map((cat, i) => (
            <ShowcaseCard
              key={cat.slug}
              name={cat.name}
              image={cat.image}
              href={`/${cat.slug}`}
              blurb={cat.blurb}
              index={i}
            />
          ))}
        </div>

        {/* Mobile (<lg): horizontal slider */}
        <div className="mt-10 lg:hidden">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsPaused(false), 4000);
            }}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-2"
          >
            {SHOWCASE_CATEGORIES.map((cat, i) => (
              <div
                key={cat.slug}
                className="w-[calc(100%-24px)] flex-shrink-0 snap-start pr-4"
              >
                <ShowcaseCard
                  name={cat.name}
                  image={cat.image}
                  href={`/${cat.slug}`}
                  blurb={cat.blurb}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators — mobile only */}
        <div className="mt-2 flex justify-center gap-2 lg:hidden" aria-hidden="true">
          {SHOWCASE_CATEGORIES.map((cat, i) => (
            <span
              key={cat.slug}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-5 bg-amber" : "w-1.5 bg-surface-highest"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
