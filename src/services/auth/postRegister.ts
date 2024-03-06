import axios from "axios";

export interface RegisterBody {
  id: string;
  username: string;
  password: string;
  email: string;
}

const api = process.env.NEXT_PUBLIC_API;

export async function postRegister(body: RegisterBody): Promise<void> {
  return axios.post(`${api}/user/signup`, body);
}
