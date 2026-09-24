/**
 * Selected work.
 *
 * Every entry is a CONCEPT REDESIGN — our own exercise, no real client,
 * no real brand represented. Do not present these as case studies.
 *
 * The `before` / `after` states are rendered as live miniature interfaces
 * (see components/ui/MiniSite.tsx), not screenshots.
 *
 * --------------------------------------------------------------------------
 * ART DIRECTION IS PART OF THE DATA
 * --------------------------------------------------------------------------
 * Each redesign carries its own palette, typeface and layout. A restaurant
 * should not come out looking like a dental clinic, and neither should come
 * out looking like us. Three sectors, three directions — that is the point
 * of the section, and it is why `art` lives here rather than in the
 * component: the range is content, not styling.
 *
 * None of these palettes are the Make It Click palette. Ours is the frame;
 * theirs is the work.
 */

export type SiteContent = {
  /** Placeholder brand shown inside the miniature. Archetype, not a client. */
  brand: string;
  nav: string[];
  headline: string;
  /** One short support line. Keep it under ~90 characters. */
  sub: string;
  cta: string;
  /** Three cards / services / dishes — whatever the sector calls them. */
  items: { title: string; meta: string }[];
  /** Small proof row under the fold of the miniature. */
  footnote: string;
};

/** The four ways a small-business website is usually bad. */
export type BeforeFlavor = "gradient" | "promo" | "corporate" | "builder";

export type BeforeSpec = SiteContent & { flavor: BeforeFlavor };

export type Palette = {
  bg: string;
  /** Secondary surface: cards, panels, inset blocks. */
  surface: string;
  fg: string;
  muted: string;
  line: string;
  accent: string;
  /** Text that sits on top of `accent`. */
  accentFg: string;
  /** Optional warm second accent, for a layout that needs one on a dark panel. */
  accentAlt?: string;
};

export type AfterArt = {
  palette: Palette;
  /** Which redesign layout renders this site. */
  layout: "menu" | "clinic" | "ledger" | "poster";
  display: "serif" | "grotesk";
  /** Corner radius for this brand, in px. Soft for care, sharp for money. */
  radius: string;
};

export type AfterSpec = SiteContent & { art: AfterArt };

export type Project = {
  /** Catalogue number. MIC / 001. */
  id: string;
  sector: string;
  /** Short editorial line: what the redesign actually fixes. */
  premise: string;
  /** The two or three moves that carry the redesign. Kept terse. */
  moves: string[];
  /** One line naming the direction, shown with the work. */
  direction: string;
  before: BeforeSpec;
  after: AfterSpec;
  /** Optional real screenshots — take priority over the rendered miniature. */
  beforeImage?: string;
  afterImage?: string;
};

