import { IParamsGetQuestions } from "@anatoquiz/app/quiz/create/_components/QuizConfig/type.interface";
import { IQuestionsResponse } from "@anatoquiz/types/questionsType";
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ZTZiMzMxLTE3MjItNDRkYy1hNDg5LTRiMmQ0OWVlYzUxYyIsImlhdCI6MTcxMzAzMzA4MiwiZXhwIjoxNzEzNjM3ODgyfQ.wI-A2sbUclVLtCL-KOSomDw8BnJx0qZUnvQZhB29KqQ",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      // @TODO -> Falta gestionar error del getQuestions
      console.log("errror", error);
    });
}
