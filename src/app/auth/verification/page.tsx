import { Icon } from "@anatoquiz/src/styles/atoms/Icon";
import React from "react";

import { EmailResent } from "./_components/EmailResent/EmailResent";

import styles from "./page.module.scss";

export default function EmailVerification() {
  return (
    <article className={styles["email-verification"]}>
      <div>
        <h2 className={styles["email-verification__title"]}>
          {"It's almost done 🫡"}
        </h2>
        <h3 className={styles["email-verification__subtitle"]}>
          {"You,ve got an email, please check your inbox"}
        </h3>
      </div>
      <Icon icon="sentMail" />
      <EmailResent />
    </article>
  );
}
