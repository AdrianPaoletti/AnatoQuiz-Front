import { IGetOTPParams } from "@anatoquiz/types/otpTypes";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_LOCAL;

export async function getOTP(params: IGetOTPParams): Promise<void> {
  axios.get(`${api}/opt/find`, { params }).catch((error) => {
    throw new Error(error.message);
  });
}
