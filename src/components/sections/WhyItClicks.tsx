"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PrincipleDemo } from "@/components/ui/PrincipleDemos";
import { principles } from "@/data/principles";
import { cn } from "@/lib/cn";

/**
 * SECTION 06 — WHY IT CLICKS
 *
 * The section could have been five sentences. Instead each principle is a
 * tab, and selecting it runs a live demonstration of that principle.
 *
 * Built on the real tabs pattern: roving tabindex, arrow-key navigation,
 * Home/End, and a labelled panel. On small screens the same tabs sit in a
 * horizontal scroller above the panel, so nothing collapses into an
 * accordion that hides the point of the section.
 */

export function WhyItClicks() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = principles.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  const current = principles[active];

  return (
    <Section index="06" label="Principios" counter="05 principios">
      {/* The section's name is brand vocabulary, so it stays English. */}
      <Reveal variant="mask" as="h2" lang="en" className="max-w-3xl font-display text-headline font-semibold uppercase">
        Why it clicks<span className="text-blue">.</span>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-6 max-w-md text-sub text-grey text-balance">
          Cinco cosas que no negociamos. Cada una está demostrada aquí mismo.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-8 md:mt-24 lg:grid-cols-12">
        {/* min-w-0: without it the grid column is sized by the tab scroller's
            content and pushes past the viewport on small screens. */}
        <Reveal className="min-w-0 lg:col-span-5">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Principios"
            onKeyDown={onKeyDown}
            className="scroller flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
          >
            {principles.map((principle, index) => {
              const selected = index === active;
              return (
                <button
                  key={principle.id}
                  ref={(node) => {
                    tabsRef.current[index] = node;
                  }}
                  id={`principle-tab-${principle.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  // Only the open panel is rendered, so only its tab may point at it.
                  aria-controls={selected ? `principle-panel-${principle.id}` : undefined}
                  // Named by the title alone; the reasoning is a description,
                  // and only for the open tab (the others keep theirs hidden).
                  aria-labelledby={`principle-title-${principle.id}`}
                  aria-describedby={selected ? `principle-body-${principle.id}` : undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  data-burst
                  className={cn(
                    "shrink-0 snap-start rounded-none text-left transition-colors duration-300",
                    "min-h-12 border border-line px-4 py-3.5",
                    "lg:w-full lg:border-0 lg:border-t lg:px-0 lg:py-6 lg:last:border-b",
                    selected
                      ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink"
                      : "text-grey hover:text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "label tabular-nums transition-colors duration-300",
                        // Below lg the selected tab is an ink chip, so its number
                        // takes the blue tuned for ink; on lg it sits on paper.
                        selected ? "text-blue-on-ink lg:text-blue-on-paper" : "text-grey",
                      )}
                    >
                      {principle.id}
                    </span>
                    <span
                      id={`principle-title-${principle.id}`}
                      className="font-display text-base font-medium tracking-[-0.02em] whitespace-nowrap lg:text-2xl lg:whitespace-normal"
                    >
                      {principle.title}
                    </span>
                  </span>

                  {/* The reasoning only appears for the open principle, and only
                      where there is room for it. */}
                  <span
                    id={`principle-body-${principle.id}`}
                    className={cn(
                      "hidden max-w-sm pl-9 text-sm text-pretty lg:block",
                      selected
                        ? "mt-3 text-grey opacity-100"
                        : "mt-0 h-0 overflow-hidden opacity-0",
                    )}
                  >
                    {principle.body}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0 lg:col-span-7">
          <div
            id={`principle-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`principle-tab-${current.id}`}
            tabIndex={0}
            className="flex min-h-105 flex-col border border-line bg-paper"
          >
            {/* Remounting on change restarts any demo that runs on a timer.
                A flex row, so the demo stretches to the panel's full height
                and its own vertical centring has room to work. */}
            <div key={current.id} className="flex flex-1">
              <PrincipleDemo demo={current.demo} />
            </div>
          </div>
          <p className="label mt-4 text-grey">{current.caption}</p>

          {/* On small screens the tab list has no room for the reasoning, so it
              lives here instead — never dropped, only moved. */}
          <p className="mt-3 max-w-md text-base text-grey text-pretty lg:hidden">
            {current.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
