import { Dispatch, SetStateAction } from "react";

export interface ICurrentQuestion {
  currentIdQuestion: string;
  currentQuestion: string;
  currentAnswers: { id: string; answer: string }[];
  currentCorrectAnswer: string;
}

export interface IQuizResult {
  question: string;
  answerSelected: string;
  idQuestion: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface IUseQuizQuestions {
  numberQuestion: number;
  setNumberQuestion: Dispatch<SetStateAction<number>>;
  currentQuestion: ICurrentQuestion;
}

export interface IAnswerSelected {
  answerSelected: string;
  idAnswerSelected: string;
}
