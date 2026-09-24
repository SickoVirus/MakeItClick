/**
 * Global brand + site constants.
 *
 * TODO (owner): fill in the social `href`s below once the accounts exist.
 * Socials with `href: null` render as plain text — we never ship a dead link.
 */

export const site = {
  name: "Make It Click",
  wordmark: "MAKE IT CLICK",
  tagline: "Make your website worth the click.",
  statement: ["Your business works.", "Your website should too."],
  valueProp:
    "Rediseñamos webs de negocios que merecen una presencia digital a su altura.",
  url: "https://makeitclick.co",
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
  { label: "Instagram", href: null },
  { label: "TikTok", href: null },
  { label: "LinkedIn", href: null },
];
