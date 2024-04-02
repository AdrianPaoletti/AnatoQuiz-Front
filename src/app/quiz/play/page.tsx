"use client";

import { useRouter } from "next/navigation";

import QuizQuestions from "./_components/QuizQuestions/QuizQuestions";

import styles from "./page.module.scss";

export default function QuizPlay() {
  const router = useRouter();

  return (
    <article className={styles["quiz-play"]}>
      <p>TIMER ---------</p>
      <QuizQuestions />
      <button
        className={styles["quiz-play__close"]}
        onClick={() => router.push("/quiz/create")}
      >
        Salir
      </button>
    </article>
  );
}
