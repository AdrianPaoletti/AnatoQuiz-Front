"use client";

import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { Chip } from "@anatoquiz/src/styles/atoms/Chip";

import { configData } from "./configData";
import { IData, IKeysConfig } from "./type.interface";
import { useQuizConfig } from "./useQuizConfig";

import styles from "./QuizConfig.module.scss";

export function QuizConfig() {
  const { dataQuiz, setDataQuiz, refetch } = useQuizConfig();

  const isDisabled: boolean = Object.keys(dataQuiz).some(
    (key) => !dataQuiz[key as keyof IKeysConfig].length,
  );

  function onSelectChips(id: keyof IKeysConfig, item: IData, data: IData[]): void {
    const isMultiSelect: boolean = ["lessons", "subjects"].includes(id);
  
    setDataQuiz((prevDataQuiz) => ({
      ...prevDataQuiz,
      [id]: isMultiSelect
            ? multiSelect(
                id as "lessons" | "subjects",
                item.value,
                prevDataQuiz[id] as string[],
              )
            : item.value,
    }));
  }

  function multiSelect(
    id: "lessons" | "subjects",
    value: string,
    array: string[],
  ): string[] {
    return array.some((item) => value === item)
      ? dataQuiz[id].filter((item) => item !== value)
      : array.concat(value);
  }

  return (
    <section className={styles["quiz-config"]}>
      {configData.map(({ id, title, description, color, data }) => (
        <article key={id} className={styles["quiz-config__content"]}>
          <h2 className={styles["quiz-config__title"]}>{title}</h2>

          <p className={styles["quiz-config__description"]}>{description}</p>
          <div className={styles["quiz-config__chips-container"]}>
            {data.map((item) => (
              <Chip
                key={item.value}
                value={item.label}
                color={color}
                click={() => onSelectChips(id, item, data)}
                isSelected={dataQuiz[id].includes(item.value)}
              />
            ))}
          </div>
        </article>
      ))}
      <footer className={styles["quiz-config__footer"]}>
        <Button
          type={"button"}
          mode={"primary"}
          fullWidth={true}
          disabled={isDisabled}
          onClick={() => refetch()}
        >
          Go start
        </Button>
      </footer>
    </section>
  );
}
