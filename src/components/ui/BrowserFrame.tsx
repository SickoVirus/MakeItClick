import { cn } from "@/lib/cn";

/**
 * A browser chrome wrapper. Thin, quiet, no drop shadow — it is a frame,
 * not a decorative mockup. The URL bar carries the state label
 * (before / after), which is the only place the frame speaks.
 */

type BrowserFrameProps = {
  url: string;
  /** Shown on the right of the URL bar. Usually BEFORE or AFTER. */
  state?: React.ReactNode;
  tone?: "paper" | "ink";
  children: React.ReactNode;
  className?: string;
};

export function BrowserFrame({
  url,
  state,
  tone = "paper",
  children,
  className,
}: BrowserFrameProps) {
  const dark = tone === "ink";

  return (
    <div
      className={cn(
        "focus-frame flex flex-col overflow-hidden rounded-sm border",
        dark ? "border-line-dark bg-ink" : "border-line bg-paper",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-b px-3 py-2.5 sm:px-4",
          dark ? "border-line-dark" : "border-line",
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-2 rounded-full",
                dark ? "bg-line-dark" : "bg-line",
              )}
            />
          ))}
        </div>
        <p
          className={cn(
            "label flex-1 truncate",
            dark ? "text-grey-dark" : "text-grey",
          )}
        >
          {url}
        </p>
        {state}
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}
