import type { BadgeType } from "@/types/product";

const badgeStyles: Record<BadgeType, string> = {
  bestseller: "bg-gradient-to-r from-amber to-primary text-black",
  limited: "bg-mustard text-black",
  spicy: "bg-gradient-to-r from-primary to-amber text-white",
  new: "bg-amber text-black",
};

const badgeLabels: Record<BadgeType, string> = {
  bestseller: "BESTSELLER",
  limited: "LIMITED DROP",
  spicy: "FIRE LEVEL 3",
  new: "NEW DROP",
};

interface BadgeProps {
  type: BadgeType;
  className?: string;
}

export function Badge({ type, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.08em] ${badgeStyles[type]} ${className}`}
    >
      {badgeLabels[type]}
    </span>
  );
}