import { useEffect, useState } from "react";

import { ICurrentQuestion, IUseQuizQuestions } from "../../type";

import { questionsData } from "./questionsData";

export function useQuestionsList(): IUseQuizQuestions {
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>({
    currentIdQuestion: "",
    currentQuestion: "",
    currentAnswers: [],
    currentCorrectAnswer: "",
  });

  useEffect(() => {
    const { id, question, answers, correctAnswer } =
      questionsData[numberQuestion];

    setCurrentQuestion((prevCurrentQuestion) => ({
      ...prevCurrentQuestion,
      currentIdQuestion: id,
      currentQuestion: question,
      currentAnswers: answers,
      currentCorrectAnswer: correctAnswer,
    }));
  }, [numberQuestion]);

  return { numberQuestion, setNumberQuestion, currentQuestion };
}
