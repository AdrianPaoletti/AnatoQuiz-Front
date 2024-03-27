import { getQuestionsFetch } from "@anatoquiz/src/services/quiz/getQuestions";
import { IQuestionsResponse } from "@anatoquiz/src/types/questionsType";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  IDataQuiz,
  IParamsGetQuestions,
  IUseQuizConfig,
} from "./type.interface";

export function useQuizConfig(): IUseQuizConfig {
  const router = useRouter();
  const [dataQuiz, setDataQuiz] = useState<IDataQuiz>({
    lessons: [],
    subjects: [],
    questions: "", //limit
    time: "",
  });

  async function onGoStart(): Promise<IQuestionsResponse> {
    // const newParams: IParamsGetQuestions = {
    //   lessons: [...dataQuiz.lessons],
    //   subjects: [...dataQuiz.subjects],
    //   questionsNumber: parseInt(dataQuiz.questions),
    // };
    const newParams: IParamsGetQuestions = {
      lessons: JSON.stringify(["1", "3"]),
      questionsNumber: 1,
    };

    return getQuestionsFetch(newParams).then((questions) => {
      router.push("/auth/login");

      return questions;
    });
  }
  const { data: questions, refetch } = useQuery({
    queryKey: ["questions"],
    queryFn: () => onGoStart(),
    enabled: false,
    retry: false,
  });

  return { dataQuiz, setDataQuiz, refetch };
}
