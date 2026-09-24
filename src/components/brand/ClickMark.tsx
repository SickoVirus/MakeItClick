import { cn } from "@/lib/cn";

/**
 * The Make It Click mark: an open geometric C, a click burst, a cursor.
 *
 * Built to scale from 16px (favicon) to a full-bleed wordmark:
 *  - the ring inherits `currentColor`, so it sits on ink or on paper
 *  - the cursor is always paper-filled with an ink outline drawn beneath it,
 *    which keeps it legible over the ring on either ground (this is how the
 *    mark behaves on the brand board, in both the wordmark and the favicon)
 *  - blue appears once, and only in the burst
 *
 * Geometry lives in a 64×64 box with the ring centred on (32, 32).
 */

/** Ring: arc from 42° round through 180° to −42°, leaving the C's mouth open. */
const RING = "M 49.83 15.94 A 24 24 0 1 0 49.83 48.06";

/** Classic pointer, tip at (0,0), drawn down-right. Translated into place. */
const CURSOR =
  "M0 0 L0 25.5 L6.3 19.8 L10.2 28.5 L14.1 26.7 L10.2 18.3 L18 18 Z";

/** Five radial ticks — enough to read as a burst, few enough to survive 16px. */
const BURST_ANGLES = [-90, -144, -36, 180, 0];
const BURST_ORIGIN = { x: 29.5, y: 26.5 };

type ClickMarkProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Provide only when the mark is the sole carrier of the brand name. */
  title?: string;
};

export function ClickMark({ className, style, title }: ClickMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={RING} fill="none" stroke="currentColor" strokeWidth="10" />

      <g stroke="var(--color-blue)" strokeWidth="3">
        {BURST_ANGLES.map((angle) => {
          const radians = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={BURST_ORIGIN.x + Math.cos(radians) * 5.5}
              y1={BURST_ORIGIN.y + Math.sin(radians) * 5.5}
              x2={BURST_ORIGIN.x + Math.cos(radians) * 11}
              y2={BURST_ORIGIN.y + Math.sin(radians) * 11}
            />
          );
        })}
      </g>

      <path
        d={CURSOR}
        transform="translate(28.5 25.5)"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}
