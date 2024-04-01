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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ZTZiMzMxLTE3MjItNDRkYy1hNDg5LTRiMmQ0OWVlYzUxYyIsImlhdCI6MTcxMTk5NjM0NSwiZXhwIjoxNzEyNjAxMTQ1fQ.dS7p4b54vb7td2GAeUc77CRkcmZ0VoWQLoYMZLVUGww",
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