export const projects: Project[] = [
  {
    id: "001",
    sector: "Restaurante",
    premise: "Un restaurante lleno todas las noches, con una web que nadie usa para reservar.",
    moves: ["Reserva en primer plano", "Carta legible en el celular", "Una sola idea por pantalla"],
    direction: "Hueso, vino y ocre. La carta manda: platos y precios en portada.",
    before: {
      flavor: "gradient",
      brand: "Casa María",
      nav: ["Inicio", "Nosotros", "Galería", "Carta", "Contáctenos", "Links"],
      headline: "Bienvenidos a nuestro sitio web oficial",
      sub: "Somos un restaurante con más de 20 años ofreciendo la mejor calidad y servicio a todos nuestros clientes en un ambiente familiar y acogedor para toda la familia.",
      cta: "Click aquí",
      items: [
        { title: "Nuestra Historia", meta: "Leer más »" },
        { title: "Galería de Fotos", meta: "Leer más »" },
        { title: "Horarios", meta: "Leer más »" },
      ],
      footnote: "Síganos en nuestras redes sociales · Visitas: 048271",
    },
    after: {
      brand: "Casa María",
      nav: ["Carta", "Reservar"],
      headline: "Mesa para dos, a las ocho.",
      sub: "Cocina del norte. Reserva en treinta segundos.",
      cta: "Reservar",
      /** In this layout the items are the menu: dish and price. */
      items: [
        { title: "Cabrito a la norteña", meta: "48" },
        { title: "Arroz con pato", meta: "42" },
        { title: "Seco de res", meta: "45" },
      ],
      footnote: "Mar — Dom · 12:00 — 23:00 · Miraflores",
      art: {
        layout: "menu",
        display: "serif",
        radius: "0px",
        palette: {
          bg: "#f2e9d8",
          surface: "#5b1a1e",
          fg: "#2a1512",
          muted: "#7c6153",
          line: "#ddcdb4",
          accent: "#b5472d",
          accentFg: "#f6efe1",
          accentAlt: "#e0a33c",
        },
      },
    },
  },
  {
    id: "002",
    sector: "Salud dental",
    premise: "Una clínica que da confianza en persona y la pierde en la primera pantalla.",
    moves: ["Jerarquía clínica clara", "Un botón, no siete", "Tipografía que se lee"],
    direction: "Menta, pino y esquinas blandas. Limpio sin ser frío.",
    before: {
      flavor: "promo",
      brand: "Norte Dental",
      nav: ["Home", "Servicios", "Doctores", "Promociones", "Blog", "FAQ"],
      headline: "¡¡Tu sonrisa es nuestra prioridad!!",
      sub: "Ofrecemos todos los tratamientos dentales con tecnología de última generación y los mejores especialistas certificados a precios accesibles para toda la familia.",
      cta: "Solicite su cita ahora",
      items: [
        { title: "Ortodoncia", meta: "Ver más" },
        { title: "Implantes", meta: "Ver más" },
        { title: "Blanqueamiento", meta: "Ver más" },
      ],
      footnote: "¡PROMOCIÓN! 20% dscto · Llámenos hoy mismo",
    },
    after: {
      brand: "Norte Dental",
      nav: ["Tratamientos", "Agendar"],
      headline: "Una cita. Sin sala de espera.",
      sub: "Odontología general y especializada en San Isidro.",
      cta: "Agendar",
      items: [
        { title: "Ortodoncia", meta: "Desde 12 meses" },
        { title: "Implantes", meta: "Sesión única" },
        { title: "Prevención", meta: "Cada 6 meses" },
      ],
      footnote: "Lun — Sáb · Atención con cita previa",
      art: {
        layout: "clinic",
        display: "grotesk",
        radius: "14px",
        palette: {
          bg: "#edf6f2",
          surface: "#ffffff",
          fg: "#0c2b26",
          muted: "#5b7c75",
          line: "#d2e6df",
          accent: "#0a8f6f",
          accentFg: "#ffffff",
        },
      },
    },
  },
  {
    id: "003",
    sector: "Servicios profesionales",
    premise: "Un estudio serio que online se ve exactamente igual que su competencia.",
    moves: ["Posición, no catálogo", "Prueba concreta", "Contacto sin fricción"],
    direction: "Marino, hueso y oro apagado. Retícula de memoria anual.",
    before: {
      flavor: "corporate",
      brand: "Arenas & Co.",
      nav: ["Inicio", "Quiénes somos", "Servicios", "Clientes", "Noticias", "Contacto"],
      headline: "Soluciones integrales para su empresa",
      sub: "Brindamos asesoría contable, tributaria, laboral y financiera con un equipo multidisciplinario comprometido con el crecimiento sostenible de su organización.",
      cta: "Más información",
      items: [
        { title: "Asesoría Contable", meta: "+" },
        { title: "Asesoría Tributaria", meta: "+" },
        { title: "Asesoría Laboral", meta: "+" },
      ],
      footnote: "Todos los derechos reservados · Diseñado por WebPerú",
    },
    after: {
      brand: "Arenas & Co.",
      nav: ["Práctica", "Contacto"],
      headline: "Contabilidad que se entiende.",
      sub: "Para empresas de 10 a 200 personas.",
      cta: "Hablemos",
      items: [
        { title: "Tributario", meta: "01" },
        { title: "Laboral", meta: "02" },
        { title: "Financiero", meta: "03" },
      ],
      footnote: "Lima · Respuesta en 24 h",
      art: {
        layout: "ledger",
        display: "grotesk",
        radius: "2px",
        palette: {
          bg: "#0e1a2e",
          surface: "#16243f",
          fg: "#ece7db",
          muted: "#8295b3",
          line: "#26374f",
          accent: "#d7a03c",
          accentFg: "#0e1a2e",
        },
      },
    },
  },
];

/**
 * The hero demonstration.
 *
 * Deliberately NOT one of the projects above. The hero is the first thing
 * anyone sees; if it showed the same business that opens Selected Work, the
 * portfolio would feel half as deep as it is. Its own sector, its own
 * palette, its own layout.
 *
 * It is a concept like everything else here, and the hero labels it as one.
 */
export const heroDemo: Project = {
  id: "000",
  sector: "Fitness",
  premise: "Un box lleno a las seis de la mañana, con una web que parece de otro negocio.",
  moves: ["Una clase, un botón", "Horario visible", "Tono que coincide con la sala"],
  direction: "Negro y ácido. Tipografía de cartel, sin una palabra de más.",
  before: {
    flavor: "builder",
    brand: "Fuerza",
    nav: ["Home", "Nosotros", "Clases", "Horarios", "Precios", "Contacto"],
    headline: "Bienvenidos a Fuerza",
    sub: "Tu viaje fitness comienza aquí. Contamos con los mejores equipos y entrenadores certificados para ayudarte a alcanzar todos tus objetivos de forma saludable.",
    cta: "Comenzar ahora",
    items: [
      { title: "Calidad", meta: "Saber más" },
      { title: "Pasión", meta: "Saber más" },
      { title: "Resultados", meta: "Saber más" },
    ],
    footnote: "Hecho con ♥ · Powered by SiteBuilder",
  },
  after: {
    brand: "Fuerza",
    nav: ["Horarios", "Únete"],
    headline: "Entrena en serio.",
    sub: "Box de fuerza en Barranco. La primera clase va por nuestra cuenta.",
    cta: "Reservar tu primera clase",
    /** In this layout the items are the numbers: figure first, label under. */
    items: [
      { title: "Clases por semana", meta: "24" },
      { title: "Personas por clase", meta: "12" },
      { title: "Coaches", meta: "8" },
    ],
    footnote: "Barranco · Lun — Sáb · 5:30 — 21:00",
    art: {
      layout: "poster",
      display: "grotesk",
      radius: "0px",
      palette: {
        bg: "#0d0d0c",
        surface: "#191917",
        fg: "#f2f2ec",
        muted: "#909086",
        line: "#2a2a26",
        accent: "#dcf736",
        accentFg: "#0d0d0c",
      },
    },
  },
};
