import type { AfterSpec, BeforeSpec, SiteContent } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * A website, rendered small.
 *
 * These are live interfaces built from data — not screenshots, not images,
 * not mockups pasted in from somewhere else. Two consequences worth the
 * trouble:
 *
 *  1. Nothing to download, nothing to optimise, nothing to lazy-load.
 *  2. Every "before" is ours. We are not photographing a real business's
 *     website in order to call it bad.
 *
 * Everything is sized in `cqw`, so one component renders correctly at 280px
 * in a card and at 900px in the hero without a second breakpoint.
 *
 * SIX DESIGNS, NOT TWO TEMPLATES
 * Three redesigns, each with its own palette, typeface and layout (driven by
 * `art` in data/projects.ts), and three failures, each bad in its own way.
 * A studio that shows the same layout three times has shown one idea.
 */

type MiniSiteProps = { className?: string } & (
  | { variant: "before"; spec: BeforeSpec }
  | { variant: "after"; spec: AfterSpec }
);

export function MiniSite(props: MiniSiteProps) {
  return (
    <div className={cn("@container h-full w-full overflow-hidden", props.className)}>
      {props.variant === "before" ? (
        <BeforeSite spec={props.spec} />
      ) : (
        <AfterSite spec={props.spec} />
      )}
    </div>
  );
}

/* ==========================================================================
   BEFORE — three ways a small-business site goes wrong.

   Colours here are intentionally OFF-brand. They are content — a depiction
   of a bad website — not part of the Make It Click palette, so they stay
   scoped to this file and are never promoted to tokens.
   ========================================================================== */

function BeforeSite({ spec }: { spec: BeforeSpec }) {
  switch (spec.flavor) {
    case "gradient":
      return <BeforeGradient spec={spec} />;
    case "promo":
      return <BeforePromo spec={spec} />;
    case "corporate":
      return <BeforeCorporate spec={spec} />;
    case "builder":
      return <BeforeBuilder spec={spec} />;
  }
}

