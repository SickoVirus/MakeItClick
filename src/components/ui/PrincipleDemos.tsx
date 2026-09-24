"use client";

import { useEffect, useState } from "react";
import type { PrincipleDemo } from "@/data/principles";
import { ActionLink } from "@/components/ui/ActionLink";
import { MiniSite } from "@/components/ui/MiniSite";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Five small demonstrations, one per principle.
 *
 * Each one has to *show* its principle rather than illustrate it. If a demo
 * could be replaced by a stock icon without losing meaning, it does not
 * belong in this file.
 */

export function PrincipleDemo({ demo }: { demo: PrincipleDemo }) {
  switch (demo) {
    case "hierarchy":
      return <HierarchyDemo />;
    case "impression":
      return <ImpressionDemo />;
    case "mobile":
      return <MobileDemo />;
    case "speed":
      return <SpeedDemo />;
    case "interaction":
      return <InteractionDemo />;
  }
}

/* No h-full: the demo is a flex item of the tab panel and stretches to its
   height. A percentage height would block that stretch and pin it to the top. */
const PANEL = "flex w-full flex-1 flex-col justify-center gap-6 p-6 sm:p-10";

/* -------------------------------------------------------------------------- */

/** Same five pieces of content twice. Only the ranking changes. */
function HierarchyDemo() {
  return (
    <div className={cn(PANEL, "sm:flex-row sm:items-center sm:gap-10")}>
      <div className="flex-1">
        <p className="label mb-4 text-grey">Todo al mismo nivel</p>
        <div className="space-y-2.5 border border-line p-4">
          {[100, 92, 96, 88, 94].map((width, index) => (
            <span
              key={index}
              className="block h-2.5 bg-line"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <p className="label mb-4 text-ink">Una cosa manda</p>
        <div className="space-y-2.5 border border-line p-4">
          <span className="block h-6 w-4/5 bg-ink" />
          <span className="block h-2 w-3/5 bg-line" />
          <span className="block h-2 w-2/5 bg-line" />
          <span className="mt-4 block h-5 w-1/3 bg-blue" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Three seconds pass. Then we grey out everything nobody had time to read. */
function ImpressionDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className={PANEL}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="label text-grey">Tres segundos</p>
        <button
          type="button"
          onClick={() => setRun((current) => current + 1)}
          data-burst
          className="label min-h-11 text-blue-on-paper underline underline-offset-4"
        >
          Repetir
        </button>
      </div>

      {/* Replaying is a remount, not a state reset: the timeout and the CSS
          timer bar both restart from scratch, with nothing to unwind. */}
      <ImpressionRun key={run} />
    </div>
  );
}

function ImpressionRun() {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setElapsed(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="h-px w-full bg-line">
        <span
          className="block h-px origin-left bg-blue"
          style={{ animation: "mic-timer 3s linear forwards" }}
        />
      </div>

      <div className="border border-line p-5 sm:p-7">
        {/* The headline survives the three seconds. Everything else fades out. */}
        <p className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Mesa para dos, a las ocho.
        </p>
        <p
          className={cn(
            "mt-3 max-w-sm text-sm transition-colors duration-700",
            elapsed ? "text-line" : "text-grey",
          )}
        >
          Cocina del norte, producto de mercado, carta corta que cambia cada temporada
          según lo que haya ese mes.
        </p>
        <span
          className={cn(
            "mt-5 inline-block rounded-xs px-4 py-2.5 text-xs tracking-[0.1em] uppercase transition-colors duration-700",
            elapsed ? "bg-blue text-on-blue" : "bg-line text-ink",
          )}
        >
          Reservar
        </span>
      </div>

      <p className="label text-grey" aria-live="polite">
        {elapsed ? "Lo que quedó: el titular y el botón." : "Leyendo…"}
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */

/** The real miniature, at the width it was designed for. */
function MobileDemo() {
  return (
    <div className={cn(PANEL, "items-center")}>
      <div className="w-full max-w-[15rem]">
        <div className="overflow-hidden rounded-sm border-2 border-ink">
          <div className="flex justify-center bg-ink py-1.5">
            <span className="h-1 w-10 rounded-full bg-grey" />
          </div>
          <div className="aspect-[9/16] w-full">
            <MiniSite spec={projects[1].after} variant="after" />
          </div>
        </div>
        <p className="label mt-4 text-center text-grey">375 × 812</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Facts about this page, not borrowed benchmarks. */
const BUILD_FACTS = [
  { value: "0", label: "imágenes cargadas" },
  { value: "0", label: "librerías de animación" },
  { value: "3", label: "fuentes, autoalojadas" },
];

function SpeedDemo() {
  return (
    <div className={PANEL}>
      <p className="label text-grey">Esta página, medida por dentro</p>
      <ul className="divide-y divide-line border-y border-line">
        {BUILD_FACTS.map((fact) => (
          <li key={fact.label} className="flex items-baseline gap-6 py-5">
            <span className="font-display text-4xl leading-none font-semibold tabular-nums sm:text-5xl">
              {fact.value}
            </span>
            <span className="text-sm text-grey">{fact.label}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-grey text-pretty">
        Los antes y después que acabas de ver no son capturas: son interfaces
        construidas en HTML y CSS. No hay nada que descargar.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** The shortest possible proof. */
function InteractionDemo() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className={cn(PANEL, "items-start")}>
      <p className="label text-grey">Un botón. Nada más.</p>

      <ActionLink
        onClick={() => setClicks((current) => current + 1)}
        cursorLabel="Click"
      >
        {clicks === 0 ? "Haz click" : "Otra vez"}
      </ActionLink>

      <p className="max-w-sm text-sm text-grey text-pretty" aria-live="polite">
        {clicks === 0
          ? "Debería pasar algo. Algo pequeño, y a tiempo."
          : clicks === 1
            ? "Eso. Nada más que eso, y siempre por una razón."
            : `${clicks} clicks. Cada uno hizo exactamente lo mismo — eso también es diseño.`}
      </p>
    </div>
  );
}
