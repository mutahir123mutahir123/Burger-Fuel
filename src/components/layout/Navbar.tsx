"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ShoppingBag, List, X } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/features/cart/context/CartContext";

const NAV_LINKS = [
  { label: "MENU", href: "/menu" },
  { label: "CONQUEST", href: "/#deals" },
  { label: "FUEL", href: "/#story" },
  { label: "STORE LOCATOR", href: "/#location" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount, openTray } = useCart();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <motion.nav
          initial={reducedMotion ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3 border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "rounded-full border-surface-high bg-surface/80 backdrop-blur-md"
              : "rounded-full border-transparent bg-canvas/40 backdrop-blur-md"
          }`}
          aria-label="Primary navigation"
        >
          <Link href="/" className="flex items-center gap-2" aria-label="Burger Fuel home">
            <Image
              src="/images/logo.jpeg"
              alt="Burger Fuel logo"
              width={64}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 font-display text-sm uppercase tracking-[0.08em] text-muted transition-colors hover:bg-surface-high hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openTray}
              className="relative grid size-11 place-items-center rounded-full border border-surface-high bg-surface text-text-soft transition-colors hover:border-primary hover:text-white"
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={20} weight="bold" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary font-display text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-surface-high bg-surface text-text-soft transition-colors hover:border-amber hover:text-white md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-canvas/90 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="flex h-full flex-col justify-start px-8 pt-24"
              initial="hidden"
              animate="show"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="fixed right-6 top-24 grid size-11 place-items-center rounded-full border border-surface-high bg-surface text-text-soft transition-colors hover:border-amber hover:text-white"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </motion.button>
              <nav aria-label="Mobile menu" className="flex flex-col items-center gap-2 text-center">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 32 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    onClick={() => setOpen(false)}
                    className="border-b border-surface-high py-4 font-display text-4xl uppercase tracking-[0.03em] text-text-soft transition-colors hover:text-amber"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } },
                }}
                className="mt-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openTray();
                  }}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-white"
                >
                  <ShoppingBag size={20} weight="bold" />
                  View cart ({itemCount})
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}