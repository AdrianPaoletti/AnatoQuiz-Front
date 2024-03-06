import React from "react";

import { RegisterForm } from "./_components/RegisterForm/RegisterForm";

import styles from "./page.module.scss";

export default function Register() {
  return (
    <article className={styles.register}>
      <h2 className={styles.register__title}>Create an account 🤓</h2>
      <h3 className={styles.register__subtitle}>Complete your profile</h3>
      <RegisterForm />
    </article>
  );
}
