import { IPutOTPRequestBody } from "@anatoquiz/types/otpTypes";
import axios from "axios";
import { v4 as uuid } from "uuid";

const api = process.env.NEXT_PUBLIC_LOCAL;

export async function putOTP(requestBody: IPutOTPRequestBody): Promise<void> {
  axios
    .put(`${api}/opt/create`, { id: uuid(), ...requestBody })
    .catch((error) => {
      throw new Error(error.message);
    });
}
