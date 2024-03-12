import { RegisterBody } from "@anatoquiz/src/services/auth/postRegister";
import { AuthFormError } from "@anatoquiz/src/types/authTypes";
import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export interface UserRegisterForm {
  error: AuthFormError;
  setError: Dispatch<SetStateAction<AuthFormError>>;
  postRegister: UseMutateFunction<void, Error, RegisterBody, unknown>;
}
