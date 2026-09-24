import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/data/process";
import { cn } from "@/lib/cn";

/**
 * SECTION 05 — PROCESS
 *
 * Look, Think, Make, Click. Four columns on desktop, four stacked blocks on
 * mobile — never a timeline graphic with connector dots.
 *
 * The last step is the only one that takes the blue, because it is the only
 * one the client actually clicks.
 */

export function Process() {
  return (
    <Section id="process" index="05" label="Proceso" tone="ink" counter="04 pasos">
      <Reveal variant="mask" className="max-w-3xl">
        <h2 className="font-display text-headline font-semibold uppercase">
          Cómo se arregla
          <br />
          una web<span className="text-blue">.</span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-x-10 gap-y-2 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => {
          const last = index === process.length - 1;
          return (
            <Reveal as="li" key={step.id} delay={index * 80}>
              <div className="flex h-full flex-col border-t border-line-dark pt-6 pb-10 md:min-h-64">
                <p className={cn("label", last ? "text-blue-on-ink" : "text-grey-dark")}>
                  {step.id}
                </p>

                {/* Look → Click is the brand's own vocabulary; it stays English. */}
                <h3
                  lang="en"
                  className={cn(
                    "mt-6 font-display text-title font-semibold uppercase tracking-[-0.03em]",
                    last && "text-blue",
                  )}
                >
                  {step.title}
                </h3>

                <p className="mt-4 max-w-xs flex-1 text-base text-grey-dark text-pretty">
                  {step.body}
                </p>

                <p className="label mt-8 text-paper">{step.output}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