/** The 2009 template: gradient bar, six nav items, justified wall of text. */
function BeforeGradient({ spec }: { spec: SiteContent }) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#333] [font-family:Arial,Helvetica,sans-serif]">
      <div className="shrink-0 bg-[linear-gradient(180deg,#2e7ea8,#1f4f6b)] px-[3cqw] pt-[2cqw] pb-[1.6cqw]">
        <p className="text-[3.4cqw] font-bold text-white [font-family:Georgia,'Times_New_Roman',serif] [text-shadow:0_1px_1px_rgba(0,0,0,.4)]">
          {spec.brand}
        </p>
        <p className="mt-[0.4cqw] text-[1.5cqw] text-white/70">
          Calidad y servicio desde siempre
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-x-[2.2cqw] gap-y-[0.5cqw] border-b border-[#ccc] bg-[#eee] px-[3cqw] py-[1.1cqw]">
        {spec.nav.map((item, index) => (
          <span
            key={item}
            className={cn(
              "text-[1.7cqw] whitespace-nowrap",
              index === 0 ? "font-bold text-[#b8121b]" : "text-[#0a3fa8] underline",
            )}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-center px-[6cqw] pt-[3.2cqw] pb-[2.4cqw] text-center">
        <p className="text-[3.1cqw] leading-tight font-bold text-[#1f4f6b] [font-family:Georgia,'Times_New_Roman',serif]">
          {spec.headline}
        </p>
        <p className="mx-auto mt-[1.6cqw] max-w-[78cqw] text-[1.65cqw] leading-[1.45] text-justify">
          {spec.sub}
        </p>
        <span className="mt-[2.2cqw] self-center rounded-[3px] border border-[#999] bg-[linear-gradient(180deg,#fff,#ddd)] px-[3cqw] py-[1.1cqw] text-[1.6cqw] font-bold">
          {spec.cta}
        </span>
      </div>

      <div className="flex shrink-0 gap-[2cqw] px-[4cqw] pb-[3cqw]">
        {spec.items.map((item) => (
          <div
            key={item.title}
            className="flex-1 rounded-[2px] border border-[#ddd] bg-[#fbfbfb] p-[1.8cqw] shadow-[2px_3px_6px_rgba(0,0,0,0.18)]"
          >
            <p className="text-[1.75cqw] font-bold text-[#1f4f6b]">{item.title}</p>
            <FakeLines className="mt-[1cqw]" color="#e2e2e2" />
            <p className="mt-[1.2cqw] text-[1.45cqw] text-[#0a3fa8] underline">
              {item.meta}
            </p>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-[#ccc] bg-[#f4f4f4] px-[3cqw] py-[1.4cqw] text-center text-[1.35cqw] text-[#777]">
        {spec.footnote}
      </div>
    </div>
  );
}

/** The loud one: four saturated colours, a promo ribbon, everything shouting. */
function BeforePromo({ spec }: { spec: SiteContent }) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#333] [font-family:Verdana,Geneva,sans-serif]">
      <div className="shrink-0 bg-[#e4002b] px-[3cqw] py-[0.9cqw] text-center text-[1.5cqw] font-bold tracking-wide text-[#ffe600]">
        ¡¡OFERTA DEL MES!! 20% DE DESCUENTO — ¡LLÁMENOS HOY MISMO!
      </div>

      <div className="flex shrink-0 items-center justify-between bg-[#00aeef] px-[3cqw] py-[1.8cqw]">
        <p className="text-[3.2cqw] font-bold text-white [text-shadow:0_2px_0_rgba(0,0,0,.25)]">
          {spec.brand}
        </p>
        <span className="rounded-[14px] bg-[#ffe600] px-[2.4cqw] py-[1cqw] text-[1.5cqw] font-bold text-[#e4002b]">
          ☎ 01 555 4433
        </span>
      </div>

      <div className="flex shrink-0 flex-wrap justify-center gap-x-[2.4cqw] gap-y-[0.5cqw] bg-[#ffe600] px-[3cqw] py-[1.1cqw]">
        {spec.nav.map((item) => (
          <span
            key={item}
            className="text-[1.65cqw] font-bold whitespace-nowrap text-[#0047ab] underline"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-center px-[5cqw] py-[2.6cqw] text-center">
        <p className="text-[3.4cqw] leading-tight font-bold text-[#e4002b]">
          {spec.headline}
        </p>
        <p className="mx-auto mt-[1.4cqw] max-w-[80cqw] text-[1.6cqw] leading-[1.45] text-justify">
          {spec.sub}
        </p>
        <span className="mt-[2cqw] self-center rounded-[20px] border-[0.4cqw] border-[#188f3c] bg-[linear-gradient(180deg,#3ed46a,#18a044)] px-[3.4cqw] py-[1.2cqw] text-[1.7cqw] font-bold text-white [text-shadow:0_1px_1px_rgba(0,0,0,.35)]">
          {spec.cta}
        </span>
      </div>

      <div className="flex shrink-0 gap-[2cqw] px-[4cqw] pb-[2.6cqw]">
        {spec.items.map((item) => (
          <div
            key={item.title}
            className="flex-1 rounded-[10px] border-[0.3cqw] border-[#00aeef] bg-[#eaf9ff] p-[1.6cqw] text-center"
          >
            <p className="text-[1.75cqw] font-bold text-[#0047ab]">{item.title}</p>
            <FakeLines className="mt-[1cqw]" color="#bfe7f7" />
            <p className="mt-[1.1cqw] text-[1.45cqw] font-bold text-[#e4002b] underline">
              {item.meta}
            </p>
          </div>
        ))}
      </div>

      <div className="shrink-0 bg-[#ffe600] px-[3cqw] py-[1.3cqw] text-center text-[1.35cqw] font-bold text-[#e4002b]">
        {spec.footnote}
      </div>
    </div>
  );
}

/** The invisible one: grey, dense, indistinguishable from the competition. */
function BeforeCorporate({ spec }: { spec: SiteContent }) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#3f3f3f] [font-family:Arial,Helvetica,sans-serif]">
      <div className="flex shrink-0 items-center justify-between bg-[#2b3a4a] px-[3cqw] py-[1.3cqw]">
        <p className="text-[2.1cqw] font-bold tracking-[0.02em] text-white">
          {spec.brand}
        </p>
        <div className="flex gap-[1.8cqw]">
          {spec.nav.map((item) => (
            <span key={item} className="text-[1.3cqw] whitespace-nowrap text-[#c3cdd8]">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* The obligatory stock banner nobody chose. */}
      <div className="relative flex h-[26cqw] shrink-0 items-center justify-center bg-[linear-gradient(135deg,#9aa6b2,#7a8794)]">
        <div className="flex flex-col items-center opacity-60" aria-hidden="true">
          <span className="h-[3cqw] w-[3cqw] rounded-full bg-white/70" />
          <span className="mt-[-0.8cqw] block h-0 w-0 border-r-[4cqw] border-b-[3.4cqw] border-l-[4cqw] border-r-transparent border-b-white/70 border-l-transparent" />
        </div>
        <p className="absolute bottom-[2cqw] left-[3cqw] text-[2.4cqw] font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,.5)]">
          {spec.headline}
        </p>
      </div>

      <div className="flex flex-1 gap-[3cqw] px-[3cqw] py-[2.4cqw]">
        <p className="flex-[2] text-[1.45cqw] leading-[1.5] text-justify">
          {spec.sub} Contamos con amplia experiencia en el sector y un compromiso
          permanente con la mejora continua de nuestros procesos internos.
        </p>
        <div className="flex-1">
          {spec.items.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between border-b border-[#ddd] py-[0.9cqw]"
            >
              <span className="text-[1.4cqw] text-[#2b3a4a]">{item.title}</span>
              <span className="text-[1.4cqw] text-[#8a97a4]">{item.meta}</span>
            </div>
          ))}
          <span className="mt-[1.4cqw] inline-block border border-[#2b3a4a] px-[2cqw] py-[0.8cqw] text-[1.35cqw] text-[#2b3a4a]">
            {spec.cta}
          </span>
        </div>
      </div>

      <div className="shrink-0 bg-[#eceff2] px-[3cqw] py-[1.2cqw] text-center text-[1.3cqw] text-[#8a97a4]">
        {spec.footnote}
      </div>
    </div>
  );
}

/** The template one: a drag-and-drop build. Tidy, rounded, and anonymous. */
function BeforeBuilder({ spec }: { spec: SiteContent }) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-[#5a6069] [font-family:Helvetica,Arial,sans-serif]">
      <div className="flex shrink-0 items-center justify-between border-b border-[#ececec] px-[4cqw] py-[1.8cqw]">
        <span className="flex items-center gap-[1.2cqw]">
          <span className="block h-[2.4cqw] w-[2.4cqw] rounded-full bg-[#4fb3a5]" />
          <span className="text-[1.9cqw] font-bold text-[#3c4450]">{spec.brand}</span>
        </span>
        <div className="flex gap-[2.2cqw]">
          {spec.nav.map((item) => (
            <span key={item} className="text-[1.4cqw] whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* The stock hero every builder ships with. */}
      <div className="relative flex flex-1 items-center justify-center bg-[linear-gradient(135deg,#8fa9b8,#5f7f92)] px-[8cqw] text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-25" aria-hidden="true">
          <span className="block h-[8cqw] w-[8cqw] rounded-full border-[0.6cqw] border-white" />
        </div>
        <div className="relative">
          <p className="text-[3.6cqw] font-bold text-white [text-shadow:0_2px_6px_rgba(0,0,0,.35)]">
            {spec.headline}
          </p>
          <p className="mx-auto mt-[1.2cqw] max-w-[62cqw] text-[1.6cqw] leading-[1.45] text-white/90">
            {spec.sub}
          </p>
          <span className="mt-[2.2cqw] inline-block rounded-[22px] bg-[#4fb3a5] px-[4cqw] py-[1.4cqw] text-[1.6cqw] font-bold text-white">
            {spec.cta}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-[3cqw] px-[5cqw] py-[2.6cqw]">
        {spec.items.map((item) => (
          <div key={item.title} className="flex-1 text-center">
            <span
              aria-hidden="true"
              className="mx-auto block h-[4cqw] w-[4cqw] rounded-full border-[0.35cqw] border-[#4fb3a5]"
            />
            <p className="mt-[1.1cqw] text-[1.7cqw] font-bold text-[#3c4450]">
              {item.title}
            </p>
            <FakeLines className="mt-[1cqw]" color="#ececec" />
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-[#ececec] px-[4cqw] py-[1.3cqw] text-center text-[1.3cqw] text-[#9aa1aa]">
        {spec.footnote}
      </div>
    </div>
  );
}

function FakeLines({ className, color }: { className?: string; color: string }) {
  return (
    <div className={cn("space-y-[0.5cqw]", className)} aria-hidden="true">
      {[100, 85, 92].map((width, index) => (
        <span
          key={index}
          className="block h-[0.55cqw]"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   AFTER — three redesigns, three directions.

   Every colour comes from `art.palette` in data. Nothing here is hard-coded,
   and nothing here is the Make It Click palette: the studio's job is to find
   the client's voice, not to reprint its own.
   ========================================================================== */

function AfterSite({ spec }: { spec: AfterSpec }) {
  const { palette, radius, display, layout } = spec.art;

  const style = {
    "--s-bg": palette.bg,
    "--s-surface": palette.surface,
    "--s-fg": palette.fg,
    "--s-muted": palette.muted,
    "--s-line": palette.line,
    "--s-accent": palette.accent,
    "--s-accent-fg": palette.accentFg,
    "--s-accent-alt": palette.accentAlt ?? palette.accent,
    /* A hairline that reads on the deep surface rather than on the page. */
    "--s-surface-line": `color-mix(in srgb, ${palette.accentFg} 22%, transparent)`,
    "--s-radius": radius,
    "--s-display":
      display === "serif"
        ? "var(--font-instrument-serif), Georgia, serif"
        : "var(--font-space-grotesk), sans-serif",
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="h-full w-full bg-[var(--s-bg)] text-[var(--s-fg)] [font-family:var(--font-inter),sans-serif]"
    >
      {layout === "menu" ? (
        <AfterMenu spec={spec} />
      ) : layout === "poster" ? (
        <AfterPoster spec={spec} />
      ) : layout === "clinic" ? (
        <AfterClinic spec={spec} />
      ) : (
        <AfterLedger spec={spec} />
      )}
    </div>
  );
}

/**
 * Hospitality. Bone, wine and ochre — a warm room, not a dark one.
 *
 * The move: the carta is the front page. A restaurant site that leads with
 * dishes and prices is answering the question the visitor actually arrived
 * with, and it gives the layout real content to be composed around instead
 * of a headline floating in an empty field.
 */
function AfterMenu({ spec }: { spec: AfterSpec }) {
  const [browse, book] = [spec.nav[0], spec.nav[spec.nav.length - 1]];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--s-line)] px-[4cqw] py-[2.2cqw]">
        <p className="text-[2.6cqw] tracking-[0.2em] uppercase [font-family:var(--s-display)]">
          {spec.brand}
        </p>
        <div className="flex items-center gap-[2.4cqw]">
          <span className="text-[1.5cqw] tracking-[0.08em] text-[var(--s-muted)] uppercase">
            {browse}
          </span>
          <span className="bg-[var(--s-accent)] px-[2.6cqw] py-[1.1cqw] text-[1.5cqw] tracking-[0.1em] text-[var(--s-accent-fg)] uppercase">
            {book}
          </span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left: the invitation. */}
        <div className="flex flex-[1.15] flex-col justify-center px-[4cqw] py-[3cqw]">
          <p className="text-[6.6cqw] leading-[1.02] [font-family:var(--s-display)]">
            {spec.headline}
          </p>
          <p className="mt-[2cqw] max-w-[38cqw] text-[1.75cqw] leading-[1.45] text-[var(--s-muted)]">
            {spec.sub}
          </p>
          <span className="mt-[2.8cqw] flex items-center gap-[1.2cqw] self-start border-b-[0.25cqw] border-[var(--s-accent)] pb-[0.7cqw] text-[1.7cqw] tracking-[0.12em] text-[var(--s-accent)] uppercase">
            {spec.cta} <span aria-hidden="true">→</span>
          </span>
        </div>

        {/* Right: the carta, on the one block of deep colour in the design. */}
        <div className="flex flex-1 flex-col justify-center bg-[var(--s-surface)] px-[3.4cqw] py-[3cqw]">
          <p className="text-[1.2cqw] tracking-[0.22em] text-[var(--s-accent-alt)] uppercase">
            La carta
          </p>
          <ul className="mt-[1.8cqw]">
            {spec.items.map((item) => (
              <li
                key={item.title}
                className="flex items-baseline gap-[1.6cqw] border-t border-[var(--s-surface-line)] py-[1.5cqw] last:border-b"
              >
                <span className="flex-1 text-[2.1cqw] leading-tight text-[var(--s-accent-fg)] [font-family:var(--s-display)]">
                  {item.title}
                </span>
                <span className="text-[1.75cqw] tabular-nums text-[var(--s-accent-alt)] [font-family:var(--s-display)]">
                  S/ {item.meta}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-[1.8cqw] text-[1.3cqw] tracking-[0.1em] text-[var(--s-accent-fg)]/60 uppercase">
            Carta completa →
          </p>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--s-line)] px-[4cqw] py-[1.5cqw]">
        <p className="text-[1.25cqw] tracking-[0.16em] text-[var(--s-muted)] uppercase">
          {spec.footnote}
        </p>
      </div>
    </div>
  );
}

/**
 * Fitness. A poster: one line of type at maximum size, the numbers that
 * actually decide whether you go, and a single acid bar you cannot miss.
 */
function AfterPoster({ spec }: { spec: AfterSpec }) {
  const [schedule, join] = [spec.nav[0], spec.nav[spec.nav.length - 1]];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink-0 items-center justify-between px-[4cqw] py-[2.4cqw]">
        <p className="text-[2.2cqw] font-bold tracking-[0.16em] uppercase [font-family:var(--s-display)]">
          {spec.brand}
        </p>
        <div className="flex items-center gap-[2.4cqw]">
          <span className="text-[1.45cqw] tracking-[0.1em] text-[var(--s-muted)] uppercase">
            {schedule}
          </span>
          <span className="bg-[var(--s-accent)] px-[2.4cqw] py-[1cqw] text-[1.45cqw] font-bold tracking-[0.1em] text-[var(--s-accent-fg)] uppercase">
            {join}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-[4cqw]">
        <p className="text-[10.5cqw] leading-[0.86] font-bold tracking-[-0.05em] uppercase [font-family:var(--s-display)]">
          {spec.headline}
        </p>
        <p className="mt-[2.2cqw] max-w-[46cqw] text-[1.8cqw] leading-[1.4] text-[var(--s-muted)]">
          {spec.sub}
        </p>
      </div>

      <div className="flex shrink-0 border-t border-[var(--s-line)]">
        {spec.items.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              "flex-1 px-[3cqw] py-[2cqw]",
              index > 0 && "border-l border-[var(--s-line)]",
            )}
          >
            <p className="text-[3.4cqw] leading-none font-bold tabular-nums [font-family:var(--s-display)]">
              {item.meta}
            </p>
            <p className="mt-[0.8cqw] text-[1.2cqw] tracking-[0.14em] text-[var(--s-muted)] uppercase">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex shrink-0 items-center justify-between bg-[var(--s-accent)] px-[4cqw] py-[1.8cqw] text-[var(--s-accent-fg)]">
        <p className="text-[2cqw] font-bold tracking-[-0.02em] uppercase [font-family:var(--s-display)]">
          {spec.cta}
        </p>
        <span aria-hidden="true" className="text-[2cqw] font-bold">
          →
        </span>
      </div>
    </div>
  );
}

/** Health. Ice mint, soft corners, one green action you cannot miss. */
function AfterClinic({ spec }: { spec: AfterSpec }) {
  const [browse, book] = [spec.nav[0], spec.nav[spec.nav.length - 1]];

  return (
    <div className="flex h-full w-full flex-col px-[4cqw] py-[3cqw]">
      <div className="flex shrink-0 items-center justify-between">
        <p className="flex items-center gap-[1.4cqw] text-[2.2cqw] font-semibold tracking-[-0.02em] [font-family:var(--s-display)]">
          <span
            aria-hidden="true"
            className="block h-[2.4cqw] w-[2.4cqw] rounded-full bg-[var(--s-accent)]"
          />
          {spec.brand}
        </p>
        <div className="flex items-center gap-[2.4cqw]">
          <span className="text-[1.5cqw] text-[var(--s-muted)]">{browse}</span>
          <span className="rounded-full bg-[var(--s-accent)] px-[2.6cqw] py-[1.1cqw] text-[1.5cqw] font-medium text-[var(--s-accent-fg)]">
            {book}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center py-[3cqw]">
        <p className="max-w-[62cqw] text-[6cqw] leading-[1.02] font-semibold tracking-[-0.035em] [font-family:var(--s-display)]">
          {spec.headline}
        </p>
        <p className="mt-[2cqw] max-w-[48cqw] text-[1.85cqw] leading-[1.45] text-[var(--s-muted)]">
          {spec.sub}
        </p>

        {/* One panel, one action. The whole page points here. */}
        <div
          className="mt-[3cqw] flex items-center justify-between gap-[2cqw] bg-[var(--s-accent)] px-[3.4cqw] py-[2.4cqw]"
          style={{ borderRadius: "var(--s-radius)" }}
        >
          <p className="text-[2cqw] font-semibold text-[var(--s-accent-fg)]">
            Reserva en línea, sin llamar
          </p>
          <span className="rounded-full bg-[var(--s-surface)] px-[2.4cqw] py-[1.1cqw] text-[1.5cqw] font-medium text-[var(--s-fg)]">
            {spec.cta} →
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-[2cqw]">
        {spec.items.map((item) => (
          <div
            key={item.title}
            className="flex-1 bg-[var(--s-surface)] px-[2.4cqw] py-[2cqw]"
            style={{ borderRadius: "var(--s-radius)" }}
          >
            <p className="text-[1.25cqw] tracking-[0.1em] text-[var(--s-accent)] uppercase">
              {item.meta}
            </p>
            <p className="mt-[0.8cqw] text-[1.95cqw] font-semibold tracking-[-0.02em]">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-[2cqw] shrink-0 text-[1.3cqw] text-[var(--s-muted)]">
        {spec.footnote}
      </p>
    </div>
  );
}

/** Professional services. Navy, bone, muted gold. An annual-report grid. */
function AfterLedger({ spec }: { spec: AfterSpec }) {
  const [practice, contact] = [spec.nav[0], spec.nav[spec.nav.length - 1]];

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink-0 items-center justify-between px-[5cqw] pt-[3cqw] pb-[2cqw]">
        <p className="text-[2.1cqw] font-semibold tracking-[0.14em] uppercase [font-family:var(--s-display)]">
          {spec.brand}
        </p>
        <div className="flex gap-[2.6cqw] text-[1.45cqw] tracking-[0.08em] text-[var(--s-muted)] uppercase">
          <span>{practice}</span>
          <span className="text-[var(--s-fg)]">{contact}</span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="mx-[5cqw] block h-[0.35cqw] shrink-0 bg-[var(--s-accent)]"
      />

      <div className="flex flex-1 gap-[4cqw] px-[5cqw] py-[3.4cqw]">
        <div className="flex flex-[1.1] flex-col justify-center">
          <div>
            <p className="max-w-[40cqw] text-[5.2cqw] leading-[1] font-semibold tracking-[-0.035em] [font-family:var(--s-display)]">
              {spec.headline}
            </p>
            <p className="mt-[2cqw] max-w-[34cqw] text-[1.7cqw] leading-[1.45] text-[var(--s-muted)]">
              {spec.sub}
            </p>
          </div>
          <span
            className="mt-[3.4cqw] self-start bg-[var(--s-accent)] px-[3cqw] py-[1.4cqw] text-[1.5cqw] font-medium tracking-[0.08em] text-[var(--s-accent-fg)] uppercase"
            style={{ borderRadius: "var(--s-radius)" }}
          >
            {spec.cta} →
          </span>
        </div>

        <div className="flex-1">
          {spec.items.map((item) => (
            <div
              key={item.title}
              className="flex items-baseline gap-[2cqw] border-t border-[var(--s-line)] py-[1.8cqw] last:border-b"
            >
              <span className="text-[1.5cqw] tabular-nums text-[var(--s-accent)]">
                {item.meta}
              </span>
              <span className="text-[2.1cqw] tracking-[-0.02em]">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 bg-[var(--s-surface)] px-[5cqw] py-[1.6cqw]">
        <p className="text-[1.25cqw] tracking-[0.16em] text-[var(--s-muted)] uppercase">
          {spec.footnote}
        </p>
      </div>
    </div>
  );
}
