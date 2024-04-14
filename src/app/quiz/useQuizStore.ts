import { create } from "zustand";

import { IQuizResult } from "./play/type";

interface QuizResultState {
  quizResult: IQuizResult[];
  setQuizResult: (quizResult: IQuizResult) => void;
}

export const useQuizStore = create<QuizResultState>((set) => ({
  quizResult: [],
  setQuizResult: (quizResult) =>
    set((state) => ({
      quizResult: [...state.quizResult, quizResult],
    })),
}));
