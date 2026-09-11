"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  CreditCard,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/features/cart/context/CartContext";
import { formatPrice } from "@/constants/menu";
import { checkoutService } from "../services/checkout.service";

type Fulfilment = "delivery" | "pickup";
type Payment = "cod" | "card";

interface FormState {
  name: string;
  phone: string;
  area: string;
  street: string;
  note: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  area: "",
  street: "",
  note: "",
};

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [payment, setPayment] = useState<Payment>("cod");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [placing, setPlacing] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const deliveryFee = subtotal >= 800 || fulfilment === "pickup" ? 0 : 99;
  const grandTotal = subtotal + deliveryFee;

  const set = useCallback(
    (key: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
      },
    []
  );

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setSubmitError(null);

    const payload = {
      customerName: form.name,
      customerPhone: form.phone,
      fulfilment,
      paymentMethod: payment,
      deliveryArea: fulfilment === "delivery" ? form.area : null,
      deliveryStreet: fulfilment === "delivery" ? form.street : null,
      note: form.note || null,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        options: item.options,
        optionsSummary: item.optionsSummary,
      })),
    };

    try {
      const order = await checkoutService.placeOrder(payload);
      clearCart();
      setOrderRef(order.orderRef);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unable to place your order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  if (orderRef) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="grid size-20 place-items-center rounded-full border border-success-green/50 bg-success-green/10"
        >
          <CheckCircle size={40} weight="bold" className="text-success-green" aria-hidden="true" />
        </motion.div>
        <h1 className="font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
          Order in. Grill on.
        </h1>
        <p className="max-w-md text-muted">
          Your order <span className="font-display text-amber">{orderRef}</span> is confirmed.
          We&rsquo;ll text {form.phone || "you"} the moment it is fired.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            Back to the fuel line
          </Link>
          <a
            href={`tel:${form.phone || "+923292833343"}`}
            className="rounded-sm border-2 border-amber px-7 py-3.5 font-display text-base uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber hover:text-black"
          >
            Call for updates
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-32 text-center">
        <h1 className="font-display text-4xl uppercase tracking-[0.03em] text-white">
          Nothing to check out
        </h1>
        <p className="max-w-sm text-muted">Your tray is empty. Go fire something up.</p>
        <Link
          href="/#menu"
          className="mt-2 rounded-sm bg-primary px-7 py-3.5 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
        >
          Back to menu
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-surface-high bg-surface-2/60 px-4 py-3 text-sm text-white placeholder:text-muted-deep outline-none transition-colors focus:border-amber";

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 md:pt-28">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-amber"
      >
        <ArrowLeft size={14} weight="bold" aria-hidden="true" />
        Back to tray
      </Link>
      <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.03em] text-white md:text-5xl">
        Checkout
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}
        >
          {/* Fulfilment */}
          <fieldset>
            <legend className="font-display text-sm uppercase tracking-[0.08em] text-white">
              1 · How do you want it?
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {(
                [
                  { id: "delivery", label: "Delivery", desc: "To your door, hot" },
                  { id: "pickup", label: "Pickup", desc: "Cut the line, grab it" },
                ] as { id: Fulfilment; label: string; desc: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={fulfilment === opt.id}
                  onClick={() => setFulfilment(opt.id)}
                  className={`rounded-md border px-5 py-4 text-left transition-all ${
                    fulfilment === opt.id
                      ? "border-primary bg-primary/10"
                      : "border-surface-high bg-surface hover:border-muted-deep"
                  }`}
                >
                  <span className="font-display text-base uppercase tracking-[0.04em] text-white">
                    {opt.label}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{opt.desc}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset>
            <legend className="font-display text-sm uppercase tracking-[0.08em] text-white">
              2 · Your details
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                  Full name *
                </span>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Bilal Anwar"
                  className={inputClass}
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                  Phone *
                </span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="03292833343"
                  className={inputClass}
                  autoComplete="tel"
                />
              </label>
            </div>

            {fulfilment === "delivery" && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                    Area / Colony *
                  </span>
                  <input
                    required
                    value={form.area}
                    onChange={set("area")}
                    placeholder="Gulberg Green"
                    className={inputClass}
                    autoComplete="address-level2"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                    Street / Building *
                  </span>
                  <input
                    required
                    value={form.street}
                    onChange={set("street")}
                    placeholder="House 42, Street 7"
                    className={inputClass}
                    autoComplete="street-address"
                  />
                </label>
              </div>
            )}

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Kitchen note
              </span>
              <input
                value={form.note}
                onChange={set("note")}
                placeholder="No pickles, extra sauce, make it loud"
                className={inputClass}
              />
            </label>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend className="font-display text-sm uppercase tracking-[0.08em] text-white">
              3 · Pay how you like
            </legend>
            <div className="mt-4 space-y-3">
              {(
                [
                  { id: "cod", label: "Cash on arrival", icon: Wallet },
                  { id: "card", label: "Online Transfer At door", icon: CreditCard },
                ] as { id: Payment; label: string; icon: React.ElementType }[]
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={payment === id}
                  onClick={() => setPayment(id)}
                  className={`flex w-full items-center gap-4 rounded-md border px-5 py-4 text-left transition-all ${
                    payment === id
                      ? "border-primary bg-primary/10"
                      : "border-surface-high bg-surface hover:border-muted-deep"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-sm ${
                      payment === id ? "bg-primary text-white" : "bg-surface-3 text-muted"
                    }`}
                  >
                    <Icon size={18} weight="bold" aria-hidden="true" />
                  </span>
                  <span className="font-display text-base uppercase tracking-[0.04em] text-white">
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-deep">
              Online transfers are authorised at the door. Nothing is charged until it lands.
            </p>
          </fieldset>

          {submitError && (
            <p className="rounded-sm bg-primary/10 px-4 py-3 text-sm text-primary" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={placing}
            className="w-full rounded-sm bg-primary px-6 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-all hover:scale-[1.01] hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(224,30,38,0.4)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {placing
              ? "Firing up the grill…"
              : `Place order · ${formatPrice(grandTotal)}`}
          </button>
        </form>

        {/* Summary */}
        <aside
          className="h-fit rounded-md border border-surface-high bg-surface p-6 lg:sticky lg:top-24"
          aria-label="Order summary"
        >
          <h2 className="flex items-center gap-2 font-display text-base uppercase tracking-[0.06em] text-white">
            <MapPin size={16} weight="bold" className="text-amber" aria-hidden="true" />
            On the way
          </h2>
          <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={52}
                  height={52}
                  className="size-[52px] shrink-0 rounded-sm border border-surface-high object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm uppercase tracking-[0.02em] text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-deep">
                    × {item.quantity}
                    {item.optionsSummary.length > 0 && <> · {item.optionsSummary[0]}</>}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-text-soft">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-surface-high pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-text-soft">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="text-text-soft">
                {deliveryFee === 0 ? (
                  <span className="text-success-green">FREE</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-surface-high pt-3">
              <dt className="font-display uppercase tracking-[0.06em] text-white">Total</dt>
              <dd className="font-display text-2xl text-amber">{formatPrice(grandTotal)}</dd>
            </div>
          </dl>

          <p className="mt-4 rounded-sm bg-amber/10 px-3 py-2.5 text-xs leading-relaxed text-amber">
            {fulfilment === "delivery"
              ? "Hot food on the asphalt in ~20–30 minutes. Free delivery on orders over Rs 800."
              : "Pickup is ready in 15 minutes. Head to the pick-up counter and say the order number."}
          </p>
        </aside>
      </div>
    </div>
  );
}