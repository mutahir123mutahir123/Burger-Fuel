import { forwardRef } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a trailing "+" in a nested circular badge (Button-in-Button pattern). */
  withAdd?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border border-white/15 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-transparent text-amber border-2 border-amber hover:bg-amber hover:text-black active:scale-[0.98]",
  ghost:
    "bg-transparent text-muted hover:text-white hover:bg-surface-3 active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-sm",
  md: "px-6 py-3 text-base rounded-sm",
  lg: "px-8 py-4 text-lg rounded-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", withAdd = false, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`font-display uppercase tracking-[0.06em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] inline-flex items-center justify-center gap-2 ${
          variants[variant]
        } ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
        {withAdd && (
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-black/20 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105"
          >
            <Plus size={18} weight="bold" />
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";