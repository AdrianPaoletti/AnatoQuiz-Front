import { v4 as uuid } from "uuid";

import { IConfig } from "./type.interface";

export const configData: IConfig[] = [
  {
    id: "subjects",
    title: "Temario",
    description: "Selecciona uno o más temas",
    color: "orange",
    data: [
      {
        label: "Sistema esquelético",
        value: uuid(),
      },
      {
        label: "Sistema articular",
        value: uuid(),
      },
      {
        label: "Sistema muscular",
        value: uuid(),
      },
      {
        label: "Sistema linfático",
        value: uuid(),
      },
      {
        label: "Sistema Nervioso",
        value: uuid(),
      },
      {
        label: "Cabeza",
        value: uuid(),
      },
      {
        label: "Cuello",
        value: uuid(),
      },
      {
        label: "Región dorsal del tronco",
        value: uuid(),
      },
      {
        label: "Tórax",
        value: uuid(),
      },
      {
        label: "Cintura escapular",
        value: uuid(),
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
        label: "Lección 1",
        value: "Lesson 1",
      },
      {
        label: "Lección 2",
        value: "Lesson 2",
      },
      {
        label: "Lección 3",
        value: "Lesson 3",
      },
      {
        label: "Lección 4",
        value: "Lesson 4",
      },
      {
        label: "Lección 5",
        value: "Lesson 5",
      },
      {
        label: "Lección 6",
        value: "Lesson 6",
      },
      {
        label: "Lección 7",
        value: "Lesson 7",
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
        label: "10",
        value: "10",
      },
      {
        label: "20",
        value: "20",
      },
      {
        label: "30",
        value: "30",
      },
      {
        label: "40",
        value: "40",
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
        label: "20 sec",
        value: uuid(),
      },
      {
        label: "40 secs",
        value: uuid(),
      },
      {
        label: "1 min",
        value: uuid(),
      },
      {
        label: "2 min",
        value: uuid(),
      },
    ],
  },
];
