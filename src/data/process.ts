export type Step = {
  id: string;
  title: string;
  body: string;
  /** What you get at the end of this step. Keeps the process honest. */
  output: string;
};

export const process: Step[] = [
  {
    id: "01",
    title: "Look",
    body: "Entramos a tu web como entra un cliente. Anotamos dónde se pierde.",
    output: "Diagnóstico",
  },
  {
    id: "02",
    title: "Think",
    body: "Replanteamos estructura, jerarquía y el camino hasta la acción.",
    output: "Arquitectura",
  },
  {
    id: "03",
    title: "Make",
    body: "Diseñamos y construimos la nueva experiencia, pantalla por pantalla.",
    output: "Diseño + código",
  },
  {
    id: "04",
    title: "Click",
    body: "Sale a producción. Medimos qué cambia.",
    output: "Lanzamiento",
  },
];
