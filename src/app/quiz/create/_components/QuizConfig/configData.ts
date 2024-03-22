import { IConfigData } from "./type.interface";

export const configData: IConfigData[] = [
  {
    id: "subjects",
    title: "Temario",
    description: "Selecciona uno o más temas",
    data: [
      {
        value: "Huesos",
        selected: false,
      },
      {
        value: "Músculos",
        selected: false,
      },
      {
        value: "Articulaciones",
        selected: false,
      },
    ],
  },
  {
    id: "lessons",
    title: "Lecciones",
    description: "Selecciona uno o más lecciones",
    data: [
      {
        value: "Lección 1",
        selected: false,
      },
      {
        value: "Lección 2",
        selected: false,
      },
      {
        value: "Lección 3",
        selected: false,
      },
    ],
  },
  {
    id: "questions",
    title: "Número de preguntas",
    description: "Selecciona el numero de preguntas",
    data: [
      {
        value: "10",
        selected: false,
      },
      {
        value: "20",
        selected: false,
      },
      {
        value: "30",
        selected: false,
      },
      {
        value: "40",
        selected: false,
      },
    ],
  },
  {
    id: "time",
    title: "Tiempo",
    description: "Selecciona el tiempo por pregunta",
    data: [
      {
        value: "20 sec",
        selected: false,
      },
      {
        value: "40 secs",
        selected: false,
      },
      {
        value: "1 min",
        selected: false,
      },
      {
        value: "2 min",
        selected: false,
      },
    ],
  },
];
