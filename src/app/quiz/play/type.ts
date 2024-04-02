import { Dispatch, SetStateAction } from "react";

export interface IQuestionProps {
  question: string;
  answers: { id: string; answer: string }[];
  click: (idAnswer: string) => void;
}

export interface ICurrentQuestion {
  id: string;
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string;
}

export interface IQuizResult {
  idQuestion: string;
  idAnswer: string;
}

export interface IUseQuizQuestions {
  numberQuestion: number;
  setNumberQuestion: Dispatch<SetStateAction<number>>;
  currentQuestion: ICurrentQuestion;
}
