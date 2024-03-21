import { IConfigData } from "./type.interface";

export const configData: IConfigData[] = [
  {
    id: "lesson",
    title: "Temario",
    description: "Selecciona uno o más temas",
    data: ["Tema 1", "Tema 2", "Tema3"],
  },
  {
    id: "questions",
    title: "Número de preguntas",
    description: "Selecciona el numero de preguntas",
    data: ["10", "20", "30"],
  },
  {
    id: "time",
    title: "Tiempo",
    description: "Selecciona el tiempo por pregunta",
    data: ["30 secs", "1 min", "2 min"],
  },
];
