"use client";

import { useId, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MiniSite } from "@/components/ui/MiniSite";
import { cn } from "@/lib/cn";

/**
 * Before / after, two ways.
 *
 *  - `slider` — a draggable split. The handle is a real <input type="range">
 *    at zero opacity over the frame, which buys pointer drag, touch drag and
 *    arrow-key control for free, correctly announced, with no custom keyboard
 *    handling and no gesture library.
 *
 *  - `toggle` — one click wipes the redesign across with a clip-path mask.
 *
 * Pass `url` and the component renders its own browser chrome. That is not
 * cosmetic: it lets the current state live in the URL bar instead of as a
 * badge floating over the miniature, where it would cover the very thing it
 * is labelling — the redesigned brand, top left, every time.
 */

type BeforeAfterProps = {
  project: Project;
  mode?: "slider" | "toggle";
  /** Renders browser chrome around the compare and reports state in it. */
  url?: string;
  className?: string;
};

export function BeforeAfter({ project, mode = "slider", url, className }: BeforeAfterProps) {
  return mode === "slider" ? (
    <SliderCompare project={project} url={url} className={className} />
  ) : (
    <ToggleCompare project={project} url={url} className={className} />
  );
}

/* -------------------------------------------------------------------------- */

/** The state chip shown in the browser chrome. */
function StateChip({ fixed }: { fixed: boolean }) {
  return (
    <span
      className={cn(
        "label px-2 py-1 transition-colors duration-500",
        fixed ? "bg-blue text-on-blue" : "bg-line text-ink",
      )}
    >
      {fixed ? "Después" : "Antes"}
    </span>
  );
}

function Chrome({
  url,
  state,
  children,
}: {
  url?: string;
  state: React.ReactNode;
  children: React.ReactNode;
}) {
  // Without chrome, a bare wrapper still has to carry the focus ring.
  if (!url) return <div className="focus-frame">{children}</div>;
  return (
    <BrowserFrame url={url} state={state}>
      {children}
    </BrowserFrame>
  );
}

/* -------------------------------------------------------------------------- */

function SliderCompare({
  project,
  url,
  className,
}: {
  project: Project;
  url?: string;
  className?: string;
}) {
  const [value, setValue] = useState(52);
  const inputId = useId();
  const drag = useRef<{
    id: number;
    touch: boolean;
    moved: boolean;
    x: number;
    y: number;
  } | null>(null);

  /* Pointer input lives on the frame, not on the range input.
   *
   * A range input stretched over the frame fails on phones both ways: iOS
   * only drags it from its (invisible) thumb, and Android grabs the value on
   * every touch — so a vertical scroll that starts on the frame, which is
   * most of the screen, drags the split instead of the page.
   *
   * `touch-action: pan-y` hands vertical movement to the browser. If a touch
   * turns into a scroll, the browser cancels the pointer and nothing moves;
   * only horizontal intent ever reaches these handlers. Mouse and pen jump to
   * the pointer on press; touch never jumps on press (that press may be the
   * start of a scroll) — it follows the finger, and a clean tap still jumps.
   *
   * The range input stays, unhittable, for keyboard and screen readers. */
  function valueAt(clientX: number, frame: HTMLElement) {
    const rect = frame.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.round(Math.min(1, Math.max(0, ratio)) * 100);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const touch = event.pointerType === "touch";
    drag.current = {
      id: event.pointerId,
      touch,
      moved: false,
      x: event.clientX,
      y: event.clientY,
    };
    if (!touch) {
      event.currentTarget.setPointerCapture(event.pointerId);
      setValue(valueAt(event.clientX, event.currentTarget));
    }
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    if (current.touch && !current.moved) {
      // A finger wobbles. Commit to dragging only once the gesture is
      // plainly sideways; until then it may still become a scroll.
      const dx = Math.abs(event.clientX - current.x);
      const dy = Math.abs(event.clientY - current.y);
      if (dx < 8 || dx <= dy) return;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    current.moved = true;
    setValue(valueAt(event.clientX, event.currentTarget));
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    if (current.touch && !current.moved) setValue(valueAt(event.clientX, event.currentTarget));
    drag.current = null;
  }

  function onPointerCancel() {
    // The browser took the gesture (a scroll). Leave the split where it was.
    drag.current = null;
  }

  return (
    <Chrome url={url} state={<span className="label text-grey">Arrastra ←→</span>}>
      <div
        className={cn(
          "compare relative isolate cursor-ew-resize touch-pan-y overflow-hidden bg-paper select-none",
          className,
        )}
        data-cursor="Arrastra"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {/* AFTER sits underneath and is revealed as the split moves left. */}
        <div className="absolute inset-0">
          <MiniSite spec={project.after} variant="after" />
        </div>

        {/* BEFORE is clipped to the left of the handle. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <MiniSite spec={project.before} variant="before" />
        </div>

        {/* Labels sit along the bottom edge: a split needs both named, and
            the foot of a page is the one band with nothing to cover. */}
        <span className="label pointer-events-none absolute bottom-0 left-0 z-20 bg-ink px-3 py-2 text-paper">
          Antes
        </span>
        <span className="label pointer-events-none absolute right-0 bottom-0 z-20 bg-blue px-3 py-2 text-on-blue">
          Después
        </span>

        {/* The visible divider. Presentational; state lives in `value` above. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 z-20 w-px bg-blue"
          style={{ left: `${value}%` }}
        >
          <span className="compare-handle absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue bg-blue text-on-blue">
            <svg viewBox="0 0 20 12" className="h-3 w-5" aria-hidden="true" focusable="false">
              <path
                d="M6 1.5 L1.5 6 L6 10.5 M14 1.5 L18.5 6 L14 10.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>

        <label htmlFor={inputId} className="sr-only">
          Comparar antes y después — {project.sector}
        </label>
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-valuetext={`${value}% rediseño visible`}
          className="compare-input pointer-events-none absolute inset-0 z-30 h-full w-full appearance-none bg-transparent opacity-0"
        />
      </div>
    </Chrome>
  );
}

/* -------------------------------------------------------------------------- */

function ToggleCompare({
  project,
  url,
  className,
}: {
  project: Project;
  url?: string;
  className?: string;
}) {
  const [fixed, setFixed] = useState(false);

  return (
    <Chrome
      url={url}
      state={
        <span className="flex items-center gap-3">
          <span className="label hidden text-grey sm:inline">
            {fixed ? "Click para deshacer" : "Click para arreglar"}
          </span>
          <StateChip fixed={fixed} />
        </span>
      }
    >
      <div
        className={cn("relative isolate overflow-hidden bg-paper", className)}
        data-cursor={fixed ? "Deshacer" : "Arreglar"}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <MiniSite spec={project.before} variant="before" />
        </div>

        {/* The redesign wipes across. Mask, not fade — it should feel replaced. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-[clip-path] duration-700 ease-[var(--ease-in-out-quart)]"
          style={{ clipPath: fixed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
        >
          <MiniSite spec={project.after} variant="after" />
        </div>

        {/* Full-bleed hit area. Keeps the markup valid and the target generous. */}
        <button
          type="button"
          onClick={() => setFixed((current) => !current)}
          aria-pressed={fixed}
          data-burst
          className="absolute inset-0 z-30 h-full w-full"
        >
          <span className="sr-only">
            {/* A constant name: aria-pressed already announces the state. */}
            {`Ver el rediseño — ${project.sector}`}
          </span>
        </button>
      </div>
    </Chrome>
  );
}
