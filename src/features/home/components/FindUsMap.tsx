"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { LOCATION } from "@/constants/location";

const DARK_MAP_FILTER =
  "grayscale(0.2) invert(0.92) hue-rotate(180deg) contrast(0.88) saturate(0.4) brightness(1.05)";

export function FindUsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, amount: 0.15 });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={mapRef} className="relative h-full w-full overflow-hidden bg-surface">
      {isInView ? (
        <iframe
          title="Burger Fuel Shad Bagh location on Google Maps"
          src={LOCATION.embedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
          className="h-full w-full border-0"
          style={{ filter: DARK_MAP_FILTER }}
        />
      ) : null}

      {/* Skeleton loader until the map has actually loaded */}
      {!isLoaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface">
          <div className="size-10 animate-pulse rounded-full bg-surface-3" />
          <div className="h-2 w-36 animate-pulse rounded-full bg-surface-3" />
          <div className="h-2 w-24 animate-pulse rounded-full bg-surface-3" />
        </div>
      ) : null}
    </div>
  );
}