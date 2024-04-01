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
    questions: "",
    time: "",
  });
  const { data: questions, refetch } = useQuery({
    queryKey: ["questions"],
    queryFn: () => onGetQuestions(),
    enabled: false,
    retry: false,
  });

  async function onGetQuestions(): Promise<IQuestionsResponse> {
    const newParams: IParamsGetQuestions = {
      lessons: JSON.stringify([...dataQuiz.lessons]),
      subjects: JSON.stringify([...dataQuiz.subjects]),
      questionsNumber: parseInt(dataQuiz.questions),
    };

    const newParamsFAKE: IParamsGetQuestions = {
      lessons: JSON.stringify(["1", "3"]),
      questionsNumber: 1,
    };

    // @TODO -> Cuando back esté preparado eliminar newParamsFAKE, y substituir por newParams
    return getQuestionsFetch(newParamsFAKE).then((questions) => {
      // @TODO -> Cambiar url a /quiz/play cuando exista
      router.push("/auth/login");

      return questions;
    });
  }

  return { dataQuiz, setDataQuiz, refetch };
}
