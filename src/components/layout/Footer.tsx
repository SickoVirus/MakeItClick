import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { nav, navCta, site, socials } from "@/data/site";

/**
 * FOOTER
 *
 * The wordmark at full width, once, at the end — the one place the brand
 * gets to be the largest thing on the screen.
 *
 * Socials without an account yet render as plain text. A link that goes
 * nowhere would break the one rule this whole site is built on.
 */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-10 text-paper">
      <div className="container-editorial">
        <Reveal>
          <p className="w-full font-display text-[clamp(2.5rem,12.4vw,10rem)] leading-none font-semibold">
            <Logo />
          </p>
        </Reveal>

        <hr className="rule-dark mt-10 sm:mt-14" />

        {/* Links are full 44px rows with no gap between them: the same ~44px
            rhythm the old padded links had, now every pixel of it tappable. */}
        <div className="grid gap-x-10 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label text-grey-dark">En una frase</p>
            <p lang="en" className="mt-4 max-w-xs text-base text-balance">{site.tagline}</p>
          </div>

          <nav aria-label="Pie de página">
            <p className="label text-grey-dark">Menú</p>
            <ul className="mt-2.5">
              {[...nav, navCta].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-burst
                    className="flex min-h-11 items-center text-base text-grey-dark transition-colors duration-200 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-grey-dark">Redes</p>
            <ul className="mt-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-burst
                      className="flex min-h-11 items-center text-base text-grey-dark transition-colors duration-200 hover:text-paper"
                    >
                      {social.label} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="flex min-h-11 items-center text-base text-grey-dark">
                      {social.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-grey-dark">Estudio</p>
            <p className="mt-4 text-base">{site.location}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              data-burst
              className="mt-1 inline-flex min-h-11 items-center text-base text-grey-dark transition-colors duration-200 hover:text-paper"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="label text-grey-dark">
            © {year} {site.wordmark}
          </p>
          <p className="label text-grey-dark">Cada click debería hacer algo</p>
        </div>
      </div>
    </footer>
  );
}
