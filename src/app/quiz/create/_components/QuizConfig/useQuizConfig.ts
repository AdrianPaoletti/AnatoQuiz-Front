import { getQuestionsFetch } from "@anatoquiz/src/services/quiz/getQuestions";
import { IQuestionsResponse } from "@anatoquiz/src/types/questionsType";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import { IDataQuiz, IParamsGetQuestions } from "./type.interface";

interface IUseQuizConfig {
  dataQuiz: IDataQuiz;
  setDataQuiz: Dispatch<SetStateAction<IDataQuiz>>;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<IQuestionsResponse, Error>>;
}
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
