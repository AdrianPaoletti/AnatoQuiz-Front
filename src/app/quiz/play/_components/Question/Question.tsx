import { classNames } from "@anatoquiz/styles/shared/classNames";

import styles from "./Question.module.scss";

interface IQuestionProps {
  question: string;
  answers: { id: string; answer: string }[];
  answerSelected: string;
  click: (idAnswer: string, answer: string) => void;
}
export default function Question({
  question,
  answers,
  answerSelected,
  click,
}: IQuestionProps) {
  return (
    <>
      <section className={styles["question"]}>
        <p className={styles["question__text"]}>{question}</p>
      </section>
      {answers.map(({ answer, id }, index) => (
        <button
          className={classNames(styles["answer"], styles[`answer--${index}`], {
            [styles["answer--selected"]]: id === answerSelected,
          })}
          key={id}
          onClick={() => click(id, answer)}
        >
          <p className={styles["answer__text"]}>{answer}</p>
        </button>
      ))}
    </>
  );
}
