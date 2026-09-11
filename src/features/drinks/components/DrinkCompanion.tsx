"use client";

import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import type { DrinkEntry } from "@/constants/drinks";
import { ALL_DRINKS } from "@/constants/drinks";
import { formatPrice } from "@/constants/menu";

interface DrinkCompanionProps {
  picked: string[];
  onChange: (keys: string[]) => void;
}

function DrinkGroup({
  label,
  drinks,
  picked,
  onToggle,
}: {
  label: string;
  drinks: DrinkEntry[];
  picked: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div>
      <p className="font-display text-[11px] uppercase tracking-[0.08em] text-muted-deep sm:text-xs">
        {label}
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {drinks.map((drink) => {
          const isPicked = picked.includes(drink.key);
          return (
            <button
              key={drink.key}
              type="button"
              aria-pressed={isPicked}
              onClick={() => onToggle(drink.key)}
              className={`group/tile relative flex flex-col overflow-hidden rounded-sm border text-left transition-all duration-200 active:scale-[0.97] ${
                isPicked
                  ? "border-primary bg-primary/10 shadow-[0_0_12px_rgba(224,30,38,0.2)]"
                  : "border-surface-high bg-surface hover:border-muted-deep"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <Image
                  src={drink.image}
                  alt={drink.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/tile:scale-[1.04]"
                />
                {isPicked && (
                  <div className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-primary">
                    <Check size={12} weight="bold" className="text-white" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 p-2.5">
                <span className="font-display text-[10px] uppercase leading-tight tracking-[0.06em] text-white sm:text-[11px]">
                  {drink.name}
                </span>
                <span className="text-[10px] text-muted-deep sm:text-[11px]">{drink.detail}</span>
                <span className="font-display text-xs text-amber">{formatPrice(drink.unitPrice)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DrinkCompanion({ picked, onChange }: DrinkCompanionProps) {
  const onToggle = (key: string) => {
    onChange(picked.includes(key) ? picked.filter((k) => k !== key) : [...picked, key]);
  };

  const softDrinks = ALL_DRINKS.filter((d) => d.group === "soft-drink");
  const chillers = ALL_DRINKS.filter((d) => d.group === "chiller");

  return (
    <div className="space-y-5">
      <DrinkGroup
        label="Soft Drinks"
        drinks={softDrinks}
        picked={picked}
        onToggle={onToggle}
      />
      <DrinkGroup
        label="Chillers"
        drinks={chillers}
        picked={picked}
        onToggle={onToggle}
      />
    </div>
  );
}