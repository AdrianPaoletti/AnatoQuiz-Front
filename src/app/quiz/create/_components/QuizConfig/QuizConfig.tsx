"use client";

import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { classNames } from "@anatoquiz/src/styles/shared/classNames";
import { useState } from "react";

import { configData } from "./configData";
import { IConfigData } from "./type.interface";

import styles from "./QuizConfig.module.scss";

export function QuizConfig() {
  function clickPrueba(
    id: IConfigData["id"],
    item: any,
    data: IConfigData["data"],
  ): void {
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

    if (!isMultiSelect) {
      data.map((itemData) => (itemData.selected = false)); // esto no se si es bien
    }

    item.selected = !item.selected;
    // {
    //   lessonss: [''],
    //   limit: 2
    // }
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

  const [dataQuiz, setDataQuiz] = useState<{
    lessons: string[];
    subjects: string[];
    questions: string;
    time: string;
  }>({
    lessons: [],
    subjects: [],
    questions: "", //limit
    time: "",
  });

  console.log("dataQuiz", dataQuiz);

  return (
    <section className={styles["quiz-config"]}>
      {configData.map(({ id, title, description, data }) => (
        <article key={id} className={styles["quiz-config__content"]}>
          <h2 className={styles["quiz-config__title"]}>{title}</h2>

          <p className={styles["quiz-config__description"]}>{description}</p>
          <div className={styles["quiz-config__chips-container"]}>
            {data.map((item, index) => (
              <button
                className={classNames(
                  styles["quiz-config__chip"],
                  styles[`quiz-config__chip--${id}`],
                  { [styles[`quiz-config__chip--selected`]]: item.selected },
                )}
                type="button"
                key={index}
                onClick={() => clickPrueba(id, item, data)}
              >
                {item.value}
              </button>
            ))}
          </div>
        </article>
      ))}
      <footer className={styles["quiz-config__footer"]}>
        <Button type={"button"} mode={"primary"} fullWidth={true}>
          Go start
        </Button>
      </footer>
    </section>
  );
}