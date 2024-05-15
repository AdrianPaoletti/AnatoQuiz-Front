import { Modal } from "@anatoquiz/styles/atoms/Modal";
import { classNames } from "@anatoquiz/styles/shared/classNames";
import { ChangeEvent, useRef } from "react";

import styles from "./OTPModal.module.scss";

interface IOTPModalProps {
  isModalOpen: boolean;
}

export function OTPModal({ isModalOpen }: IOTPModalProps) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    const { value, nextElementSibling } = target;

    if (!value.length) {
      return target.focus();
    }

    return nextElementSibling
      ? (nextElementSibling as HTMLInputElement).focus()
      : target.blur();
  }

  return (
    <Modal isOpen={isModalOpen} style={{ width: "23.5rem", height: "27rem" }}>
      <h3 className={styles.otp__title}>Verification Code</h3>
      <p className={styles.otp__description}>
        We have sent you an email to complete your registration. Please check
        your invoices and enter the code below
      </p>
      <div className={styles.otp__form}>
        {Array.from(Array(5).keys()).map((value) => (
          <input
            ref={(ref) => ref && inputsRef.current.push(ref)}
            key={value}
            type={"number"}
            onChange={handleChange}
            maxLength={1}
            className={styles.otp__field}
          />
        ))}
      </div>
      <p
        className={classNames(
          styles.otp__description,
          styles["otp__description--resend"],
        )}
        style={{ textAlign: "center" }}
      >
        Didnt recieve the mail?
      </p>
      <p
        className={classNames(
          styles.otp__description,
          styles["otp__description--resend"],
        )}
      >
        You can resend it in s
      </p>
    </Modal>
  );
}
