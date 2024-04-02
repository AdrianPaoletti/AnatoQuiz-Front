import { classNames } from "@anatoquiz/src/styles/shared/classNames";

import { IQuestionProps } from "../../type";

import styles from "./Question.module.scss";

export default function Question({ question, answers, click }: IQuestionProps) {
  return (
    <>
      <section className={styles["question"]}>
        <p className={styles["question__text"]}>{question}</p>
      </section>
      {answers.map((answer, index) => (
        <button
          className={classNames(styles["answer"], styles[`answer--${index}`])}
          key={answer.id}
          onClick={() => click(answer.id)}
        >
          {/* <p className={styles["answer__number"]}>Numero {index}</p> */}
          <p className={styles["answer__text"]}>{answer.answer}</p>
        </button>
      ))}
    </>
  );
}
