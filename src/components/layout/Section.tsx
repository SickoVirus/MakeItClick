import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section chrome. Every section opens the same way: a hairline rule, then a
 * meta row carrying the section number, its name, and an optional counter.
 *
 * This repetition is the grid. It is what makes the page read as one
 * publication instead of a stack of unrelated blocks.
 */

type SectionProps = {
  id?: string;
  /** Two digits. Sections are numbered across the whole page. */
  index: string;
  label: string;
  /** Right-hand meta: "01 / 03", "Since 2026", anything short. */
  counter?: string;
  tone?: "paper" | "ink";
  children: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  label,
  counter,
  tone = "paper",
  children,
  className,
}: SectionProps) {
  const dark = tone === "ink";

  return (
    <section
      id={id}
      aria-labelledby={`${id ?? index}-label`}
      className={cn(
        "py-section",
        dark ? "bg-ink text-paper" : "bg-paper text-ink",
        className,
      )}
    >
      <div className="container-editorial">
        <hr className={dark ? "rule-dark" : "rule"} />
        <Reveal
          className={cn(
            "flex items-end justify-between gap-6 pt-5 pb-12 md:pb-20",
            dark ? "text-grey-dark" : "text-grey",
          )}
        >
          {/* The number is set at display scale. Running down the page, these
              numerals are the spine of the whole document. */}
          <p id={`${id ?? index}-label`} className="flex items-baseline gap-4 sm:gap-6">
            <span
              className={cn(
                "font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.78] font-semibold tracking-[-0.045em] tabular-nums",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {index}
            </span>
            <span className="label">{label}</span>
          </p>
          {/* The counter is short and never wraps; the label gives way first. */}
          {counter ? <p className="label shrink-0 whitespace-nowrap tabular-nums">{counter}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
