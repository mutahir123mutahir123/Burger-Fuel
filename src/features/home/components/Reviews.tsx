"use client";

import { motion, useReducedMotion } from "motion/react";

const RATINGS = [
  { stars: 5, pct: 65, color: "bg-success-green" },
  { stars: 4, pct: 20, color: "bg-mustard" },
  { stars: 3, pct: 10, color: "bg-amber" },
  { stars: 2, pct: 3, color: "bg-muted-deep" },
  { stars: 1, pct: 2, color: "bg-primary" },
] as const;

const REVIEWS: {
  name: string;
  initials: string;
  mobileRole: string;
  mobileRoleColor: string;
  desktopRole: string;
  stars: number;
  text: string;
  avatarBg: string;
  avatarText?: string;
  span?: boolean;
}[] = [
  {
    name: "Areej Saeed",
    initials: "AS",
    mobileRole: "Local Guide",
    mobileRoleColor: "text-amber",
    desktopRole: "Verified Google Local Guide",
    stars: 5,
    text: "Absolutely loved it. The pizza was fresh, cheesy, and full of flavor with soft dough and delicious toppings. The burger was juicy, saucy, and equally amazing. Everything tasted perfect.",
    avatarBg: "bg-primary",
  },
  {
    name: "Hamnah Shehryar",
    initials: "HS",
    mobileRole: "Regular",
    mobileRoleColor: "text-primary",
    desktopRole: "Verified Google Reviewer",
    stars: 5,
    text: "Very good taste! Each and everything is perfect, lasagna pizza bht acha tha inka. Will definitely order again with friends.",
    avatarBg: "bg-amber",
    avatarText: "text-black",
  },
  {
    name: "Verified Visitor",
    initials: "LV",
    mobileRole: "Verified",
    mobileRoleColor: "text-muted",
    desktopRole: "Shad Bagh Local Diner",
    stars: 4,
    text: "Zinger burger was fine, great value deals. Fast takeaway service at late midnight when everything else in the area was closed.",
    avatarBg: "bg-surface-3",
    avatarText: "text-muted",
    span: true,
  },
];

function StarIcon({ filled, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();

  return (
    <section id="reviews" className="scroll-mt-28">
      {/* ── Mobile layout ── */}
      <div className="lg:hidden">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col px-4 py-8"
        >
          {/* Header row */}
          <div className="flex items-end justify-between">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-amber">
                Tested on the streets
              </span>
              <h2 className="font-display text-[32px] uppercase leading-tight tracking-wide text-white mt-1">
                Google Reviews
              </h2>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-surface px-2 py-1 border border-line">
              <StarIcon filled className="size-5 text-amber" />
              <span className="font-display text-lg text-white">3.8</span>
              <span className="text-[11px] text-muted">/ 5.0</span>
            </div>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-3 overflow-x-auto py-5 no-scrollbar">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="w-72 shrink-0 flex flex-col justify-between rounded-xl bg-surface p-3 shadow-lg border border-line"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[18px] uppercase text-white">
                      {r.name}
                    </span>
                    <span className={`text-[11px] font-bold uppercase ${r.mobileRoleColor}`}>
                      {r.mobileRole}
                    </span>
                  </div>
                  <div className="my-1 flex text-amber">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < r.stars}
                        className="size-4"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
                <span className="mt-3 text-[10px] font-medium uppercase text-muted-deep">
                  Verified Google Review
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-12 items-start gap-8">
            {/* Scorecard */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-4 flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber">✓</span>
                <span className="font-display text-lg uppercase tracking-wider text-white">
                  Verified Google Score
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-display text-6xl text-mustard drop-shadow-md">
                  3.8
                </span>
                <div className="flex flex-col">
                  <div className="flex text-mustard">
                    {[1, 2, 3].map((i) => (
                      <StarIcon key={i} filled className="size-5" />
                    ))}
                    <StarIcon className="size-5" />
                    <StarIcon className="size-5" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-muted">
                    Out of 5.0 (Google verified ratings)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {RATINGS.map(({ stars, pct, color }) => (
                  <div
                    key={stars}
                    className="flex items-center gap-2 text-xs font-medium text-text"
                  >
                    <span className="w-7">{stars} ★</span>
                    <div className="relative h-2.5 flex-1 overflow-hidden rounded-full border border-line-soft bg-surface-3">
                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-right font-bold">{pct}%</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Burger+Fuel+Tokey+Wala+Chowk+Shad+Bagh+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-sm border border-line bg-surface-3 px-4 py-2.5 font-display text-sm uppercase tracking-wider text-white transition-colors hover:border-transparent hover:bg-primary"
              >
                Leave a Google Review
              </a>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-8 flex flex-col gap-5"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-display text-xs uppercase tracking-[0.1em] text-primary">
                  Community Feedback
                </span>
                <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white">
                  Real foodies. Zero filter.
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {REVIEWS.map((r) => (
                  <div
                    key={r.name}
                    className={`flex flex-col justify-between rounded-lg border border-line bg-surface p-5 shadow-lg transition-colors hover:border-surface-3 ${
                      r.span ? "col-span-2" : ""
                    }`}
                  >
                    <div>
                      <div className="mb-3 flex text-mustard">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            filled={i < r.stars}
                            className="size-[18px]"
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-text italic">
                        &ldquo;{r.text}&rdquo;
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3 border-t border-line-soft pt-3">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold text-white shadow ${r.avatarBg} ${r.avatarText ?? ""}`}
                      >
                        {r.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          {r.name}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          {r.desktopRole}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
