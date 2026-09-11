"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/features/cart/context/CartContext";
import { Drawer } from "@/components/ui/Drawer";
import { Stepper } from "@/components/ui/Stepper";
import { formatPrice } from "@/constants/menu";

export function CartTray() {
  const { isOpen, closeTray, items, subtotal, total, itemCount, updateQuantity, removeItem, clearCart } =
    useCart();
  const [checkoutNote, setCheckoutNote] = useState(false);

  useEffect(() => {
    if (checkoutNote) {
      const t = setTimeout(() => setCheckoutNote(false), 2600);
      return () => clearTimeout(t);
    }
  }, [checkoutNote]);

  return (
    <Drawer open={isOpen} onClose={closeTray} title={`Your tray (${itemCount})`}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <div className="grid size-16 place-items-center rounded-full border border-surface-high bg-surface-2">
            <ForkKnife size={28} weight="bold" className="text-muted" aria-hidden="true" />
          </div>
          <h3 className="font-display text-xl uppercase tracking-[0.04em] text-white">
            Tray is empty
          </h3>
          <p className="max-w-xs text-sm text-muted">
            Nothing here yet. The kitchen is waiting for your order.
          </p>
          <Link
            href="/"
            onClick={closeTray}
            className="mt-2 inline-flex items-center rounded-sm border-2 border-amber px-6 py-3 font-display text-sm uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber hover:text-black"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-surface-high">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="size-[72px] shrink-0 rounded-sm border border-surface-high object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base uppercase tracking-[0.03em] text-white">
                      {item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="grid size-8 shrink-0 place-items-center rounded-sm text-muted-deep transition-colors hover:bg-surface-3 hover:text-primary"
                      aria-label={`Remove ${item.name} from tray`}
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>
                  {item.optionsSummary.length > 0 && (
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-deep">
                      {item.optionsSummary.join(" · ")}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <Stepper
                      value={item.quantity}
                      onChange={(next) => updateQuantity(item.key, next - item.quantity)}
                      min={0}
                      ariaLabel={`Quantity of ${item.name}`}
                    />
                    <span className="font-display text-base text-amber">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-surface-high bg-surface-2 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-text-soft">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-sm">
              <span className="text-muted">Delivery</span>
              <span className="text-text-soft">{subtotal >= 800 ? "FREE" : formatPrice(99)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-surface-high pt-3">
              <span className="font-display text-base uppercase tracking-[0.06em] text-white">Total</span>
              <span className="font-display text-2xl text-amber">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeTray}
              className="mt-5 flex w-full items-center justify-center rounded-sm bg-primary px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] active:scale-[0.98]"
            >
              Checkout now
            </Link>
            <button
              type="button"
              onClick={() => {
                clearCart();
                setCheckoutNote(true);
              }}
              className="mt-3 w-full text-center text-xs text-muted-deep transition-colors hover:text-primary"
            >
              Clear tray
            </button>
            {checkoutNote && (
              <p role="status" className="mt-3 text-center text-xs text-success-green">
                Tray cleared. Fresh start.
              </p>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}