import { Section } from "@/components/layout/Section";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { toDomain } from "@/lib/domain";

/**
 * SECTION 03 — SELECTED WORK
 *
 * The only place work is shown, and every project appears exactly once.
 *
 * This used to be two sections: a "Before / After" feature and a portfolio
 * list. They did the same job with the same data, so the lead project landed
 * on the page three times over and the work read a third as deep as it is.
 * Now the lead project carries the full draggable comparison and the rest
 * take one click each — different treatments, no repeated content.
 *
 * The frames run the whole grid. A portfolio that shows its work at thumbnail
 * size is apologising for it.
 *
 * There is no case-study page behind these and no link pretending there is.
 * The click that exists does the only honest thing it can: shows the work.
 */

export function SelectedWork() {
  return (
    <Section
      id="work"
      index="03"
      label="Trabajo seleccionado"
      counter={`${String(projects.length).padStart(2, "0")} conceptos`}
    >
      {/* The work leads with the frames, not a headline — but the outline
          still needs this level, or the projects file under "El problema". */}
      <h2 className="sr-only">Trabajo seleccionado</h2>

      <div className="flex flex-col gap-28 md:gap-40">
        {projects.map((project, index) => {
          const lead = index === 0;
          return (
            <article key={project.id}>
              <Reveal className="grid gap-x-12 gap-y-8 border-t border-line pt-6 pb-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-6">
                    <p className="label text-ink">MIC / {project.id}</p>
                    <p className="label text-grey tabular-nums">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </p>
                    <p className="label ml-auto text-blue-on-paper lg:ml-0">
                      Concepto propio
                    </p>
                  </div>

                  <h3 className="mt-6 font-display text-title font-semibold tracking-[-0.03em]">
                    {project.sector}
                  </h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="max-w-sm text-base text-pretty">{project.premise}</p>
                  <p className="mt-4 max-w-sm text-base text-grey text-pretty">
                    {project.direction}
                  </p>
                </div>

                <ul className="lg:col-span-3">
                  {project.moves.map((move, moveIndex) => (
                    <li
                      key={move}
                      className="flex items-baseline gap-4 border-b border-line py-2.5 first:border-t"
                    >
                      <span className="label text-blue-on-paper tabular-nums">
                        {String(moveIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm">{move}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <BeforeAfter
                  project={project}
                  mode={lead ? "slider" : "toggle"}
                  url={toDomain(project.after.brand)}
                  className="aspect-[4/3] w-full sm:aspect-[16/10]"
                />
              </Reveal>

              {lead ? (
                <Reveal delay={160} className="mt-5">
                  <p className="label text-grey">
                    Arrastra el divisor. También funciona con las flechas del teclado.
                  </p>
                </Reveal>
              ) : null}
            </article>
          );
        })}
      </div>

      <Reveal className="mt-20 border-t border-line pt-5">
        <p className="label max-w-2xl text-grey">
          Los tres son ejercicios propios. No representan a ningún cliente ni a ninguna
          empresa real, y ninguna web existente fue copiada para el &ldquo;antes&rdquo;.
        </p>
      </Reveal>
    </Section>
  );
}
