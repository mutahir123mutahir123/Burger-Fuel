"use client";

import { Clock, MapPin, NavigationArrow, PhoneCall } from "@phosphor-icons/react/dist/ssr";
import { LOCATION } from "@/constants/location";

export function FindUsInfoCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 rounded-xl border border-line bg-surface/95 p-6 shadow-[0_0_35px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-green opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success-green" />
          </span>
          <span className="font-display text-sm uppercase tracking-[0.08em] text-success-green">
            Open now · till 2:00 AM
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-[0.02em] text-white">
          {LOCATION.name}
        </h3>
        <p className="mt-1 font-display text-[13px] uppercase tracking-[0.08em] text-muted">
          {LOCATION.tagline}
        </p>
      </div>

      <ul className="flex flex-col gap-3.5">
        <li className="flex items-start gap-3">
          <MapPin size={20} weight="bold" className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold leading-relaxed text-white">
              {LOCATION.address}
            </p>
            <p className="text-xs text-muted">{LOCATION.city}</p>
            <p className="mt-0.5 text-xs text-muted-deep">{LOCATION.landmark}</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Clock size={20} weight="bold" className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-white">{LOCATION.hours}</p>
            <p className="text-xs text-muted">{LOCATION.hoursNote}</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <PhoneCall size={20} weight="bold" className="mt-0.5 shrink-0 text-mustard" aria-hidden="true" />
          <a
            href={LOCATION.phoneHref}
            className="text-sm font-semibold text-white transition-colors hover:text-amber"
          >
            {LOCATION.phoneLabel}
          </a>
        </li>
      </ul>

      <div className="grid gap-2.5">
        <a
          href={LOCATION.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-3 font-display text-sm uppercase tracking-[0.06em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(224,30,38,0.35)] active:scale-[0.98]"
        >
          <NavigationArrow size={18} weight="fill" aria-hidden="true" />
          Get Google Directions
        </a>
        <a
          href={LOCATION.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded border-2 border-amber px-4 py-3 font-display text-sm uppercase tracking-[0.06em] text-amber transition-all duration-300 hover:bg-amber hover:text-black active:scale-[0.98]"
        >
          <PhoneCall size={18} weight="bold" aria-hidden="true" />
          Call Counter
        </a>
      </div>
    </div>
  );
}