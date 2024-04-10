import { classNames } from "@anatoquiz/src/styles/shared/classNames";

import styles from "./Stepper.module.scss";

export interface IStepperProps {
  numberStepps: number;
  numberQuestion: number;
}
export function Stepper({ numberStepps, numberQuestion }: IStepperProps) {
  const stepps: number[] = Array.from(
    { length: numberStepps },
    (_, index) => index,
  );

  return (
    <div className={styles["stepper"]}>
      {stepps.map((step) => (
        <div
          key={step}
          className={classNames(styles["stepper__step"], {
            [styles["stepper__step--color"]]: numberQuestion >= step,
          })}
        />
      ))}
    </div>
  );
}
