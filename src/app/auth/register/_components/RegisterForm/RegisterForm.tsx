"use client";
import { Alert } from "@anatoquiz/src/styles/atoms/Alert";
import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { CheckBox } from "@anatoquiz/src/styles/atoms/CheckBox";
import { Input } from "@anatoquiz/src/styles/atoms/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import {
  getGoogleUserInfo,
  getOAuth2,
} from "../../../../../services/auth/getGoogleUserInfo";
import { postRegister } from "../../../../../services/auth/postRegister";
import { FormRegister, inputsData } from "../RegisterForm/inputs";

import styles from "./RegisterForm.module.scss";

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormRegister>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<{ id: string; text: string } | null>(null);

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: postRegister,
    onError: () => {
      setError({
        id: "",
        text: `This email is already taken. Please log in.`,
      });
    },
    onSuccess: () =>
      data ? router.push("/auth/verified") : router.push("/auth/verification"),
  });

  const { data, refetch, isFetched } = useQuery({
    queryKey: ["google-info"],
    queryFn: () => {
      const hashParams = window.location.hash?.substring(1);
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

  const isDisabled = Object.keys(formData).some(
    (key) => !formData[key as keyof FormRegister].length,
  );

  useEffect(() => {
    if (window.location.hash && !isFetched) {
      refetch();
    }

    if (isFetched && data) {
      const { username, password, email } = data;
      mutate({ username, password, email, id: uuid() });
    }
  }, [refetch, data, isFetched, mutate]);

  function handleChange({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id as keyof FormRegister]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { username, password, email } = formData;
    if (!hasErrors()) {
      mutate({ username, password, email, id: uuid() });
    }
  }

  function hasErrors(): boolean {
    const index = inputsData.findIndex(
      ({ id, validation, comparation }) =>
        !validation(formData[id], comparation && formData[comparation]),
    );

    if (index > -1) {
      const { id, error: text } = inputsData[index];
      setError({ id, text });

      return true;
    }

    return false;
  }

  return (
    <form className={styles["register-form"]} onSubmit={handleSubmit}>
      {!!error?.text.length && (
        <Alert
          text={error.text}
          type={"error"}
          close={() => setError({ ...error, text: "" })}
        />
      )}
      <div className={styles["register-form__fields"]}>
        {inputsData.map(({ id, label, type }) => (
          <Input
            key={id}
            id={id}
            label={label}
            type={type}
            error={error?.id === id}
            value={formData[id]}
            onChange={handleChange}
          />
        ))}
        <CheckBox id={"remember"} label={"Remember me"} />
      </div>
      <Link href={"login"} className={styles["register-form__login"]}>
        Already have an account?
      </Link>
      <Button type={"submit"} fullWidth={true} disabled={isDisabled}>
        Sign Up
      </Button>
      <div className={styles["register-form__or"]}>
        <span>or</span>
      </div>
      <Button
        type={"button"}
        mode={"secondary"}
        icon={"google"}
        fullWidth={true}
        onClick={() => router.replace(getOAuth2(window.location.origin))}
      >
        Continue with Google
      </Button>
    </form>
  );
}
