import {
  getLogin as getLoginFetch,
  LoginParams,
} from "@anatoquiz/src/services/auth/getLogin";
import { AuthFormError } from "@anatoquiz/src/types/authTypes";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

interface UseLoginForm {
  error: AuthFormError;
  setError: Dispatch<SetStateAction<AuthFormError>>;
  getLogin: UseMutateFunction<string, Error, LoginParams, unknown>;
}

export function useLoginForm(): UseLoginForm {
  const [error, setError] = useState<AuthFormError>({ id: "", text: "" });

  const { mutate: getLogin } = useMutation({
    mutationKey: ["user"],
    mutationFn: getLoginFetch,
    onError: () => {
      setError({
        id: "",
        text: `Wrong email or password`,
      });
    },
    onSuccess: () => router.push("/"),
  });

  return { error, setError, getLogin };
}
