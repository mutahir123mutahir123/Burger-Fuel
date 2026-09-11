"use client";

import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";

interface StepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
  ariaLabel = "Quantity",
}: StepperProps) {
  return (
    <div
      className="inline-flex items-center rounded-sm border border-surface-high bg-surface-2"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="grid size-10 place-items-center text-text-soft transition-colors hover:text-primary disabled:opacity-30 disabled:hover:text-text-soft"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Minus size={16} weight="bold" />
      </button>
      <span
        aria-live="polite"
        className="min-w-8 text-center font-display text-base text-white tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        className="grid size-10 place-items-center text-text-soft transition-colors hover:text-primary disabled:opacity-30 disabled:hover:text-text-soft"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Plus size={16} weight="bold" />
      </button>
    </div>
  );
}