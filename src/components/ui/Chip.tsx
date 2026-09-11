import { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active = false, className = "", children, ...props }: ChipProps) {
  return (
    <button
      className={`font-display uppercase tracking-[0.08em] rounded-full px-5 py-2.5 text-sm transition-all duration-300 border ${
        active
          ? "bg-mustard text-black border-mustard shadow-[inset_0_0_12px_rgba(255,214,10,0.35)]"
          : "bg-surface text-text-soft border-surface-high hover:border-primary hover:text-white"
      } ${className}`}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  );
}