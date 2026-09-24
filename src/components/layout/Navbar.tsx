"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { nav, navCta } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Sticky, thin, quiet.
 *
 * At the top it is invisible chrome. Once the page moves, a hairline appears
 * underneath it — the only thing the nav ever does on scroll. No shrinking
 * logo, no blur, no colour change.
 */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Dismissing (Close, Escape) hands focus back to the Menu button. Following
     a link does not: the page is about to move to that section. */
  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the panel is open it is the whole page: Escape closes it, the page
     underneath neither scrolls nor takes focus, and a screen reader cannot
     wander into it. `inert` does the containment a hand-rolled trap would. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const background = Array.from(
      document.querySelectorAll<HTMLElement>("body > a[href='#main'], body > header, body > main, body > footer"),
    );
    background.forEach((node) => node.setAttribute("inert", ""));

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
      background.forEach((node) => node.removeAttribute("inert"));
    };
  }, [open, close]);

  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Saltar al contenido
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 bg-paper transition-colors duration-300",
          scrolled ? "border-b border-line" : "border-b border-transparent",
        )}
      >
        <div className="container-editorial flex h-18 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Make It Click — inicio"
            className="text-lg sm:text-xl"
            data-burst
          >
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            {/* The one action on the page that is always on screen gets to
                be a button, not a link. */}
            <Link
              href={navCta.href}
              data-burst
              data-cursor="Enviar"
              className="inline-flex min-h-11 items-center gap-2 rounded-xs border border-ink bg-ink px-4 py-3 font-display text-[0.6875rem] font-medium tracking-[0.12em] text-paper uppercase transition-colors duration-200 hover:border-blue hover:bg-blue hover:text-on-blue focus-visible:border-blue focus-visible:bg-blue focus-visible:text-on-blue"
            >
              {navCta.label} <span aria-hidden="true">↗</span>
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            data-burst
            className="label -mr-2 flex min-h-11 items-center gap-2 px-2 md:hidden"
          >
            Menú
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </button>
        </div>
      </header>

      {open ? <MobilePanel onClose={close} /> : null}
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-burst
      className={cn(
        // Underline grows from the left on hover: a small, earned reaction.
        "label relative py-2 transition-colors duration-200 hover:text-blue-on-paper",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-blue after:transition-transform after:duration-300 after:ease-[var(--ease-out-expo)] hover:after:scale-x-100 focus-visible:after:scale-x-100",
        "text-grey",
      )}
    >
      {children}
    </Link>
  );
}

function MobilePanel({ onClose }: { onClose: (restoreFocus: boolean) => void }) {
  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navegación"
      className="fixed inset-0 z-200 flex flex-col bg-ink text-paper md:hidden"
    >
      <div className="container-editorial flex h-18 shrink-0 items-center justify-between">
        <span className="text-lg">
          <Logo />
        </span>
        <button
          type="button"
          onClick={() => onClose(true)}
          autoFocus
          data-burst
          className="label -mr-2 flex min-h-11 items-center gap-2 px-2"
        >
          Cerrar
          <span aria-hidden="true" className="text-base leading-none">
            ✕
          </span>
        </button>
      </div>

      <nav aria-label="Principal" className="container-editorial flex flex-1 flex-col justify-center gap-2 pb-24">
        {[...nav, navCta].map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onClose(false)}
            data-burst
            className="group flex items-baseline gap-4 border-b border-line-dark py-5 font-display text-title font-semibold tracking-[-0.03em] uppercase transition-colors duration-200 hover:text-blue-on-ink"
          >
            <span className="label text-grey-dark">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
