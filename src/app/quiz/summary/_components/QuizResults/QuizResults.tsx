"use client";

import { Icon } from "@anatoquiz/src/styles/atoms/Icon";
import { classNames } from "@anatoquiz/src/styles/shared/classNames";

import { useQuizStore } from "../../../useQuizStore";

import { scoreData } from "./resultsData";
import { useQuizResults } from "./useQuizResults";

import colors from "../../../../../styles/docs/colors.module.scss";
import styles from "./QuizResults.module.scss";

export default function QuizResults() {
  const { counterScore } = useQuizResults();
  const quizResult = useQuizStore(({ quizResult }) => quizResult);
  console.log("asdfasdf", quizResult);

  return (
    <section>
      <header className={styles["score"]}>
        {scoreData.map((item) => (
          <p className={styles["score__text"]} key={item.id}>
            {item.label}
            <span className={styles["score__text--value"]}>
              {counterScore[item.id]}
            </span>
          </p>
        ))}
      </header>
      <ul className={styles["results"]}>
        {quizResult.map(
          ({
            answerSelected,
            question,
            correctAnswer,
            isCorrect,
            idQuestion,
          }) => (
            <li
              key={idQuestion}
              className={classNames(styles["results__card"], {
                [styles["results__card--error"]]: !isCorrect,
              })}
            >
              <Icon
                className={styles["results__icon"]}
                icon={isCorrect ? "checkCircle" : "crossCircle"}
                style={{
                  color: isCorrect ? colors.success : colors.error,
                }}
              />
              <h2 className={styles["results__questions"]}>{question}</h2>
              <p className={styles["results__answer"]}>
                {isCorrect ? answerSelected : correctAnswer}
              </p>
              {!isCorrect && (
                <p
                  className={classNames(
                    styles["results__answer"],
                    styles["results__answer--error"],
                  )}
                >
                  {answerSelected}
                </p>
              )}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
