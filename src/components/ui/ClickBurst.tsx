"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The brand gesture, made global.
 *
 * Fires a short radial burst of Electric Blue at the pointer — but only on
 * elements that opt in with `data-burst`. Clicking body text does nothing,
 * which is the point: the burst means "that click did something".
 *
 * Mounted once, in the root layout.
 */

type Burst = { id: number; x: number; y: number };

const ANGLES = [-90, -30, 30, 90, 150, -150];
const LIFETIME = 440;

let nextId = 0;

export function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest?.("[data-burst]")) return;

      const burst = { id: nextId++, x: event.clientX, y: event.clientY };
      // Cap concurrency: rapid clicking should feel responsive, not messy.
      setBursts((current) => [...current.slice(-3), burst]);
      window.setTimeout(
        () => setBursts((current) => current.filter((b) => b.id !== burst.id)),
        LIFETIME,
      );
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden="true">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="mic-burst"
          style={{ left: burst.x, top: burst.y }}
        >
          {ANGLES.map((angle) => (
            <span
              key={angle}
              style={
                {
                  "--burst-angle": `${angle + 90}deg`,
                  "--burst-start": "-7px",
                  "--burst-end": "-17px",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
