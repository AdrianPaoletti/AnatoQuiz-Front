import { getGoogleUserInfo } from "@anatoquiz/services/auth/getGoogleUserInfo";
import {
  postRegister as postRegisterFetch,
  RegisterBody,
} from "@anatoquiz/services/auth/postRegister";
import { IAuthFormError } from "@anatoquiz/types/authTypes";
import { generateRandomPassword } from "@anatoquiz/utils/generators";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface IUserRegisterForm {
  error: IAuthFormError;
  setError: Dispatch<SetStateAction<IAuthFormError>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  postRegister: UseMutateFunction<void, Error, RegisterBody, unknown>;
}

export function useRegisterForm(): IUserRegisterForm {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<IAuthFormError>({
    id: "",
    text: "",
  });

  const { mutate: postRegister } = useMutation({
    mutationKey: ["user"],
    mutationFn: postRegisterFetch,
    onError: () => {
      setError({
        id: "",
        text: `This email is already taken. Please log in.`,
      });
    },
    onSuccess: () => {
      localStorage.setItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY ?? "",
        googleData?.token ?? "",
      );
    },
    retry: false,
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
    select: ({ email, name: username, token }) => ({
      email,
      username,
      token,
    }),

    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (window.location.hash && !isFetched) {
      refetch().catch((error) => {
        throw new Error(error.message);
      });
    }

    if (googleData && isFetched) {
      const { username, email } = googleData;

      postRegister({
        username,
        password: generateRandomPassword(10),
        email,
        id: uuid(),
      });
    }
  }, [refetch, postRegister, isFetched, googleData]);

  return { error, setError, postRegister, isModalOpen, setIsModalOpen };
}
