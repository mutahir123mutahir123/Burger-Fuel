"use client";

import type { Category } from "@/types/product";
import { Chip } from "@/components/ui/Chip";
import { CategoryChipSkeleton } from "@/components/ui/Skeleton";
import { Hamburger, Flame, Pizza, BowlFood } from "@phosphor-icons/react/dist/ssr";

const ICONS: Record<string, React.ReactNode> = {
  Hamburger: <Hamburger size={18} weight="bold" />,
  Flame: <Flame size={18} weight="bold" />,
  Pizza: <Pizza size={18} weight="bold" />,
  BowlFood: <BowlFood size={18} weight="bold" />,
};

interface MenuFiltersProps {
  active: Category | "ALL";
  onChange: (category: Category | "ALL") => void;
  categories: { label: Category; icon: string; blurb: string }[];
  loading?: boolean;
}

export function MenuFilters({ active, onChange, categories, loading = false }: MenuFiltersProps) {
  if (loading) return <CategoryChipSkeleton />;

  const tabs: { label: Category | "ALL"; icon?: string }[] = [
    { label: "ALL" },
    ...categories.map((c) => ({ label: c.label, icon: c.icon })),
  ];

  return (
    <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <Chip
          key={tab.label}
          active={active === tab.label}
          onClick={() => onChange(tab.label)}
          role="tab"
          aria-selected={active === tab.label}
        >
          <span className="inline-flex items-center gap-2">
            {tab.icon && ICONS[tab.icon]}
            {tab.label}
          </span>
        </Chip>
      ))}
    </div>
  );
}