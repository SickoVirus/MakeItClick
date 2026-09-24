import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClickBurst } from "@/components/ui/ClickBurst";
import { CursorLabel } from "@/components/ui/CursorLabel";
import { site, socials } from "@/data/site";
import "./globals.css";

/* Self-hosted and subset at build time by next/font — no render-blocking
   request to Google, no layout shift. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* Used only inside the portfolio miniatures, where one of the three
   redesigns calls for a high-contrast serif. One weight, latin only.
   Not preloaded: nothing above the fold uses it, and a preload would compete
   with the hero's own fonts for the first round-trips. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

const title = "Make It Click — Diseño y rediseño web";
const description =
  "Rediseñamos webs de negocios que merecen una presencia digital a su altura.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "diseño web",
    "rediseño web",
    "diseño web Lima",
    "UX UI",
    "desarrollo frontend",
    "web design Peru",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b", // --color-ink; metadata needs a literal, not a CSS var
  colorScheme: "light",
};

const JS_FLAG = "document.documentElement.classList.add('js')";

/** Conservative structured data: only facts that are actually true today. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description,
  slogan: site.tagline,
  areaServed: "PE",
  availableLanguage: ["es", "en"],
  // Only accounts that exist: a social with no URL yet is simply left out.
  sameAs: socials.flatMap((social) => (social.href ? [social.href] : [])),
  serviceType: [
    "Web design",
    "Website redesign",
    "UX/UI design",
    "Frontend development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below adds `js` to this
    // element's classes before React hydrates, by design.
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint. Scroll reveals may only hide content once
            we know a script is there to reveal it again (see globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <ClickBurst />
        <CursorLabel />

        <script
          type="application/ld+json"
          // Static, authored above — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
