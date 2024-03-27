import { IParamsGetQuestions } from "@anatoquiz/src/app/quiz/create/_components/QuizConfig/type.interface";
import { IQuestionsResponse } from "@anatoquiz/src/types/questionsType";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_LOCAL;

export async function getQuestionsFetch(
  params: IParamsGetQuestions,
): Promise<IQuestionsResponse> {
  return axios
    .get(`${api}/question`, {
      params,
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ZTZiMzMxLTE3MjItNDRkYy1hNDg5LTRiMmQ0OWVlYzUxYyIsImlhdCI6MTcxMTM5MDgzMywiZXhwIjoxNzExOTk1NjMzfQ.owxcvcd8w3FcZ15FUEjMuwvtoUHPlwNQpA-Mh3Ityc8",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log("errror", error);
    });
}