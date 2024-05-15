"use client";

import { Button } from "@anatoquiz/styles/atoms/Button";
import { Stepper } from "@anatoquiz/styles/atoms/Stepper";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQuizStore } from "../../../useQuizStore";
import { IAnswerSelected } from "../../type";
import Question from "../Question/Question";

import { questionsData } from "./questionsData";
import { useQuestionsList } from "./useQuestionsList";

import styles from "./QuestionsList.module.scss";

export default function QuestionsList() {
  const router = useRouter();
  const questionsTry = useQueryClient().getQueryData(["questions"]);
  const {
    currentQuestion: {
      currentIdQuestion,
      currentQuestion,
      currentAnswers,
      currentCorrectAnswer,
    },
    numberQuestion,
    setNumberQuestion,
  } = useQuestionsList();
  const [{ answerSelected, idAnswerSelected }, setAnswerSelected] =
    useState<IAnswerSelected>({
      answerSelected: "",
      idAnswerSelected: "",
    });
  // const [quizResult, setQuizResult] = useState<IQuizResult[]>([]);
  const setQuizResult = useQuizStore(({ setQuizResult }) => setQuizResult);

  function getAnswerSelected(
    idAnswerSelected: string,
    answerSelected: string,
  ): void {
    setAnswerSelected({
      idAnswerSelected,
      answerSelected,
    });
  }

  function getCorrectAnswer(idAnswer: string): string {
    return (
      currentAnswers.find((answer) => answer.id === idAnswer)?.answer || ""
    );
  }

  function checkCorrectAnswer(idAnswer: string): boolean {
    return currentCorrectAnswer === idAnswer;
  }

  function onNextQuestion(
    idQuestion: string,
    question: string,
    idAnswer: string,
    answerSelected: string,
  ): void {
    const isCorrect: boolean = checkCorrectAnswer(idAnswer);
    setQuizResult({
      answerSelected,
      idQuestion,
      question,
      isCorrect,
      correctAnswer: isCorrect ? "" : getCorrectAnswer(currentCorrectAnswer),
    });

    if (questionsData.length > numberQuestion + 1) {
      setNumberQuestion(numberQuestion + 1);

      return;
    }

    router.push("/quiz/summary");
  }

  return (
    <>
      <div className={styles["counter"]}>
        <p className={styles["counter__number"]}>
          <span className={styles["counter--current"]}>
            {numberQuestion + 1}
          </span>
          /{questionsData.length}
        </p>
        <Stepper
          numberQuestion={numberQuestion}
          numberStepps={questionsData.length}
        />
      </div>

      <Question
        question={currentQuestion}
        answers={currentAnswers}
        answerSelected={idAnswerSelected}
        click={getAnswerSelected}
      />

      <Button
        type={"button"}
        mode={"inverted"}
        fullWidth={true}
        bottom={true}
        disabled={!idAnswerSelected}
        onClick={() =>
          onNextQuestion(
            currentIdQuestion,
            currentQuestion,
            idAnswerSelected,
            answerSelected,
          )
        }
      >
        Next
      </Button>
    </>
  );
}
