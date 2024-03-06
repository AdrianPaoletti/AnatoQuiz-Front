import React from "react";

import { LoginForm } from "./_components/LoginForm/LoginForm";

import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <article className={styles.login}>
      <h2 className={styles.login__title}>Hello there 👋</h2>
      <h3 className={styles.login__subtitle}>Please complete your profile</h3>
      <LoginForm />
    </article>
  );
}
