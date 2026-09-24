/**
 * Global brand + site constants.
 *
 * TODO (owner): fill in the social `href`s below once the accounts exist.
 * Socials with `href: null` render as plain text — we never ship a dead link.
 */

/**
 * The public address, resolved at build time — never hard-coded to a domain
 * we may not own. First match wins:
 *
 *  1. NEXT_PUBLIC_SITE_URL — set it in Vercel to force an address.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — set by Vercel on every build: the
 *     project's production domain. That is `*.vercel.app` until a custom
 *     domain is added, and the custom domain after — no code change needed.
 *  3. localhost, for local development.
 *
 * Read only on the server (metadata, sitemap, robots). Client components never
 * use `site.url`, so the browser bundle's fallback value is irrelevant.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return raw.replace(/\/+$/, "");
}

export const site = {
  name: "Make It Click",
  wordmark: "MAKE IT CLICK",
  tagline: "Make your website worth the click.",
  statement: ["Your business works.", "Your website should too."],
  valueProp:
    "Rediseñamos webs de negocios que merecen una presencia digital a su altura.",
  url: resolveSiteUrl(),
  location: "Lima / Remoto",
  founded: 2026,

  /** The CTA, the footer and the prefilled email all point here. */
  contactEmail: "makeitclickpe@gmail.com",
} as const;

export const nav = [
  { label: "Trabajo", href: "#work" },
  { label: "Servicios", href: "#services" },
  { label: "Proceso", href: "#process" },
] as const;

export const navCta = { label: "Envía tu web", href: "#send" } as const;

export type SocialLink = {
  label: string;
  /** null until the account exists — rendered as inert text, not a link. */
  href: string | null;
};

export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/makeitclickpe/" },
  { label: "TikTok", href: "https://www.tiktok.com/@makeitclickpe" },
  { label: "LinkedIn", href: null },
];
