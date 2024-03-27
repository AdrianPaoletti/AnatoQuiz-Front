import React from "react";

import { Button } from "./Button";

import styles from "./Modal.module.scss";

export function Modal() {
  return (
    <div className={styles.modal}>
      <p>Resent!</p>
      <p>An email confirmation have been successfully sent to you</p>
      <Button mode="secondary">Ok</Button>
    </div>
  );
}
