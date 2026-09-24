"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll reveal. One IntersectionObserver per element, disconnected the
 * moment it fires — nothing observes the page after it has been read.
 *
 * The animation itself lives in CSS (`[data-reveal]` in globals.css), which
 * means `prefers-reduced-motion` switches it off without any JS involvement.
 *
 * No IntersectionObserver fallback: it has been baseline in every browser for
 * years, and well below the floor Next 16 and React 19 already set.
 */

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. Keep it under ~300 — this is punctuation. */
  delay?: number;
  /**
   * "fade" lifts the block into place. "mask" wipes the line up from its own
   * baseline — stronger, and reserved for headline type, since it clips.
   */
  variant?: "fade" | "mask";
  as?: ElementType;
  className?: string;
  /** For the brand's English lines on a Spanish page. */
  lang?: string;
  /**
   * Above the fold: the entrance starts with the first paint, in pure CSS.
   * No observer, no hydration wait — the hero headline is the page's LCP
   * element, and it must not sit behind React.
   */
  immediate?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  as: Tag = "div",
  className,
  lang,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    const node = ref.current;
    if (!node || immediate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      lang={lang}
      data-reveal={shown ? "in" : ""}
      data-reveal-variant={variant}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {variant === "mask" ? <span className="mic-mask">{children}</span> : children}
    </Tag>
  );
}
