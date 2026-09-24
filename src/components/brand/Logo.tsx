import { ClickMark } from "@/components/brand/ClickMark";
import { cn } from "@/lib/cn";

/**
 * The wordmark. MAKE IT CLICK, where the C of CLICK is the mark itself.
 *
 * Variants:
 *  - horizontal → one line. Nav, footer, anywhere inline.
 *  - stacked    → MAKE IT / CLICK. Secondary lockup.
 *  - compact    → the mark alone. Small surfaces only, always with a label.
 *
 * Sized entirely in `em`, so the whole lockup scales off font-size.
 */

type LogoProps = {
  variant?: "horizontal" | "stacked" | "compact";
  className?: string;
};

/**
 * Optical fit. The mark's centre is nudged up to meet the text's cap-height
 * centre, and the square viewBox is pulled in on both sides — the C's open
 * mouth otherwise reads as a word space before LICK.
 */
const markStyle = {
  transform: "translateY(-0.045em)",
  marginLeft: "-0.02em",
  marginRight: "-0.055em",
} as const;
const MARK_CLASS = "h-[0.82em] w-[0.82em]";

function Click({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <ClickMark className={MARK_CLASS} style={markStyle} />
      <span>LICK</span>
    </span>
  );
}

export function Logo({ variant = "horizontal", className }: LogoProps) {
  if (variant === "compact") {
    return (
      <ClickMark className={cn("h-[1em] w-[1em]", className)} title="Make It Click" />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex font-display font-semibold uppercase leading-none tracking-[-0.03em]",
        variant === "stacked" ? "flex-col items-start gap-[0.08em]" : "items-center",
        className,
      )}
    >
      {/* Screen readers get one clean string; the visual splice stays aria-hidden. */}
      <span className="sr-only">Make It Click</span>
      <span aria-hidden="true" className="inline-flex items-center">
        MAKE&nbsp;IT{variant === "horizontal" ? " " : ""}
        {variant === "horizontal" ? <Click /> : null}
      </span>
      {variant === "stacked" ? (
        <span aria-hidden="true" className="inline-flex items-center">
          <Click />
        </span>
      ) : null}
    </span>
  );
}
