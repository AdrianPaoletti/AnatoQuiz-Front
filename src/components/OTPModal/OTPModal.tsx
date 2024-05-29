import { SECONDS_PER_MINUTE } from "@anatoquiz/constants/constants";
import { Button } from "@anatoquiz/styles/atoms/Button";
import { Modal } from "@anatoquiz/styles/atoms/Modal";
import { classNames } from "@anatoquiz/styles/shared/classNames";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { useOTPModal } from "./useOTPModal";

import styles from "./OTPModal.module.scss";

type SUBJECT_TYPE = "registration";
interface IOTPModalProps {
  isModalOpen: boolean;
  email: string;
  subject: SUBJECT_TYPE;
  onClose: () => void;
  onChange: (value: string) => void;
  onVerify: () => void;
}

export function OTPModal({
  isModalOpen,
  email,
  subject,
  onClose,
  onChange,
}: IOTPModalProps) {
  const COUNTER = 300;
  const isFirstRender = useRef<boolean>(true);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { putOTP, getOTP, otpParams, setOTPParams } = useOTPModal();
  const [counter, setCounter] = useState<number>(COUNTER);
  const [counterInterval, setCounterInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const minute = Math.trunc(counter / SECONDS_PER_MINUTE);
  const seconds = counter - minute * SECONDS_PER_MINUTE;
  const isDisabled = otpParams.value.length < 5;

  useEffect(() => {
    if (isModalOpen && isFirstRender) {
      setOTPParams({ email, value: "" });
      putOTP({ email, subject });
      activateInterval();
    }

    return () => {
      isFirstRender.current = false;
    };
  }, [email, isModalOpen, putOTP, setOTPParams, subject]);

  function handleChange(
    { target }: ChangeEvent<HTMLInputElement>,
    valueKey: number,
  ) {
    const { value, nextElementSibling } = target;

    setOTPValue(value, valueKey);

    if (!value.length) {
      return target.focus();
    }

    return nextElementSibling
      ? (nextElementSibling as HTMLInputElement).focus()
      : target.blur();
  }

  function handleClose() {
    setCounter(COUNTER);
    clearInterval(counterInterval || undefined);
    onClose();
  }

  function handleResend(): void {
    setCounter(COUNTER);
    clearInterval(counterInterval || undefined);
    setCounterInterval(null);
    putOTP({ email, subject });
    activateInterval();
  }

  function setOTPValue(value: string, valueKey: number) {
    const newValue = otpParams.value.split("");
    newValue[valueKey - 1] = value;

    setOTPParams((prevOTPParams) => ({
      ...prevOTPParams,
      value: newValue.join(""),
    }));
  }

  function activateInterval(): void {
    const counterIntervalInstance = setInterval(
      () =>
        setCounter((prevCounter) => {
          if (!prevCounter) {
            clearInterval(counterIntervalInstance);

            return 0;
          }

          return prevCounter - 1;
        }),
      1000,
    );

    setCounterInterval(counterIntervalInstance);
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <h3 className={styles.otp__title}>Verification Code</h3>
      <p className={styles.otp__description}>
        We have sent you an email to complete your registration. Please check
        your invoices and enter the code below.
      </p>
      <div className={styles.otp__form}>
        {Array.from(Array(5).keys()).map((valueKey) => (
          <input
            ref={(ref) => ref && isDisabled && inputsRef.current.push(ref)}
            key={valueKey}
            type={"number"}
            value={otpParams.value[valueKey - 1]}
            onChange={(event) => handleChange(event, valueKey)}
            onClick={() => inputsRef.current[otpParams.value.length].focus()}
            maxLength={1}
            className={styles.otp__field}
          />
        ))}
      </div>
      <span
        className={styles["otp__counter"]}
      >{`0${minute}:${seconds.toString().length === 1 ? "0" : ""}${seconds}`}</span>
      <p
        className={classNames(styles["otp__description--mail"])}
        style={{ textAlign: "center" }}
      >
        Didnt recieve the mail?
      </p>
      <p
        className={classNames(
          styles["otp__description--mail"],
          styles["otp__description--resend"],
        )}
        onClick={handleResend}
      >
        Lets resend it!
      </p>
      <div className={styles["otp__buttons"]}>
        {/* <Button fullWidth={true} mode={"inverted"}>
          Cancel
        </Button> */}
        <Button fullWidth={true} disabled={isDisabled} onClick={() => getOTP()}>
          Verify
        </Button>
      </div>
    </Modal>
  );
}
