import { ILoginParams } from "@anatoquiz/types/authTypes";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_LOCAL;

export async function getLogin(params: ILoginParams): Promise<string> {
  return axios.get(`${api}/user/login`, { params });
}
