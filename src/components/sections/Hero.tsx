import { HeroDemo } from "@/components/sections/HeroDemo";
import { ActionLink } from "@/components/ui/ActionLink";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/**
 * SECTION 01 — HERO
 *
 * Type first, at full width. The statement gets the page to itself; the
 * demonstration sits underneath it, where it reads as evidence rather than
 * decoration. No photograph, no illustration, nothing behind the words.
 */

const DISCIPLINES = ["Diseño web", "Rediseño", "UX / UI", "Frontend"];

export function Hero() {
  return (
    <section className="pt-30 pb-section sm:pt-36" aria-label="Make It Click">
      <div className="container-editorial">
        <Reveal immediate className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-line pb-4">
          <ul className="label flex flex-wrap gap-x-5 gap-y-2 text-grey">
            {DISCIPLINES.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
          {/* ml-auto keeps the location right-aligned even when the
              disciplines wrap and push it onto its own line. */}
          <p className="label ml-auto text-grey">{site.location}</p>
        </Reveal>

        {/* Four deliberate lines. The short second line is the point: the
            statement lands, stops, then starts again. Set, not wrapped. */}
        <h1 lang="en" className="mt-10 font-display text-display font-semibold uppercase sm:mt-14">
          <Reveal immediate as="span" variant="mask" className="block">
            Your business
          </Reveal>
          <Reveal immediate as="span" variant="mask" delay={70} className="block">
            works.
          </Reveal>
          <Reveal immediate as="span" variant="mask" delay={140} className="block">
            Your website
          </Reveal>
          <Reveal immediate as="span" variant="mask" delay={210} className="block">
            should too
            {/* The one full stop that gets to be blue. */}
            <span className="text-blue">.</span>
          </Reveal>
        </h1>

        <div className="mt-14 grid gap-x-12 gap-y-14 sm:mt-20 lg:grid-cols-12">
          <Reveal immediate delay={160} className="flex flex-col items-start gap-10 lg:col-span-5">
            <p className="max-w-md text-sub text-balance">{site.valueProp}</p>

            <div className="flex flex-col items-start gap-5">
              <ActionLink href="#send" cursorLabel="Enviar">
                Envía tu web
              </ActionLink>
              <p className="label text-grey">
                Te decimos qué cambiaríamos. Gratis.
              </p>
            </div>
          </Reveal>

          <Reveal immediate delay={240} className="lg:col-span-7">
            <HeroDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
