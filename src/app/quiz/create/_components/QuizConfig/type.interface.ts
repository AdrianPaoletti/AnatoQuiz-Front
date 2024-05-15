import { IQuestionsResponse } from "@anatoquiz/types/questionsType";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export interface IKeysConfig {
  lessons: string;
  subjects: string;
  questions: string;
  time: string;
}
export interface IConfig {
  id: keyof IKeysConfig;
  title: string;
  description: string;
  color: "orange" | "blue" | "orange-light" | "pink";
  data: IData[];
}

export interface IData {
  value: string;
  label: string;
}

export interface IDataQuiz {
  lessons: string[];
  subjects: string[];
  questions: string;
  time: string;
}

export interface IParamsGetQuestions {
  lessons: string;
  subjects?: string;
  questionsNumber: number;
}

export interface IUseQuizConfig {
  dataQuiz: IDataQuiz;
  setDataQuiz: Dispatch<SetStateAction<IDataQuiz>>;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<IQuestionsResponse, Error>>;
}
