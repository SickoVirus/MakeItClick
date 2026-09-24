import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The one button in the system.
 *
 * Rest state is ink (on paper) or paper (on ink). Hover and focus flip it to
 * Electric Blue — blue arrives at the moment of interaction and never before.
 * That is the entire colour rule, expressed in a single component.
 *
 * Square-ish by design (4px). Nothing here becomes a pill.
 *
 * Renders a link when given `href`, a button otherwise; the union below makes
 * "a link that is also a submit button" unrepresentable.
 */

type Variant = "primary" | "inverse";

type BaseProps = {
  children: React.ReactNode;
  /** Trailing arrow. On by default — these are always forward actions. */
  arrow?: boolean;
  variant?: Variant;
  className?: string;
  /** Label shown by the trailing cursor chip on fine-pointer devices. */
  cursorLabel?: string;
};

type Props = BaseProps &
  (
    | { href: string; onClick?: never; type?: never; disabled?: never }
    | {
        href?: never;
        onClick?: () => void;
        type?: "button" | "submit";
        disabled?: boolean;
      }
  );

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-ink bg-ink text-paper hover:border-blue hover:bg-blue hover:text-on-blue focus-visible:border-blue focus-visible:bg-blue focus-visible:text-on-blue",
  inverse:
    "border-paper bg-paper text-ink hover:border-blue hover:bg-blue hover:text-on-blue focus-visible:border-blue focus-visible:bg-blue focus-visible:text-on-blue",
};

const BASE = cn(
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-xs border px-6 py-4",
  "font-display text-sm font-medium uppercase leading-none tracking-[0.1em]",
  "transition-colors duration-200 ease-[var(--ease-out-expo)]",
  "disabled:cursor-wait disabled:opacity-60",
);

function Inner({ children, arrow }: { children: React.ReactNode; arrow: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );
}

export function ActionLink({
  children,
  href,
  onClick,
  type,
  disabled,
  arrow = true,
  variant = "primary",
  className,
  cursorLabel,
}: Props) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} data-burst data-cursor={cursorLabel}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-burst
      data-cursor={cursorLabel}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
