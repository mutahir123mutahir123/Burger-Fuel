"use client";

import { useRef } from "react";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Chip } from "@/components/ui/Chip";
import { ALL_BURGERS, toProduct } from "@/constants/burgers";
import { ALL_PIZZAS, toPizzaProduct } from "@/constants/pizzas";
import { PASTAS } from "@/constants/pastas";
import { SANDWICHES } from "@/constants/sandwiches";
import { WRAPS } from "@/constants/wraps";
import { CRUNCH_MUNCH } from "@/constants/crunch-munch";
import { FRIES } from "@/constants/fries";
import { DEALS } from "@/constants/deals";
import { NEW_ARRIVALS } from "@/constants/new-arrivals";
import { ProductCard } from "@/features/menu/components/ProductCard";
import { PastaCard } from "@/features/pastas/components/PastaCard";
import { SandwichCard } from "@/features/sandwiches/components/SandwichCard";
import { WrapCard } from "@/features/wraps/components/WrapCard";
import { CrunchMunchCard } from "@/features/crunch-munch/components/CrunchMunchCard";
import { FriesCard } from "@/features/fries/components/FriesCard";
import { DealCard } from "@/features/deals/components/DealCard";
import { NewArrivalCard } from "@/features/new-arrivals/components/NewArrivalCard";
import { useDrinkOrder } from "@/features/drinks/context/DrinkOrderContext";

const QUICK_ADD_SECTIONS = [
  { id: "burgers", label: "Burgers", count: ALL_BURGERS.length },
  { id: "pizzas", label: "Pizzas", count: ALL_PIZZAS.length },
  { id: "pastas", label: "Pastas", count: PASTAS.length },
  { id: "sandwiches", label: "Sandwiches", count: SANDWICHES.length },
  { id: "deals", label: "Deals", count: DEALS.length },
  { id: "fries", label: "Fries", count: FRIES.length },
  { id: "new-arrivals", label: "New Arrivals", count: NEW_ARRIVALS.length },
] as const;

const CHOOSE_SECTIONS = [
  { id: "wraps", label: "Wraps", count: WRAPS.length },
  { id: "crunch-munch", label: "Crunch & Munch", count: CRUNCH_MUNCH.length },
] as const;

const ALL_SECTIONS = [...QUICK_ADD_SECTIONS, ...CHOOSE_SECTIONS] as const;

