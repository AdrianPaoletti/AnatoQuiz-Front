import { QuizConfig } from "./_components/QuizConfig/QuizConfig";

import styles from "./page.module.scss";

export default function QuizCreate() {
  return (
    <article className={styles.create}>
      <h2 className={styles.create__title}>Go start... 🤓</h2>
      <h3 className={styles.create__subtitle}>¡Crea la partida a tu medida!</h3>
      <QuizConfig />
    </article>
  );
}
