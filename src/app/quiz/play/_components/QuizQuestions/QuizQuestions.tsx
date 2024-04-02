"use client";

import { classNames } from "@anatoquiz/src/styles/shared/classNames";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IQuizResult } from "../../type";
import Question from "../Question/Question";

import { questionsData } from "./questionsData";
import { useQuizQuestion } from "./useQuizQuestion";

import styles from "./QuizQuestions.module.scss";

export default function QuizQuestions() {
  const router = useRouter();
  const { currentQuestion, numberQuestion, setNumberQuestion } =
    useQuizQuestion();

  const [quizResult, setQuizResult] = useState<IQuizResult[]>([]);

  function onNexQuestion(idQuestion: string, idAnswer: string): void {
    // @TODO --> esto lo debe hacer el componente resultado.
    setQuizResult((prevQuizResult) => [
      ...prevQuizResult,
      {
        idAnswer,
        idQuestion,
        // correctAnswer: checkCorrectAnswer(idAnswer)
        //   ? true
        //   : getCorrectAnswer(idAnswer),
      },
    ]);

    if (questionsData.length > numberQuestion + 1) {
      setNumberQuestion(numberQuestion + 1);
    } else {
      router.push("/quiz/results");
    }
  }
  console.log("RESULTADO", quizResult);

  // function getCorrectAnswer(idAnswer: string): string {
  //   const correctAnswer =
  //     currentQuestion.answers.find((answer) => answer.id === idAnswer) ||
  //     ({} as any);

  //   return correctAnswer.answer;
  // }

  // function checkCorrectAnswer(idAnswer: string): boolean {
  //   return currentQuestion.correctAnswer === idAnswer;
  // }

  return (
    <>
      <div className={styles["counter"]}>
        <p className={styles["counter__number"]}>
          <span className={styles["counter--current"]}>
            {numberQuestion + 1}
          </span>
          /{questionsData.length}
        </p>

        <div className={styles["stepper"]}>
          {questionsData.map((step, index) => (
            <div
              key={index}
              className={classNames(styles["stepper__step"], {
                [styles["stepper__step--color"]]: numberQuestion >= index,
              })}
            ></div>
          ))}
        </div>
      </div>

      <Question
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        click={(idAnswer) => onNexQuestion(currentQuestion.id, idAnswer)}
      />
    </>
  );
}
