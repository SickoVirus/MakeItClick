"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`, live. CSS handles most of our motion;
 * this exists for the JS-driven pieces (burst, cursor, autoplay demos)
 * that CSS cannot switch off on its own.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
