import { IConfig } from "./type.interface";

export const configData: IConfig[] = [
  {
    id: "subjects",
    title: "Temario",
    description: "Selecciona uno o más temas",
    color: "orange",
    data: [
      {
        value: "Sistema esquelético",
        selected: false,
      },
      {
        value: "Sistema articular",
        selected: false,
      },
      {
        value: "Sistema muscular",
        selected: false,
      },
      {
        value: "Sistema linfático",
        selected: false,
      },
      {
        value: "Sistema Nervioso",
        selected: false,
      },
      {
        value: "Cabeza",
        selected: false,
      },
      {
        value: "Cuello",
        selected: false,
      },
      {
        value: "Región dorsal del tronco",
        selected: false,
      },
      {
        value: "Tórax",
        selected: false,
      },
      {
        value: "Cintura escapular",
        selected: false,
      },
    ],
  },
  {
    id: "lessons",
    title: "Lecciones",
    description: "Selecciona una o más lecciones",
    color: "blue",
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
      {
        value: "Lección 4",
        selected: false,
      },
      {
        value: "Lección 5",
        selected: false,
      },
      {
        value: "Lección 6",
        selected: false,
      },
      {
        value: "Lección 7",
        selected: false,
      },
    ],
  },
  {
    id: "questions",
    title: "Número de preguntas",
    description: "Selecciona el numero de preguntas",
    color: "orange-light",
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
    color: "pink",
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
