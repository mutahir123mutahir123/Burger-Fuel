"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react/dist/ssr";

type DrawerSide = "right" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: DrawerSide;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const initialBySide: Record<DrawerSide, { x: string; y: string }> = {
  right: { x: "100%", y: "0" },
  bottom: { x: "0", y: "100%" },
};

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  footer,
  children,
}: DrawerProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    // Focus the panel for keyboard users (skip for screen readers to read the title first)
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-[rgba(10,10,12,0.85)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`absolute flex flex-col bg-surface border border-surface-high outline-none ${
              side === "right"
                ? "inset-y-0 right-0 w-full max-w-md border-r-0"
                : "inset-x-0 bottom-0 max-h-[92dvh] border-b-0 rounded-t-xl"
            }`}
            initial={reducedMotion ? undefined : initialBySide[side]}
            animate={{ x: "0", y: "0" }}
            exit={reducedMotion ? undefined : initialBySide[side]}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-surface-high px-5 py-4">
              <h2 className="font-display text-lg uppercase tracking-[0.06em] text-white">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 place-items-center rounded-sm text-muted transition-colors hover:bg-surface-3 hover:text-white"
                aria-label="Close"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer !== undefined && (
              <div className="shrink-0 border-t border-surface-high bg-surface">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}