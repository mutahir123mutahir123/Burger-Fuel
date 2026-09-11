"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trash, ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/features/cart/context/CartContext";
import { Stepper } from "@/components/ui/Stepper";
import { formatPrice } from "@/constants/menu";

export function CartPage() {
  const {
    items,
    subtotal,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
    openTray,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-32 text-center">
        <div className="grid size-20 place-items-center rounded-full border border-surface-high bg-surface">
          <ShoppingBag size={36} weight="bold" className="text-muted" aria-hidden="true" />
        </div>
        <h1 className="font-display text-4xl uppercase tracking-[0.03em] text-white">
          Your tray is empty
        </h1>
        <p className="max-w-sm text-muted">
          Nothing loaded yet. Go smash something.
        </p>
        <Link
          href="/#menu"
          className="mt-4 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
        >
          Order something now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 md:pt-28">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
            Your tray
          </h1>
          <p className="mt-2 text-muted">
            {itemCount} item{itemCount === 1 ? "" : "s"} · built to order
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-primary"
        >
          Clear tray
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-surface-high rounded-md border border-surface-high bg-surface">
          {items.map((item) => (
            <li key={item.key} className="flex gap-5 p-5">
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="size-24 shrink-0 rounded-sm border border-surface-high object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg uppercase tracking-[0.03em] text-white">
                      {item.name}
                    </h2>
                    {item.optionsSummary.length > 0 && (
                      <p className="mt-1 text-sm text-muted-deep line-clamp-2">
                        {item.optionsSummary.join(" · ")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="grid size-9 shrink-0 place-items-center rounded-sm text-muted-deep transition-colors hover:bg-surface-3 hover:text-primary"
                    aria-label={`Remove ${item.name} from tray`}
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Stepper
                    value={item.quantity}
                    onChange={(next) => updateQuantity(item.key, next - item.quantity)}
                    min={1}
                    ariaLabel={`Quantity of ${item.name}`}
                  />
                  <p className="font-display text-xl text-amber">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside
          className="h-fit rounded-md border border-surface-high bg-surface p-6 lg:sticky lg:top-24"
          aria-label="Order summary"
        >
          <h2 className="font-display text-base uppercase tracking-[0.06em] text-white">
            Order summary
          </h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-text-soft">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="text-text-soft">
                {subtotal >= 800 ? (
                  <span className="text-success-green">FREE</span>
                ) : (
                  formatPrice(99)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-surface-high pt-3">
              <dt className="font-display uppercase tracking-[0.06em] text-white">Total</dt>
              <dd className="font-display text-2xl text-amber">{formatPrice(total)}</dd>
            </div>
          </dl>

          {subtotal < 800 && (
            <p className="mt-4 rounded-sm bg-amber/10 px-3 py-2.5 text-xs text-amber">
              Add {formatPrice(800 - subtotal)} more for free delivery.
            </p>
          )}

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.01] hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] active:scale-[0.99]"
          >
            Checkout
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={openTray}
            className="mt-3 w-full text-center font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-white"
          >
            Open tray (for pickup view)
          </button>
        </aside>
      </div>
    </div>
  );
}