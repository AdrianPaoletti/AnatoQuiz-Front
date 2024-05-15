import { getLogin as getLoginFetch } from "@anatoquiz/services/auth/getLogin";
import { IAuthFormError, ILoginParams } from "@anatoquiz/types/authTypes";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

interface IUseLoginForm {
  error: IAuthFormError;
  setError: Dispatch<SetStateAction<IAuthFormError>>;
  getLogin: UseMutateFunction<string, Error, ILoginParams, unknown>;
}

export function useLoginForm(): IUseLoginForm {
  const [error, setError] = useState<IAuthFormError>({ id: "", text: "" });

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
