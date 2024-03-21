"use client";

import { useState } from "react";

import { configData } from "./configData";
import { IConfigData } from "./type.interface";

export function QuizConfig() {
  function clickPrueba(id: IConfigData["id"], item: string): void {
    console.log(id);
    switch (id) {
      case "lesson":
        setDataQuiz((prevDataQuiz) => ({
          ...prevDataQuiz,
          lesson: item,
        }));
        break;
    }
  }

  const [dataQuiz, setDataQuiz] = useState<{
    lesson: string;
    questions: string;
    time: string;
  }>({
    lesson: "",
    questions: "",
    time: "",
  });

  console.log("dataQuiz", dataQuiz);

  return (
    <>
      {configData.map(({ id, title, description, data }) => (
        <section key={id}>
          <h2>{title}</h2>

          <p>{description}</p>

          {data.map((item, index) => (
            <button key={index} onClick={() => clickPrueba(id, item)}>
              {item}
            </button>
          ))}
        </section>
      ))}
    </>
  );
}
