"use client";

import { Alert } from "@anatoquiz/src/styles/atoms/Alert";
import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { CheckBox } from "@anatoquiz/src/styles/atoms/CheckBox";
import { Input } from "@anatoquiz/src/styles/atoms/Input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { getOAuth2 } from "../../../../../services/auth/getGoogleUserInfo";
import { getLogin } from "../../../../../services/auth/getLogin";

import { FormLogin, inputsData } from "./inputs";

import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ id: string; text: string } | null>(null);
  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: getLogin,
    onError: () => {
      setError({
        id: "",
        text: `Wrong email or password`,
      });
    },
    onSuccess: () => router.push("/"),
  });
  const isDisabled = Object.keys(formData).some(
    (key) => !formData[key as keyof FormLogin].length,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { email, password } = formData;
    if (!hasErrors()) {
      mutate({ email, password, id: uuid() });
    }
  }

  function handleChange({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id as keyof FormLogin]: value,
    }));
  }

  function hasErrors(): boolean {
    const index = inputsData.findIndex(
      ({ id, validation }) => !validation(formData[id]),
    );

    if (index > -1) {
      const { id, error: text } = inputsData[index];
      setError({ id, text });

      return true;
    }

    return false;
  }

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      {!!error?.text.length && (
        <Alert
          text={error.text}
          type={"error"}
          close={() => setError({ ...error, text: "" })}
        />
      )}
      <div className={styles["login-form__fields"]}>
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
      <Link href={"register"} className={styles["login-form__register"]}>
        {"Don't have an account yet?"}
      </Link>
      <Button type={"submit"} fullWidth disabled={isDisabled}>
        Sign In
      </Button>
      <div className={styles["login-form__or"]}>
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
