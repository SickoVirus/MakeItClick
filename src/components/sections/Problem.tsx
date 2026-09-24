import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 02 — THE PROBLEM
 *
 * The whole business case, in six words. The section goes to ink so the
 * page has a floor: after this, everything we show is the fix.
 */

export function Problem() {
  return (
    <Section index="02" label="El problema" tone="ink" counter="Por qué existimos">
      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
        <Reveal variant="mask" className="lg:col-span-8">
          <h2 className="font-display text-headline font-semibold uppercase">
            <span className="block">Buen negocio.</span>
            <span className="relative inline-block text-grey-dark">
              Mala web.
              {/* Struck through as it is read. The line is the argument. */}
              <span
                aria-hidden="true"
                className="mic-strike absolute inset-x-0 top-1/2 h-[0.06em] bg-blue"
              />
            </span>
            <span className="mt-6 block sm:mt-10">Arreglemos lo segundo.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-end gap-6 lg:col-span-4">
          <p className="max-w-sm text-sub text-balance">
            Los negocios crecen. Cambian de local, de carta, de equipo, de precios.
          </p>
          <p className="max-w-sm text-sub text-grey-dark text-balance">
            La web se quedó en el día que la publicaron.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
