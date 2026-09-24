import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

/**
 * SECTION 04 — WHAT WE DO
 *
 * Four things. A ruled list, not a card grid — the row is the unit, the
 * number carries the hierarchy, and nothing floats.
 */

export function Services() {
  return (
    <Section
      id="services"
      index="04"
      label="Qué hacemos"
      counter={`${String(services.length).padStart(2, "0")} servicios`}
    >
      <Reveal variant="mask" className="max-w-3xl">
        <h2 className="font-display text-headline font-semibold uppercase">
          Cuatro cosas.
          <br />
          Bien hechas<span className="text-blue">.</span>
        </h2>
      </Reveal>

      <ul className="mt-16 md:mt-24">
        {services.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70}>
            <div className="group grid gap-x-12 gap-y-4 border-t border-line py-8 transition-colors duration-300 last:border-b md:grid-cols-12 md:py-10">
              <p className="label text-grey transition-colors duration-300 group-hover:text-blue-on-paper md:col-span-2">
                {service.id}
              </p>

              <h3 lang="en" className="font-display text-title font-semibold tracking-[-0.03em] md:col-span-5">
                {service.title}
              </h3>

              <div className="md:col-span-5">
                <p className="max-w-sm text-base text-pretty">{service.body}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="label text-grey">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
