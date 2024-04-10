import { IQuizResult } from "../../../play/type";

import { IScoreData } from "./type";

export const scoreData: IScoreData[] = [
  {
    id: "successes",
    label: "Aciertos",
  },
  {
    id: "failures",
    label: "Fallos",
  },
  {
    id: "score",
    label: "Nota",
  },
];

export const resultsData: IQuizResult[] = [
  {
    answerSelected: "Salam malecum malecum salam",
    idQuestion: "77298a34-928b-4966-90f9-aa599514a9b3",
    question: "What was your favourite bone?",
    isCorrect: true,
    correctAnswer: "",
  },
  {
    answerSelected: "Salam malecum",
    idQuestion: "77298a34-928b-4966-90f9-aa599514a9b4",
    question: "Whatsssss???????",
    isCorrect: false,
    correctAnswer: "Malecum",
  },
];
