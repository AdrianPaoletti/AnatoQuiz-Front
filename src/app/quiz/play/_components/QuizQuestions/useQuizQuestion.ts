import { useEffect, useState } from "react";

import { ICurrentQuestion, IUseQuizQuestions } from "../../type";

import { questionsData } from "./questionsData";

export function useQuizQuestion(): IUseQuizQuestions {
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>({
    id: "",
    question: "",
    answers: [],
    correctAnswer: "",
  });

  useEffect(() => {
    setCurrentQuestion((prevCurrentQuestion) => ({
      ...prevCurrentQuestion,
      id: questionsData[numberQuestion].id,
      question: questionsData[numberQuestion].question,
      answers: questionsData[numberQuestion].answers,
      correctAnswer: questionsData[numberQuestion].corretAnswer,
    }));
  }, [numberQuestion]);

  return { numberQuestion, setNumberQuestion, currentQuestion };
}
