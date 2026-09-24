import { site } from "@/data/site";

/**
 * Website submission adapter.
 *
 * Today: opens a prefilled email. No backend, no cost, nothing to maintain.
 * Tomorrow: set NEXT_PUBLIC_FORM_ENDPOINT to a Formspree / Tally / custom
 * endpoint and submissions POST there instead. No component changes needed.
 */

export type SubmissionResult =
  | { status: "sent"; via: "endpoint" }
  | { status: "handoff"; via: "mailto" }
  | { status: "error"; message: string };

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function normalizeUrl(raw: string) {
  const value = raw.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  return value;
}

/** Longer than any real homepage URL; stops a pasted essay reaching the inbox. */
export const MAX_URL_LENGTH = 300;

/** A request that has not answered in this long is not going to. */
const TIMEOUT_MS = 12_000;

/**
 * Deliberately permissive: `domain.tld`, optional subdomain, optional path.
 * Letters are Unicode-aware — `cevichería.pe` is a real kind of Peruvian
 * domain, and an ASCII-only check would turn that owner away at the door.
 * An Instagram or Facebook page passes too; for many businesses it is the site.
 */
export function isPlausibleUrl(raw: string) {
  const value = normalizeUrl(raw);
  if (value.length === 0 || value.length > MAX_URL_LENGTH) return false;
  return /^[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)+(\/\S*)?$/u.test(value);
}

/** Every failure names the way round it: the inbox is always there. */
function failure(problem: string): SubmissionResult {
  return {
    status: "error",
    message: `${problem} Inténtalo de nuevo o escríbenos a ${site.contactEmail}.`,
  };
}

export async function submitWebsite(raw: string): Promise<SubmissionResult> {
  const website = normalizeUrl(raw);

  if (endpoint) {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return failure("Parece que no tienes conexión.");
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ website, source: "sitio-web" }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (response.status === 429) {
        return failure("Recibimos demasiados envíos seguidos. Espera un minuto.");
      }
      if (!response.ok) return failure("No se pudo enviar.");
      return { status: "sent", via: "endpoint" };
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      return failure(timedOut ? "La conexión tardó demasiado." : "No se pudo enviar.");
    }
  }

  const subject = encodeURIComponent(`Make it click — ${website}`);
  const body = encodeURIComponent(
    `Mi web: ${website}\n\nQué siento que no funciona:\n`,
  );
  window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  return { status: "handoff", via: "mailto" };
}