export function FullMenuPage() {
  const { order } = useDrinkOrder();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAddBurger = (product: ReturnType<typeof toProduct>) => {
    order({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      quantity: 1,
      options: {},
      optionsSummary: [],
    });
  };

  const handleAddPizza = (product: ReturnType<typeof toPizzaProduct>) => {
    order({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      quantity: 1,
      options: {},
      optionsSummary: [],
    });
  };

  const handleAddDeal = (deal: (typeof DEALS)[number]) => {
    order({
      productId: deal.id,
      name: deal.name,
      image: deal.image,
      unitPrice: deal.price,
      quantity: 1,
      options: {},
      optionsSummary: [deal.description],
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-28">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          href="/"
          className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
        >
          Home
        </Link>
        <CaretRight size={12} weight="bold" className="text-muted-deep" aria-hidden="true" />
        <span className="font-display text-xs uppercase tracking-[0.08em] text-white">
          Full Menu
        </span>
      </nav>

      <div className="mt-8">
        <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
          Every lane, one page
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-6xl">
          The Full Menu
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted">
          Browse every item we fire. Quick-add anything, or pick your way through wraps and crunch.
        </p>
      </div>

      <div className="sticky top-20 z-30 mt-8 -mx-4 overflow-x-auto bg-canvas/80 px-4 py-3 backdrop-blur-md no-scrollbar sm:mx-0 sm:px-0 sm:py-4">
        <div className="flex gap-2" role="tablist" aria-label="Menu sections">
          {ALL_SECTIONS.map((section) => (
            <Chip
              key={section.id}
              onClick={() => scrollTo(section.id)}
              role="tab"
            >
              {section.label}
              <span className="ml-1.5 text-xs text-muted">({section.count})</span>
            </Chip>
          ))}
        </div>
      </div>

      <section
        ref={(el) => { sectionRefs.current["burgers"] = el; }}
        className="mt-12 scroll-mt-36"
        id="burgers"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Burgers
            </h2>
          </div>
          <Link
            href="/category/burgers"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {ALL_BURGERS.map((burger, index) => (
            <ProductCard
              key={burger.id}
              product={toProduct(burger)}
              onAdd={handleAddBurger}
              index={index}
            />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["pizzas"] = el; }}
        className="mt-16 scroll-mt-36"
        id="pizzas"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Pizzas
            </h2>
          </div>
          <Link
            href="/category/pizzas"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {ALL_PIZZAS.map((pizza, index) => (
            <ProductCard
              key={pizza.id}
              product={toPizzaProduct(pizza)}
              onAdd={handleAddPizza}
              index={index}
            />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["pastas"] = el; }}
        className="mt-16 scroll-mt-36"
        id="pastas"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Pastas
            </h2>
          </div>
          <Link
            href="/pastas"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {PASTAS.map((pasta, index) => (
            <PastaCard key={pasta.id} pasta={pasta} index={index} />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["sandwiches"] = el; }}
        className="mt-16 scroll-mt-36"
        id="sandwiches"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Sandwiches
            </h2>
          </div>
          <Link
            href="/sandwiches"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {SANDWICHES.map((sandwich, index) => (
            <SandwichCard key={sandwich.id} sandwich={sandwich} index={index} />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["deals"] = el; }}
        className="mt-16 scroll-mt-36"
        id="deals"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Deals
            </h2>
          </div>
          <Link
            href="/deals"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {DEALS.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} onAdd={handleAddDeal} index={index} />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["fries"] = el; }}
        className="mt-16 scroll-mt-36"
        id="fries"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Fries
            </h2>
          </div>
          <Link
            href="/fries"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {FRIES.map((fries, index) => (
            <FriesCard key={fries.id} fries={fries} index={index} />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["new-arrivals"] = el; }}
        className="mt-16 scroll-mt-36"
        id="new-arrivals"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Quick add
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {NEW_ARRIVALS.map((item, index) => (
            <NewArrivalCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <div className="mt-20 border-t border-surface-high pt-12">
        <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
          Pick your way
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
          Choose Your Way
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          These items let you dial in your order — pick sauces, sizes and extras right on the card.
        </p>
      </div>

      <section
        ref={(el) => { sectionRefs.current["wraps"] = el; }}
        className="mt-10 scroll-mt-36"
        id="wraps"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Choose your way
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Wraps
            </h2>
          </div>
          <Link
            href="/wraps"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {WRAPS.map((wrap, index) => (
            <WrapCard key={wrap.id} wrap={wrap} index={index} />
          ))}
        </div>
      </section>

      <section
        ref={(el) => { sectionRefs.current["crunch-munch"] = el; }}
        className="mt-16 scroll-mt-36"
        id="crunch-munch"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.1em] text-amber">
              Choose your way
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.03em] text-white md:text-4xl">
              Crunch & Munch
            </h2>
          </div>
          <Link
            href="/crunch-and-munch"
            className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CRUNCH_MUNCH.map((item, index) => (
            <CrunchMunchCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <div className="mt-24 border-t border-surface-high pt-16 text-center">
        <p className="font-display text-xs uppercase tracking-[0.1em] text-muted-deep">
          Still hungry?
        </p>
        <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.03em] text-white md:text-3xl">
          Head to your nearest store
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Every item is built to order, fired on demand. Walk in or call ahead.
        </p>
        <a
          href="tel:+923292833343"
          className="mt-6 inline-flex items-center rounded-sm border-2 border-amber px-6 py-3 font-display text-sm uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber hover:text-black"
        >
          +92 329 2833343
        </a>
      </div>
    </div>
  );
}
