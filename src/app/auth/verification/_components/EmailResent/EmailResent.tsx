"use client";

import { useEffect, useRef } from "react";

import styles from "./EmailResent.module.scss";

export function EmailResent() {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal.current) {
      modal.current?.showModal();
    }
  }, []);

  return (
    <>
      <div className={styles["email-resent"]}>
        <p>A verification email has been sent to you</p>
        <p>
          No email in your inbox or spam folder? <span>Let’s resend it.</span>
        </p>
      </div>
      {/* <Modal innerRefference={modal} /> */}
    </>
  );
}
