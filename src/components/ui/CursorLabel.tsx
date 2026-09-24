"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A small label that trails the pointer over elements marked `data-cursor`.
 *
 * Deliberate constraints:
 *  - the native cursor is never hidden, so nothing about usability changes
 *  - fine pointers only (no touch, no pen) — mobile is untouched
 *  - the label repeats an affordance that already exists in the DOM, so a
 *    keyboard or screen-reader user loses nothing by not seeing it
 *  - position is written straight to `transform` inside rAF; no re-renders
 */

const OFFSET = { x: 16, y: 16 };

export function CursorLabel() {
  const elementRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const pointRef = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    /* One frame is scheduled per burst of movement, never a standing loop:
       a still pointer costs nothing. */
    function paint() {
      frameRef.current = 0;
      const node = elementRef.current;
      if (!node) return;
      const { x, y } = pointRef.current;
      node.style.transform = `translate3d(${x + OFFSET.x}px, ${y + OFFSET.y}px, 0)`;
    }

    function onPointerMove(event: PointerEvent) {
      pointRef.current = { x: event.clientX, y: event.clientY };
      if (!frameRef.current) frameRef.current = requestAnimationFrame(paint);
      const host = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(host ? host.getAttribute("data-cursor") : null);
    }

    function onPointerLeave() {
      setLabel(null);
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <div
      ref={elementRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block"
    >
      <span
        className={`label inline-block rounded-xs bg-blue px-2 py-1.5 text-on-blue transition-[opacity,transform] duration-200 ease-[var(--ease-out-expo)] ${
          label ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {label ?? ""}
      </span>
    </div>
  );
}
