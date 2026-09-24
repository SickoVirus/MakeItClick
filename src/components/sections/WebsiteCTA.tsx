"use client";

import { useId, useRef, useState } from "react";
import { Section } from "@/components/layout/Section";
import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import {
  isPlausibleUrl,
  MAX_URL_LENGTH,
  submitWebsite,
  type SubmissionResult,
} from "@/lib/submit";
import { site } from "@/data/site";

/**
 * SECTION 07 — SEND US YOUR WEBSITE
 *
 * One field. The field is the headline. No name, no company, no phone, no
 * "how did you hear about us" — the only thing we need is the URL, and
 * asking for more would cost us the submission.
 *
 * The submit path is abstracted (lib/submit.ts): it opens a prefilled email
 * today and POSTs to a form endpoint the moment one exists.
 */

type Status = "idle" | "sending" | SubmissionResult["status"];

const WHAT_HAPPENS = [
  "Miramos tu web con calma.",
  "Te decimos las tres cosas que cambiaríamos.",
  "Si tiene sentido seguir, seguimos.",
];

export function WebsiteCTA() {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    // A second press while the first is in flight must not send twice.
    if (status === "sending") return;

    if (!isPlausibleUrl(value)) {
      setError(
        value.trim()
          ? "Eso no parece una dirección web. Prueba así: tunegocio.com"
          : "Escribe la dirección de tu web. Por ejemplo: tunegocio.com",
      );
      setStatus("idle");
      // Back to the field, so the fix is one keystroke away.
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setStatus("sending");
    const result = await submitWebsite(value);
    setStatus(result.status);
    if (result.status === "error") setError(result.message);
  }

  const done = status === "sent" || status === "handoff";

  return (
    <Section id="send" index="07" label="Envía tu web" tone="ink" counter="Un solo campo">
      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal
            variant="mask"
            as="h2"
            className="font-display text-headline font-semibold uppercase"
          >
            ¿Tu web hace click<span className="text-blue">?</span>
          </Reveal>

          <form onSubmit={onSubmit} className="mt-14 sm:mt-20" noValidate>
            <label htmlFor={inputId} className="label block text-grey-dark">
              Tu web
            </label>

            {/* The underline is the field. Focusing the input turns it blue and
                doubles it (a shadow, so nothing below moves) — the input's own
                outline is off, and this is what replaces it. */}
            <div className="mt-4 flex flex-col gap-5 border-b border-line-dark pb-5 transition-[border-color,box-shadow] duration-200 has-[input:focus-visible]:border-blue has-[input:focus-visible]:shadow-[0_1px_0_0_var(--color-blue)] sm:flex-row sm:items-end sm:gap-8">
              <input
                ref={inputRef}
                id={inputId}
                name="website"
                type="text"
                inputMode="url"
                enterKeyHint="send"
                autoComplete="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={MAX_URL_LENGTH}
                placeholder="tunegocio.com"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (error) setError(null);
                  if (done) setStatus("idle");
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={messageId}
                className="w-full min-w-0 flex-1 border-0 bg-transparent p-0 font-display text-title font-medium tracking-[-0.03em] text-paper outline-none placeholder:text-grey-dark"
              />

              <ActionLink
                type="submit"
                variant="inverse"
                disabled={status === "sending"}
                cursorLabel="Enviar"
                className="shrink-0"
              >
                {status === "sending" ? "Enviando…" : "Enviar"}
              </ActionLink>
            </div>

            {/* One message slot, one id: whatever it says is what the field
                is described by. Error text wraps — it can carry an address. */}
            <div className="mt-5 min-h-6" aria-live="polite">
              {error ? (
                <p id={messageId} className="label leading-normal break-words text-blue-on-ink">
                  {error}
                </p>
              ) : done ? (
                <p id={messageId} className="label leading-normal break-words text-paper">
                  {status === "sent"
                    ? "Recibido. Te escribimos pronto."
                    : `Te abrimos el correo. Si no se abrió, escríbenos a ${site.contactEmail}.`}
                </p>
              ) : (
                <p id={messageId} className="label text-grey-dark">
                  Sin formularios largos. Solo la dirección.
                </p>
              )}
            </div>
          </form>
        </div>

        <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
          <p className="label text-grey-dark">Qué pasa después</p>
          <ol className="mt-6">
            {WHAT_HAPPENS.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-t border-line-dark py-4 last:border-b"
              >
                <span className="label text-blue-on-ink tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-pretty">{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-xs text-sm text-grey-dark text-pretty">
            Si ya sabes lo que quieres, escríbenos directo a{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              data-burst
              className="text-paper underline decoration-line-dark underline-offset-4 transition-colors hover:text-blue-on-ink hover:decoration-blue-on-ink"
            >
              {site.contactEmail}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
