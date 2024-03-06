import React from "react";

import { Button } from "./Button";

import styles from "./Modal.module.scss";

interface ModalProps {
  innerRefference: any;
}

export function Modal({ innerRefference }: ModalProps) {
  return (
    <dialog className={styles.modal} ref={innerRefference}>
      <p>Resent!</p>
      <p>An email confirmation have been successfully sent to you</p>
      <Button mode="secondary">Ok</Button>
    </dialog>
  );
}
