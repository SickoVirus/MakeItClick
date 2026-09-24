"use client";

import { useState } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MiniSite } from "@/components/ui/MiniSite";
import { heroDemo } from "@/data/projects";
import { cn } from "@/lib/cn";
import { toDomain } from "@/lib/domain";

/**
 * The hero's argument, made clickable.
 *
 * A real (if miniature) bad website sits in a frame. One click fires the
 * brand burst and wipes the redesign across it. The page does not claim we
 * improve websites — it improves one, in front of you, on your input.
 *
 * Clicking again puts it back. Every click does something, in both directions.
 */

const project = heroDemo;

export function HeroDemo() {
  const [fixed, setFixed] = useState(false);
  const [touched, setTouched] = useState(false);

  function onToggle() {
    setFixed((current) => !current);
    setTouched(true);
  }

  return (
    <div className="w-full">
      <BrowserFrame
        url={toDomain(project.after.brand)}
        state={
          <span
            className={cn(
              "label px-2 py-1 transition-colors duration-500",
              fixed ? "bg-blue text-on-blue" : "bg-line text-ink",
            )}
          >
            {fixed ? "Después" : "Antes"}
          </span>
        }
      >
        <div className="relative isolate aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
          <div className="absolute inset-0" aria-hidden="true">
            <MiniSite spec={project.before} variant="before" />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[var(--ease-in-out-quart)]"
            style={{ clipPath: fixed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          >
            <MiniSite spec={project.after} variant="after" />
          </div>

          {/* Idle attractor. Retires permanently after the first interaction. */}
          {!touched ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="relative flex items-center justify-center">
                <span
                  className="absolute size-16 rounded-full border border-blue"
                  // Two pulses, done inside five seconds (WCAG 2.2.2), then the
                  // chip rests. An attractor that never stops is a nag.
                  style={{ animation: "mic-pulse 2.4s var(--ease-out-expo) 2" }}
                />
                <span className="label rounded-xs bg-blue px-3 py-2 text-on-blue">
                  Click
                </span>
              </span>
            </span>
          ) : null}

          <button
            type="button"
            onClick={onToggle}
            aria-pressed={fixed}
            data-burst
            data-cursor={fixed ? "Deshacer" : "Arreglar"}
            className="absolute inset-0 z-30 h-full w-full"
          >
            {/* A constant name: aria-pressed already announces the state. */}
            <span className="sr-only">Rediseñar esta web — ver el antes y el después</span>
          </button>
        </div>
      </BrowserFrame>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="label text-grey transition-colors duration-500" aria-live="polite">
          {fixed ? (
            <span className="text-ink">Ahora sí. ↑</span>
          ) : (
            <>
              Esta web no hace click.{" "}
              <span className="text-blue-on-paper">Hazle click.</span>
            </>
          )}
        </p>
        {/* A fictional business on the front page still has to say so. */}
        <p className="label text-grey">Concepto propio</p>
      </div>
    </div>
  );
}
