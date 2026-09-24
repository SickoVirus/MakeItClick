export type Service = {
  id: string;
  title: string;
  body: string;
  /** Three concrete deliverables. No icons, no feature bullets. */
  includes: string[];
};

export const services: Service[] = [
  {
    id: "01",
    title: "Web Design",
    body: "Diseñamos la web desde cero cuando no hay nada que rescatar.",
    includes: ["Arquitectura", "Dirección visual", "Sistema de diseño"],
  },
  {
    id: "02",
    title: "Website Redesign",
    body: "Tu negocio ya funciona. Rehacemos la parte que no.",
    includes: ["Auditoría", "Nueva estructura", "Migración"],
  },
  {
    id: "03",
    title: "UX / UI",
    body: "Ordenamos qué ve primero tu cliente y qué decide después.",
    includes: ["Jerarquía", "Flujos", "Interfaz"],
  },
  {
    id: "04",
    title: "Frontend Development",
    body: "Construimos lo que diseñamos. Rápido, accesible, tuyo.",
    includes: ["Next.js", "Responsive", "Velocidad"],
  },
];
