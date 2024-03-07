import axios from "axios";

export interface LoginParams {
  id: string;
  email: string;
  password: string;
}

const api = process.env.NEXT_PUBLIC_LOCAL;

export async function getLogin(params: LoginParams): Promise<string> {
  return axios.get(`${api}/user/login`, { params });
}
