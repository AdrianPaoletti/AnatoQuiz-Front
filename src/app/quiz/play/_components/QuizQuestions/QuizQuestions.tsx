"use client";

import { useEffect, useState } from "react";

import Question from "../Question/Question";

import { questionsData } from "./questionsData";
import { ICurrentQuestion } from "./type";

export default function QuizQuestions() {
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>({
    id: "",
    question: "",
    answers: [],
    correctAnswer: "",
  });

  function onNexQuestion(): void {
    setNumberQuestion(numberQuestion + 1);
  }

  useEffect(() => {
    setCurrentQuestion((prevCurrentQuestion) => ({
      ...prevCurrentQuestion,
      id: questionsData[numberQuestion].id,
      question: questionsData[numberQuestion].question,
      answers: questionsData[numberQuestion].answers,
      correctAnswer: questionsData[numberQuestion].corretAnswer,
    }));
  }, [numberQuestion]);

  return (
    <>
      <span>
        {numberQuestion + 1}/{questionsData.length}
      </span>
      <Question
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        click={() => onNexQuestion()}
      />
    </>
  );
}
