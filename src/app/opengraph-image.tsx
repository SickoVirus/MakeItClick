import { ImageResponse } from "next/og";

/**
 * Social card, generated at build time by next/og.
 *
 * Deliberately typographic: no photograph, no logo file to keep in sync.
 * Satori (next/og) renders with its bundled font, so this costs nothing to
 * ship and nothing to maintain.
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

export default function OpengraphImage() {
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
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: GREY,
          }}
        >
          <span>Make It Click</span>
          <span>Diseño y rediseño web</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: -4,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Your business works.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: -4,
              textTransform: "uppercase",
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            Your website should too
            <span style={{ color: BLUE }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: GREY, maxWidth: 720 }}>
            Rediseñamos webs de negocios que merecen una presencia digital a su altura.
          </div>
          <div
            style={{
              display: "flex",
              background: BLUE,
              color: ON_BLUE,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: "16px 28px",
              borderRadius: 4,
            }}
          >
            Envía tu web →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
