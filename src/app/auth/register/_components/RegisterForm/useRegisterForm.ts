import { getGoogleUserInfo } from "@anatoquiz/src/services/auth/getGoogleUserInfo";
import {
  putRegister as putRegisterFetch,
  RegisterBody,
} from "@anatoquiz/src/services/auth/putRegister";
import { AuthFormError } from "@anatoquiz/src/types/authTypes";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface UserRegisterForm {
  error: AuthFormError;
  setError: Dispatch<SetStateAction<AuthFormError>>;
  putRegister: UseMutateFunction<void, Error, RegisterBody, unknown>;
}

export function useRegisterForm(): UserRegisterForm {
  const [error, setError] = useState<AuthFormError>({
    id: "",
    text: "",
  });

  const { mutate: putRegister } = useMutation({
    mutationKey: ["user"],
    mutationFn: putRegisterFetch,
    onError: () => {
      setError({
        id: "",
        text: `This email is already taken. Please log in.`,
      });
    },
    onSuccess: () =>
      googleData
        ? router.push("/onboarding")
        : router.push("/auth/verification"),
  });

  const {
    data: googleData,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["google-info"],
    queryFn: () => {
      const hashParams = window.location.hash.substring(1);
      const token: string =
        new URLSearchParams(hashParams).get("access_token") ?? "";

      return getGoogleUserInfo(token);
    },
    select: ({ email, name: username, picture }) => ({
      email,
      username,
      password: uuid(),
    }),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (window.location.hash && !isFetched) {
      refetch().catch(() => {});
    }

    if (isFetched && googleData) {
      const { username, password, email } = googleData;
      putRegister({ username, password, email, id: uuid() });
    }
  }, [refetch, googleData, isFetched, putRegister]);

  return { error, setError, putRegister };
}
