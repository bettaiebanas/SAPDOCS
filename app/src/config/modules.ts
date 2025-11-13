// src/config/modules.ts
export type ModuleConfig = {
  id: string;    // ex: "m02"
  code: string;  // ex: "M02"
  title: string; // ex: "Données de base PP/MM"
  order: number;
};

export const MODULES: ModuleConfig[] = [
  {
    id: "m01",
    code: "M01",
    title: "Fondamentaux SAP & manufacturing",
    order: 1,
  },
  {
    id: "m02",
    code: "M02",
    title: "Données de base PP/MM",
    order: 2,
  },
  {
    id: "m03",
    code: "M03",
    title: "Plan-to-Produce – Make to Stock (MTS)",
    order: 3,
  },
  {
    id: "m04",
    code: "M04",
    title: "Plan-to-Produce – Make to Order (MTO)",
    order: 4,
  },
  {
    id: "m05",
    code: "M05",
    title: "Planification & MRP avancés",
    order: 5,
  },
  {
    id: "m06",
    code: "M06",
    title: "Intégrations PP avec MM / SD / QM / PM",
    order: 6,
  },
  {
    id: "m07",
    code: "M07",
    title: "Traçabilité, MES & préparation certification PP",
    order: 7,
  },
];

export function getModuleById(id: string): ModuleConfig | undefined {
  const normalized = id.toLowerCase();
  return MODULES.find((m) => m.id === normalized);
}