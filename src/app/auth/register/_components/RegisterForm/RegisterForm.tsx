"use client";

import { OTPModal } from "@anatoquiz/components/OTPModal/OTPModal";
import { Alert } from "@anatoquiz/styles/atoms/Alert";
import { Button } from "@anatoquiz/styles/atoms/Button";
import { CheckBox } from "@anatoquiz/styles/atoms/CheckBox";
import { Input } from "@anatoquiz/styles/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getOAuth2 } from "../../../../../services/auth/getGoogleUserInfo";
import { FormRegister, inputsData } from "../RegisterForm/inputs";

import { useRegisterForm } from "./useRegisterForm";

import styles from "./RegisterForm.module.scss";

export function RegisterForm() {
  const router = useRouter();
  const { error, setError, postRegister, isModalOpen, setIsModalOpen } =
    useRegisterForm();

  const [formData, setFormData] = useState<FormRegister>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

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

    if (!hasErrors()) {
      setIsModalOpen(true);
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
      <Alert
        text={error.text}
        type={"error"}
        onClose={() => setError({ id: error.id, text: "" })}
      />
      {isModalOpen && (
        <OTPModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChange={(value) => {}}
          onVerify={() => {}}
          email={formData.email}
          subject={"registration"}
        />
      )}
      <div className={styles["register-form__fields"]}>
        {inputsData.map(({ id, label, type }) => (
          <Input
            key={id}
            id={id}
            label={label}
            type={type}
            error={error.id === id}
            value={formData[id]}
            onChange={handleChange}
          />
        ))}
        <CheckBox id={"remember"} label={"Remember me"} />
      </div>
      <Link href={"login"} className={styles["register-form__login"]}>
        Already have an account?
      </Link>
      <Button type={"submit"} fullWidth={true}>
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
