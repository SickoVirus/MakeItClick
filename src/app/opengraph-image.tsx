import { ImageResponse } from "next/og";

/**
 * Social card, generated at build time by next/og.
 *
 * Deliberately typographic: no photograph, no logo file to keep in sync.
 *
 * The statement is set on four fixed lines, exactly as in the hero — never
 * left to wrap, because Satori wraps a text run and its trailing span
 * separately and strands the blue full stop at the end of the wrong line.
 *
 * Type is Space Grotesk, fetched (subset to just these characters) at build
 * time. Satori's bundled fallback face has no bold and reads as a different
 * brand, so it is only a safety net: if the fetch fails, the card still
 * builds with the same layout.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Make It Click — Your business works. Your website should too.";

/* Satori renders outside the page, so it cannot read the CSS tokens. These
   mirror them by hand — keep in sync with the @theme block in globals.css.
   The card is set on ink, so its grey is the ink-surface grey. */
const INK = "#0B0B0B"; /* --color-ink */
const PAPER = "#F7F5EF"; /* --color-paper */
const BLUE = "#0066FF"; /* --color-blue */
const ON_BLUE = "#FFFFFF"; /* --color-on-blue */
const GREY = "#8A8A8A"; /* --color-grey-dark */
const LINE = "#232323"; /* --color-line-dark */

const STATEMENT = ["Your business", "works.", "Your website", "should too"];
const KICKER = ["Make It Click", "Diseño y rediseño web"];
const VALUE = "Rediseñamos webs de negocios que merecen una presencia digital a su altura.";
const CTA = "Envía tu web →";

/** Every character the card sets, upper- and lower-case, for the subset. */
const GLYPHS = Array.from(
  new Set([...STATEMENT, ...KICKER, VALUE, CTA, "."].join("").split("")),
).join("");
const SUBSET = Array.from(new Set((GLYPHS + GLYPHS.toUpperCase()).split(""))).join("");

type Weight = 500 | 600;

/**
 * Asks Google Fonts for a TrueType subset (no browser User-Agent means it
 * answers with TTF, which Satori reads; it cannot read WOFF2).
 */
async function loadSpaceGrotesk(weight: Weight): Promise<ArrayBuffer | null> {
  try {
    const cssUrl =
      `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}` +
      `&text=${encodeURIComponent(SUBSET)}`;
    const css = await (await fetch(cssUrl)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const font = await fetch(src);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [medium, semibold] = await Promise.all([
    loadSpaceGrotesk(500),
    loadSpaceGrotesk(600),
  ]);
  const fonts = [
    medium && { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
    semibold && { name: "Space Grotesk", data: semibold, weight: 600 as const, style: "normal" as const },
  ].filter((font): font is NonNullable<typeof font> => Boolean(font));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "60px 80px 64px",
          fontFamily: fonts.length ? "Space Grotesk" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 20,
            borderBottom: `1px solid ${LINE}`,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: GREY,
          }}
        >
          <span>{KICKER[0]}</span>
          <span>{KICKER[1]}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {STATEMENT.map((line, index) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontSize: 84,
                lineHeight: 0.9,
                fontWeight: 600,
                letterSpacing: -3,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {line}
              {/* The one full stop that gets to be blue — kept on its line. */}
              {index === STATEMENT.length - 1 ? <span style={{ color: BLUE }}>.</span> : null}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.3,
              color: GREY,
              maxWidth: 640,
            }}
          >
            {VALUE}
          </div>
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              background: BLUE,
              color: ON_BLUE,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "16px 26px",
              borderRadius: 4,
            }}
          >
            {CTA}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
