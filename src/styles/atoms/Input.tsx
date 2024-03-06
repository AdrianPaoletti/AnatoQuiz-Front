"use client";

import { useState } from "react";

import { classNames } from "../shared/classNames";

import { Icon } from "./Icon";

import colors from "../docs/colors.module.scss";
import spacing from "../docs/spacing.module.scss";
import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  type?: "text" | "number" | "password";
  required?: boolean;
  error?: boolean;
};

export function Input({
  id,
  label,
  type = "text",
  required = false,
  error = false,
  ...props
}: InputProps) {
  const [inputType, setInputType] = useState<"text" | "password" | "number">(
    type,
  );

  return (
    <div
      className={classNames(styles.input, {
        [styles["input--error"]]: error,
      })}
    >
      <label htmlFor={id} className={styles.input__label}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={inputType}
        required={required}
        autoComplete={"off"}
        className={classNames(styles.input__field)}
        {...props}
      />
      <div className={styles.input__icons}>
        {error && <Icon icon={"exclamation"} style={{ color: colors.error }} />}
        {type === "password" && (
          <Icon
            icon={inputType === "password" ? "eyeHide" : "eyeShow"}
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
            style={{ color: colors.inputColor, paddingLeft: spacing.xTiny }}
          />
        )}
      </div>
    </div>
  );
}
