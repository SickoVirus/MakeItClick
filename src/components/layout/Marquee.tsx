"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One full-bleed band of Electric Blue, carrying the brand's own vocabulary.
 *
 * This is the only place blue takes a whole surface, and it earns it: it is
 * the hinge between the problem and the proof, and it is where the content
 * series ("this doesn't click", "one click fix") gets said out loud instead
 * of being explained.
 *
 * Kept austere — flat colour, square corners, no shadow, no gradient, and
 * slow enough to read. It stands still under `prefers-reduced-motion`.
 *
 * It is also the page's only endless loop, so it answers to the reader:
 *  - a visible pause control (WCAG 2.2.2 — touch has no hover to lean on);
 *  - hover or focus inside the band holds it still while it is being read;
 *  - it stops entirely while offscreen, where moving costs and gives nothing.
 * The phrases are English brand vocabulary; the control speaks Spanish.
 */

const PHRASES = [
  "This doesn’t click",
  "Make it click",
  "One click fix",
  "3 things we’d change",
  "Why it clicks",
];

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex shrink-0 items-center">
          <span className="px-6 font-display text-[clamp(1.75rem,4.4vw,3.25rem)] font-semibold tracking-[-0.03em] whitespace-nowrap uppercase sm:px-10">
            {phrase}
          </span>
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rotate-45 bg-on-blue/70 sm:size-2.5"
          />
        </span>
      ))}
    </span>
  );
}

/** Drawn, not typed: two bars to pause, one triangle to resume. */
function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden="true" focusable="false">
      {paused ? (
        <path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" />
      ) : (
        <>
          <rect x="2" y="1.5" width="2.5" height="9" fill="currentColor" />
          <rect x="7.5" y="1.5" width="2.5" height="9" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function Marquee() {
  const bandRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [onscreen, setOnscreen] = useState(true);

  useEffect(() => {
    const node = bandRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bandRef}
      aria-label="Make It Click"
      lang="en"
      data-running={!paused && onscreen}
      className="marquee relative overflow-hidden border-y border-blue bg-blue py-5 text-on-blue sm:py-7"
    >
      <div className="marquee-track">
        <Run />
        {/* Second pass makes the loop seamless; it must not be read twice. */}
        <Run hidden />
      </div>

      {/* Sits on a solid blue pad so the phrases slide under it rather than
          through it. Hidden when motion is reduced: nothing moves to pause. */}
      <div className="absolute inset-y-0 right-0 flex items-center bg-blue pr-[var(--spacing-gutter)] pl-3 motion-reduce:hidden">
        <button
          type="button"
          lang="es"
          onClick={() => setPaused((current) => !current)}
          aria-pressed={paused}
          data-burst
          className="flex size-11 items-center justify-center rounded-xs border border-on-blue/50 text-on-blue transition-colors duration-150 hover:bg-on-blue hover:text-blue focus-visible:outline-on-blue"
        >
          <PlaybackIcon paused={paused} />
          <span className="sr-only">Pausar la cinta</span>
        </button>
      </div>
    </section>
  );
}
