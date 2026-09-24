/**
 * WHY IT CLICKS — the five things we refuse to get wrong.
 *
 * Each principle carries a `demo` id. The section does not describe the
 * principle and move on: it demonstrates it live (see sections/WhyItClicks).
 */

export type PrincipleDemo =
  | "hierarchy"
  | "impression"
  | "mobile"
  | "speed"
  | "interaction";

export type Principle = {
  id: string;
  title: string;
  body: string;
  demo: PrincipleDemo;
  /** Caption under the live demo. Says what to look at. */
  caption: string;
};

export const principles: Principle[] = [
  {
    id: "01",
    title: "Jerarquía clara",
    body: "Si todo grita, no se entiende nada. Una cosa manda por pantalla.",
    demo: "hierarchy",
    caption: "Mismo contenido. Un solo cambio: qué manda.",
  },
  {
    id: "02",
    title: "Primera impresión",
    body: "Tienes tres segundos antes de que decidan si eres serio.",
    demo: "impression",
    caption: "Lo que alcanza a leerse en tres segundos.",
  },
  {
    id: "03",
    title: "Primero el celular",
    body: "Tu cliente no está en una laptop. Está en el bus.",
    demo: "mobile",
    caption: "Diseñado en 375px, no comprimido desde 1440.",
  },
  {
    id: "04",
    title: "Carga rápida",
    body: "Una web bonita que carga en ocho segundos es una web lenta.",
    demo: "speed",
    caption: "Cada segundo de carga se cobra en visitas.",
  },
  {
    id: "05",
    title: "Interacción con intención",
    body: "Nada se mueve porque sí. Cada click hace algo.",
    demo: "interaction",
    caption: "Pruébalo.",
  },
];
