/**
 * A plausible .pe address for a miniature's browser bar, from its brand name.
 *
 * Accents are folded, not dropped: "Casa María" is casamaria.pe, never
 * casamara.pe. Everything that is not a letter or digit goes.
 */
export function toDomain(brand: string) {
  const slug = brand
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return `${slug}.pe`;
}
