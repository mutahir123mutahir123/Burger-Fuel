import Link from "next/link";
import Image from "next/image";
import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

const HOURS = [
  { day: "MON — THU", time: "11:00 — 23:00" },
  { day: "FRI — SAT", time: "11:00 — 01:00" },
  { day: "SUN", time: "12:00 — 22:00" },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-high bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.jpeg"
              alt="Burger Fuel logo"
              width={96}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              High-octane craft burgers, wood-fired pizzas and loaded street sides.
              Built to be eaten, not stared at.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: InstagramLogo, label: "Instagram" },
                { icon: FacebookLogo, label: "Facebook" },
                { icon: XLogo, label: "X (Twitter)" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Burger Fuel on ${label}`}
                  className="grid size-10 place-items-center rounded-full border border-surface-high text-muted transition-colors hover:border-primary hover:text-white"
                >
                  <Icon size={18} weight="bold" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.08em] text-white">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link className="transition-colors hover:text-white" href="/menu">Full menu</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/#deals">Deals & conquests</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/#story">Our fuel story</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/#location">Store locator</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.08em] text-white">Kitchen hours</h2>
            <ul className="mt-4 space-y-3">
              {HOURS.map(({ day, time }) => (
                <li key={day} className="flex items-center justify-between text-sm">
                  <span className="font-display text-xs tracking-[0.06em] text-text-soft">{day}</span>
                  <span className="text-muted">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.08em] text-white">Zero contact</h2>
            <p className="mt-4 text-sm text-muted">
              Call to skip the queue, or order online and we will fire it the moment you park.
            </p>
            <a
              href="tel:+923292833343"
              className="mt-4 inline-flex items-center rounded-sm border-2 border-amber px-5 py-2.5 font-display text-sm uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber hover:text-black"
            >
              +92 329 2833343
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface-high pt-6 sm:flex-row">
          <p className="text-xs text-muted-deep">
            © {new Date().getFullYear()} Burger Fuel. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-deep">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Allergens</a>
          </div>
        </div>
      </div>
    </footer>
  );
}